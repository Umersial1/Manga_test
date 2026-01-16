
export interface Manga {
  id: string;
  title: string;
  altTitles?: string[];
  author?: string;
  artist?: string;
  releaseYear?: number;
  image: string;
  chapters: Chapter[];
  status: 'Ongoing' | 'Completed' | 'Hiatus';
  rating: number;
  type: 'Manga' | 'Manhwa' | 'Manhua';
  description: string;
  genres: string[];
  lastUpdate: string;
  views: string;
}

export interface Chapter {
  id: string;
  number: number;
  title?: string;
  date: string;
  isNew?: boolean;
}

export type Language = 'th' | 'en';

export interface Translations {
  [key: string]: {
    th: string;
    en: string;
  };
}
