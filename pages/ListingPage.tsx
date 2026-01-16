
import React, { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MangaCard from '../components/MangaCard';
import Sidebar from '../components/Sidebar';
import { MOCK_MANGA, TRANSLATIONS } from '../constants';
import { Language } from '../types';

const ListingPage: React.FC = () => {
  const { category } = useParams();
  const [lang, setLang] = useState<Language>((localStorage.getItem('lang') as Language) || 'th');

  useEffect(() => {
    const handleLangChange = () => setLang((localStorage.getItem('lang') as Language) || 'th');
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const { title, subtitle, data, featured } = useMemo(() => {
    let filtered = [...MOCK_MANGA];
    let pageTitle = t('popular');
    let pageSub = lang === 'th' ? 'สำรวจการ์ตูนยอดนิยมทั้งหมดในคลังของเรา' : 'Browse our complete collection';

    switch (category) {
      case 'manhwa':
        filtered = MOCK_MANGA.filter(m => m.type === 'Manhwa');
        pageTitle = t('manhwa');
        pageSub = lang === 'th' ? 'รวมมังฮวาแปลไทยคุณภาพเยี่ยมจากเกาหลี' : 'Premium Korean Webtoons';
        break;
      case 'manga':
        filtered = MOCK_MANGA.filter(m => m.type === 'Manga');
        pageTitle = t('manga');
        pageSub = lang === 'th' ? 'มังงะญี่ปุ่นระดับตำนานและเรื่องใหม่ล่าสุด' : 'Japanese Manga Collection';
        break;
      case 'manhua':
        filtered = MOCK_MANGA.filter(m => m.type === 'Manhua');
        pageTitle = t('manhua');
        pageSub = lang === 'th' ? 'มังฮัวจีนแนวกำลังภายในและการบำเพ็ญเพียร' : 'Chinese Manhua and Cultivation';
        break;
      case 'trending':
        filtered = [...MOCK_MANGA].sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
        pageTitle = t('trending');
        pageSub = lang === 'th' ? 'เรื่องที่ทุกคนกำลังพูดถึงและอ่านมากที่สุดตอนนี้' : 'What everyone is reading right now';
        break;
      case 'new':
        filtered = [...MOCK_MANGA].sort((a, b) => b.lastUpdate.localeCompare(a.lastUpdate));
        pageTitle = t('new');
        pageSub = lang === 'th' ? 'อัพเดทตอนใหม่สดๆ ร้อนๆ และเรื่องที่เพิ่งเพิ่มเข้ามา' : 'Freshly updated and newly added series';
        break;
      case 'az':
        filtered = [...MOCK_MANGA].sort((a, b) => a.title.localeCompare(b.title));
        pageTitle = t('az');
        pageSub = lang === 'th' ? 'รายการการ์ตูนทั้งหมด เรียงตามลำดับตัวอักษร' : 'Complete catalog in alphabetical order';
        break;
      default:
        pageTitle = t('popular');
    }

    return { 
      title: pageTitle, 
      subtitle: pageSub,
      data: filtered, 
      featured: filtered.slice(0, 3) 
    };
  }, [category, lang]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-16 space-y-20">
      
      <section className="relative h-[400px] rounded-[48px] overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="absolute inset-0">
           {featured[0] && <img src={featured[0].image} className="w-full h-full object-cover blur-3xl opacity-20 scale-125" alt="" />}
           <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
        </div>
        
        <div className="relative h-full flex flex-col justify-center px-16 space-y-6 max-w-4xl">
           <span className="px-5 py-2 bg-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] rounded-xl w-fit text-white shadow-2xl shadow-indigo-600/40">
              {lang === 'th' ? 'การค้นหาตามหมวดหมู่' : 'Category Selection'}
           </span>
           <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] drop-shadow-2xl">{title}</h1>
           <p className="text-[13px] font-black text-zinc-500 uppercase tracking-[0.5em]">{subtitle}</p>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
        <div className="flex-grow space-y-16">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-8">
             <div className="flex items-center gap-4">
                <div className="w-2.5 h-10 bg-indigo-600 rounded-full" />
                <h2 className="text-3xl font-black uppercase tracking-tighter">{t('latestUpdates')}</h2>
             </div>
             <p className="text-[11px] font-black text-zinc-700 uppercase tracking-widest">{data.length} {t('results')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-14">
            {data.map(manga => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>

          {data.length === 0 && (
            <div className="py-40 text-center space-y-6">
              <div className="text-6xl opacity-20">📭</div>
              <h3 className="text-2xl font-black uppercase text-zinc-800">
                {lang === 'th' ? 'ไม่พบข้อมูลการ์ตูนในหมวดหมู่นี้' : 'No series found in this category'}
              </h3>
            </div>
          )}
        </div>

        <Sidebar />
      </div>
    </div>
  );
};

export default ListingPage;
