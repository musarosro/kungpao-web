import { getNewsItems, getUpcomingEvents } from '@/lib/api';
import type { EventItem, NewsItem } from '@/lib/types';
import ClientHomePage from '@/components/ClientHomePage';

export default async function Home() {
  let news: NewsItem[] = [];
  let events: EventItem[] = [];

  try {
    const [newsResponse, eventsResponse] = await Promise.all([
      getNewsItems(3).catch(() => ({ data: [] as NewsItem[] })),
      getUpcomingEvents().catch(() => ({ data: [] as EventItem[] })),
    ]);

    news = newsResponse.data ?? [];
    events = (eventsResponse.data ?? []).slice(0, 3);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return <ClientHomePage initialNews={news} initialEvents={events} />;
}
