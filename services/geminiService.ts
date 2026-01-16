
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize the client with named parameters and direct access to process.env.API_KEY.
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Suggests manga based on user preferences.
 */
export const getMangaRecommendations = async (userHistory: string[]) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on the following manga titles I read: ${userHistory.join(", ")}, recommend 5 similar manga. Provide reasons for each.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
            },
            reason: {
              type: Type.STRING,
            },
            matchPercentage: {
              type: Type.NUMBER,
            }
          },
          required: ["title", "reason", "matchPercentage"]
        }
      }
    }
  });

  // Extract text using the .text property as per guidelines (not a method).
  const resultText = response.text;
  if (!resultText) return [];

  try {
    return JSON.parse(resultText.trim());
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return [];
  }
};
