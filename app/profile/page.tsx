"use client";

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../store'; // Assurez-vous d'importer correctement RootState depuis votre store

export default function Profile() {
  const userName = useSelector((state: RootState) => state.user.name);
  const progress = useSelector((state: RootState) => state.user.progress);
  const quests = useSelector((state: RootState) => state.user.quests);
  const [name, setName] = useState<string>('');

  useEffect(() => {
    setName(userName);
  }, [userName]);

  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4">Profile of {name}</h1>
      <p className="mb-4">Accumulated points in your quest: {progress}</p>
      <p className="mb-4">Discovered quests:</p>
      <ul className="list-disc list-inside">
        {quests.length > 0 ? (
          quests.map((quest: string, index: number) => (
            <li key={index} className="mb-2">
              {quest}
            </li>
          ))
        ) : (
          <p>No quests yet.</p>
        )}
      </ul>
    </div>
  );
}
