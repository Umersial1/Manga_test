
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_MANGA, TRANSLATIONS } from '../constants';
import { Language } from '../types';

const HeroSlider: React.FC = () => {
  const [active, setActive] = useState(0);
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const items = MOCK_MANGA.slice(0, 8); // Increased pool for variety

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % items.length);
    }, 10000); // Slower for premium feel

    return () => {
      window.removeEventListener('languageChange', handleLangChange);
      clearInterval(timer);
    };
  }, [items.length]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <section className="relative w-full h-[600px] md:h-[650px] overflow-hidden rounded-[56px] bg-zinc-900 border border-zinc-800 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.7)]">
      {items.map((item, idx) => (
        <div 
          key={item.id}
          className={`absolute inset-0 transition-all duration-[1.5s] ease-in-out ${idx === active ? 'opacity-100 z-10 scale-100 translate-x-0' : 'opacity-0 z-0 scale-105 translate-x-10 pointer-events-none'}`}
        >
          {/* Enhanced depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-zinc-950/10 backdrop-blur-[1px] z-[1]" />
          
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transform transition-transform duration-[20s] linear scale-100"
            style={{ transform: idx === active ? 'scale(1.15)' : 'scale(1)' }}
          />

          <div className="absolute bottom-0 left-0 p-12 md:p-20 w-full md:w-4/5 lg:w-3/5 space-y-10 z-[3]">
            <div className="flex flex-wrap items-center gap-5">
              <span className="px-6 py-2 bg-indigo-600 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl text-white shadow-[0_15px_30px_-5px_rgba(79,70,229,0.5)]">Premium Selection</span>
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-950/60 backdrop-blur-2xl rounded-2xl border border-zinc-800/50 shadow-2xl">
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-white text-[12px] font-black uppercase tracking-widest">{item.rating.toFixed(1)} Rating</span>
              </div>
              <span className="text-zinc-400 text-[12px] font-black uppercase tracking-[0.3em] backdrop-blur-md px-3 py-1 rounded-lg bg-black/20">{item.type} • {item.status}</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white uppercase leading-[0.75] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {item.title}
              </h1>
              <p className="text-zinc-300 text-sm md:text-xl font-bold line-clamp-2 max-w-3xl uppercase tracking-tight leading-relaxed opacity-90 drop-shadow-md">
                {item.description}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <button 
                onClick={() => navigate(`/manga/${item.id}`)}
                className="px-14 py-6 bg-white text-zinc-950 font-black text-[13px] uppercase tracking-[0.4em] rounded-3xl hover:bg-indigo-600 hover:text-white transition-all shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] active:scale-95 group"
              >
                {t('readNow')}
                <svg className="w-5 h-5 inline-block ml-3 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={(e) => toggleBookmark(e, item.id)}
                className={`p-6 backdrop-blur-3xl rounded-3xl transition-all border shadow-3xl ${bookmarked[item.id] ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-zinc-950/60 border-zinc-800 text-white hover:bg-zinc-800'}`}
              >
                <svg className={`w-7 h-7 ${bookmarked[item.id] ? 'fill-current' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-16 right-16 z-30 flex flex-col gap-5">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`transition-all duration-700 rounded-full border shadow-2xl ${idx === active ? 'h-12 w-3 bg-indigo-500 border-indigo-300' : 'h-3 w-3 bg-zinc-800/80 border-zinc-700 hover:bg-zinc-600'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
