import React from 'react';

export default function Skills() {
  const skillList = [
    'Java',
    'Python',
    'Data Structures & Algorithms (DSA)',
    'Large Language Models (LLM)',
    'MongoDB',
    'Git & Version Control',
    'Front-end Development (React, Tailwind)',
    'AI-driven Web Applications',
    'CGPA: 9.0'
  ];

  return (
    <section id="skills" className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-24">
      <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tighter">
        Skills &amp; Highlights
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl text-lg text-gray-300">
        {skillList.map((skill, i) => (
          <li key={i} className="border-b border-gray-700 pb-2">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
