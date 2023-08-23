'use client';

import { useState } from 'react';
import { Message } from '@/interfaces/Message';
import { BubbleMessage } from '@/components/BubbleMessage';
import * as Icons from '@/components/Icons';
import { bocas, ojos } from '@/constants/bot';
import { getCompletionResponse, getChatResponse } from '@/utils/gpt';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessages((responses) => [{ id: Date.now(), text: prompt, isBot: false }, ...responses]);
    setPrompt('');
    try {
      const result = await getChatResponse(prompt);
      setMessages((responses) => [
        {
          id: Date.now(),
          text: result,
          isBot: true,
          bot: {
            mouth: bocas[Math.floor(Math.random() * bocas.length)],
            eyes: ojos[Math.floor(Math.random() * ojos.length)],
          },
        },
        ...responses,
      ]);
    } catch (error) {
      setMessages((responses) => [
        {
          id: Date.now(),
          text: 'Error',
          isBot: true,
          bot: {
            eyes: 'squint',
            mouth: 'serious',
          },
        },
        ...responses,
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen py-10">
      <h1 className="mb-8 text-3xl">
        <span className="font-thin">Next</span>GPT
      </h1>
      {/* Mensajes */}
      <div className="flex flex-col-reverse flex-1 w-full max-w-screen-sm mb-6 overflow-auto">
        {messages.map((message) => {
          return <BubbleMessage key={message.id} message={message} />;
        })}
      </div>
      {/* Input */}
      <div className="w-full max-w-screen-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={prompt}
            placeholder="Envía un mensaje"
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 input input-bordered"
          />
          <button
            className="w-12 h-12 btn disabled:text-opacity-50"
            disabled={loading || prompt.length === 0}
            type="submit"
            aria-label="Enviar mensaje"
          >
            <Icons.Send />
          </button>
        </form>
      </div>
    </div>
  );
}
