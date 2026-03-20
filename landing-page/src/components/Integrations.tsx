import React from 'react';

const integrations = [
  { name: 'Age-specific advice', desc: 'Choose your child’s age and PI adapts its responses — newborns, toddlers, primary school children, and teenagers.', icon: '🎯' },
  { name: 'Privacy-first', desc: 'Your conversations are private. PI does not store chats, so your parenting questions remain completely confidential.', icon: '🔒' },
  { name: 'Sri Lanka–savvy', desc: 'Advice that fits Sri Lankan culture, routines, schools, and real home life.', icon: '🇱🇰' },
  { name: 'Sinhala | English', desc: 'Switch between Sinhala or English anytime — use the language you’re most comfortable with.', icon: '🗣️' },
  { name: '24/7 support', desc: 'Parenting questions can come anytime. PI is available 24 hours a day.', icon: '⏰' },
  { name: 'Calm tone', desc: 'Supportive, friendly, non-judgmental guidance — without overwhelming articles.', icon: '🌿' },
  { name: 'Practical steps', desc: 'Clear, step-by-step suggestions you can try right away.', icon: '✅' },
  { name: 'Fast answers', desc: 'Get helpful responses within seconds, even when you’re busy or up late.', icon: '⚡' },
  { name: 'Built for parents', desc: 'Designed for Sri Lankan parents across every stage — from newborn sleep to teen screen time.', icon: '👪' },
];

export function Integrations() {
  return (
    <div className="mx-auto max-w-7xl bg-white px-4 py-20 sm:px-6 md:py-24">
      <div className="mb-14 flex flex-col items-center text-center sm:mb-16">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-500 sm:h-16 sm:w-16 sm:text-3xl">
          🤝
        </div>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Key features that help immediately
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-14 xl:grid-cols-3 xl:gap-x-12">
        {integrations.map((item, i) => (
          <div key={i} className="flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-xl">
                {item.icon}
              </div>
              <h3 className="font-display text-lg font-bold sm:text-xl">{item.name}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
