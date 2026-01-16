import { getSystemPrompt } from "./system-prompt";

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export async function callGeminiAPI(
  apiKey: string,
  prompt: string,
  language?: string
): Promise<string> {
  const requestBody = {
    contents: [
      {
        parts: [
          { text: getSystemPrompt(language) },
          { text: `Topic: ${prompt}` },
        ],
      },
    ],
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 50_000,
    },
  };

  try {
    const response = await fetch(`${url}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Error ${response.status}: ${
          errorData.error?.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();

    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content?.parts?.[0]?.text
    ) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No content received in response");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}
