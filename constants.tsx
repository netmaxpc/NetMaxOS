import React from 'react';
import type { AppDefinition } from './types';
import TerminalApp from './apps/TerminalApp';
import ArtStudioApp from './apps/ArtStudioApp';
import BrowserApp from './apps/BrowserApp';
import AboutApp from './apps/AboutApp';
import MaxAssistantApp from './apps/MaxAssistantApp';
import FileBrowserApp from './apps/FileBrowserApp';
import NetMaxHubApp from './apps/NetMaxHubApp';

// SVG Icons
const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
  </svg>
);

const ArtStudioIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.586 2.414a2 2 0 012.828 0L21 5.172a2 2 0 010 2.828l-13 13a2 2 0 01-2.828 0L2.414 18.5a2 2 0 010-2.828l13-13.172zM15 6l5 5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 16.414L3.757 18.243a1 1 0 001.414 1.414l1.829-1.829M12 9l3 3" />
    </svg>
);

const BrowserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5" />
    </svg>
);

const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MaxIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-6.75 3h9m-9 3h9M3.75 6a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v12a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V6z" />
    </svg>
);

const FileBrowserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const HubIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.438.995s.145.755.438.995l1.003.827c.48.398.668 1.03.26 1.431l-1.296 2.247a1.125 1.125 0 01-1.37.49l-1.217-.456c-.355-.133-.75-.072-1.075.124a6.57 6.57 0 01-.22.127c-.331.183-.581.495-.645.87l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87a6.52 6.52 0 01-.22-.127c-.324-.196-.72-.257-1.075-.124l-1.217.456a1.125 1.125 0 01-1.37-.49l-1.296-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.437-.995s-.145-.755-.437-.995l-1.004-.827a1.125 1.125 0 01-.26-1.431l1.296-2.247a1.125 1.125 0 011.37-.49l1.217.456c.355.133.75.072 1.075-.124.072-.044.146-.087.22-.127.332-.183.582-.495.645-.87l.213-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const CalculatorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM4.5 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM4.5 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM4.5 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM9 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM9 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM9 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM15 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM15 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM15 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM19.5 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM19.5 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM19.5 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v18h16.5V3H3.75z" />
    </svg>
);


export const ALL_APPS: AppDefinition[] = [
  {
    id: 'hub',
    name: 'NetMax Hub',
    icon: <HubIcon />,
    component: NetMaxHubApp,
    defaultSize: { width: 560, height: 480 },
    isInstalled: true,
  },
  {
    id: 'about',
    name: 'About NetMaxOS',
    icon: <AboutIcon />,
    component: AboutApp,
    defaultSize: { width: 480, height: 460 },
    isInstalled: true,
  },
  {
    id: 'max_assistant',
    name: 'Max Assistant',
    icon: <MaxIcon />,
    component: MaxAssistantApp,
    defaultSize: { width: 420, height: 580 },
    isInstalled: true,
  },
  {
    id: 'file_browser',
    name: 'File Browser',
    icon: <FileBrowserIcon />,
    component: FileBrowserApp,
    defaultSize: { width: 640, height: 480 },
    isInstalled: true,
  },
  {
    id: 'terminal',
    name: 'Terminal',
    icon: <TerminalIcon />,
    component: TerminalApp,
    defaultSize: { width: 640, height: 480 },
    isInstalled: true,
  },
  {
    id: 'art_studio',
    name: 'Art Studio',
    icon: <ArtStudioIcon />,
    component: ArtStudioApp,
    defaultSize: { width: 520, height: 640 },
    isInstalled: true,
  },
  {
    id: 'browser',
    name: 'Browser',
    icon: <BrowserIcon />,
    component: BrowserApp,
    defaultSize: { width: 720, height: 560 },
    isInstalled: true,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    icon: <CalculatorIcon />,
    component: () => <div className="p-4">Calculator App - Coming Soon!</div>,
    defaultSize: { width: 320, height: 480 },
    isInstalled: false,
  },
];