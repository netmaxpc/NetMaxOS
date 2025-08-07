
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeftRight, Users, Shield, ExternalLink } from 'lucide-react'

interface BartersBargainsAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function BartersBargainsApp({ windowId, userSession }: BartersBargainsAppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Barters Bargains</h1>
            <p className="text-gray-400">Innovative Marketplace Platform</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Platform Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <ArrowLeftRight className="h-6 w-6 text-teal-400 mb-2" />
                <h3 className="text-white font-medium">Trade & Barter</h3>
                <p className="text-gray-400 text-sm">Exchange goods and services without traditional currency</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Users className="h-6 w-6 text-teal-400 mb-2" />
                <h3 className="text-white font-medium">Community Driven</h3>
                <p className="text-gray-400 text-sm">Connect with local community members for fair trades</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Shield className="h-6 w-6 text-teal-400 mb-2" />
                <h3 className="text-white font-medium">Secure Transactions</h3>
                <p className="text-gray-400 text-sm">Safe and verified trading with built-in protection</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Join the Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Experience a new way of trading with our innovative barter marketplace.
              </p>
              <Button className="bg-teal-600 hover:bg-teal-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Explore Platform
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
