interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1338';
const API_URL = `${STRAPI_URL}/api`;

export async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', // Disable caching for development
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const url = `${API_URL}${path}`;
  
  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      console.error(`API call failed: ${response.statusText} - ${url}`);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch from Strapi: ${url}`, error);
    throw error;
  }
}

// Helper functions for common API calls
export async function getSongs() {
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>('/songs?populate=*');
}

export async function getSong(slug: string) {
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>(`/songs?filters[slug][$eq]=${slug}&populate=*`);
}

export async function getEvents(limit = 10) {
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>(`/events?sort=date:desc&pagination[limit]=${limit}&populate=*`);
}

export async function getUpcomingEvents() {
  const now = new Date().toISOString();
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>(`/events?filters[date][$gte]=${now}&filters[status][$eq]=upcoming&sort=date:asc&populate=*`);
}

export async function getBandMembers() {
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>('/band-members?filters[isActive][$eq]=true&sort=order:asc&populate=*');
}

export async function getGalleryItems(category?: string) {
  const categoryFilter = category ? `&filters[category][$eq]=${category}` : '';
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>(`/gallery-items?sort=date:desc${categoryFilter}&populate=*`);
}

export async function getNewsItems(limit = 5) {
  return fetchAPI<StrapiResponse<StrapiEntity<any>[]>>(`/news-items?sort=publishDate:desc&pagination[limit]=${limit}&populate=*`);
}

export async function getAboutPage() {
  return fetchAPI<StrapiResponse<any>>('/page-about?populate=*');
}

export async function getContactPage() {
  return fetchAPI<StrapiResponse<any>>('/page-contact?populate=*');
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}
