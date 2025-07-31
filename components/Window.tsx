import React, { useState, useRef, useEffect, useCallback } from 'react';

interface WindowProps {
    id: number;
    children: React.ReactNode;
    title: string;
    initialPosition: { x: number; y: number };
    initialSize: { width: number, height: number };
    zIndex: number;
    isActive: boolean;
    onClose: (id: number) => void;
    onFocus: (id: number) => void;
    onMinimize: (id: number) => void;
}

const Window: React.FC<WindowProps> = ({ id, children, title, initialPosition, initialSize, zIndex, isActive, onClose, onFocus, onMinimize }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!windowRef.current || e.target !== e.currentTarget) return;
        onFocus(id);
        const rect = windowRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        setIsDragging(true);
        e.preventDefault();
        e.stopPropagation();
    }, [id, onFocus]);
    
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (isDragging) {
            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;
            setPosition({ x: newX, y: newY });
        }
    }, [isDragging]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        setIsResizing(false);
    }, []);

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp, { once: true });
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);
    
    const activeClasses = 'border-[var(--accent-500)] shadow-[0_0_20px_theme(colors.black)]';
    const inactiveClasses = 'border-white/20';

    return (
        <div
            ref={windowRef}
            className={`absolute flex flex-col bg-black/60 backdrop-blur-2xl rounded-lg shadow-2xl overflow-hidden transition-all duration-100 ease-out ${isActive ? activeClasses : inactiveClasses}`}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                zIndex: zIndex,
                borderWidth: '1px',
            }}
            onMouseDown={() => onFocus(id)}
        >
            <div
                className={`flex items-center justify-between h-8 px-2 cursor-move ${isActive ? 'bg-black/40' : 'bg-black/20'}`}
                onMouseDown={handleMouseDown}
            >
                <span className="text-sm font-medium text-gray-200 truncate pl-1">{title}</span>
                <div className="flex items-center gap-2">
                     <button
                        onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
                        className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors focus:outline-none"
                        aria-label="Minimize"
                    ></button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onClose(id); }}
                        className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-600 transition-colors focus:outline-none"
                        aria-label="Close"
                    ></button>
                </div>
            </div>
            <div className="flex-grow p-1 overflow-auto bg-black/10">
                <div className="h-full w-full bg-black/20 rounded-sm text-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Window;