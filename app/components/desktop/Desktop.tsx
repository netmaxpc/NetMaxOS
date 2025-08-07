
'use client'

import React from 'react'
import type { AppDefinition, ThemeSettings, UserSession } from '@/types/os'
import DesktopIcon from './DesktopIcon'

interface DesktopProps {
  apps: AppDefinition[]
  onAppOpen: (appId: string) => void
  theme: ThemeSettings
  userSession: UserSession
}

export default function Desktop({ apps, onAppOpen, theme, userSession }: DesktopProps) {
  // Filter apps by category for organized display
  const systemApps = apps.filter(app => app.category === 'system')
  const serviceApps = apps.filter(app => app.category === 'service')
  const businessApps = apps.filter(app => app.category === 'business')
  const toolApps = apps.filter(app => app.category === 'tool')

  return (
    <div className="h-full w-full p-6 overflow-hidden">
      {/* NetMaxOS Logo */}
      {theme.showDesktopLogo && (
        <div className="absolute top-8 left-8 z-10">
          <div className="text-white/80 text-xl font-bold">
            Net<span className="text-red-400">Max</span>OS
          </div>
          <div className="text-white/60 text-sm">
            {userSession.isGuest ? 'Guest Session' : `Welcome, ${userSession.name}`}
          </div>
        </div>
      )}

      {/* Desktop Grid Layout */}
      <div className="h-full grid grid-cols-8 gap-6 pt-20">
        {/* Left Column - System Apps */}
        <div className="col-span-2 space-y-4">
          <div className="text-white/70 text-sm font-medium mb-2">System</div>
          <div className="grid grid-cols-2 gap-4">
            {systemApps.map(app => (
              <DesktopIcon
                key={app.id}
                app={app}
                onOpen={() => onAppOpen(app.id)}
                theme={theme}
              />
            ))}
          </div>
        </div>

        {/* Middle Column - Services */}
        <div className="col-span-3 space-y-4">
          <div className="text-white/70 text-sm font-medium mb-2">NetMax Services</div>
          <div className="grid grid-cols-3 gap-4">
            {serviceApps.map(app => (
              <DesktopIcon
                key={app.id}
                app={app}
                onOpen={() => onAppOpen(app.id)}
                theme={theme}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Business Apps */}
        <div className="col-span-3 space-y-4">
          <div className="text-white/70 text-sm font-medium mb-2">Business Apps</div>
          <div className="grid grid-cols-3 gap-4">
            {businessApps.map(app => (
              <DesktopIcon
                key={app.id}
                app={app}
                onOpen={() => onAppOpen(app.id)}
                theme={theme}
              />
            ))}
          </div>
          
          {/* Tools section if there are any */}
          {toolApps.length > 0 && (
            <div className="mt-8">
              <div className="text-white/70 text-sm font-medium mb-2">Tools</div>
              <div className="grid grid-cols-3 gap-4">
                {toolApps.map(app => (
                  <DesktopIcon
                    key={app.id}
                    app={app}
                    onOpen={() => onAppOpen(app.id)}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Hint */}
      <div className="absolute bottom-20 right-8 text-white/50 text-sm">
        <div>Double-click icons to open apps</div>
        <div>Right-click for context menu</div>
      </div>
    </div>
  )
}
