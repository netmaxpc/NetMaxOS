import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';

const ArtStudioApp: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);
        setImageUrl(null);

        try {
            const url = await generateImage(prompt);
            setImageUrl(url);
        } catch (err) {
            console.error('Image generation failed:', err);
            setError('Aesthetic Production Unit failed. Please revise prompt.');
        } finally {
            setIsLoading(false);
        }
    }, [prompt]);

    return (
        <div className="flex flex-col h-full p-2">
            <div className="flex-shrink-0">
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image for the Aesthetic Production Unit..."
                    className="w-full h-20 p-2 bg-gray-900/50 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-500)] text-sm"
                    rows={3}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full mt-2 px-4 py-2 bg-[var(--accent-600)]/80 text-white rounded-md hover:bg-[var(--accent-600)] disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Generating...' : 'Commission Artwork'}
                </button>
            </div>

            <div className="flex-grow mt-2 flex items-center justify-center bg-black/20 rounded-md overflow-hidden">
                {isLoading && (
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin h-8 w-8 text-[var(--accent-400)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-sm text-gray-400">Unit is processing...</p>
                    </div>
                )}
                {error && <p className="text-red-400 text-center">{error}</p>}
                {imageUrl && !isLoading && (
                    <img src={imageUrl} alt="Generated art" className="w-full h-full object-contain" />
                )}
                {!imageUrl && !isLoading && !error && (
                    <p className="text-gray-500 text-sm">Artwork will render here</p>
                )}
            </div>
        </div>
    );
};

export default ArtStudioApp;