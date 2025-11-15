'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { getNewsItems, getUpcomingEvents } from '@/lib/api';
import type { EventItem, NewsItem } from '@/lib/types';
import Link from 'next/link';

interface ClientHomePageProps {
  initialNews: NewsItem[];
  initialEvents: EventItem[];
}

export default function ClientHomePage({ initialNews, initialEvents }: ClientHomePageProps) {
  const { t, language } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLocalizedData() {
      setLoading(true);
      try {
        const [newsResponse, eventsResponse] = await Promise.all([
          getNewsItems(3, language).catch(() => ({ data: [] })),
          getUpcomingEvents(language).catch(() => ({ data: [] })),
        ]);

        setNews(newsResponse.data || []);
        setEvents(eventsResponse.data?.slice(0, 3) || []);
      } catch (error) {
        console.error('Error fetching localized data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLocalizedData();
  }, [language]);

  return (
    <div className="min-h-screen bg-[#000000] text-[#F5F5F5]">
      {/* Hero Section with Background */}
      <div 
        className="relative flex flex-col bg-cover bg-center bg-no-repeat min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%), url("https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2000")`
        }}
      >
        <div className="flex-1 flex items-center">
          <div className="container mx-auto px-4 sm:px-10 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Column - Hero Content */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 p-4">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                    {t.homepage.newSingle}
                  </h1>
                  <h2 className="text-[#A0A0A0] text-base font-normal leading-normal">
                    {t.homepage.subtitle}
                  </h2>
                </div>

                {/* Countdown Timer */}
                <div className="flex gap-2 sm:gap-4 py-6 px-4 max-w-md w-full">
                  {[
                    { value: 12, label: t.homepage.days },
                    { value: 18, label: t.homepage.hours },
                    { value: 45, label: t.homepage.minutes },
                    { value: 33, label: t.homepage.seconds }
                  ].map((item, index) => (
                    <div key={index} className="flex grow basis-0 flex-col items-stretch gap-2 sm:gap-4">
                      <div className="flex h-14 grow items-center justify-center rounded-lg px-3 bg-neutral-900/50 backdrop-blur-sm">
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="text-[#A0A0A0] text-sm">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="flex items-center justify-center rounded-full h-10 sm:h-12 px-4 sm:px-5 bg-[#FFFF00] text-[#000000] text-sm sm:text-base font-bold hover:bg-yellow-200 transition-colors">
                  <span>{t.homepage.getNotified}</span>
                </button>
              </div>

              {/* Right Column - Latest News */}
              <div className="flex flex-col bg-neutral-900/50 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-xl sm:text-2xl font-bold px-4 pb-3 pt-1">{t.homepage.latestNews}</h2>
                <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-center text-[#A0A0A0]">
                      <p>Loading...</p>
                    </div>
                  ) : news.length > 0 ? (
                    news.map((item) => (
                      <div key={item.id} className="p-4 rounded-md hover:bg-neutral-800/50 transition-colors">
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <p className="text-[#A0A0A0] text-sm">
                              {new Date(item.publishDate).toLocaleDateString(
                                language === 'cs' ? 'cs-CZ' : language === 'zh' ? 'zh-CN' : 'en-US',
                                { year: 'numeric', month: 'long', day: 'numeric' }
                              )}
                            </p>
                            <p className="text-base font-bold leading-tight">
                              {item.title}
                            </p>
                            {item.excerpt && (
                              <p className="text-sm text-[#A0A0A0] line-clamp-2">{item.excerpt}</p>
                            )}
                          </div>
                          <Link
                            href={`/news/${item.slug || item.id}`}
                            className="flex items-center justify-center rounded-full h-8 px-4 bg-neutral-800 text-[#FFFF00] text-sm font-medium w-fit hover:bg-neutral-700 transition-colors"
                          >
                            {t.homepage.readMore}
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[#A0A0A0]">
                      <p>{t.homepage.noNews}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      {events.length > 0 && (
        <section className="py-16 px-4 bg-[#111111]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">{t.homepage.upcomingGigs}</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-lg hover:bg-neutral-800/50 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-[#A0A0A0]">
                        {event.venue}, {event.city}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <time className="text-lg font-semibold text-[#FFFF00]">
                        {new Date(event.date).toLocaleDateString(
                          language === 'cs' ? 'cs-CZ' : language === 'zh' ? 'zh-CN' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </time>
                      {event.ticketLink && (
                        <a
                          href={event.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center rounded-full h-10 px-4 bg-[#FFFF00] text-[#000000] text-sm font-bold hover:bg-yellow-200 transition-colors"
                        >
                          {t.homepage.getTickets}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-full h-12 px-6 bg-neutral-800 text-[#FFFF00] text-base font-medium hover:bg-neutral-700 transition-colors"
              >
                {t.homepage.viewAllEvents}
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
