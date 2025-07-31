import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createMaxChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// Check for SpeechRecognition API
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
}

const MaxAssistantApp: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChat(createMaxChatSession());
        setMessages([{ sender: 'ai', text: 'Hello! I\'m Max. How can I help you navigate NetMaxOS today?' }]);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = useCallback(async (messageText: string) => {
        const text = messageText.trim();
        if (!text || !chat || isLoading) return;

        const userMessage: Message = { sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await chat.sendMessageStream({ message: text });
            let aiResponse = '';
            setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

            for await (const chunk of stream) {
                aiResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { sender: 'ai', text: aiResponse };
                    return newMessages;
                });
            }
            if (window.speechSynthesis) {
                 const utterance = new SpeechSynthesisUtterance(aiResponse);
                 window.speechSynthesis.speak(utterance);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = { sender: 'ai', text: 'Sorry, I\'m having trouble connecting right now.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [chat, isLoading]);
    
    // Voice Recognition Logic
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            setInput(transcript);
            handleSend(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false);
        };
    }, [handleSend]);

    const toggleListening = () => {
        if (!recognition) {
            alert("Voice recognition is not supported by your browser.");
            return;
        }
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
        setIsListening(!isListening);
    };

    return (
        <div className="flex flex-col h-full text-sm p-2 bg-gray-800/20">
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 p-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-2 items-end ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-6 h-6 rounded-full flex-shrink-0 ${msg.sender === 'user' ? 'bg-[var(--accent-500)]' : 'bg-teal-500'}`}></div>
                        <div className={`p-3 rounded-lg max-w-xs md:max-w-md whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-[var(--accent-900)] text-white rounded-br-none' : 'bg-gray-700/50 rounded-bl-none'}`}>
                            {msg.text}{msg.sender === 'ai' && isLoading && index === messages.length - 1 ? '...' : ''}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center mt-2 border-t border-teal-500/30 pt-3 gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                    className="w-full bg-gray-900/50 focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg px-3 py-2 text-gray-200"
                    placeholder="Ask Max anything..."
                    disabled={isLoading}
                />
                 {recognition && (
                     <button onClick={toggleListening} disabled={isLoading} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-teal-500 animate-pulse' : 'bg-gray-600 hover:bg-gray-500'}`}>
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0a5 5 0 01-5 5V2a1 1 0 00-1 1v1.07A7.001 7.001 0 003 8a1 1 0 102 0a5 5 0 015 5v3.93z" clipRule="evenodd"></path></svg>
                    </button>
                 )}
                <button
                    onClick={() => handleSend(input)}
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 bg-teal-600/80 text-white rounded-lg hover:bg-teal-500/90 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MaxAssistantApp;