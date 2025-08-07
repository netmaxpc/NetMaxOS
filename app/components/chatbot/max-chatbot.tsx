
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, Volume2, VolumeX, Minimize2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
  id: string
  text: string
  sender: 'user' | 'max'
  timestamp: Date
}

interface MaxChatbotProps {
  onGreeting?: () => void
}

interface VoiceOption {
  name: string
  lang: string
  localService: boolean
  quality: 'premium' | 'standard' | 'basic'
}

export default function MaxChatbot({ onGreeting }: MaxChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([])
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [showVoiceDebug, setShowVoiceDebug] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Ensure component only runs on client side
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Process text for more natural speech (only affects spoken text, not displayed text)
  const processTextForSpeech = (text: string): string => {
    if (typeof window === 'undefined') return text
    
    return text
      // Add natural conversational pauses
      .replace(/\. /g, '... ')
      .replace(/\! /g, '! ... ')
      .replace(/\? /g, '? ... ')
      .replace(/,/g, ', ')  
      .replace(/;/g, '; ... ')  
      .replace(/:/g, ': ')  
      .replace(/\.\.\./g, '... ') // Normalize multiple dots
      
      // Make speech more conversational and natural
      .replace(/Hey there!/g, 'Hey there! ')
      .replace(/Welcome to/g, 'Welcome to... ')
      .replace(/I'm Max/g, 'I am Max')
      .replace(/What can I/g, 'What can I... ')
      .replace(/I love/g, 'I really love')
      .replace(/That's great/g, 'That is really great')
      .replace(/Thanks for/g, 'Thank you so much for')
      
      // Make abbreviations natural for speech
      .replace(/NetMaxPC/g, 'Net Max P C')
      .replace(/\bAI\b/g, 'artificial intelligence')
      .replace(/\bCEO\b/g, 'chief executive officer')
      .replace(/\bUS\b/g, 'United States')
      .replace(/\bUK\b/g, 'United Kingdom')
      .replace(/\bIT\b/g, 'information technology')
      .replace(/\bAPI\b/g, 'A P I')
      .replace(/\bURL\b/g, 'website address')
      .replace(/\bUI\b/g, 'user interface')
      .replace(/\bUX\b/g, 'user experience')
      .replace(/\bSEO\b/g, 'search engine optimization')
      .replace(/\bCMS\b/g, 'content management system')
      .replace(/\bCRM\b/g, 'customer relationship management')
      .replace(/\bSaaS\b/g, 'Software as a Service')
      .replace(/\bB2B\b/g, 'Business to Business')
      .replace(/\bB2C\b/g, 'Business to Consumer')
      
      // Numbers and time expressions
      .replace(/24\/7/g, 'twenty four hours a day, seven days a week')
      .replace(/\b7\b/g, 'seven')
      .replace(/\b24\b/g, 'twenty four')
      .replace(/\$(\d+)/g, '$1 dollars')
      
      // Web addresses and emails
      .replace(/\.com/g, ' dot com')
      .replace(/\.org/g, ' dot org')
      .replace(/\.net/g, ' dot net')
      .replace(/\.ai/g, ' dot A I')
      .replace(/@/g, ' at ')
      .replace(/www\./g, 'w w w dot ')
      .replace(/https?:\/\//g, '')
      
      // Expand contractions for more natural speech
      .replace(/We're/g, 'We are')
      .replace(/We've/g, 'We have')
      .replace(/We'll/g, 'We will')
      .replace(/I'm/g, 'I am')
      .replace(/I've/g, 'I have')
      .replace(/I'll/g, 'I will')
      .replace(/You're/g, 'You are')
      .replace(/You've/g, 'You have')
      .replace(/You'll/g, 'You will')
      .replace(/That's/g, 'That is')
      .replace(/That'll/g, 'That will')
      .replace(/It's/g, 'It is')
      .replace(/It'll/g, 'It will')
      .replace(/Let's/g, 'Let us')
      .replace(/Can't/g, 'Cannot')
      .replace(/Won't/g, 'Will not')
      .replace(/Don't/g, 'Do not')
      .replace(/Doesn't/g, 'Does not')
      .replace(/Isn't/g, 'Is not')
      .replace(/Aren't/g, 'Are not')
      
      // Add breathing room for long sentences
      .replace(/development,/g, 'development... ')
      .replace(/training,/g, 'training... ')
      .replace(/solutions,/g, 'solutions... ')
      .replace(/services,/g, 'services... ')
      .replace(/business,/g, 'business... ')
      
      // Make tech terms more conversational
      .replace(/full app/g, 'complete application')
      .replace(/website development/g, 'website creation and development')
      .replace(/AI training/g, 'artificial intelligence training')
      .replace(/small business/g, 'small business')
      
      // Add natural speech patterns
      .replace(/Oh,/g, 'Oh... ')
      .replace(/Well,/g, 'Well... ')
      .replace(/So,/g, 'So... ')
      .replace(/Actually,/g, 'Actually... ')
      .replace(/Basically,/g, 'Basically... ')
  }

  // Enhanced voice synthesis with human-like qualities
  const speak = (text: string, isGreeting: boolean = false) => {
    if (!isMounted || !voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    // Wait a moment to ensure voices are loaded
    setTimeout(() => {
      const voices = window.speechSynthesis.getVoices()
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`))
      
      // Process text for more natural speech
      const processedText = processTextForSpeech(text)
      const utterance = new SpeechSynthesisUtterance(processedText)
      
      // More human-like voice settings with variation
      if (isGreeting) {
        utterance.rate = 0.75   // Much slower for warmth and clarity
        utterance.pitch = 0.8   // Lower, more masculine pitch
        utterance.volume = 1.0  // Full volume for greeting
      } else {
        utterance.rate = 0.8    // Slower conversational speed
        utterance.pitch = 0.85  // Consistent masculine pitch
        utterance.volume = 0.95 // Clear volume
      }
      
      // Ultra-specific voice selection for most natural male voices
      const premiumMaleVoices = [
        // macOS high-quality voices
        'Alex',
        'Daniel (Enhanced)',
        'Daniel',
        'Fred',
        'Ralph',
        'Tom',
        
        // Windows high-quality voices  
        'Microsoft David Desktop - English (United States)',
        'Microsoft Mark Desktop - English (United States)',
        'Microsoft David Desktop',
        'Microsoft Mark Desktop',
        'David Desktop',
        'Mark Desktop',
        
        // Google premium voices
        'Google US English Male',
        'Google UK English Male',
        'Chrome OS US English Male',
        'Chrome OS UK English Male',
        
        // Generic high-quality options
        'English (United States) Male',
        'English (United Kingdom) Male',
        'en-US-Standard-D',
        'en-US-Standard-B',
        'en-US-Wavenet-D',
        'en-US-Wavenet-B',
        'en-GB-Standard-D',
        'en-GB-Standard-B'
      ]
      
      // Use the pre-selected best voice from state, or find one dynamically
      let voiceToUse = selectedVoice
      
      if (!voiceToUse) {
        let dynamicVoice = null
        
        // Try exact matches first
        for (const voiceName of premiumMaleVoices) {
          dynamicVoice = voices.find(voice => 
            voice.name === voiceName && voice.lang.startsWith('en')
          )
          if (dynamicVoice) {
            console.log('Exact match found:', dynamicVoice.name)
            break
          }
        }
        
        // Try partial matches
        if (!dynamicVoice) {
          for (const voiceName of premiumMaleVoices) {
            dynamicVoice = voices.find(voice => 
              voice.name.toLowerCase().includes(voiceName.toLowerCase()) && 
              voice.lang.startsWith('en')
            )
            if (dynamicVoice) {
              console.log('Partial match found:', dynamicVoice.name)
              break
            }
          }
        }
        
        // Advanced fallback - look for quality indicators
        if (!dynamicVoice) {
          const qualityIndicators = ['desktop', 'enhanced', 'premium', 'neural', 'wavenet', 'standard']
          const maleNames = ['david', 'mark', 'alex', 'daniel', 'fred', 'ralph', 'tom', 'paul', 'richard', 'male']
          
          dynamicVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            qualityIndicators.some(indicator => voice.name.toLowerCase().includes(indicator)) &&
            maleNames.some(name => voice.name.toLowerCase().includes(name))
          )
          
          if (dynamicVoice) {
            console.log('Quality voice found:', dynamicVoice.name)
          }
        }
        
        // Final fallback - any male-sounding voice
        if (!dynamicVoice) {
          const maleIndicators = ['male', 'david', 'mark', 'alex', 'daniel', 'man', 'masculine']
          dynamicVoice = voices.find(voice => 
            voice.lang.startsWith('en') && 
            maleIndicators.some(indicator => voice.name.toLowerCase().includes(indicator))
          )
          
          if (dynamicVoice) {
            console.log('Male voice found:', dynamicVoice.name)
          }
        }
        
        // Absolute fallback - first English voice
        if (!dynamicVoice) {
          dynamicVoice = voices.find(voice => voice.lang.startsWith('en'))
          if (dynamicVoice) {
            console.log('Fallback English voice:', dynamicVoice.name)
          }
        }
        
        voiceToUse = dynamicVoice || null
      }
      
      if (voiceToUse) {
        utterance.voice = voiceToUse
        console.log('🎤 Using voice:', voiceToUse.name, '- Language:', voiceToUse.lang, '- Local:', voiceToUse.localService)
      } else {
        console.log('⚠️  No suitable voice found, using browser default')
      }

      utterance.onstart = () => {
        setIsSpeaking(true)
        console.log('🗣️  Speech started')
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        console.log('🔇  Speech ended')
      }
      
      utterance.onerror = (event) => {
        setIsSpeaking(false)
        console.error('❌ Speech error:', event)
      }

      window.speechSynthesis.speak(utterance)
    }, 100) // Small delay to ensure voices are loaded
  }

  // Initial greeting when component mounts
  useEffect(() => {
    if (!hasGreeted && isMounted && typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        const greetingMessage = "Hey there! Welcome to NetMaxPC. I'm Max, your friendly AI assistant. It's great to have you here! I'm ready to help you with anything you need to know about our services, from app development to AI training. What can I help you discover today?"
        
        setMessages([{
          id: 'greeting-1',
          text: greetingMessage,
          sender: 'max',
          timestamp: new Date()
        }])
        
        // Only speak if we're in browser
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          speak(greetingMessage, true)
        }
        setHasGreeted(true)
        onGreeting?.()
      }, 1500) // 1.5 second delay after page load

      return () => clearTimeout(timer)
    }
  }, [hasGreeted, isMounted, onGreeting])

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Comprehensive voice loading and categorization
  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return

    const categorizeVoices = () => {
      if (!window.speechSynthesis) return

      const voices = window.speechSynthesis.getVoices()
      if (voices.length === 0) return

      const voiceOptions: VoiceOption[] = voices
        .filter(voice => voice.lang.startsWith('en'))
        .map(voice => {
          let quality: 'premium' | 'standard' | 'basic' = 'basic'
          
          // Categorize voice quality based on name patterns
          const name = voice.name.toLowerCase()
          if (name.includes('neural') || name.includes('wavenet') || name.includes('enhanced') || 
              name.includes('premium') || name.includes('desktop') || name === 'alex') {
            quality = 'premium'
          } else if (name.includes('google') || name.includes('microsoft') || name.includes('standard') ||
                     name.includes('david') || name.includes('mark') || name.includes('daniel')) {
            quality = 'standard'
          }

          return {
            name: voice.name,
            lang: voice.lang,
            localService: voice.localService,
            quality
          }
        })
        .sort((a, b) => {
          // Sort by quality first, then by male voice preference
          const qualityOrder = { premium: 3, standard: 2, basic: 1 }
          const aScore = qualityOrder[a.quality]
          const bScore = qualityOrder[b.quality]
          
          if (aScore !== bScore) return bScore - aScore
          
          // Prefer male-sounding names
          const maleNames = ['david', 'mark', 'alex', 'daniel', 'fred', 'ralph', 'tom', 'male']
          const aMale = maleNames.some(name => a.name.toLowerCase().includes(name))
          const bMale = maleNames.some(name => b.name.toLowerCase().includes(name))
          
          if (aMale && !bMale) return -1
          if (!aMale && bMale) return 1
          
          return a.name.localeCompare(b.name)
        })

      setAvailableVoices(voiceOptions)
      
      // Auto-select the best male voice
      const bestVoice = voices.find(voice => 
        voiceOptions[0] && voice.name === voiceOptions[0].name
      )
      
      if (bestVoice) {
        setSelectedVoice(bestVoice)
        console.log('🎤 Auto-selected best voice:', bestVoice.name, '- Quality:', voiceOptions[0]?.quality)
      } else {
        setSelectedVoice(null)
      }

      console.log('📋 Available voices categorized:', voiceOptions.length, 'English voices found')
      console.log('🏆 Premium voices:', voiceOptions.filter(v => v.quality === 'premium').length)
      console.log('⭐ Standard voices:', voiceOptions.filter(v => v.quality === 'standard').length)
      console.log('📱 Basic voices:', voiceOptions.filter(v => v.quality === 'basic').length)
    }

    // Initial load
    categorizeVoices()
    
    // Listen for voice changes
    if (window.speechSynthesis) {
      window.speechSynthesis.addEventListener('voiceschanged', categorizeVoices)
      
      // Some browsers need a small delay
      setTimeout(categorizeVoices, 100)
      setTimeout(categorizeVoices, 500)
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', categorizeVoices)
      }
    }
  }, [isMounted])

  // AI Response Generator
  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // CEO and leadership
    if (lowerMessage.includes('ceo') || lowerMessage.includes('clay thomas') || lowerMessage.includes('leadership')) {
      return "NetMaxPC is led by CEO Clay Thomas, who guides our vision of delivering cutting-edge technology solutions across the United States. Under his leadership, we've built a comprehensive network of companies focused on AI training, app development, and business transformation."
    }
    
    // NetMaxPC specific responses
    if (lowerMessage.includes('netmaxpc') || lowerMessage.includes('company')) {
      return "NetMaxPC is a comprehensive US-based technology solutions hub led by CEO Clay Thomas! We specialize in full app & website development, AI training & deployment, corporate AI transformation, and small business development. We're your partner in the AI future!"
    }
    
    // Companies network
    if (lowerMessage.includes('companies') || lowerMessage.includes('network') || lowerMessage.includes('subsidiaries')) {
      return "Our company network includes NetMaxPC (flagship platform), NetMaxWeb (web development), NetMax Accounting (fintech), NetMaxDev (software development), 209 (e-commerce), Barters Bargains (marketplace), Snapchatables (social commerce), and SwiftSell AI (AI sales solutions)!"
    }
    
    // AI services
    if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('machine learning')) {
      return "We're leaders in AI training and deployment! We help corporations step into the AI future with comprehensive training programs and seamless AI integration into business processes. Our SwiftSell AI company also provides revolutionary AI-powered sales solutions."
    }
    
    // Development services
    if (lowerMessage.includes('app') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
      return "We offer full app and website development services! NetMaxDev handles custom software and mobile apps, while NetMaxWeb specializes in modern websites and e-commerce solutions. From simple landing pages to complex enterprise applications, we've got you covered!"
    }
    
    // Store and e-commerce
    if (lowerMessage.includes('store') || lowerMessage.includes('209') || lowerMessage.includes('shop')) {
      return "Visit our 209 store at 209er.com for trending products and collectibles! We also help other businesses with e-commerce solutions through our development services. Plus, check out Barters Bargains for our innovative marketplace platform!"
    }
    
    // Business services
    if (lowerMessage.includes('business') || lowerMessage.includes('small business') || lowerMessage.includes('enterprise')) {
      return "We specialize in small business development and corporate transformation! From AI training for enterprises to complete digital solutions for small businesses, we help companies of all sizes grow and thrive in the digital age."
    }
    
    // General services
    if (lowerMessage.includes('service') || lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "We offer comprehensive services including full app & website development, AI training & deployment, corporate AI transformation, small business development, and technology integration. How can I help you with your specific needs?"
    }
    
    // Contact
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
      return "You can reach us through our contact page, call +1-555-NETMAX, or email info@netmaxpc.com. We provide nationwide service across the United States. Feel free to continue chatting with me too - I'm here 24/7!"
    }
    
    // Pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
      return "Pricing varies based on your specific needs and project scope. We offer competitive rates for all our services from app development to AI training. Contact us for a personalized quote tailored to your requirements!"
    }

    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return "Hey! It's so nice to meet you! I'm Max, and I absolutely love helping people learn about NetMaxPC. We've got some really exciting stuff going on here. What's caught your interest today?"
    }

    if (lowerMessage.includes('thanks') || lowerMessage.includes('thank')) {
      return "Aw, you're so welcome! That totally made my day. I genuinely love helping out, so please don't hesitate to ask me anything else about NetMaxPC!"
    }

    // Default responses
    const defaultResponses = [
      "Oh, that's such a great question! I love talking about what NetMaxPC does. We're really passionate about technology solutions here. Could you tell me a bit more about what specifically you're curious about?",
      "I'm so excited to help you with that! NetMaxPC has some amazing expertise in IT solutions, training, and cutting-edge tech products. What area sounds most interesting to you?",
      "Ooh, interesting topic! You know, at NetMaxPC we absolutely love staying ahead of the curve with tech trends. Let me help point you in the right direction - what's on your mind?",
      "Thanks for asking! I genuinely get excited talking about NetMaxPC because we're all about empowering people with technology. What specific details can I share with you?",
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isMounted) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate thinking time
    setTimeout(() => {
      const response = generateResponse(userMessage.text)
      const maxMessage: Message = {
        id: `max-${Date.now()}`,
        text: response,
        sender: 'max',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, maxMessage])
      setIsTyping(false)
      
      // Only speak if we're in browser
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        speak(response)
      }
    }, 1000 + Math.random() * 1000) // 1-2 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled)
    if (!voiceEnabled) {
      // Add a slight delay to ensure the state is updated
      setTimeout(() => {
        speak("Hey! Voice is back on! I am so glad you can hear me again!", false)
      }, 100)
    } else {
      // Stop any current speech when voice is disabled
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      }
    }
  }

  const testVoice = () => {
    speak("Hi! This is a voice test. I am Max, your friendly assistant from Net Max P C. How do I sound?", false)
  }

  const toggleVoiceDebug = () => {
    setShowVoiceDebug(!showVoiceDebug)
  }

  // Don't render until component is mounted on client side
  if (!isMounted) {
    return null
  }

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        {/* Notification bubble for first-time users */}
        {!hasGreeted && (
          <motion.div
            className="absolute -top-12 -left-20 bg-red-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3 }}
          >
            Hi! I'm Max 👋
            <div className="absolute top-full left-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600"></div>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className={`bg-black/90 backdrop-blur-md border border-red-600/30 rounded-lg shadow-2xl ${isMinimized ? 'h-16' : 'h-96 w-80'} transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-red-600/20">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${isSpeaking ? 'animate-pulse ring-2 ring-red-400' : ''}`}>
              M
            </div>
            <div>
              <h3 className="text-white font-semibold">Max</h3>
              <p className={`text-xs transition-colors duration-300 ${isSpeaking ? 'text-red-300' : 'text-red-400'}`}>
                {isSpeaking ? '🗣️ Speaking...' : 'NetMaxPC Assistant'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={testVoice}
              className="text-red-400 hover:text-red-300 hover:bg-red-600/20 text-xs px-2"
              title="Test Voice"
            >
              🎵
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoiceDebug}
              className="text-red-400 hover:text-red-300 hover:bg-red-600/20 text-xs px-2"
              title="Voice Debug"
            >
              🔧
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoice}
              className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
              title={voiceEnabled ? "Mute Voice" : "Enable Voice"}
            >
              {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-red-400 hover:text-red-300 hover:bg-red-600/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Voice Debug Panel */}
        {showVoiceDebug && !isMinimized && (
          <div className="p-3 border-b border-red-600/20 bg-gray-900/50 max-h-32 overflow-y-auto">
            <div className="text-xs text-red-300 mb-2">
              Voice Debug ({availableVoices.length} English voices found)
            </div>
            <div className="space-y-1 text-xs">
              {selectedVoice && (
                <div className="text-green-400">
                  ✅ Selected: {selectedVoice.name} ({selectedVoice.lang})
                </div>
              )}
              {availableVoices.slice(0, 5).map((voice, index) => (
                <div key={index} className={`text-gray-300 ${voice.quality === 'premium' ? 'text-yellow-400' : voice.quality === 'standard' ? 'text-blue-400' : 'text-gray-500'}`}>
                  {voice.quality === 'premium' && '🏆'} 
                  {voice.quality === 'standard' && '⭐'} 
                  {voice.quality === 'basic' && '📱'} 
                  {voice.name} ({voice.lang})
                </div>
              ))}
              {availableVoices.length > 5 && (
                <div className="text-gray-500">... and {availableVoices.length - 5} more</div>
              )}
            </div>
          </div>
        )}

        {/* Chat Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`flex flex-col ${showVoiceDebug ? 'h-64' : 'h-80'} transition-all duration-300`}
            >
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-800 text-gray-100 border border-red-600/30'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-800 border border-red-600/30 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-red-600/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about NetMaxPC..."
                    className="flex-1 bg-gray-800 border-red-600/30 text-white placeholder:text-gray-400 focus:border-red-500"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
