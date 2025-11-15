import { getSongs } from '@/lib/api';
import Link from 'next/link';

export default async function SongsPage() {
  const response = await getSongs();
  const songs = response.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Songs</h1>
      
      {songs.length === 0 ? (
        <p className="text-gray-600">No songs available yet. Add songs in Strapi admin.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song: any) => (
            <Link 
              key={song.id}
              href={`/songs/${song.slug}`}
              className="border rounded-lg p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{song.title}</h2>
              {song.titleChinese && (
                <p className="text-gray-600 mb-2">{song.titleChinese}</p>
              )}
              {song.releaseYear && (
                <p className="text-sm text-gray-500">{song.releaseYear}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
