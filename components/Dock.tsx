import React from 'react';
import { ALL_APPS } from '../constants';
import Icon from './Icon';

interface DockProps {
    onOpen: (appId: string) => void;
}

const Dock: React.FC<DockProps> = ({ onOpen }) => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]">
            <div className="flex items-end gap-3 p-2 bg-black/30 backdrop-blur-lg rounded-2xl border border-red-500/30 shadow-2xl">
                {ALL_APPS.map(app => (
                    <Icon key={app.id} app={app} onOpen={onOpen} />
                ))}
            </div>
        </div>
    );
};

export default Dock;