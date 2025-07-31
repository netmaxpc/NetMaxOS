import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createChatSession, sendMessageStream } from '../services/geminiService';
import type { Chat } from '@google/genai';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const TerminalApp: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChat(createChatSession());
        setMessages([{ sender: 'ai', text: 'Terminal Command Unit online. Awaiting directive.' }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || !chat || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const stream = await sendMessageStream(chat, input);
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
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = { sender: 'ai', text: 'Error: Connection to AI agent failed.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [input, chat, isLoading]);

    return (
        <div className="flex flex-col h-full font-mono text-sm p-2">
            <div className="flex-grow overflow-y-auto pr-2">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-[var(--accent-400)]' : 'text-blue-200'}`}>
                        <span className="font-bold">{msg.sender === 'user' ? '> ' : ''}</span>
                        <span className="whitespace-pre-wrap">{msg.text}{msg.sender === 'ai' && isLoading && index === messages.length - 1 ? '...' : ''}</span>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center mt-2 border-t border-[var(--accent-500)]/30 pt-2">
                <span className="text-[var(--accent-400)] mr-2">&gt;</span>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="w-full bg-transparent focus:outline-none text-[var(--accent-400)] placeholder:text-[var(--accent-400)]/50"
                    placeholder="Enter directive..."
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="ml-2 px-3 py-1 bg-[var(--accent-600)]/80 text-white rounded hover:bg-[var(--accent-500)]/90 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default TerminalApp;