"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setName, setApiProvider } from '../store/userSlice';

export default function Home() {
  const [name, setNameState] = useState('');
  const [apiProvider, setApiProviderState] = useState('llama3');
  const [apiKey, setApiKey] = useState('');
  const [showTutorial, setShowTutorial] = useState(false);
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

      <div className="mt-4 text-center">
        <button onClick={() => setShowTutorial(!showTutorial)} className="bg-gray-700 text-white px-4 py-2 rounded">
          {showTutorial ? "Hide Tutorial" : "Show Tutorial"}
        </button>
      </div>

      {showTutorial && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How to Set Up Llama3 with LM Studio</h2>
          <ol className="list-decimal list-inside text-lg leading-relaxed">
            <li className="mb-2">
              <strong>Download LM Studio:</strong> Go to the <a href="https://lmstudio.ai/" target="_blank" className="text-blue-400 underline">LM Studio website</a> and download the latest version of the software. LM Studio allows you to run AI models on your local computer for free.
            </li>
            <li className="mb-2">
              <strong>Install LM Studio:</strong> Follow the installation instructions provided on the website to set up LM Studio on your computer.
            </li>
            <li className="mb-2">
              <strong>Launch LM Studio:</strong> Open LM Studio and navigate to the server setup section.
            </li>
            <li className="mb-2">
              <strong>Set Up Llama3:</strong> Select Llama3 as the model you want to use. Make sure to configure the port to 1234. This allows you to run the AI model locally on your computer without any cost.
            </li>
            <li className="mb-2">
              <strong>Start the Server:</strong> Click the &apos;Start Server&apos; button to launch the Llama3 server. You should see a confirmation message indicating that the server is running.
            </li>
            <li className="mb-2">
              <strong>Connect Your Application:</strong> In the application setup, select &apos;Llama3 locally with LM Studio&apos; and ensure the port is set to 1234.
            </li>
          </ol>
          <h2 className="text-2xl font-bold mb-4 mt-8">Using ChatGPT API</h2>
          <ol className="list-decimal list-inside text-lg leading-relaxed">
            <li className="mb-2">
              <strong>Sign Up for OpenAI:</strong> Go to the <a href="https://beta.openai.com/signup/" target="_blank" className="text-blue-400 underline">OpenAI website</a> and sign up for a free API key.
            </li>
            <li className="mb-2">
              <strong>Get Your API Key:</strong> Once you have signed up, you will receive an API key that you can use to access the ChatGPT API.
            </li>
            <li className="mb-2">
              <strong>Enter API Key:</strong> In the form above, select &apos;ChatGPT (API)&apos; and enter your API key. This allows you to use the ChatGPT model without needing a powerful computer, as all computations are done on OpenAI's servers.
            </li>
          </ol>
          <p className="mt-4">
            Both options are free to use. Running Llama3 locally with LM Studio is ideal if you have a powerful computer and prefer to keep everything on your machine. Using the ChatGPT API is great if you want to save resources and let OpenAI handle the computations.
          </p>
        </div>
      )}

      <p className="mt-4 text-center">
        Download <a href="https://lmstudio.ai/" target="_blank" className="text-blue-400 underline">LM Studio</a>
      </p>
    </div>
  );
}
