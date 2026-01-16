
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Manga, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface MangaCardProps {
  manga: Manga;
  variant?: 'grid' | 'small' | 'sidebar' | 'horizontal';
}

const MangaCard: React.FC<MangaCardProps> = ({ manga, variant = 'grid' }) => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const typeLabel = manga.type === 'Manhwa' ? t('manhwa') : manga.type === 'Manga' ? t('manga') : t('manhua');
  const statusLabel = manga.status === 'Ongoing' ? t('ongoing') : t('completed');

  const handleNavigate = () => {
    navigate(`/manga/${manga.id}`);
  };

  if (variant === 'sidebar') {
    return (
      <div 
        onClick={handleNavigate}
        className="group flex gap-3 items-center py-2.5 px-2 hover:bg-zinc-900/80 rounded-xl transition-all cursor-pointer border border-transparent hover:border-zinc-800"
      >
        <div className="relative w-14 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800 shadow-lg">
          <img src={manga.image} alt={manga.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-[13px] font-black text-zinc-200 truncate group-hover:text-indigo-400 transition-colors leading-tight uppercase tracking-tighter">{manga.title}</h4>
          <div className="flex items-center gap-2 mt-1.5">
             <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest px-1.5 py-0.5 bg-zinc-950 rounded border border-zinc-900">{typeLabel}</span>
             <span className="text-[10px] text-yellow-500 font-black">★ {manga.rating.toFixed(1)}</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-600 mt-1 uppercase">{t('chapters')} {manga.chapters[0].number}</p>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={handleNavigate}
        className="group flex gap-5 p-4 bg-zinc-900/30 hover:bg-zinc-900/60 border border-zinc-800/50 rounded-[24px] transition-all cursor-pointer"
      >
        <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-[18px] shadow-2xl">
          <img src={manga.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
        </div>
        <div className="flex flex-col justify-center gap-2 min-w-0">
          <div className="flex gap-2">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">{typeLabel}</span>
            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">• {statusLabel}</span>
          </div>
          <h4 className="font-black text-lg text-zinc-100 truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tighter leading-none">{manga.title}</h4>
          <p className="text-[11px] text-zinc-500 line-clamp-2 uppercase font-medium leading-relaxed">{manga.description}</p>
          <div className="mt-2 flex items-center gap-3">
            <span className="text-[10px] font-black bg-indigo-600/20 text-indigo-400 px-2.5 py-1 rounded-lg border border-indigo-500/20 uppercase tracking-widest">{t('chapters')} {manga.chapters[0].number}</span>
            <span className="text-[10px] font-black text-zinc-600 uppercase">{manga.lastUpdate}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handleNavigate}>
      <div className="relative aspect-[3/4.4] overflow-hidden rounded-[22px] bg-zinc-900 shadow-2xl border border-zinc-900/50">
        <img 
          src={manga.image} 
          alt={manga.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="px-2.5 py-1 bg-indigo-600 text-[9px] font-black text-white rounded-lg uppercase tracking-[0.1em] shadow-lg shadow-indigo-600/40">
            {typeLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 px-2 py-1 bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800/50 flex items-center gap-1.5 shadow-xl">
          <span className="text-[10px] font-black text-yellow-500">★</span>
          <span className="text-[10px] font-black text-white">{manga.rating.toFixed(1)}</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
           <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black text-white bg-zinc-950/90 border border-zinc-800/50 backdrop-blur-md px-2.5 py-1.5 rounded-lg shadow-2xl uppercase tracking-widest">
                {t('chapters')} {manga.chapters[0].number}
              </span>
              {manga.chapters[0].isNew && (
                <span className="text-[8px] font-black text-white bg-red-600 px-2 py-1 rounded-lg animate-pulse shadow-lg shadow-red-600/40 uppercase tracking-tighter">NEW</span>
              )}
           </div>
        </div>
      </div>
      <div className="mt-4 space-y-1.5 px-1">
        <h3 className="text-[14px] font-black text-zinc-100 line-clamp-2 leading-[1.2] group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
          {manga.title}
        </h3>
        <div className="flex items-center justify-between text-[9px] font-black text-zinc-600 uppercase tracking-widest">
          <span>{manga.lastUpdate}</span>
          <span className="flex items-center gap-1 opacity-60">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {manga.views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MangaCard;
