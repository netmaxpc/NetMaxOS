
'use client'

import React, { useState } from 'react'
import type { AppDefinition, ThemeSettings } from '@/types/os'

interface DesktopIconProps {
  app: AppDefinition
  onOpen: () => void
  theme: ThemeSettings
}

export default function DesktopIcon({ app, onOpen, theme }: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="flex flex-col items-center cursor-pointer group p-3 rounded-lg transition-all duration-200 hover:bg-white/10"
      onDoubleClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 mb-2 text-white/80 transition-all duration-200
        ${isHovered ? 'scale-110 text-white' : ''}
        ${theme.accent === 'red' ? 'group-hover:text-red-400' : ''}
        ${theme.accent === 'blue' ? 'group-hover:text-blue-400' : ''}
        ${theme.accent === 'orange' ? 'group-hover:text-orange-400' : ''}
        ${theme.accent === 'teal' ? 'group-hover:text-teal-400' : ''}
      `}>
        {app.icon}
      </div>
      
      {/* Label */}
      <div className={`
        text-xs text-white/70 text-center transition-all duration-200 max-w-20 break-words
        ${isHovered ? 'text-white' : ''}
      `}>
        {app.name}
      </div>
    </div>
  )
}
