
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Footer: React.FC = () => {
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900/50 pt-20 pb-10 mt-20">
      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <span className="font-black text-white text-xl italic tracking-tighter">M</span>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">Manga<span className="text-indigo-500">Nexus</span></span>
            </Link>
            <p className="text-[13px] font-bold text-zinc-500 leading-relaxed max-w-xs uppercase tracking-tight">
              {t('footerDesc')}
            </p>
            <div className="flex gap-3">
              {['FB', 'TW', 'DS', 'IG'].map(icon => (
                <div key={icon} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 transition-all cursor-pointer text-zinc-500 hover:text-white font-black text-xs">
                  {icon}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-200">{t('siteLinks')}</h4>
            <ul className="space-y-4">
              {[t('latestUpdates'), t('popular'), t('new'), t('az')].map(link => (
                <li key={link}>
                  <Link to="/" className="text-xs font-bold text-zinc-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-200">{t('userPolicy')}</h4>
            <ul className="space-y-4">
              {['Terms of Service', 'Privacy Policy', 'DMCA Notice', 'Cookies Policy'].map(link => (
                <li key={link}>
                  <Link to="/" className="text-xs font-bold text-zinc-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-200">{t('communitySupport')}</h4>
            <p className="text-[12px] font-bold text-zinc-500 leading-relaxed uppercase tracking-tight">
              MangaNexus relies on your support to stay online.
            </p>
            <button className="w-full py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-white/5">
              {t('supportCrypto')}
            </button>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.1em]">
              © 2024 MANGANEXUS PLATFORM. PREMIUM READER EXPERIENCE.
            </p>
            <p className="text-[9px] font-bold text-zinc-800 max-w-4xl uppercase leading-relaxed">
              {t('disclaimer')}
            </p>
          </div>
          <div className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] font-black text-zinc-600 tracking-tighter uppercase">v2.4.0-stable</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
