export type StrapiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export interface Song {
  id: number;
  title: string;
  slug: string;
  titleChinese?: string | null;
  releaseYear?: number | null;
  description?: string | null;
}

export interface EventItem {
  id: number;
  title: string;
  venue?: string | null;
  city?: string | null;
  date: string;
  status?: 'upcoming' | 'past' | string | null;
  ticketLink?: string | null;
}

export interface NewsItem {
  id: number;
  title: string;
  publishDate: string;
  slug?: string | null;
  excerpt?: string | null;
}

export interface BandMember {
  id: number;
  name: string;
  instrument?: string | null;
  bio?: string | null;
  order?: number | null;
}

export interface GalleryItem {
  id: number;
  title: string;
  imageUrl?: string | null;
  description?: string | null;
}

export interface AboutPageContent {
  id: number;
  title: string;
  aboutContent?: string | null;
  historyTitle?: string | null;
  historyContent?: string | null;
}

export interface ContactPageContent {
  id: number;
  title: string;
  introText?: string | null;
  bookingEmail?: string | null;
  bookingPhone?: string | null;
  managementContact?: string | null;
  socialLinks?: Record<string, string | undefined>;
}
