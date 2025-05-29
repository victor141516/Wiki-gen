const url = "https://api.anthropic.com/v1/messages";
const config = {
  model: "claude-sonnet-4-20250514",
  max_tokens: 50_000,
  system: `You'll receive the name of a topic.
You must reply with a text formatted with Markdown.
The response is intended to resemble a Wikipedia article.
The content must be made up information about whatever you assume the topic is. YOU MUST NOT INCLUDE ABSOLUTELY ANY REAL INFORMATION, EVERYTHING MUST BE MADE UP.
Make all the information as absurd as possible.
Add RELATIVE (important, follow the format './whatever') links (with Markdown format) to your response for the concepts you mention in the response. The link must use underscore (_) to split words. Also be sure to include not only the href, but also the user visible (formatted) version of the link.`,
} as const;

export async function callClaudeAPI(
  apiKey: string,
  prompt: string
): Promise<string> {
  const messages: Array<{ role: string; content: string }> = [
    { role: "user", content: prompt },
  ];

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
