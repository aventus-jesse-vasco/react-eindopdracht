import Link from 'next/link';
import { searchSpots } from '@/lib/db';
import SearchBar from './SearchBar';

// Helper function to extract TikTok video ID
function extractTikTokVideoId(url: string): string | null {
  if (!url) return null;
  
  // Match patterns like: https://www.tiktok.com/@user/video/1234567890
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export default async function SpotsPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || '';
  const spots = searchSpots(query);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          Ontdek Streetfood Spots
        </h1>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar initialQuery={query} />
        </div>

        {/* Results count */}
        {query && (
          <p className="text-center text-gray-600 mb-6">
            {spots.length} {spots.length === 1 ? 'resultaat' : 'resultaten'} gevonden voor &quot;{query}&quot;
          </p>
        )}

        {/* Spots Grid */}
        {spots.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 mb-4">Geen spots gevonden</p>
            <Link 
              href="/add-spot"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
            >
              Voeg eerste spot toe
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => {
              const tiktokId = spot.tiktok_url ? extractTikTokVideoId(spot.tiktok_url) : null;
              
              return (
                <div
                  key={spot.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:rotate-1 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={spot.afbeelding_url}
                      alt={spot.naam}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{spot.naam}</h2>
                    <p className="text-orange-600 font-semibold mb-1">{spot.soort_eten}</p>
                    <p className="text-gray-600 mb-4">📍 {spot.locatie}</p>
                    <p className="text-gray-700 mb-4 line-clamp-2">{spot.omschrijving}</p>

                    {/* TikTok Embed or Google Maps Link */}
                    <div className="mb-4">
                      {tiktokId ? (
                        <div className="relative">
                          <iframe
                            src={`https://www.tiktok.com/embed/${tiktokId}`}
                            className="w-full aspect-[9/16] max-h-96 rounded-lg"
                            allow="autoplay; encrypted-media"
                            title={`TikTok video for ${spot.naam}`}
                          />
                        </div>
                      ) : spot.google_maps_url ? (
                        <a
                          href={spot.google_maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 hover:text-blue-800 underline text-center py-2 bg-blue-50 rounded-lg transition-colors duration-300"
                        >
                          📍 Bekijk op Google Maps
                        </a>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">Geen media beschikbaar</p>
                      )}
                    </div>

                    {/* More Info Button */}
                    <Link
                      href={`/spots/${spot.id}`}
                      className="block w-full text-center bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300"
                    >
                      Meer Info
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
