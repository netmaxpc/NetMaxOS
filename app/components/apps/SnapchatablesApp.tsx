
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Camera, Share2, Zap, ExternalLink } from 'lucide-react'

interface SnapchatablesAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function SnapchatablesApp({ windowId, userSession }: SnapchatablesAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Snapchatables</h1>
            <p className="text-gray-400">Social Commerce Innovation</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Platform Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <Camera className="h-6 w-6 text-pink-400 mb-2" />
                <h3 className="text-white font-medium">Visual Commerce</h3>
                <p className="text-gray-400 text-sm">Shop through engaging visual content and stories</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Share2 className="h-6 w-6 text-pink-400 mb-2" />
                <h3 className="text-white font-medium">Social Shopping</h3>
                <p className="text-gray-400 text-sm">Share and discover products through social interactions</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Zap className="h-6 w-6 text-pink-400 mb-2" />
                <h3 className="text-white font-medium">Instant Checkout</h3>
                <p className="text-gray-400 text-sm">Quick and seamless purchasing experience</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Experience Social Shopping</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Discover a new way to shop and sell through our innovative social commerce platform.
              </p>
              <Button className="bg-pink-600 hover:bg-pink-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Join Platform
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
