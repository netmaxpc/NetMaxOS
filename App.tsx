
import React, { useState, useCallback, useEffect } from 'react';
import type { WindowInstance, AppDefinition, ThemeSettings, SystemActions } from './types';
import { ALL_APPS } from './constants';
import Desktop from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import Window from './components/Window';

const ACCENT_COLORS = {
    red: { 400: 'hsl(0, 84.2%, 60.2%)', 500: 'hsl(0, 72.2%, 50.6%)', 600: 'hsl(0, 62.8%, 43.5%)', 900: 'hsl(0, 52.8%, 23.5%)'},
    orange: { 400: 'hsl(24.6, 95%, 53.1%)', 500: 'hsl(20.5, 90.2%, 48.2%)', 600: 'hsl(15.8, 89.9%, 43.3%)', 900: 'hsl(15.8, 89.9%, 23.3%)' },
    blue: { 400: 'hsl(217.2, 91.2%, 59.8%)', 500: 'hsl(221.2, 83.2%, 53.3%)', 600: 'hsl(224.3, 76.3%, 48%)', 900: 'hsl(224.3, 76.3%, 28%)' },
    teal: { 400: 'hsl(162.1, 75.2%, 43.1%)', 500: 'hsl(163.4, 83.3%, 36.3%)', 600: 'hsl(164.4, 95.1%, 28.2%)', 900: 'hsl(164.4, 95.1%, 18.2%)' },
};

const App: React.FC = () => {
    const [apps, setApps] = useState<AppDefinition[]>(ALL_APPS);
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<number | null>(null);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [isClient, setIsClient] = useState(false);
    const [theme, setTheme] = useState<ThemeSettings>({ accent: 'red', showDesktopLogo: true });

    const backgroundClass = {
        red: 'from-black via-red-900/60 to-black',
        orange: 'from-black via-orange-900/60 to-black',
        blue: 'from-black via-blue-900/60 to-black',
        teal: 'from-black via-teal-900/60 to-black',
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    const openWindow = useCallback((appId: string, customTitle?: string) => {
        if (typeof window === 'undefined') return;

        const existingWindow = windows.find(w => w.appId === appId && !w.isMinimized);
        if (existingWindow) {
            focusWindow(existingWindow.id);
            return;
        }
        
        const minimizedWindow = windows.find(w => w.appId === appId && w.isMinimized);
        if (minimizedWindow) {
            toggleMinimize(minimizedWindow.id);
            return;
        }

        const app = apps.find(a => a.id === appId);
        if (!app || !app.isInstalled) return;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const newWindowId = Date.now();
        const newWindow: WindowInstance = {
            id: newWindowId,
            appId: app.id,
            title: customTitle || app.name,
            position: {
                x: Math.max(0, (screenWidth - app.defaultSize.width) / 2 + (windows.length % 5 * 30)),
                y: Math.max(0, (screenHeight - app.defaultSize.height) / 2 + (windows.length % 5 * 30) - 50),
            },
            size: app.defaultSize,
            zIndex: nextZIndex,
            isMinimized: false,
        };

        setWindows(prev => [...prev, newWindow]);
        focusWindow(newWindowId);

    }, [windows, nextZIndex, apps]);

    const closeWindow = useCallback((id: number) => {
        setWindows(prev => prev.filter(w => w.id !== id));
        if (activeWindowId === id) {
             const remainingWindows = windows.filter(w => w.id !== id && !w.isMinimized);
             if(remainingWindows.length > 0) {
                focusWindow(remainingWindows[remainingWindows.length - 1].id);
             } else {
                setActiveWindowId(null);
             }
        }
    }, [windows, activeWindowId]);

    const focusWindow = useCallback((id: number) => {
        setWindows(prev =>
            prev.map(w =>
                w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w
            )
        );
        setNextZIndex(prev => prev + 1);
        setActiveWindowId(id);
    }, [nextZIndex]);

    const toggleMinimize = useCallback((id: number) => {
        const windowToMinimize = windows.find(w => w.id === id);
        if (!windowToMinimize) return;

        const isCurrentlyMinimized = windowToMinimize.isMinimized;
        
        if (isCurrentlyMinimized) {
            focusWindow(id);
        } else {
            setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
             if (activeWindowId === id) {
                const nextActiveWindow = windows.find(w => w.id !== id && !w.isMinimized);
                setActiveWindowId(nextActiveWindow ? nextActiveWindow.id : null);
             }
        }
    }, [windows, activeWindowId, focusWindow]);

    useEffect(() => {
        if (isClient) {
            openWindow('about');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isClient]);
    
    const systemActions: SystemActions = { setApps, setTheme, openWindow };

    return (
        <div 
            className={`h-screen w-screen bg-gradient-to-br ${backgroundClass[theme.accent]} font-sans select-none relative overflow-hidden`}
            style={{
              '--accent-400': ACCENT_COLORS[theme.accent][400],
              '--accent-500': ACCENT_COLORS[theme.accent][500],
              '--accent-600': ACCENT_COLORS[theme.accent][600],
              '--accent-900': ACCENT_COLORS[theme.accent][900],
            } as React.CSSProperties}
        >
            {theme.showDesktopLogo && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                  <svg width="50%" height="50%" viewBox="0 0 290 272" fill="none" xmlns="http://www.w3.org/2000/svg"
                       style={{ filter: 'drop-shadow(2px 2px 10px rgba(0,0,0,0.8))', opacity: '0.1' }}>
                      <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEGCAYAAABm6ud2AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA5vSURBVHic7d17fF1V+f/x3XurCVJbSgK9aCsxYg0iClJBRBwG7AiDiI6IDjMOO47+A8Yf0fGnzzjT+UFnHHXU0RFdURhQxFEQpYJaA6FQUhMNtDW1tVfvvf39/gFZGqS3le7d7fV8Pp/neTxPz3vuPT/nPa895/zKZZlK/TMAARi/BgwAGAAwAGAAwABGAQADAAaAGL+i/7+r/7sGAgwbAYYgDAAYADAAYADAAIYgDAAYADAAYADAAEYgDAAYADAAYADAAEYgDAAYADAAYADAAEYBGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgamaaB2bN/z31mAAAAAElFTkSuQmCC" />
                  </svg>
              </div>
            )}
            
            <Desktop onOpen={openWindow} />
            
            {isClient && windows.map(win => {
                const appInfo = apps.find(a => a.id === win.appId);
                if (!appInfo || !appInfo.component || win.isMinimized) return null;

                const AppToRender = appInfo.component;

                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        initialPosition={win.position}
                        initialSize={win.size}
                        zIndex={win.zIndex}
                        isActive={win.id === activeWindowId}
                        onClose={closeWindow}
                        onFocus={focusWindow}
                        onMinimize={toggleMinimize}
                    >
                        <AppToRender
                          apps={apps}
                          theme={theme}
                          systemActions={systemActions}
                        />
                    </Window>
                );
            })}

            <Taskbar
                apps={apps.filter(app => app.isInstalled)}
                windows={windows}
                onOpen={openWindow}
                onTabClick={toggleMinimize}
                onTabClose={closeWindow}
                activeWindowId={activeWindowId}
            />
        </div>
    );
};

export default App;