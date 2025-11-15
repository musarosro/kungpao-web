import {
  type AboutPageContent,
  type BandMember,
  type ContactPageContent,
  type EventItem,
  type GalleryItem,
  type NewsItem,
  type Song,
  type StrapiResponse,
} from '@/lib/types';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';

async function fetchAPI<T>(endpoint: string, locale?: string): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}${endpoint}`;
  const urlWithLocale = locale ? `${url}${endpoint.includes('?') ? '&' : '?'}locale=${locale}` : url;
  
  try {
    const res = await fetch(urlWithLocale, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}

// Songs
export async function getSongs(locale?: string) {
  return fetchAPI<Song[]>('/api/songs?sort=releaseYear:desc&populate=*', locale);
}

export async function getSongBySlug(slug: string, locale?: string) {
  return fetchAPI<Song[]>(`/api/songs?filters[slug][$eq]=${slug}&populate=*`, locale);
}

// Events
export async function getEvents(limit = 50, locale?: string) {
  return fetchAPI<EventItem[]>(`/api/events?sort=date:desc&pagination[limit]=${limit}&populate=*`, locale);
}

export async function getUpcomingEvents(locale?: string) {
  const today = new Date().toISOString();
  return fetchAPI<EventItem[]>(
    `/api/events?filters[date][$gte]=${today}&filters[status][$eq]=upcoming&sort=date:asc&populate=*`,
    locale
  );
}

// Band Members
export async function getBandMembers(locale?: string) {
  return fetchAPI<BandMember[]>('/api/band-members?filters[isActive][$eq]=true&sort=order:asc&populate=*', locale);
}

// Gallery
export async function getGalleryItems(locale?: string) {
  return fetchAPI<GalleryItem[]>('/api/gallery-items?sort=date:desc&populate=*', locale);
}

// News
export async function getNewsItems(limit = 10, locale?: string) {
  return fetchAPI<NewsItem[]>(`/api/news-items?sort=publishDate:desc&pagination[limit]=${limit}&populate=*`, locale);
}

// Pages
export async function getAboutPage(locale?: string) {
  return fetchAPI<AboutPageContent | null>('/api/page-about?populate=*', locale);
}

export async function getContactPage(locale?: string) {
  return fetchAPI<ContactPageContent | null>('/api/page-contact?populate=*', locale);
}
