
import React, { useState, useEffect } from 'react';
import { TOP_RANKING, GENRES, TRANSLATIONS } from '../constants';
import MangaCard from './MangaCard';
import { Language } from '../types';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <aside className="w-full lg:w-96 space-y-14 flex-shrink-0">
      <section className="bg-zinc-900/20 rounded-[32px] p-8 border border-zinc-900/50 shadow-2xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-lg font-black tracking-tight uppercase">{t('popular')}</h2>
          <div className="flex bg-zinc-950 rounded-xl p-1.5 border border-zinc-900">
            {(['Day', 'Week', 'Month'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-zinc-600 hover:text-zinc-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          {TOP_RANKING.slice(0, 6).map((manga, idx) => (
            <div key={manga.id} className="flex gap-6 items-center group relative">
              <span className={`text-4xl font-black italic min-w-[32px] text-center leading-none ${idx < 3 ? 'text-indigo-600/50' : 'text-zinc-800'}`}>
                {idx + 1}
              </span>
              <MangaCard manga={manga} variant="sidebar" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-8 px-4">
        <div className="flex items-center gap-3 border-b border-zinc-900 pb-5">
          <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
          <h2 className="text-lg font-black tracking-tight uppercase">{t('genres')}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(genre => (
            <button 
              key={genre}
              className="px-4 py-2.5 bg-zinc-900/50 hover:bg-indigo-600 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-widest"
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden group bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] p-10 text-white cursor-pointer shadow-3xl shadow-indigo-600/20">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
        <div className="relative z-10 space-y-6 text-center">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-inner">
             <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>
          </div>
          <h3 className="font-black uppercase tracking-[0.2em] text-lg leading-none">Thai Community</h3>
          <p className="text-[11px] font-bold text-white/70 leading-relaxed uppercase tracking-widest">
             Join our Thai server for early scan releases and translation discussions!
          </p>
          <button className="w-full py-4 bg-white text-indigo-700 font-black text-[11px] uppercase tracking-widest rounded-2xl shadow-2xl active:scale-95 transition-all">
            Join Discord
          </button>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
