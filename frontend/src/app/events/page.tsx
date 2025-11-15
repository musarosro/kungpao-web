import { getEvents } from '@/lib/api';

export default async function EventsPage() {
  const response = await getEvents(50);
  const events = response.data || [];

  const upcoming = events.filter((e: any) => 
    e.status === 'upcoming' && new Date(e.date) >= new Date()
  );
  const past = events.filter((e: any) => 
    e.status === 'past' || new Date(e.date) < new Date()
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Events</h1>
      
      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Upcoming</h2>
          <div className="space-y-4">
            {upcoming.map((event: any) => (
              <div key={event.id} className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-gray-600">
                      {event.venue}, {event.city}
                    </p>
                    {event.ticketLink && (
                      <a 
                        href={event.ticketLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline mt-2 inline-block"
                      >
                        Get Tickets
                      </a>
                    )}
                  </div>
                  <time className="text-lg font-semibold text-red-600">
                    {new Date(event.date).toLocaleDateString()}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {past.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Past Events</h2>
          <div className="space-y-2">
            {past.map((event: any) => (
              <div key={event.id} className="border-b py-3 flex justify-between">
                <div>
                  <span className="font-medium">{event.title}</span>
                  <span className="text-gray-600"> - {event.venue}, {event.city}</span>
                </div>
                <time className="text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </time>
              </div>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <p className="text-gray-600">No events available yet. Add events in Strapi admin.</p>
      )}
    </div>
  );
}
