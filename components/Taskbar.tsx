
import React, { useState, useEffect, useRef } from 'react';
import type { WindowInstance, AppDefinition } from '../types';

interface TaskbarProps {
    apps: AppDefinition[];
    windows: WindowInstance[];
    activeWindowId: number | null;
    onOpen: (appId: string) => void;
    onTabClick: (id: number) => void;
    onTabClose: (id: number) => void;
}

const StartMenu: React.FC<{ apps: AppDefinition[], onOpen: (appId: string) => void, closeMenu: () => void }> = ({ apps, onOpen, closeMenu }) => {
    return (
        <div className="absolute bottom-full mb-2 w-64 bg-black/70 backdrop-blur-xl border border-[var(--accent-500)]/30 rounded-lg shadow-2xl p-2 animate-fade-in-up">
            <h2 className="text-sm font-semibold px-2 pb-2 text-gray-300 border-b border-[var(--accent-500)]/20">Applications</h2>
            <div className="mt-2 space-y-1">
                {apps.map(app => (
                    <button
                        key={app.id}
                        onClick={() => { onOpen(app.id); closeMenu(); }}
                        className="w-full flex items-center gap-3 text-left px-2 py-1.5 text-sm rounded-md text-gray-200 hover:bg-[var(--accent-500)]/30 transition-colors"
                    >
                        <div className="w-5 h-5 text-gray-300">{app.icon}</div>
                        <span>{app.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const NetMaxLogoIcon: React.FC = () => (
    <div className="w-6 h-6 text-gray-200 hover:text-white transition-colors" style={{ filter: 'drop-shadow(0 0 5px var(--accent-500))' }}>
         <image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAEGCAYAAABm6ud2AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAA5vSURBVHic7d17fF1V+f/x3XurCVJbSgK9aCsxYg0iClJBRBwG7AiDiI6IDjMOO47+A8Yf0fGnzzjT+UFnHHXU0RFdURhQxFEQpYJaA6FQUhMNtDW1tVfvvf39/gFZGqS3le7d7fV8Pp/neTxPz3vuPT/nPa895/zKZZlK/TMAARi/BgwAGAAwAGAAwABGAQADAAaAGL+i/7+r/7sGAgwbAYYgDAAYADAAYADAAIYgDAAYADAAYADAAEYgDAAYADAAYADAAEYgDAAYADAAYADAAEYBGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMABiBEAgDGAEwAGAAwAGAAwAGYATCAIABgAMAAgAMAFrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABrEAYADAAIABgAMABjEAYADAAIABgAMABjEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgAMAFrEAYADAAIABgamaaB2bN/z31mAAAAAElFTkSuQmCC" />
    </div>
);

export const Taskbar: React.FC<TaskbarProps> = ({ apps, windows, activeWindowId, onOpen, onTabClick, onTabClose }) => {
    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
    const startMenuRef = useRef<HTMLDivElement>(null);
    const [currentTime, setCurrentTime] = useState(new Date());

    const toggleStartMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsStartMenuOpen(prev => !prev);
    };

    const closeStartMenu = () => {
        setIsStartMenuOpen(false);
    };

    // Clock effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 30000); // Update every 30s is enough
        return () => clearInterval(timer);
    }, []);

    // Close start menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (startMenuRef.current && !startMenuRef.current.contains(event.target as Node)) {
                closeStartMenu();
            }
        };

        if (isStartMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isStartMenuOpen]);

    return (
        <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-lg flex items-center z-[1001] border-t border-[var(--accent-500)]/30 px-2 shadow-2xl" >
            <div className="relative h-full flex items-center" ref={startMenuRef}>
                <button
                    onClick={toggleStartMenu}
                    className="h-full px-2 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center"
                    aria-label="Start Menu"
                >
                    <NetMaxLogoIcon />
                </button>
                {isStartMenuOpen && <StartMenu apps={apps} onOpen={onOpen} closeMenu={closeStartMenu} />}
            </div>

            <div className="flex-grow flex items-center gap-1 overflow-x-auto ml-1 h-full">
                {windows.map(win => {
                    const app = apps.find(a => a.id === win.appId);
                    if (!app) return null;

                    const isActive = win.id === activeWindowId;
                    const isMinimized = win.isMinimized;

                    return (
                        <div
                            key={win.id}
                            onClick={() => onTabClick(win.id)}
                            className={`flex-shrink-0 flex items-center gap-2 h-full max-w-40 px-3 cursor-pointer transition-all duration-200 border-b-2 ${
                                isActive && !isMinimized ? 'bg-[var(--accent-600)]/50 border-[var(--accent-400)]' : 'bg-white/10 hover:bg-white/20 border-transparent'
                            } ${isMinimized ? 'opacity-60 bg-white/5 border-gray-500' : ''}`}
                            title={win.title}
                        >
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-gray-300">{app.icon}</div>
                            <span className="text-xs text-gray-200 truncate hidden sm:inline">{win.title}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); onTabClose(win.id); }}
                                className="ml-auto w-4 h-4 text-gray-400 hover:text-white rounded-full hover:bg-[var(--accent-500)]/50 flex items-center justify-center flex-shrink-0"
                                aria-label={`Close ${win.title}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="ml-auto text-xs text-gray-300 px-3 whitespace-nowrap hidden sm:block">
                {currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </div>
        </div>
    );
};