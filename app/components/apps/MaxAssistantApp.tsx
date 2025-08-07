
'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { UserSession } from '@/types/os'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Volume2, VolumeX, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'max'
  timestamp: Date
}

interface MaxAssistantAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function MaxAssistantApp({ windowId, userSession }: MaxAssistantAppProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial greeting
    const welcomeMessage: Message = {
      id: 'welcome',
      text: `Hello ${userSession.name}! I'm Max, your AI assistant. I'm here to help you navigate NetMaxOS and assist with any questions about our services. How can I help you today?`,
      sender: 'max',
      timestamp: new Date()
    }
    setMessages([welcomeMessage])

    // Speak welcome message if voice is enabled
    if (voiceEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(welcomeMessage.text)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      window.speechSynthesis.speak(utterance)
    }
  }, [userSession.name, voiceEnabled])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const speak = (text: string) => {
    if (!voiceEnabled || !window.speechSynthesis) return
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = 1.0
    window.speechSynthesis.speak(utterance)
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // NetMaxOS specific responses
    if (lowerMessage.includes('netmaxos') || lowerMessage.includes('operating system')) {
      return "NetMaxOS is our AI-powered operating system that brings all NetMaxPC services together in one unified platform. You can access all our business apps, manage projects, and get AI assistance throughout your workflow!"
    }
    
    // Services responses
    if (lowerMessage.includes('service') || lowerMessage.includes('what can you do')) {
      return "I can help you with:\n• Navigate NetMaxOS applications\n• Information about our services (Web Dev, AI Training, etc.)\n• Project management assistance\n• File organization\n• General business questions\n\nJust double-click any app icon to get started!"
    }
    
    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('file')) {
      return "You can manage all your projects through the 'My Projects' app on your desktop. It keeps track of your files, project status, and collaboration details. Would you like me to open it for you?"
    }
    
    // Greeting responses
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hey there! Great to chat with you. What would you like to explore on NetMaxOS today?"
    }
    
    // Thanks
    if (lowerMessage.includes('thank')) {
      return "You're very welcome! I'm always happy to help. Is there anything else you'd like to know about NetMaxOS or our services?"
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! I'd be happy to help you with that. Could you tell me more specifically what you're looking for?",
      "I'm here to assist you with NetMaxOS and all our services. What specific area would you like to explore?",
      "Great question! NetMaxOS has many powerful features. Which aspect interests you most?",
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateResponse(userMessage.text)
      const aiMessage: Message = {
        id: `max-${Date.now()}`,
        text: response,
        sender: 'max',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setIsLoading(false)
      
      // Speak response
      speak(response)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Max AI Assistant</h3>
            <p className="text-gray-400 text-sm">Your NetMaxOS Guide</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="text-gray-400 hover:text-white"
        >
          {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-600">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Max anything about NetMaxOS..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
