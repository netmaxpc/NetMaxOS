import React, { useState, useEffect } from 'react';
import { getDirectoryContents, getNodeFromPath } from '../services/fileSystemService';
import type { FileSystemNode } from '../types';

// Icons
const FolderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
    </svg>
);
const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);


const FileBrowserApp: React.FC = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const [contents, setContents] = useState<{ [key: string]: FileSystemNode }>({});
    
    useEffect(() => {
        setContents(getDirectoryContents(currentPath));
    }, [currentPath]);

    const handleItemClick = (name: string, node: FileSystemNode) => {
        if (node.type === 'folder') {
            const newPath = currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;
            setCurrentPath(newPath);
        }
        if (node.type === 'file') {
             alert(`File Content:\n\n${node.content}`);
        }
    };
    
    const goBack = () => {
        if (currentPath === '/') return;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf('/')) || '/';
        setCurrentPath(newPath);
    };

    return (
        <div className="flex flex-col h-full text-sm p-2">
            <div className="flex-shrink-0 flex items-center gap-2 p-2 border-b border-[var(--accent-500)]/20 mb-2">
                <button 
                    onClick={goBack}
                    disabled={currentPath === '/'}
                    className="px-2 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    &larr; Back
                </button>
                <input 
                    type="text"
                    readOnly
                    value={currentPath}
                    className="w-full bg-black/30 px-2 py-1 rounded"
                />
            </div>
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-4 p-2">
                    {Object.entries(contents).map(([name, node]) => (
                        <button
                            key={name}
                            onClick={() => handleItemClick(name, node)}
                            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-white/10 text-center"
                        >
                            {node.type === 'folder' ? <FolderIcon /> : <FileIcon />}
                            <span className="mt-1 text-xs text-gray-200 break-all w-full">{name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FileBrowserApp;