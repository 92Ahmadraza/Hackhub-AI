
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectIdea } from "./types";

// Always use new GoogleGenAI({ apiKey: process.env.API_KEY }) directly to initialize the client.
export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function generateProjectIdeas(interests: string): Promise<ProjectIdea[]> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate 3 unique hackathon project ideas based on these interests: ${interests}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] },
            techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["title", "description", "difficulty", "techStack"],
        },
      },
    },
  });

  try {
    // Access response.text directly (not a method).
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse project ideas", e);
    return [];
  }
}

// Manual implementation of base64 decoding as required.
export function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Manual implementation of base64 encoding as required.
export function encodeBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Raw PCM audio decoding logic for the Live API.
export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}
