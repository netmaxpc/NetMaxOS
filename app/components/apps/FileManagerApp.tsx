
'use client'

import React, { useState } from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Folder, 
  FileText, 
  Image, 
  Video, 
  Music,
  Archive,
  Home,
  Download,
  Upload
} from 'lucide-react'

interface FileManagerAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function FileManagerApp({ windowId, userSession }: FileManagerAppProps) {
  const [currentPath, setCurrentPath] = useState('/')
  
  const mockFiles = [
    { name: 'Documents', type: 'folder', icon: Folder, size: '-' },
    { name: 'Projects', type: 'folder', icon: Folder, size: '-' },
    { name: 'Downloads', type: 'folder', icon: Download, size: '-' },
    { name: 'presentation.pdf', type: 'file', icon: FileText, size: '2.5 MB' },
    { name: 'design.png', type: 'file', icon: Image, size: '1.2 MB' },
    { name: 'video-demo.mp4', type: 'file', icon: Video, size: '45.3 MB' },
  ]

  const getFileIcon = (item: any) => {
    const IconComponent = item.icon
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <div className="h-full bg-gray-800 flex">
      {/* Sidebar */}
      <div className="w-48 bg-gray-900 border-r border-gray-600 p-4">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-white hover:bg-gray-700"
            onClick={() => setCurrentPath('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Home
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Downloads
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
            <Folder className="h-4 w-4 mr-2" />
            Documents
          </Button>
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-gray-700">
            <Folder className="h-4 w-4 mr-2" />
            Projects
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-600 flex items-center justify-between">
          <div className="text-white font-medium">
            {currentPath}
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-gray-600">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* File List */}
        <ScrollArea className="flex-1 p-4">
          <div className="grid grid-cols-1 gap-2">
            {mockFiles.map((item, index) => (
              <Card key={index} className="bg-gray-700 border-gray-600 hover:border-red-500 transition-colors cursor-pointer">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400">
                      {getFileIcon(item)}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{item.name}</div>
                      <div className="text-gray-400 text-xs">{item.size}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {userSession.isGuest && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">
                Guest mode - Sign in to access your files
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}
