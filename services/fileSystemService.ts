import type { FileSystemNode, FolderNode } from '../types';

const root: FolderNode = {
    type: 'folder',
    children: {
        'Documents': {
            type: 'folder',
            children: {
                'Project_NetMax.txt': {
                    type: 'file',
                    content: 'Project Plan:\n1. Implement AI Assistant "Max"\n2. Develop Taskbar\n3. Create File Browser',
                },
                'meeting_notes.txt': {
                    type: 'file',
                    content: 'Meeting with Central Governance AI successful. All subordinate units are operational.',
                },
            }
        },
        'System': {
            type: 'folder',
            children: {
                'config.json': {
                    type: 'file',
                    content: '{ "theme": "dark-red", "ai_personality": "proactive" }',
                },
            }
        },
        'Welcome.txt': {
            type: 'file',
            content: 'Welcome to NetMaxOS. My name is Max, your personal AI assistant. Click my avatar in the corner to talk to me.',
        }
    }
};

export const getDirectoryContents = (path: string): { [key: string]: FileSystemNode } => {
    const node = getNodeFromPath(path);
    if (node && node.type === 'folder') {
        return node.children;
    }
    return {};
};

export const getNodeFromPath = (path: string): FileSystemNode | null => {
    if (path === '/') {
        return root;
    }

    const parts = path.split('/').filter(p => p);
    let currentNode: FileSystemNode = root;

    for (const part of parts) {
        if (currentNode.type === 'folder' && currentNode.children[part]) {
            currentNode = currentNode.children[part];
        } else {
            return null;
        }
    }

    return currentNode;
};
