
import React from 'react';

interface DesktopProps {
    onOpen: (appId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpen }) => {
    return (
        <div 
            className="absolute inset-0"
            onDoubleClick={() => { /* Potentially add desktop icons here */ }}
        >
            {/* Desktop background is handled by App.tsx */}
        </div>
    );
};

export default Desktop;
