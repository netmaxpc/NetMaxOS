
'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import type { WindowInstance, AppDefinition, ThemeSettings, UserSession } from '@/types/os'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  LogOut, 
  User, 
  Monitor,
  Palette,
  FolderOpen,
  MessageCircle 
} from 'lucide-react'

interface TaskbarProps {
  windows: WindowInstance[]
  apps: AppDefinition[]
  activeWindowId: number | null
  onWindowClick: (windowId: number) => void
  onAppOpen: (appId: string) => void
  onMinimizeToggle: (windowId: number) => void
  theme: ThemeSettings
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>
  userSession: UserSession
}

export default function Taskbar({
  windows,
  apps,
  activeWindowId,
  onWindowClick,
  onAppOpen,
  onMinimizeToggle,
  theme,
  setTheme,
  userSession
}: TaskbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)

  const handleSignOut = () => {
    if (userSession.isGuest) {
      window.location.href = '/auth/signin'
    } else {
      signOut({ callbackUrl: '/auth/signin' })
    }
  }

  const getAppById = (appId: string) => apps.find(app => app.id === appId)

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-lg border-t border-white/10 flex items-center px-4 z-50">
      {/* Start Menu / Logo */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 font-bold"
          onClick={() => onAppOpen('about')}
        >
          Net<span className="text-red-400">Max</span>OS
        </Button>
      </div>

      {/* Quick Access Icons */}
      <div className="flex items-center ml-4 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onAppOpen('my_projects')}
          title="My Projects"
        >
          <FolderOpen className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onAppOpen('max_assistant')}
          title="Max AI Assistant"
        >
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/70 hover:text-white hover:bg-white/10"
          onClick={() => onAppOpen('file_manager')}
          title="File Manager"
        >
          <Monitor className="h-4 w-4" />
        </Button>
      </div>

      {/* Active Windows */}
      <div className="flex-1 flex items-center ml-6 space-x-2 overflow-x-auto">
        {windows.map(window => {
          const app = getAppById(window.appId)
          const isActive = activeWindowId === window.id
          
          return (
            <Button
              key={window.id}
              variant="ghost"
              size="sm"
              className={`
                flex items-center space-x-2 px-3 h-10 min-w-0 max-w-48
                ${isActive 
                  ? 'bg-white/20 text-white border border-white/20' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
                ${window.isMinimized ? 'opacity-60' : ''}
              `}
              onClick={() => window.isMinimized ? onMinimizeToggle(window.id) : onWindowClick(window.id)}
            >
              {app && (
                <div className="w-4 h-4 flex-shrink-0">
                  {app.icon}
                </div>
              )}
              <span className="truncate text-sm">
                {window.title}
              </span>
            </Button>
          )
        })}
      </div>

      {/* System Area */}
      <div className="flex items-center space-x-2">
        {/* Theme Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          {showThemeMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg p-2 space-y-1">
              {(['red', 'blue', 'orange', 'teal'] as const).map(color => (
                <button
                  key={color}
                  className={`
                    w-full text-left px-3 py-1 rounded text-sm capitalize
                    ${theme.accent === color ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}
                  `}
                  onClick={() => {
                    setTheme(prev => ({ ...prev, accent: color }))
                    setShowThemeMenu(false)
                  }}
                >
                  {color}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white hover:bg-white/10 flex items-center space-x-2"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <User className="h-4 w-4" />
            <span className="text-sm hidden md:inline">
              {userSession.isGuest ? 'Guest' : userSession.name}
            </span>
          </Button>

          {showUserMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg p-2 min-w-48">
              <div className="px-3 py-2 border-b border-white/10 mb-2">
                <div className="text-white text-sm font-medium">
                  {userSession.name}
                </div>
                <div className="text-white/60 text-xs">
                  {userSession.email}
                </div>
                {userSession.isGuest && (
                  <div className="text-yellow-400 text-xs mt-1">
                    Guest Session
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <button
                  className="w-full text-left px-3 py-1 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white flex items-center space-x-2"
                  onClick={() => {
                    onAppOpen('settings')
                    setShowUserMenu(false)
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                
                <button
                  className="w-full text-left px-3 py-1 rounded text-sm text-white/70 hover:bg-white/10 hover:text-white flex items-center space-x-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>{userSession.isGuest ? 'Exit Guest Mode' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Time */}
        <div className="text-white/70 text-sm font-mono hidden md:block">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  )
}
