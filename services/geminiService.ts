
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This will be handled by the execution environment.
  // We add a console error for local development debugging.
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const posterQuoteSchema = {
    type: Type.OBJECT,
    properties: {
        hindi: {
            type: Type.STRING,
            description: "The quote in Hindi (Devanagari script).",
        },
        english: {
            type: Type.STRING,
            description: "The same quote translated into English.",
        },
    },
    required: ["hindi", "english"],
};

export async function generateAmbedkarQuoteForPoster(): Promise<{ hindi: string, english: string, isFallback?: boolean }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate a short, powerful, and inspiring quote by Dr. B.R. Ambedkar about education or equality. The quote should be suitable for a shareable poster. Provide the quote in both Hindi (Devanagari script) and English.",
      config: {
        responseMimeType: "application/json",
        responseSchema: posterQuoteSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }
    const parsed = JSON.parse(jsonText);
    
    if (parsed && typeof parsed.hindi === 'string' && typeof parsed.english === 'string') {
        return { ...parsed, isFallback: false };
    } else {
        throw new Error("API response did not match the expected format.");
    }

  } catch (error) {
    console.error("Error generating quote from Gemini:", error);
    // Provide a fallback quote in case of an API error
    return {
      hindi: "शिक्षा वह शेरनी का दूध है, जो इसे पिएगा वह दहाड़ेगा।",
      english: "Education is the milk of a lioness; whoever drinks it will roar.",
      isFallback: true
    };
  }
}
