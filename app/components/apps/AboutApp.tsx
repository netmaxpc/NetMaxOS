
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { 
  Monitor, 
  Sparkles, 
  Shield, 
  Cpu,
  Users,
  Globe
} from 'lucide-react'

interface AboutAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function AboutApp({ windowId, userSession }: AboutAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Net<span className="text-red-400">Max</span>OS
            </h1>
            <p className="text-gray-400">The AI-Powered Operating System</p>
            <Badge className="mt-2 bg-red-600">Version 1.0.0</Badge>
          </div>

          {/* Features */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-red-400" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <Cpu className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">AI Integration</h4>
                  <p className="text-gray-400 text-sm">Max AI Assistant provides intelligent help throughout the system</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Secure Environment</h4>
                  <p className="text-gray-400 text-sm">Enterprise-grade security with user authentication and data protection</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Multi-User Support</h4>
                  <p className="text-gray-400 text-sm">Individual user sessions with personalized workspaces</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white font-medium">Web-Based Platform</h4>
                  <p className="text-gray-400 text-sm">Access your desktop from anywhere with an internet connection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* NetMaxPC Services */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Integrated Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="text-white font-medium mb-2">Development</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• NetMax Web</li>
                    <li>• NetMax Dev</li>
                    <li>• AI Training Hub</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Business</h4>
                  <ul className="text-gray-400 space-y-1">
                    <li>• NetMax Accounting</li>
                    <li>• 209 Store</li>
                    <li>• Barters Bargains</li>
                    <li>• SwiftSell AI</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Session Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">User:</span>
                  <span className="text-white">{userSession.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{userSession.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-white capitalize">{userSession.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session Type:</span>
                  <span className="text-white">{userSession.isGuest ? 'Guest' : 'Authenticated'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">System Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform:</span>
                  <span className="text-white">Next.js 14 + React 18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Database:</span>
                  <span className="text-white">PostgreSQL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Authentication:</span>
                  <span className="text-white">NextAuth.js</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Engine:</span>
                  <span className="text-white">Abacus.AI</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center pt-4">
            <p className="text-gray-400 text-sm">
              © 2024 NetMaxPC. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Led by CEO Clay Thomas
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
