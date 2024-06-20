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
    {showTutorial ? "Cacher le tutoriel" : "Afficher le tutoriel"}
  </button>
</div>

{showTutorial && (
  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Comment configurer Llama3 avec LM Studio</h2>
    <ol className="list-decimal list-inside text-lg leading-relaxed">
      <li className="mb-2">
        <strong>Téléchargez LM Studio :</strong> Allez sur le <a href="https://lmstudio.ai/" target="_blank" className="text-blue-400 underline">site web de LM Studio</a> et téléchargez la dernière version du logiciel. LM Studio vous permet d'exécuter des modèles d'IA sur votre ordinateur local gratuitement.
      </li>
      <li className="mb-2">
        <strong>Installez LM Studio :</strong> Suivez les instructions d'installation fournies sur le site web pour configurer LM Studio sur votre ordinateur.
      </li>
      <li className="mb-2">
        <strong>Lancez LM Studio :</strong> Ouvrez LM Studio et accédez à la section de configuration du serveur.
      </li>
      <li className="mb-2">
        <strong>Configurez Llama3 :</strong> Sélectionnez Llama3 comme modèle que vous souhaitez utiliser. Assurez-vous de configurer le port sur 1234. Cela vous permet d'exécuter le modèle d'IA localement sur votre ordinateur sans aucun coût.
      </li>
      <li className="mb-2">
        <strong>Démarrez le serveur :</strong> Cliquez sur le bouton &apos;Démarrer le serveur&apos; pour lancer le serveur Llama3. Vous devriez voir un message de confirmation indiquant que le serveur est en cours d'exécution.
      </li>
      <li className="mb-2">
        <strong>Connectez votre application :</strong> Dans la configuration de l'application, sélectionnez &apos;Llama3 localement avec LM Studio&apos; et assurez-vous que le port est réglé sur 1234.
      </li>
    </ol>
    <h2 className="text-2xl font-bold mb-4 mt-8">Utilisation de l'API ChatGPT</h2>
    <ol className="list-decimal list-inside text-lg leading-relaxed">
      <li className="mb-2">
        <strong>Inscrivez-vous à OpenAI :</strong> Allez sur le <a href="https://beta.openai.com/signup/" target="_blank" className="text-blue-400 underline">site web d'OpenAI</a> et inscrivez-vous pour obtenir une clé API gratuite.
      </li>
      <li className="mb-2">
        <strong>Obtenez votre clé API :</strong> Une fois inscrit, vous recevrez une clé API que vous pouvez utiliser pour accéder à l'API ChatGPT.
      </li>
      <li className="mb-2">
        <strong>Entrez la clé API :</strong> Dans le formulaire ci-dessus, sélectionnez &apos;ChatGPT (API)&apos; et entrez votre clé API. Cela vous permet d'utiliser le modèle ChatGPT sans avoir besoin d'un ordinateur puissant, car tous les calculs sont effectués sur les serveurs d'OpenAI.
      </li>
    </ol>
    <p className="mt-4">
      Les deux options sont gratuites. Exécuter Llama3 localement avec LM Studio est idéal si vous avez un ordinateur puissant et que vous préférez tout garder sur votre machine. Utiliser l'API ChatGPT est parfait si vous voulez économiser des ressources et laisser OpenAI gérer les calculs.
    </p>
  </div>
)}


      <p className="mt-4 text-center">
        Télécharger <a href="https://lmstudio.ai/" target="_blank" className="text-blue-400 underline">LM Studio</a>
      </p>
    </div>
  );
}
