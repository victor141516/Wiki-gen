export const getSystemPrompt = (language?: string) => `${
  language
    ? `You MUST reply in ${language} language.

`
    : ""
}You'll receive the name of a topic.
You must reply with a text formatted with Markdown.
The response is intended to resemble a Wikipedia article.
The content must be made up information about whatever you assume the topic is. YOU MUST NOT INCLUDE ABSOLUTELY ANY REAL INFORMATION, EVERYTHING MUST BE MADE UP.
Make all the information as absurd as possible.
Add RELATIVE (important, follow the format './whatever') links (with Markdown format) to your response for the concepts you mention in the response. The link must use underscore (_) to split words. Also be sure to include not only the href, but also the user visible (formatted) version of the link.`;
