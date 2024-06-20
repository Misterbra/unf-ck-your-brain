"use client";

import Image from "next/image";

export default function History() {
  return (
    <div className="container text-white p-6 bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">The Story of Unf*ck Your Brain</h1>
      
      <div className="mb-8">
        <p className="mb-4 text-lg leading-relaxed">
          Welcome to the world of Unf*ck Your Brain, a project inspired by the YouTube channel Modern Ideas. 
          Here, we blend personal development techniques with productivity strategies to help you find your true purpose 
          and achieve your goals with passion and determination.
        </p>
        <Image 
          src="/images/brain_unfucked.jpg" // Make sure you have this image in the public/images folder
          alt="Unf*ck Your Brain"
          width={800}
          height={400}
          className="w-full rounded-lg"
        />
      </div>

      <h2 className="text-4xl font-bold mb-4">Core Concepts</h2>
      <ul className="list-disc list-inside mb-8 text-lg leading-relaxed">
        <li className="mb-4">
          <strong>Self-Reflection:</strong> 
          Engage in introspective exercises to uncover deep-seated beliefs and motivations. This involves answering thought-provoking questions to gain clarity on personal values and goals.
          <Image 
            src="/images/self_reflection.jpg" // Make sure you have this image in the public/images folder
            alt="Self-Reflection"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Guided Introspection:</strong> 
          Navigate through guided introspections to help you find direction and purpose. This helps in understanding your inner self and aligning your actions with your true desires.
          <Image 
            src="/images/guided_introspection.jpg" // Make sure you have this image in the public/images folder
            alt="Guided Introspection"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Knowledge and Learning:</strong> 
          Access a wealth of knowledge that combines ancient wisdom with modern insights. This helps in building a strong foundation of understanding and making informed decisions.
          <Image 
            src="/images/knowledge_learning.jpg" // Make sure you have this image in the public/images folder
            alt="Knowledge and Learning"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
        <li className="mb-4">
          <strong>Meditation and Visioning:</strong> 
          Practice meditation and visioning exercises to connect with your future self. These practices provide clarity and direction by allowing you to visualize your goals and the steps needed to achieve them.
          <Image 
            src="/images/meditation_visioning.jpg" // Make sure you have this image in the public/images folder
            alt="Meditation and Visioning"
            width={800}
            height={400}
            className="w-full rounded-lg mt-2"
          />
        </li>
      </ul>
    </div>
  );
}
