import React, { useState } from 'react';
import type { AppDefinition, ThemeSettings, SystemActions } from '../types';

interface NetMaxHubProps {
  apps: AppDefinition[];
  theme: ThemeSettings;
  systemActions: SystemActions;
}

type Tab = 'apps' | 'personalization' | 'system';

const NetMaxHubApp: React.FC<NetMaxHubProps> = ({ apps, theme, systemActions }) => {
  const [activeTab, setActiveTab] = useState<Tab>('apps');
  const { setApps, setTheme } = systemActions;

  const handleToggleInstall = (appId: string) => {
    setApps(currentApps =>
      currentApps.map(app =>
        app.id === appId ? { ...app, isInstalled: !app.isInstalled } : app
      )
    );
  };

  const handleThemeAccentChange = (accent: ThemeSettings['accent']) => {
    setTheme(currentTheme => ({ ...currentTheme, accent }));
  };

  const handleToggleDesktopLogo = () => {
    setTheme(currentTheme => ({...currentTheme, showDesktopLogo: !currentTheme.showDesktopLogo }));
  };
  
  const [updateStatus, setUpdateStatus] = useState('');
  const handleCheckForUpdates = () => {
    setUpdateStatus('Checking for updates...');
    setTimeout(() => {
        setUpdateStatus('System is up to date. (Version 1.0.0-beta)');
    }, 2000);
  }

  const TabButton: React.FC<{tabId: Tab, children: React.ReactNode}> = ({ tabId, children }) => (
    <button
      onClick={() => setActiveTab(tabId)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === tabId
          ? 'text-white border-b-2 border-[var(--accent-500)]'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col h-full text-sm">
      <header className="flex-shrink-0 flex items-center justify-between p-4 border-b border-[var(--accent-500)]/20">
        <h1 className="text-xl font-bold text-gray-100">NetMax Hub</h1>
        <div className="flex items-center space-x-4">
          <TabButton tabId="apps">Apps</TabButton>
          <TabButton tabId="personalization">Personalization</TabButton>
          <TabButton tabId="system">System</TabButton>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        {activeTab === 'apps' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {apps.map(app => (
              <div key={app.id} className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 text-[var(--accent-400)]">{app.icon}</div>
                    <div>
                        <h3 className="font-semibold text-white">{app.name}</h3>
                        <p className={`text-xs ${app.isInstalled ? 'text-green-400' : 'text-gray-400'}`}>
                            {app.isInstalled ? 'Installed' : 'Available'}
                        </p>
                    </div>
                </div>
                {app.id !== 'hub' && (
                    <button
                      onClick={() => handleToggleInstall(app.id)}
                      className={`px-3 py-1 text-xs rounded ${
                        app.isInstalled 
                        ? 'bg-red-800/80 hover:bg-red-700/80' 
                        : 'bg-[var(--accent-600)] hover:bg-[var(--accent-500)]'
                      }`}
                    >
                      {app.isInstalled ? 'Uninstall' : 'Install'}
                    </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'personalization' && (
            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold text-white mb-2">Accent Color</h3>
                    <div className="flex space-x-3">
                        {(['red', 'orange', 'blue', 'teal'] as const).map(color => (
                            <button key={color} onClick={() => handleThemeAccentChange(color)}
                                className={`w-8 h-8 rounded-full bg-${color}-500 transition-transform hover:scale-110 ${theme.accent === color ? 'ring-2 ring-offset-2 ring-offset-gray-800 ring-white' : ''}`}
                                aria-label={`Set theme to ${color}`}
                            ></button>
                        ))}
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold text-white mb-2">Desktop</h3>
                    <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                        <label htmlFor="show-logo-toggle">Show Embossed Desktop Logo</label>
                         <button
                            id="show-logo-toggle"
                            role="switch"
                            aria-checked={theme.showDesktopLogo}
                            onClick={handleToggleDesktopLogo}
                            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${theme.showDesktopLogo ? 'bg-[var(--accent-500)]' : 'bg-gray-600'}`}
                         >
                             <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme.showDesktopLogo ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === 'system' && (
           <div className="space-y-4">
               <div>
                   <h3 className="font-semibold text-white mb-2">System Updates</h3>
                   <div className="bg-black/20 p-4 rounded-lg flex items-center justify-between">
                       <span>Check for NetMaxOS updates</span>
                       <button onClick={handleCheckForUpdates} className="px-3 py-1 text-xs rounded bg-[var(--accent-600)] hover:bg-[var(--accent-500)]">
                           Check Now
                       </button>
                   </div>
                   {updateStatus && (
                        <p className="text-gray-300 text-xs mt-2">{updateStatus}</p>
                   )}
               </div>
           </div>
        )}
      </main>
    </div>
  );
};

export default NetMaxHubApp;
