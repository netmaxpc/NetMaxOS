
'use client'

import React from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingBag, Star, Package, ExternalLink } from 'lucide-react'

interface Store209AppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function Store209App({ windowId, userSession }: Store209AppProps) {
  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">209 Store</h1>
            <p className="text-gray-400">Trending Products & Collectibles</p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Featured Categories</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg">
                <Star className="h-6 w-6 text-orange-400 mb-2" />
                <h3 className="text-white font-medium">Trending Items</h3>
                <p className="text-gray-400 text-sm">Latest trending products and viral items</p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <Package className="h-6 w-6 text-orange-400 mb-2" />
                <h3 className="text-white font-medium">Collectibles</h3>
                <p className="text-gray-400 text-sm">Rare and unique collectible items</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white">Visit 209er.com</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Discover the latest trending products and unique collectibles at our online store.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Shop Now at 209er.com
              </Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}
