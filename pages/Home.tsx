
import React, { useState, useEffect } from 'react';
import HeroSlider from '../components/HeroSlider';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar';
import { MOCK_MANGA, TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Home: React.FC = () => {
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12 space-y-24">
      
      <HeroSlider />

      <section className="space-y-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
             <div className="w-2.5 h-10 bg-red-600 rounded-full shadow-lg shadow-red-600/40" />
             <h2 className="text-3xl font-black uppercase tracking-tighter">{t('todayTrending')}</h2>
             <span className="hidden sm:block px-4 py-1.5 bg-red-600/10 text-red-500 text-[10px] font-black rounded-full border border-red-600/20 uppercase tracking-[0.2em] animate-pulse">
                HOT 🔥
             </span>
          </div>
          <button className="text-[11px] font-black text-zinc-500 hover:text-white uppercase tracking-[0.2em] transition-all">{t('viewAll')}</button>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide no-scrollbar -mx-4 px-4">
          {MOCK_MANGA.slice(5, 25).map(manga => (
             <div key={manga.id} className="w-48 md:w-56 flex-shrink-0">
               <MangaCard manga={manga} variant="grid" />
             </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        <div className="flex-grow space-y-20">
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-zinc-900 pb-12">
              <div className="flex items-center gap-5">
                 <div className="w-3 h-12 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/40" />
                 <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{t('latestUpdates')}</h2>
                    <p className="text-[11px] font-bold text-zinc-600 mt-2 uppercase tracking-[0.4em]">{t('premiumScan')}</p>
                 </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['ทั้งหมด', t('manhwa'), t('manga'), t('manhua')].map(filter => (
                  <button 
                    key={filter}
                    className={`px-7 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] border transition-all ${filter === 'ทั้งหมด' ? 'bg-indigo-600 border-indigo-500 text-white shadow-2xl shadow-indigo-600/40' : 'bg-zinc-900/60 border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-700 hover:bg-zinc-800'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-8 gap-y-16">
              {MOCK_MANGA.slice(0, 35).map(manga => (
                <MangaCard key={manga.id} manga={manga} />
              ))}
            </div>

            <div className="pt-16">
               <button className="w-full py-8 bg-zinc-900/20 hover:bg-zinc-900 border border-zinc-900 rounded-[32px] text-zinc-600 font-black tracking-[0.5em] text-[12px] transition-all hover:text-indigo-400 hover:border-indigo-500/40 active:scale-[0.99] shadow-2xl">
                 {t('loadMore')}
               </button>
            </div>
          </section>

          <section className="space-y-12">
             <div className="flex items-center gap-5">
                <div className="w-2.5 h-10 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/40" />
                <h2 className="text-3xl font-black uppercase tracking-tighter">{t('premiumCollection')}</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {MOCK_MANGA.slice(40, 46).map(manga => (
                  <MangaCard key={manga.id} manga={manga} variant="horizontal" />
                ))}
             </div>
          </section>
        </div>

        <Sidebar />
      </div>

      <section className="pt-24 border-t border-zinc-900/60 space-y-12">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
           <h2 className="text-5xl font-black uppercase tracking-tighter">{t('discover')}</h2>
           <p className="text-[12px] font-black text-zinc-600 uppercase tracking-[0.5em]">{t('premiumScan')}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-8">
           {MOCK_MANGA.slice(50, 66).map(manga => (
             <MangaCard key={manga.id} manga={manga} />
           ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
