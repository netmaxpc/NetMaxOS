
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GraduationCap, Brain, Rocket, ExternalLink } from 'lucide-react'

interface AITrainingAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function AITrainingApp({ windowId, userSession }: AITrainingAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">AI Training Hub</h1>
            <p className="text-gray-400">Step into the AI Future</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Training Programs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-400 mb-2" />
                <h3 className="text-white font-medium">Corporate AI Training</h3>
                <p className="text-gray-400 text-sm">Comprehensive AI training programs for businesses</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Brain className="h-6 w-6 text-purple-400 mb-2" />
                <h3 className="text-white font-medium">AI Integration</h3>
                <p className="text-gray-400 text-sm">Seamless AI integration into existing workflows</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Rocket className="h-6 w-6 text-blue-400 mb-2" />
                <h3 className="text-white font-medium">AI Deployment</h3>
                <p className="text-gray-400 text-sm">End-to-end AI solution deployment and support</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Transform Your Business</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Join the AI revolution with our comprehensive training and deployment programs.
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Start AI Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
