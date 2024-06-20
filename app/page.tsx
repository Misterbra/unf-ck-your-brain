"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setName, setApiProvider } from '../store/userSlice';

export default function Home() {
  const [name, setNameState] = useState('');
  const [apiProvider, setApiProviderState] = useState('llama3');
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setName(name));
    dispatch(setApiProvider({ provider: apiProvider, key: apiKey }));
    router.push('/quest');
  };

  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">Welcome to Unf*ck Your Brain</h1>
      
      <div className="mb-8 text-center relative">
        <iframe 
          width="100%" 
          height="315" 
          src="https://www.youtube.com/embed/bQtKSGlviWI?si=hiIbUbt8nKVbU2Z8" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>

      <div className="mb-8 text-lg leading-relaxed text-center italic">
        <p className="mb-4">
          Unf*ck Your Brain is a project inspired by the YouTube video from the Modern Ideas channel. It combines personal development techniques and productivity strategies. 
          Our goal is to help you regain your focus, clearly define your goals, and adopt healthy habits to achieve your ambitions with passion and determination.
        </p>
        <p className="mb-4">
          Through structured steps and practical advice, you will be guided to explore your values, passions, and deep motivations. 
          Together, we will discover how you can contribute to a cause greater than yourself and find profound meaning in your existence.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg">Enter your name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setNameState(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-lg">Choose your API provider:</label>
          <select
            value={apiProvider}
            onChange={(e) => setApiProviderState(e.target.value)}
            className="bg-gray-700 text-white p-2 rounded w-full"
          >
            <option value="llama3">Llama3 locally with LM Studio | Port: 1234</option>
            <option value="chatgpt">ChatGPT (API)</option>
          </select>
        </div>
        {apiProvider === 'chatgpt' && (
          <div>
            <label htmlFor="apiKey" className="block text-lg">Enter your ChatGPT API key:</label>
            <input
              type="text"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-gray-700 text-white p-2 rounded w-full"
              required
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Start the Adventure
        </button>
      </form>
      <p className="mt-4 text-center">
        Download <a href="https://lmstudio.ai/" target="_blank" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>LM Studio</a>
      </p>
    </div>
  );
}
