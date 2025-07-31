import React from 'react';
import type { AppDefinition } from '../types';

interface IconProps {
    app: AppDefinition;
    onOpen: (appId: string) => void;
}

const Icon: React.FC<IconProps> = ({ app, onOpen }) => {
    return (
        <div className="relative group flex flex-col items-center">
            <button
                onClick={() => onOpen(app.id)}
                className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Open ${app.name}`}
            >
                {app.icon}
            </button>
            <span className="absolute -top-8 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                {app.name}
            </span>
        </div>
    );
};

export default Icon;