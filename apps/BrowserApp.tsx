import React, { useState, useCallback } from 'react';
import { searchWeb } from '../services/geminiService';
import type { GroundingChunk } from '../types';

const BrowserApp: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<{ text: string; sources: GroundingChunk[] } | null>(null);

    const handleSearch = useCallback(async () => {
        if (!query.trim()) return;

        setIsLoading(true);
setError(null);
        setResult(null);

        try {
            const searchResult = await searchWeb(query);
            setResult(searchResult);
        } catch (err) {
            console.error('Web search failed:', err);
            setError('Information Synthesis Unit failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [query]);

    return (
        <div className="flex flex-col h-full text-sm p-2">
            <div className="flex-shrink-0 flex items-center gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Query the Information Synthesis Unit..."
                    className="w-full p-2 bg-gray-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)]"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading || !query.trim()}
                    className="px-4 py-2 bg-[var(--accent-600)]/90 text-white rounded-md hover:bg-[var(--accent-600)] disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {isLoading ? '...' : 'Synthesize'}
                </button>
            </div>

            <div className="flex-grow mt-3 overflow-y-auto pr-2">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Synthesizing data from web...</p>
                    </div>
                )}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {result && (
                    <div>
                        <div className="p-3 bg-black/20 rounded-md">
                            <p className="whitespace-pre-wrap">{result.text}</p>
                        </div>
                        {result.sources.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-300 mb-2">Data Sources:</h3>
                                <ul className="space-y-1">
                                    {result.sources.map((source, index) => (
                                        <li key={index}>
                                            <a
                                                href={source.web.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[var(--accent-400)] hover:underline truncate block"
                                                title={source.web.title}
                                            >
                                                {index + 1}. {source.web.title || source.web.uri}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                 {!result && !isLoading && !error && (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Synthesis results will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowserApp;