
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAVIGATION, TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Navbar: React.FC = () => {
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    if (!localStorage.getItem('lang')) {
      localStorage.setItem('lang', 'th');
    }
    const handleLangChange = () => {
      setLang((localStorage.getItem('lang') as Language) || 'th');
    };
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const toggleLang = () => {
    const next = lang === 'th' ? 'en' : 'th';
    setLang(next);
    localStorage.setItem('lang', next);
    window.dispatchEvent(new Event('languageChange'));
  };

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-zinc-950/95 backdrop-blur-3xl border-b border-zinc-900/50">
      <div className="max-w-[1500px] mx-auto px-4 h-16 flex items-center justify-between gap-6">
        
        <Link to="/" className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-600/30">
            <span className="font-black text-white text-xl italic tracking-tighter">M</span>
          </div>
          <span className="text-xl font-black tracking-tighter hidden lg:block uppercase">Manga<span className="text-indigo-500">Nexus</span></span>
        </Link>

        <div className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {SITE_NAVIGATION.map((nav) => (
            <Link 
              key={nav.label} 
              to={nav.path} 
              className="px-3 py-2 text-[11px] font-black uppercase tracking-[0.1em] text-zinc-400 hover:text-indigo-400 hover:bg-zinc-900/50 rounded-xl transition-all whitespace-nowrap"
            >
              {t(nav.label)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-grow max-w-lg">
          <div className="relative w-full group">
            <input 
              type="text" 
              placeholder={t('search')} 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all pl-11 placeholder:text-zinc-600"
            />
            <svg className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1">
            <button 
              onClick={() => { if(lang !== 'th') toggleLang(); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-1.5 ${lang === 'th' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span>🇹🇭</span>
              <span className="hidden sm:inline">THAI</span>
            </button>
            <button 
              onClick={() => { if(lang !== 'en') toggleLang(); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-1.5 ${lang === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              <span>🇺🇸</span>
              <span className="hidden sm:inline">ENG</span>
            </button>
          </div>

          <button className="hidden sm:flex px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap shadow-xl shadow-white/5">
            {t('signIn')}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
