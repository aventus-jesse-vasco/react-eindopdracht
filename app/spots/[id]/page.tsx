import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSpotById } from '@/lib/db';

// Helper function to extract TikTok video ID
function extractTikTokVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/video\/(\d+)/);
  return match ? match[1] : null;
}

export default async function SpotDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const spotId = parseInt(params.id, 10);
  
  if (isNaN(spotId)) {
    notFound();
  }

  const spot = getSpotById(spotId);

  if (!spot) {
    notFound();
  }

  const tiktokId = spot.tiktok_url ? extractTikTokVideoId(spot.tiktok_url) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/spots"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 font-semibold transition-colors duration-300"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Terug naar overzicht
        </Link>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img
              src={spot.afbeelding_url}
              alt={spot.naam}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{spot.naam}</h1>
              <p className="text-xl">📍 {spot.locatie}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Details */}
            <div className="mb-6">
              <div className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-bold text-lg mb-4">
                {spot.soort_eten}
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-800">Over deze spot</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{spot.omschrijving}</p>
            </div>

            {/* Location */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-2 text-gray-800">Locatie</h3>
              <p className="text-gray-700 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {spot.locatie}
              </p>
            </div>

            {/* Media Section */}
            <div className="mb-6">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Media</h3>
              {tiktokId ? (
                <div className="flex justify-center">
                  <div className="w-full max-w-md">
                    <iframe
                      src={`https://www.tiktok.com/embed/${tiktokId}`}
                      className="w-full aspect-[9/16] rounded-lg shadow-lg"
                      allow="autoplay; encrypted-media"
                      title={`TikTok video for ${spot.naam}`}
                    />
                  </div>
                </div>
              ) : spot.google_maps_url ? (
                <a
                  href={spot.google_maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Bekijk op Google Maps
                </a>
              ) : (
                <p className="text-gray-500">Geen media beschikbaar</p>
              )}
            </div>

            {/* Call to Action */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/spots"
                className="block w-full text-center bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Bekijk meer spots
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
