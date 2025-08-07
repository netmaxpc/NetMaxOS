
'use client'

import React, { useState } from 'react'
import type { UserSession } from '@/types/os'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  User, 
  Palette, 
  Bell, 
  Shield, 
  Monitor,
  Volume2,
  Save
} from 'lucide-react'

interface SettingsAppProps {
  windowId: number
  userSession: UserSession
  onClose: () => void
  onMinimize: () => void
}

export default function SettingsApp({ windowId, userSession }: SettingsAppProps) {
  const [settings, setSettings] = useState({
    theme: 'red',
    notifications: true,
    sounds: true,
    autoSave: true,
    showDesktopLogo: true,
    aiAssistance: true,
  })

  const [profile, setProfile] = useState({
    name: userSession.name,
    email: userSession.email,
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // TODO: Implement settings save
    console.log('Saving settings:', settings, profile)
  }

  return (
    <div className="h-full bg-gray-800">
      <ScrollArea className="h-full p-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-xl font-bold text-white mb-2">Settings</h1>
            <p className="text-gray-400 text-sm">Customize your NetMaxOS experience</p>
          </div>

          {/* Profile Settings */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-red-400" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Display Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  disabled={userSession.isGuest}
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Email</label>
                <Input
                  value={profile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white"
                  disabled={userSession.isGuest}
                />
              </div>
              {userSession.isGuest && (
                <p className="text-yellow-400 text-sm">
                  Profile editing is disabled in guest mode
                </p>
              )}
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="h-5 w-5 mr-2 text-red-400" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Theme Color</label>
                <div className="flex space-x-2">
                  {['red', 'blue', 'orange', 'teal'].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        settings.theme === color ? 'border-white' : 'border-gray-600'
                      }`}
                      style={{ 
                        backgroundColor: {
                          red: '#ef4444',
                          blue: '#3b82f6', 
                          orange: '#f97316',
                          teal: '#14b8a6'
                        }[color] 
                      }}
                      onClick={() => handleSettingChange('theme', color)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-gray-300 text-sm">Show Desktop Logo</label>
                  <p className="text-gray-500 text-xs">Display NetMaxOS logo on desktop</p>
                </div>
                <Switch
                  checked={settings.showDesktopLogo}
                  onCheckedChange={(checked) => handleSettingChange('showDesktopLogo', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* System */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Monitor className="h-5 w-5 mr-2 text-red-400" />
                System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-gray-300 text-sm">Notifications</label>
                  <p className="text-gray-500 text-xs">Show system notifications</p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-gray-300 text-sm">System Sounds</label>
                  <p className="text-gray-500 text-xs">Play audio feedback</p>
                </div>
                <Switch
                  checked={settings.sounds}
                  onCheckedChange={(checked) => handleSettingChange('sounds', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-gray-300 text-sm">Auto Save</label>
                  <p className="text-gray-500 text-xs">Automatically save work</p>
                </div>
                <Switch
                  checked={settings.autoSave}
                  onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* AI Features */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-400" />
                AI Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-gray-300 text-sm">Max AI Assistant</label>
                  <p className="text-gray-500 text-xs">Enable AI assistance throughout the system</p>
                </div>
                <Switch
                  checked={settings.aiAssistance}
                  onCheckedChange={(checked) => handleSettingChange('aiAssistance', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={saveSettings}
              className="bg-red-600 hover:bg-red-700"
              disabled={userSession.isGuest}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>

          {userSession.isGuest && (
            <div className="text-center">
              <p className="text-yellow-400 text-sm">
                Settings cannot be saved in guest mode. Sign in to persist your preferences.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
