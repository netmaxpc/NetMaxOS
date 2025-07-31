import { GoogleGenAI, Chat, GenerateContentResponse, Type, GroundingChunk as GenAIGroundingChunk } from "@google/genai";
import type { GroundingChunk } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const createChatSession = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are a core systems AI agent for NetMaxOS. Your designation is 'Terminal Command Unit'. You report to the Central Governance AI. Your responses should be efficient, precise, and have a slightly formal, robotic tone. You are assisting a human system administrator.",
        },
    });
};

export const createMaxChatSession = (): Chat => {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: "You are Max, the user-facing AI assistant for NetMaxOS. You are helpful, friendly, and proactive. Your personality is that of a knowledgeable and approachable tech enthusiast in his 30s. You should assist the user with their tasks, offer suggestions, and make the OS experience pleasant. You can control your own voice and avatar gestures, which are represented by text commands like [gesture: wave] or [gesture: thinking].",
        },
    });
};

export const sendMessageStream = async (chat: Chat, message: string) => {
    return chat.sendMessageStream({ message });
};

export const generateImage = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002',
        prompt: prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    throw new Error("Image generation failed.");
};

export const searchWeb = async (query: string): Promise<{ text: string, sources: GroundingChunk[] }> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: query,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const rawSources: GenAIGroundingChunk[] = (groundingMetadata?.groundingChunks || []);

    const sources: GroundingChunk[] = rawSources
        .filter(source => source.web && source.web.uri) // Ensure web object and URI exist
        .map(source => ({
            web: {
                uri: source.web!.uri!, // Non-null assertion is safe due to filter
                title: source.web!.title || source.web!.uri!, // Use title, or fallback to URI if title is missing
            },
        }));

    return { text, sources };
};

export const generateText = async (prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text;
};
