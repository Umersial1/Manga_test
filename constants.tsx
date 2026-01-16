
import { Manga, Chapter, Translations } from './types';

export const TRANSLATIONS: Translations = {
  // Navigation
  home: { th: 'หน้าหลัก', en: 'Home' },
  trending: { th: 'ยอดนิยมตอนนี้', en: 'Trending' },
  popular: { th: 'อันดับสูงสุด', en: 'Popular' },
  manhwa: { th: 'มังฮวา (เกาหลี)', en: 'Manhwa' },
  manga: { th: 'มังงะ (ญี่ปุ่น)', en: 'Manga' },
  manhua: { th: 'มังฮัว (จีน)', en: 'Manhua' },
  new: { th: 'มาใหม่ล่าสุด', en: 'New Arrivals' },
  az: { th: 'รายชื่อ A-Z', en: 'A-Z List' },
  search: { th: 'ค้นหาการ์ตูนที่ต้องการ...', en: 'Search library...' },
  signIn: { th: 'เข้าสู่ระบบ', en: 'Sign In' },
  
  // Home & Listing
  todayTrending: { th: 'เทรนด์ฮิตวันนี้', en: 'Trending Today' },
  latestUpdates: { th: 'อัพเดทล่าสุด', en: 'Latest Updates' },
  premiumCollection: { th: 'คอลเลกชันระดับพรีเมียม', en: 'Premium Collection' },
  discover: { th: 'สำรวจโลกใบใหม่', en: 'Discover New Worlds' },
  viewAll: { th: 'ดูทั้งหมด', en: 'View All' },
  loadMore: { th: 'โหลดตอนอื่นๆ เพิ่มเติม', en: 'Load More Entries' },
  results: { th: 'ผลลัพธ์การค้นหา', en: 'Results' },
  premiumScan: { th: 'งานแปลคุณภาพระดับพรีเมียม', en: 'Premium Scanlation Releases' },

  // Detail Page
  score: { th: 'คะแนนความนิยม', en: 'Score' },
  views: { th: 'ยอดการเข้าชม', en: 'Views' },
  year: { th: 'ปีที่เปิดตัว', en: 'Year' },
  artist: { th: 'นักวาด/ผู้วาด', en: 'Artist' },
  author: { th: 'ผู้แต่ง/ผู้เขียน', en: 'Author' },
  synopsis: { th: 'เรื่องย่อ / ข้อมูลเนื้อหา', en: 'Synopsis' },
  chapterFeed: { th: 'รายการตอนทั้งหมด', en: 'Chapter Feed' },
  readFirst: { th: 'เริ่มอ่านตอนแรก', en: 'READ CHAPTER 1' },
  readLast: { th: 'อ่านตอนล่าสุด', en: 'LATEST CHAPTER' },
  ongoing: { th: 'กำลังดำเนินอยู่', en: 'Ongoing' },
  completed: { th: 'จบสมบูรณ์แล้ว', en: 'Completed' },
  readersEnjoy: { th: 'ผู้อ่านคนอื่นๆ ยังชอบเรื่องนี้ด้วย', en: 'Readers Also Enjoyed' },
  altTitles: { th: 'ชื่อภาษาอื่นๆ', en: 'Alternative Titles' },

  // Reader
  nextChapter: { th: 'ตอนถัดไป', en: 'Next Chapter' },
  prevChapter: { th: 'ตอนก่อนหน้า', en: 'Prev' },
  caughtUp: { th: 'คุณอ่านถึงตอนปัจจุบันแล้ว', en: 'Caught Up' },
  endOfChapter: { th: 'จบการอ่านตอนที่', en: 'End of Chapter' },
  readyNext: { th: 'ต้องการอ่านตอนถัดไปเลยไหม?', en: 'Ready for the next one?' },
  recommended: { th: 'การ์ตูนแนะนำสำหรับคุณ', en: 'Recommended For You' },

  // Sidebar
  day: { th: 'รายวัน', en: 'Day' },
  week: { th: 'สัปดาห์', en: 'Week' },
  month: { th: 'รายเดือน', en: 'Month' },
  genres: { th: 'หมวดหมู่ยอดนิยม', en: 'Popular Genres' },
  thaiCommunity: { th: 'ชุมชนคนรักการ์ตูนไทย', en: 'Thai Community' },
  discordJoin: { th: 'เข้าร่วม Discord ของเราเพื่อรับแจ้งเตือนตอนใหม่ก่อนใคร!', en: 'Join our Thai server for early scan releases!' },
  joinNow: { th: 'เข้าร่วมเลยตอนนี้', en: 'Join Now' },

  // Footer
  siteLinks: { th: 'ลิงก์รวดเร็ว', en: 'Quick Links' },
  userPolicy: { th: 'นโยบายและความปลอดภัย', en: 'User Policy' },
  communitySupport: { th: 'สนับสนุนทีมงาน', en: 'Community Support' },
  footerDesc: { th: 'แพลตฟอร์มการอ่านการ์ตูนระดับพรีเมียม สร้างสรรค์โดยแฟนๆ เพื่อแฟนการ์ตูนทุกคน ค้นพบประสบการณ์ใหม่ของคุณได้ที่นี่', en: 'A premium reading experience for fans, by fans. Discover the next generation of storytelling.' },
  supportCrypto: { th: 'สนับสนุนเราผ่าน Crypto', en: 'Support via Crypto' },
  disclaimer: { th: 'คำเตือน: MangaNexus เป็นเพียงแพลตฟอร์มรวบรวมเนื้อหาจากบุคคลภายนอกเท่านั้น เราไม่ได้เป็นเจ้าของลิขสิทธิ์ใดๆ', en: 'Disclaimer: MangaNexus does not store any files. All contents are provided by third parties.' }
};

export const GENRES = [
  'แอ็คชั่น', 'ผจญภัย', 'คอมเมดี้', 'ดราม่า', 'แฟนตาซี', 'ฮาเร็ม', 
  'ประวัติศาสตร์', 'สยองขวัญ', 'ต่างโลก (Isekai)', 'ศิลปะการต่อสู้', 'หุ่นยนต์', 
  'ลึกลับ', 'จิตวิทยา', 'โรแมนติก', 'ไซไฟ', 'เซเน็น', 
  'โชโจ', 'โชเน็น', 'ชีวิตประจำวัน', 'กีฬา', 'เหนือธรรมชาติ', 'ระทึกขวัญ'
];

const ACTUAL_SERIES_DATA = [
  { 
    title: 'Solo Leveling: Ragnarok (โซโลเลเวลลิ่ง)', 
    type: 'Manhwa', 
    genres: ['แอ็คชั่น', 'แฟนตาซี'], 
    desc: 'ภาคต่ออันยิ่งใหญ่ของ Solo Leveling เมื่อ ซองซูโฮ ลูกชายของซองจินอู ต้องตื่นขึ้นมาเพื่อเผชิญกับภัยคุกคามครั้งใหม่ที่สั่นคลอนทั้งจักรวาล' 
  },
  { 
    title: 'Pick Me Up! (สุ่มกาชามาผจญภัย)', 
    type: 'Manhwa', 
    genres: ['แอ็คชั่น', 'ต่างโลก (Isekai)'], 
    desc: 'เมื่อผู้เล่นอันดับหนึ่งของโลกถูกดูดเข้าไปในเกมกาชาที่โหดเหี้ยมที่สุด และต้องเอาชีวิตรอดในฐานะตัวละครระดับ 1 ดาวที่ใครๆ ก็มองข้าม' 
  },
  { 
    title: 'One Piece (วันพีซ)', 
    type: 'Manga', 
    genres: ['ผจญภัย', 'แอ็คชั่น'], 
    desc: 'การเดินทางของเด็กหนุ่มผู้สวมหมวกฟาง มังกี้ ดี ลูฟี่ ที่ออกเดินเรือเพื่อรวบรวมพรรคพวกและตามหาขุมทรัพย์ที่ยิ่งใหญ่ที่สุดในโลกเพื่อเป็นราชาโจรสลัด' 
  },
  { 
    title: 'Jujutsu Kaisen (มหาเวทย์ผนึกมาร)', 
    type: 'Manga', 
    genres: ['แอ็คชั่น', 'เหนือธรรมชาติ'], 
    desc: 'อิทาโดริ ยูจิ นักเรียนมัธยมธรรมดาที่กลืนนิ้วของราชาคำสาปเข้าไป ทำให้เขาต้องก้าวเข้าสู่โลกของไสยเวทย์เพื่อปกป้องผู้คนจากการรุกรานของคำสาป' 
  },
  { 
    title: 'Martial Peak (จุดสูงสุดแห่งวิถียุทธ์)', 
    type: 'Manhua', 
    genres: ['ศิลปะการต่อสู้', 'แอ็คชั่น'], 
    desc: 'การเดินทางของเด็กหนุ่มนาม หยางไค่ ที่เริ่มต้นจากศิษย์กวาดพื้นชั้นต่ำ สู่การครอบครองคัมภีร์ไร้อักษรและก้าวขึ้นสู่จุดสูงสุดของมหาจักรวาล' 
  },
  { 
    title: 'Apotheosis (เส้นทางสู่ความเป็นเทพ)', 
    type: 'Manhua', 
    genres: ['แอ็คชั่น', 'แฟนตาซี'], 
    desc: 'หลัวเจิ้ง นายน้อยที่ถูกทรยศได้ค้นพบเคล็ดวิชาลึกลับที่เปลี่ยนร่างกายของเขาให้เป็นสมบัติล้ำค่า เพื่อตามหาน้องสาวที่ถูกลักพาตัวไป' 
  },
  {
    title: 'Return of the Mount Hua Sect (การกลับมาของดาบคลั่ง)',
    type: 'Manhwa',
    genres: ['ศิลปะการต่อสู้', 'คอมเมดี้'],
    desc: 'ชองมยอง อดีตยอดฝีมือสำนักฮวาซานที่ตายไปเมื่อร้อยปีก่อน ได้กลับมาเกิดใหม่ในร่างเด็กหนุ่ม และพบว่าสำนักอันเป็นที่รักของเขาได้ล่มสลายลงไปแล้ว'
  }
];

export const MOCK_MANGA: Manga[] = Array.from({ length: 100 }).map((_, i) => {
  const source = ACTUAL_SERIES_DATA[i % ACTUAL_SERIES_DATA.length];
  const id = `series-${i}`;
  const theme = source.type === 'Manga' ? 'anime' : source.type === 'Manhwa' ? 'digitalart' : 'comic';
  return {
    id,
    title: source.title + (i > 10 ? ` เล่มที่ ${Math.ceil(i/8)}` : ''),
    altTitles: [`ชื่ออื่นๆ ของเรื่องนี้ที่ ${i}`],
    author: 'นักเขียนนิรนาม',
    artist: 'นักวาดมือฉมัง',
    releaseYear: 2021 + (i % 4),
    image: `https://picsum.photos/seed/${theme}-${i}/600/900`,
    type: source.type as any,
    status: i % 12 === 0 ? 'Completed' : 'Ongoing',
    rating: 4.2 + (Math.random() * 0.8),
    description: source.desc,
    genres: source.genres,
    lastUpdate: `${(i % 23) + 1} ชั่วโมงที่แล้ว`,
    views: `${(Math.random() * 80 + 5).toFixed(1)}M`,
    chapters: Array.from({ length: 60 }).map((_, j) => ({
      id: `${id}-ch-${60-j}`,
      number: 60 - j,
      date: `${j + 1} วันก่อน`,
      isNew: j < 4
    }))
  };
});

export const TOP_RANKING = [...MOCK_MANGA].sort((a, b) => b.rating - a.rating);

export const SITE_NAVIGATION = [
  { label: 'home', path: '/' },
  { label: 'trending', path: '/listing/trending' },
  { label: 'popular', path: '/listing/popular' },
  { label: 'manhwa', path: '/listing/manhwa' },
  { label: 'manga', path: '/listing/manga' },
  { label: 'manhua', path: '/listing/manhua' },
  { label: 'new', path: '/listing/new' },
  { label: 'az', path: '/listing/az' }
];
