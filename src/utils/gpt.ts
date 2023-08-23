import OpenAI from 'openai';
export const getCompletionResponse = async (prompt: string): Promise<string> => {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const result = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 512,
  });

  return result.choices[0].text;
};

export const getChatResponse = async (prompt: string): Promise<string> => {
  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  const result = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_tokens: 512,
  });

  return result.choices[0].message.content ?? 'Error';
};
