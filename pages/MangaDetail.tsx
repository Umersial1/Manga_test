
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Manga, Language } from '../types';
import Sidebar from '../components/Sidebar';
import MangaCard from '../components/MangaCard';
import { MOCK_MANGA, TRANSLATIONS } from '../constants';

const MangaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    
    if (id) {
      window.scrollTo(0, 0);
      api.getMangaById(id).then(data => {
        if (data) setManga(data);
        setLoading(false);
      });
    }

    return () => window.removeEventListener('languageChange', handleLangChange);
  }, [id]);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950">
      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="font-black uppercase tracking-[0.3em] text-zinc-600 text-[10px]">Accessing Database</span>
    </div>
  );

  if (!manga) return <div className="min-h-screen flex items-center justify-center">Manga not found.</div>;

  const statusLabel = manga.status === 'Ongoing' ? t('ongoing') : t('completed');
  const typeLabel = manga.type === 'Manhwa' ? t('manhwa') : manga.type === 'Manga' ? t('manga') : t('manhua');

  return (
    <div className="relative min-h-screen pb-32">
      <div className="absolute inset-0 h-[800px] overflow-hidden -z-10">
        <img src={manga.image} className="w-full h-full object-cover blur-[100px] opacity-25 scale-150" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/80 to-zinc-950" />
      </div>

      <div className="max-w-[1500px] mx-auto px-4 pt-20 space-y-32">
        <div className="flex flex-col lg:flex-row gap-20">
          
          <div className="flex-grow space-y-24">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-80 flex-shrink-0">
                <div className="relative rounded-[32px] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] border border-zinc-800/50 group">
                  <img src={manga.image} alt={manga.title} className="w-full h-auto transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="flex flex-col gap-4 mt-10">
                  <button 
                    onClick={() => navigate(`/manga/${manga.id}/chapter/${manga.chapters[manga.chapters.length-1].id}`)}
                    className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl hover:bg-indigo-500 shadow-2xl shadow-indigo-600/30 transition-all active:scale-95"
                  >
                    {t('readFirst')}
                  </button>
                  <button 
                    onClick={() => navigate(`/manga/${manga.id}/chapter/${manga.chapters[0].id}`)}
                    className="w-full py-5 bg-zinc-900 border border-zinc-800 text-zinc-400 font-black uppercase tracking-[0.3em] text-[11px] rounded-2xl hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                  >
                    {t('readLast')}
                  </button>
                </div>
              </div>

              <div className="flex-grow space-y-10">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1.5 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-indigo-600/5">{typeLabel}</span>
                    <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg">{statusLabel}</span>
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white">
                    {manga.title}
                  </h1>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-zinc-900/50">
                   <div className="space-y-2">
                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('score')}</span>
                     <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-xl">★</span>
                        <p className="text-2xl font-black text-zinc-100">{manga.rating.toFixed(1)}</p>
                     </div>
                   </div>
                   <div className="space-y-2">
                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('views')}</span>
                     <p className="text-2xl font-black text-zinc-100">{manga.views}</p>
                   </div>
                   <div className="space-y-2">
                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('year')}</span>
                     <p className="text-2xl font-black text-zinc-100">{manga.releaseYear}</p>
                   </div>
                   <div className="space-y-2">
                     <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">{t('artist')}</span>
                     <p className="text-xl font-black text-zinc-100 truncate">{manga.artist}</p>
                   </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {manga.genres.map(genre => (
                    <span key={genre} className="px-5 py-2.5 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-500 hover:text-indigo-400 transition-all uppercase tracking-widest cursor-pointer">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-indigo-500 border-l-2 border-indigo-600 pl-4">{t('synopsis')}</h3>
                  <p className="text-[16px] font-medium text-zinc-400 leading-relaxed uppercase tracking-tight max-w-4xl">
                    {manga.description}
                  </p>
                </div>
              </div>
            </div>

            <section className="space-y-12">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-10">
                 <div className="flex items-center gap-5">
                    <div className="w-3 h-10 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-600/50" />
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter">{t('chapterFeed')}</h2>
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.3em] mt-1">{t('results')} {manga.chapters.length} {t('chapters')}</p>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {manga.chapters.map(chapter => (
                  <Link 
                    key={chapter.id}
                    to={`/manga/${manga.id}/chapter/${chapter.id}`}
                    className="flex items-center justify-between p-6 bg-zinc-900/20 hover:bg-zinc-900/60 border border-zinc-900 rounded-[24px] transition-all group hover:-translate-y-1 hover:border-indigo-500/30"
                  >
                    <div className="flex flex-col gap-1">
                       <span className="text-md font-black text-zinc-100 group-hover:text-indigo-400 transition-colors uppercase tracking-[0.1em]">{t('chapters')} {chapter.number}</span>
                       <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">{chapter.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {chapter.isNew && (
                        <span className="px-3 py-1 bg-red-600/10 text-red-500 text-[9px] font-black border border-red-600/20 rounded-lg uppercase tracking-widest animate-pulse">NEW</span>
                      )}
                      <svg className="w-5 h-5 text-zinc-700 group-hover:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <Sidebar />
        </div>

        <section className="pt-20 border-t border-zinc-900 space-y-12">
           <div className="text-center space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter">{t('readersEnjoy')}</h2>
              <p className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.4em]">{t('premiumScan')}</p>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {MOCK_MANGA.slice(0, 12).filter(m => m.id !== id).slice(0, 6).map(m => (
                <MangaCard key={`enjoy-${m.id}`} manga={m} />
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default MangaDetail;
