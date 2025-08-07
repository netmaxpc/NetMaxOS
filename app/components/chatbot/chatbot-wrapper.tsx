
'use client'

import dynamic from 'next/dynamic'

// Dynamically import the chatbot to prevent SSR issues
const MaxChatbot = dynamic(() => import('./max-chatbot'), {
  ssr: false,
  loading: () => null
})

export default function ChatbotWrapper() {
  return <MaxChatbot />
}
