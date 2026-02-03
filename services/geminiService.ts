
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProjectExplanation = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are an expert Data Scientist specializing in Carbon Markets and Fraud Detection. 
        Your goal is to explain methodology, data patterns, and ethical considerations. 
        Always clarify that statistical anomalies are 'high risk' and not 'confirmed fraud' without further on-site investigation.
        Keep explanations simple enough for a CS student's project but professional.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the analysis engine. Please try again later.";
  }
};
