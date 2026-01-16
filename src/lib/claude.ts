import { getSystemPrompt } from "./system-prompt";

const url = "https://api.anthropic.com/v1/messages";
const getConfig = (language?: string) =>
  ({
    model: "claude-sonnet-4-5",
    max_tokens: 50_000,
    system: getSystemPrompt(language),
  } as const);

export async function callClaudeAPI(
  apiKey: string,
  prompt: string,
  language?: string
): Promise<string> {
  const messages: Array<{ role: string; content: string }> = [
    { role: "user", content: `Topic: ${prompt}` },
  ];

  const config = getConfig(language);
  const requestBody: any = {
    model: config.model,
    max_tokens: config.max_tokens,
    messages: messages,
    system: config.system,
  };

  const headers = {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-dangerous-direct-browser-access": "true",
    "anthropic-version": "2023-06-01",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
      mode: "cors",
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

    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      throw new Error("No content received in response");
    }
  } catch (error) {
    console.error("Error calling Claude API:", error);
    throw error;
  }
}
