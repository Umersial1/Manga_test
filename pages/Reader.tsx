
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { MOCK_MANGA, TRANSLATIONS } from '../constants';
import { Manga, Language } from '../types';
import MangaCard from '../components/MangaCard';

const Reader: React.FC = () => {
  const { id, chapterId } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState<Manga | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);

    if (id && chapterId) {
      window.scrollTo(0, 0);
      api.getMangaById(id).then(setManga);
      setImages(api.getChapterImages(id, chapterId));
    }

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('languageChange', handleLangChange);
    };
  }, [id, chapterId]);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  if (!manga) return null;

  const currentChapterIndex = manga.chapters.findIndex(c => c.id === chapterId);
  const currentChapter = manga.chapters[currentChapterIndex];
  
  const nextChapter = currentChapterIndex > 0 ? manga.chapters[currentChapterIndex - 1] : null;
  const prevChapter = currentChapterIndex < manga.chapters.length - 1 ? manga.chapters[currentChapterIndex + 1] : null;

  const goToChapter = (cId: string) => {
    navigate(`/manga/${manga.id}/chapter/${cId}`);
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-[60] bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-5 truncate">
            <Link to={`/manga/${manga.id}`} className="p-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-all">
              <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
            </Link>
            <div className="truncate space-y-0.5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 truncate">{manga.title}</h2>
              <h1 className="text-sm font-black uppercase tracking-widest text-zinc-100 truncate">{t('chapters')} {currentChapter?.number}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {prevChapter && (
              <button onClick={() => goToChapter(prevChapter.id)} className="p-2.5 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl text-zinc-400 hidden md:block text-[11px] font-black uppercase tracking-widest">
                {t('prevChapter')}
              </button>
            )}
            
            <select 
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none text-center min-w-[120px]"
              value={chapterId}
              onChange={(e) => goToChapter(e.target.value)}
            >
              {manga.chapters.map(ch => (
                <option key={ch.id} value={ch.id}>{t('chapters')} {ch.number}</option>
              ))}
            </select>

            {nextChapter && (
              <button onClick={() => goToChapter(nextChapter.id)} className="p-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white shadow-lg hidden md:block text-[11px] font-black uppercase tracking-widest">
                {t('nextChapter')}
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] bg-indigo-600 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
      </div>

      <div className="max-w-[1000px] mx-auto pt-28">
        {images.map((src, i) => (
          <img 
            key={i} 
            src={src} 
            alt={`Page ${i + 1}`} 
            className="w-full h-auto select-none pointer-events-none mb-0 block"
            loading={i < 4 ? 'eager' : 'lazy'}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
        <div className="flex flex-col items-center justify-center gap-8 py-16 border-y border-zinc-900/50">
           <div className="text-center space-y-2">
             <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500">{t('endOfChapter')} {currentChapter?.number}</h3>
             <h2 className="text-xl font-black uppercase tracking-tighter">{t('readyNext')}</h2>
           </div>
           
           <div className="flex gap-4 w-full max-w-md">
             {prevChapter && (
                <button onClick={() => goToChapter(prevChapter.id)} className="flex-1 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">{t('prevChapter')}</button>
             )}
             {nextChapter ? (
                <button onClick={() => goToChapter(nextChapter.id)} className="flex-[2] py-5 bg-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all">{t('nextChapter')}</button>
             ) : (
                <div className="flex-[2] py-5 bg-zinc-900 border border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-600 text-center">{t('caughtUp')}</div>
             )}
           </div>
        </div>

        <section className="space-y-8">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
              <h2 className="text-xl font-black uppercase tracking-tighter">{t('recommended')}</h2>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {MOCK_MANGA.filter(m => m.id !== id).slice(0, 4).map(m => (
                <MangaCard key={m.id} manga={m} />
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default Reader;
