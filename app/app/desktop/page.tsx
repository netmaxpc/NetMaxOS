
'use client'

import React, { useState, useCallback, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { WindowInstance, AppDefinition, ThemeSettings } from '@/types/os'
import { ALL_APPS } from '@/constants/apps'
import Desktop from '@/components/desktop/Desktop'
import Taskbar from '@/components/desktop/Taskbar'
import Window from '@/components/desktop/Window'
import { toast } from 'sonner'

const ACCENT_COLORS = {
    red: { 400: 'hsl(0, 84.2%, 60.2%)', 500: 'hsl(0, 72.2%, 50.6%)', 600: 'hsl(0, 62.8%, 43.5%)', 900: 'hsl(0, 52.8%, 23.5%)'},
    orange: { 400: 'hsl(24.6, 95%, 53.1%)', 500: 'hsl(20.5, 90.2%, 48.2%)', 600: 'hsl(15.8, 89.9%, 43.3%)', 900: 'hsl(15.8, 89.9%, 23.3%)' },
    blue: { 400: 'hsl(217.2, 91.2%, 59.8%)', 500: 'hsl(221.2, 83.2%, 53.3%)', 600: 'hsl(224.3, 76.3%, 48%)', 900: 'hsl(224.3, 76.3%, 28%)' },
    teal: { 400: 'hsl(162.1, 75.2%, 43.1%)', 500: 'hsl(163.4, 83.3%, 36.3%)', 600: 'hsl(164.4, 95.1%, 28.2%)', 900: 'hsl(164.4, 95.1%, 18.2%)' },
}

function DesktopPageContent() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const isGuest = searchParams.get('guest') === 'true'

    const [apps, setApps] = useState<AppDefinition[]>(ALL_APPS)
    const [windows, setWindows] = useState<WindowInstance[]>([])
    const [activeWindowId, setActiveWindowId] = useState<number | null>(null)
    const [nextZIndex, setNextZIndex] = useState(10)
    const [isClient, setIsClient] = useState(false)
    const [theme, setTheme] = useState<ThemeSettings>({ accent: 'red', showDesktopLogo: true })

    const backgroundClass = {
        red: 'from-black via-red-900/60 to-black',
        orange: 'from-black via-orange-900/60 to-black',
        blue: 'from-black via-blue-900/60 to-black',
        teal: 'from-black via-teal-900/60 to-black',
    }

    useEffect(() => {
        setIsClient(true)
        
        if (status === 'loading') return

        if (!session && !isGuest) {
            router.push('/auth/signin')
            return
        }

        // Welcome message
        if (session?.user?.name) {
            toast.success(`Welcome back, ${session.user.name}! 🚀`)
        } else if (isGuest) {
            toast.success('Welcome to NetMaxOS! You are using guest mode. 👋')
        }
    }, [session, status, router, isGuest])

    const openWindow = useCallback((appId: string, customTitle?: string) => {
        if (typeof window === 'undefined') return

        const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized)
        if (existingWindow) {
            focusWindow(existingWindow.id)
            return
        }
        
        const minimizedWindow = windows.find(w => w.appId === appId && w.isMinimized)
        if (minimizedWindow) {
            toggleMinimize(minimizedWindow.id)
            return
        }

        const app = apps.find(a => a.id === appId)
        if (!app) return

        const windowId = Date.now()
        const newWindow: WindowInstance = {
            id: windowId,
            appId,
            title: customTitle || app.name,
            position: { 
                x: Math.max(0, Math.min((window.innerWidth - app.defaultSize.width) / 2 + (windows.length * 30), window.innerWidth - app.defaultSize.width)),
                y: Math.max(0, Math.min((window.innerHeight - app.defaultSize.height) / 2 + (windows.length * 30), window.innerHeight - app.defaultSize.height - 80))
            },
            size: app.defaultSize,
            zIndex: nextZIndex,
            isMinimized: false,
        }

        setWindows(prev => [...prev, newWindow])
        setActiveWindowId(windowId)
        setNextZIndex(prev => prev + 1)
    }, [apps, windows, nextZIndex])

    const closeWindow = useCallback((windowId: number) => {
        setWindows(prev => prev.filter(w => w.id !== windowId))
        if (activeWindowId === windowId) {
            const remainingWindows = windows.filter(w => w.id !== windowId && !w.isMinimized)
            setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
        }
    }, [windows, activeWindowId])

    const focusWindow = useCallback((windowId: number) => {
        setActiveWindowId(windowId)
        setNextZIndex(prev => {
            const newZIndex = prev + 1
            setWindows(prevWindows => prevWindows.map(w => 
                w.id === windowId ? { ...w, zIndex: newZIndex } : w
            ))
            return newZIndex + 1
        })
    }, [])

    const toggleMinimize = useCallback((windowId: number) => {
        setWindows(prev => prev.map(w => 
            w.id === windowId ? { ...w, isMinimized: !w.isMinimized } : w
        ))
        
        if (activeWindowId === windowId) {
            const visibleWindows = windows.filter(w => w.id !== windowId && !w.isMinimized)
            setActiveWindowId(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null)
        }
    }, [windows, activeWindowId])

    const updateWindowPosition = useCallback((windowId: number, position: { x: number; y: number }) => {
        setWindows(prev => prev.map(w => 
            w.id === windowId ? { ...w, position } : w
        ))
    }, [])

    const updateWindowSize = useCallback((windowId: number, size: { width: number; height: number }) => {
        setWindows(prev => prev.map(w => 
            w.id === windowId ? { ...w, size } : w
        ))
    }, [])

    if (status === 'loading' || !isClient) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Net<span className="text-red-500">Max</span>OS
                    </h1>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                    <p className="text-gray-300 mt-4">Loading Desktop Environment...</p>
                </div>
            </div>
        )
    }

    if (!session && !isGuest) {
        return null
    }

    return (
        <div 
            className={`h-screen overflow-hidden bg-gradient-to-br ${backgroundClass[theme.accent]} relative`}
            style={{
                '--accent-400': ACCENT_COLORS[theme.accent][400],
                '--accent-500': ACCENT_COLORS[theme.accent][500],
                '--accent-600': ACCENT_COLORS[theme.accent][600],
                '--accent-900': ACCENT_COLORS[theme.accent][900],
            } as React.CSSProperties}
        >
            {/* Desktop */}
            <Desktop
                apps={apps}
                onAppOpen={openWindow}
                theme={theme}
                userSession={{
                    id: (session?.user as any)?.id || 'guest',
                    name: session?.user?.name || 'Guest User',
                    email: session?.user?.email || 'guest@netmaxos.local',
                    role: (session?.user as any)?.role || 'guest',
                    isGuest
                }}
            />

            {/* Windows */}
            {windows.map(windowInstance => {
                const app = apps.find(a => a.id === windowInstance.appId)
                if (!app || windowInstance.isMinimized) return null

                return (
                    <Window
                        key={windowInstance.id}
                        window={windowInstance}
                        app={app}
                        isActive={activeWindowId === windowInstance.id}
                        onClose={() => closeWindow(windowInstance.id)}
                        onFocus={() => focusWindow(windowInstance.id)}
                        onMinimize={() => toggleMinimize(windowInstance.id)}
                        onUpdatePosition={updateWindowPosition}
                        onUpdateSize={updateWindowSize}
                        userSession={{
                            id: (session?.user as any)?.id || 'guest',
                            name: session?.user?.name || 'Guest User',
                            email: session?.user?.email || 'guest@netmaxos.local',
                            role: (session?.user as any)?.role || 'guest',
                            isGuest
                        }}
                    />
                )
            })}

            {/* Taskbar */}
            <Taskbar
                windows={windows}
                apps={apps}
                activeWindowId={activeWindowId}
                onWindowClick={focusWindow}
                onAppOpen={openWindow}
                onMinimizeToggle={toggleMinimize}
                theme={theme}
                setTheme={setTheme}
                userSession={{
                    id: (session?.user as any)?.id || 'guest',
                    name: session?.user?.name || 'Guest User',
                    email: session?.user?.email || 'guest@netmaxos.local',
                    role: (session?.user as any)?.role || 'guest',
                    isGuest
                }}
            />
        </div>
    )
}

export default function DesktopPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-black via-red-900/20 to-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Net<span className="text-red-500">Max</span>OS
                    </h1>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto"></div>
                    <p className="text-gray-300 mt-4">Loading Desktop Environment...</p>
                </div>
            </div>
        }>
            <DesktopPageContent />
        </Suspense>
    )
}
