
'use client'

import React, { useState, useRef, useEffect } from 'react'
import type { WindowInstance, AppDefinition, UserSession } from '@/types/os'
import { Button } from '@/components/ui/button'
import { X, Minus, Square, RotateCcw } from 'lucide-react'

interface WindowProps {
  window: WindowInstance
  app: AppDefinition
  isActive: boolean
  onClose: () => void
  onFocus: () => void
  onMinimize: () => void
  onUpdatePosition: (windowId: number, position: { x: number; y: number }) => void
  onUpdateSize: (windowId: number, size: { width: number; height: number }) => void
  userSession: UserSession
}

export default function Window({
  window,
  app,
  isActive,
  onClose,
  onFocus,
  onMinimize,
  onUpdatePosition,
  onUpdateSize,
  userSession
}: WindowProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)
  const AppComponent = app.component

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x
        const newY = Math.max(0, e.clientY - dragStart.y)
        onUpdatePosition(window.id, { x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isResizing, dragStart, window.id, onUpdatePosition])

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title')) {
      setIsDragging(true)
      setDragStart({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      })
      onFocus()
    }
  }

  return (
    <div
      ref={windowRef}
      className={`
        absolute bg-gray-900 border border-gray-600 rounded-lg shadow-2xl overflow-hidden
        ${isActive ? 'border-red-500 shadow-red-500/20' : 'border-gray-600'}
      `}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className={`
          h-10 flex items-center justify-between px-4 cursor-move select-none
          ${isActive ? 'bg-red-600' : 'bg-gray-700'}
        `}
        onMouseDown={handleTitleBarMouseDown}
      >
        <div className="flex items-center space-x-2 text-white">
          <div className="w-4 h-4">
            {app.icon}
          </div>
          <span className="text-sm font-medium window-title">
            {window.title}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
          >
            <Minus className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Implement maximize/restore
            }}
          >
            <Square className="h-3 w-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:bg-red-500"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="h-full pb-10 bg-gray-800 text-white overflow-hidden">
        <AppComponent 
          windowId={window.id}
          userSession={userSession}
          onClose={onClose}
          onMinimize={onMinimize}
        />
      </div>

      {/* Resize Handle */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-600 hover:bg-gray-500"
        onMouseDown={(e) => {
          e.stopPropagation()
          setIsResizing(true)
          setDragStart({
            x: e.clientX - window.size.width,
            y: e.clientY - window.size.height
          })
        }}
      />
    </div>
  )
}
