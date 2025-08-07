
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, TrendingUp, Target, ExternalLink } from 'lucide-react'

interface SwiftSellAIAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function SwiftSellAIApp({ windowId, userSession }: SwiftSellAIAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">SwiftSell AI</h1>
            <p className="text-gray-400">AI-Powered Sales Solutions</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">AI Sales Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <Bot className="h-6 w-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-medium">Intelligent Automation</h3>
                <p className="text-gray-400 text-sm">Automate sales processes with advanced AI algorithms</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-medium">Sales Analytics</h3>
                <p className="text-gray-400 text-sm">Deep insights and predictive analytics for sales optimization</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Target className="h-6 w-6 text-indigo-400 mb-2" />
                <h3 className="text-white font-medium">Lead Qualification</h3>
                <p className="text-gray-400 text-sm">AI-powered lead scoring and qualification systems</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Boost Your Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Transform your sales process with cutting-edge AI technology and automation.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Discover AI Solutions
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
