import type React from 'react';

export interface AppDefinition {
  id: string;
  name:string;
  icon: React.ReactNode;
  component: React.ComponentType<any>; // Allow components to accept props
  defaultSize: {
    width: number;
    height: number;
  }
  isInstalled: boolean;
}

export interface WindowInstance {
  id: number;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

// File System Types
export interface FileNode {
    type: 'file';
    content: string;
}

export interface FolderNode {
    type: 'folder';
    children: { [key: string]: FileSystemNode };
}

export type FileSystemNode = FileNode | FolderNode;

export type ThemeSettings = {
  accent: 'red' | 'orange' | 'blue' | 'teal';
  showDesktopLogo: boolean;
};

export type SystemActions = {
  setApps: React.Dispatch<React.SetStateAction<AppDefinition[]>>;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
  openWindow: (appId: string, customTitle?: string) => void;
};
