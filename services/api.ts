
import { MOCK_MANGA } from '../constants';
import { Manga } from '../types';

export const api = {
  getLatestManga: async () => {
    // Simulated database query delay
    await new Promise(resolve => setTimeout(resolve, 400));
    return MOCK_MANGA;
  },
  
  getMangaById: async (id: string): Promise<Manga | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_MANGA.find(m => m.id === id);
  },

  /**
   * SEED-BASED ASSET FETCHER
   * Ensures that Chapter X Page Y always returns the same image for a specific series.
   */
  getChapterImages: (mangaId: string, chapterId: string) => {
    // Simulating a fetch from a local folder /assets/manga/[id]/[ch]/
    const pageCount = 18; // Standard chapter length
    return Array.from({ length: pageCount }).map((_, i) => 
      `https://picsum.photos/seed/page-${mangaId}-${chapterId}-${i}/1000/1500`
    );
  }
};
