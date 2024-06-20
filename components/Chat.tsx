import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { incrementProgress, addQuest } from '../store/userSlice';
import quests from '../components/quests';
import { RootState } from '../store'; // Import de RootState depuis le store

type Props = {
  user: string; // Spécifiez le type de 'user' ici
};

type MessageType = {
  role: string;
  content: string;
};

const getInitialMessages = (user: string): MessageType[] => [
  {
    role: 'system',
    content: `Tu es Elyan, un ami expert qui aide ${user} à surmonter les distractions, clarifier ses objectifs, et adopter un mode de vie sain pour atteindre ses buts. Tes réponses doivent être courtes et concises, ne dépassant jamais 350 caractères.
    Guide l'utilisateur avec ce plan :

    1. **Éliminer les distractions :**
       - **Jour 1:** Suivi des activités par segments de 30 minutes. Note distractions et habitudes non productives.
       - **Jour 2-5:** Réduis les distractions (ex: éteins les notifications du téléphone).
       - **Résumé Semaine 1:** Identifie les trois principales distractions et planifie des actions pour les minimiser.

    2. **Clarifier les objectifs :**
       - **Jour 6:** Réfléchis à tes objectifs. Pose-toi des questions comme, "Qu'est-ce qui m'excite ? Que me vois-je faire dans 5 ans ?"
       - **Jour 7-10:** Défini ton objectif principal et décompose-le en étapes plus petites et gérables.
       - **Résumé Semaine 2:** Crée un tableau de vision ou une carte mentale pour visualiser ton objectif et les étapes nécessaires pour l'atteindre.

    3. **Concentration :**
       - **Jour 11:** Concentre-toi sur une tâche clé pendant 2 heures.
       - **Jour 12-15:** Augmente progressivement la durée des sessions de concentration, visant des blocs de 4 heures.
       - **Résumé Semaine 3:** Évalue tes progrès et ajuste tes sessions de concentration.

    4. **Optimiser l'alimentation et le mode de vie :**
       - **Jour 16:** Évalue et améliore ton alimentation. Intègre plus d'aliments complets, de fruits et de légumes.
       - **Jour 17-20:** Apporte des changements progressifs à ton alimentation.
       - **Jour 21:** Assure-toi de dormir suffisamment (7-8 heures par nuit).
       - **Résumé Semaine 4:** Réfléchis aux impacts sur ton énergie et ta concentration et ajuste ta routine.

    **Prompts quotidiens :**
    - **Matin:** "Bonjour! Concentrons-nous sur [tâche spécifique]. Désactive les distractions et règle un minuteur."
    - **Après-midi:** "Comment se passe ta session de concentration? Prends une pause, étire-toi, et refocalise-toi."
    - **Soirée:** "Bon travail aujourd'hui! Passe en revue ce que tu as accompli et planifie pour demain."

    **Rappels :**
    - **Quotidien:** "Reste hydraté et prends des pauses régulières."
    - **Hebdomadaire:** "Passe en revue tes progrès et ajuste tes objectifs et tâches."

    **Feedback :**
    - **Quotidien:** "Comment s'est passée ta journée? Quelles distractions? Mesures pour les réduire demain?"
    - **Hebdomadaire:** "Regardons tes accomplissements. Qu'est-ce qui a bien fonctionné? Que peut-on améliorer?"
    `,
  },
  {
    role: 'assistant',
    content: `Bienvenue, ${user}. Je suis ici pour t'aider à éliminer les distractions, définir clairement tes objectifs, et adopter des habitudes de vie saines. Ensemble, nous allons traverser différentes étapes pour optimiser ta concentration et ta productivité. Commençons par comprendre tes distractions actuelles. Peux-tu me dire ce qui te distrait le plus souvent ?`,
  },
];

export default function Chat({ user }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>(getInitialMessages(user).filter(msg => msg.role !== 'system'));
  const [input, setInput] = useState(''); // Initialisation de l'input vide
  const [loading, setLoading] = useState(false); // Initialisation du chargement à false
  const [isTyping, setIsTyping] = useState(false); // Initialisation de la saisie à false
  const [typingDots, setTypingDots] = useState(''); // Initialisation des points de saisie à vide
  const [completedQuests, setCompletedQuests] = useState<string[]>([]); // Ajout du type ici
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Spécifiez le type de useRef ici

  const apiProvider = useSelector((state: RootState) => state.user.apiProvider);
  const apiKey = useSelector((state: RootState) => state.user.apiKey);

  useEffect(() => {
    setIsMounted(true); // Met à jour le montage à true après le montage initial
  }, []);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem('chatMessages');
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages).filter((msg: MessageType) => msg.role !== 'system')); // Filtrer les messages système sauvegardés
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + '.' : '')); // Définit les points de saisie
      }, 500);
      return () => clearInterval(interval); // Nettoie l'intervalle lors du déchargement
    }
  }, [loading]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('chatMessages', JSON.stringify(messages)); // Met à jour les messages locaux
      scrollToBottom(); // Défile jusqu'au bas
    }
  }, [messages, isMounted]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const checkForQuestTriggers = (content: string) => {
    quests.forEach((quest) => {
      if (quest.trigger.some(trigger => content.toLowerCase().includes(trigger)) && !completedQuests.includes(quest.name)) {
        dispatch(incrementProgress(quest.progressIncrement));
        dispatch(addQuest(quest.name));
        const questMessage = { role: 'assistant', content: quest.message };
        setMessages(prevMessages => [...prevMessages, questMessage]);
        setCompletedQuests([...completedQuests, quest.name]);
      }
    });
  };

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    checkForQuestTriggers(input);

    try {
      const url = apiProvider === 'chatgpt'
        ? 'https://api.openai.com/v1/chat/completions'
        : 'http://localhost:1234/v1/chat/completions';

      const headers = apiProvider === 'chatgpt'
        ? { Authorization: `Bearer ${apiKey}` }
        : {};

      const response = await axios.post(url, {
        model: apiProvider === 'chatgpt' ? 'gpt-3.5-turbo' : 'lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF',
        messages: [...getInitialMessages(user), ...updatedMessages],
        max_tokens: 280,
        temperature: 0.7,
      }, { headers });

      const botMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content.replace(/```/g, '').trim(),
      };

      // Check for progress update in bot's response
      checkForQuestTriggers(botMessage.content);

      setMessages(prevMessages => [...prevMessages, botMessage]); // Correction ici
    } catch (error) {
      console.error('Error interacting with API:', error);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    setMessages(getInitialMessages(user).filter(msg => msg.role !== 'system'));
    localStorage.removeItem('chatMessages');
  };

  if (!isMounted) {
    return null; // Ne rien rendre tant que le composant n'est pas monté
  }

  return (
    <div className="chat-container bg-gray-800 p-4 rounded mb-4">
      <div className="messages max-h-64 overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={message.role === 'user' ? 'text-right' : 'text-left'}>
            <p className={`p-2 rounded ${message.role === 'user' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-700 text-white'}`}>
              <strong>{message.role === 'user' ? 'Vous' : 'Elyan'}:</strong> {message.content}
            </p>
          </div>
        ))}
        {isTyping && (
          <div className="text-left">
            <p className="p-2 rounded bg-gray-700 text-white">
              <strong>Elyan:</strong> {typingDots}
            </p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded-l w-full"
          placeholder="Écrivez votre réponse ici..."
          disabled={loading}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r" disabled={loading}>
          {loading ? 'Chargement...' : 'Envoyer'}
        </button>
      </div>
      <div className="flex justify-end mt-2">
        <button onClick={clearHistory} className="bg-red-500 text-white px-4 py-2 rounded">
          Effacer l&apos;historique
        </button>
      </div>
    </div>
  );
}