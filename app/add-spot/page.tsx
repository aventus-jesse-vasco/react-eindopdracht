import { redirect } from 'next/navigation';
import { addSpot } from '@/lib/db';

async function addSpotAction(formData: FormData) {
  'use server';

  const naam = formData.get('naam') as string;
  const soort_eten = formData.get('soort_eten') as string;
  const locatie = formData.get('locatie') as string;
  const omschrijving = formData.get('omschrijving') as string;
  const afbeelding_url = formData.get('afbeelding_url') as string;
  const tiktok_url = formData.get('tiktok_url') as string;
  const google_maps_url = formData.get('google_maps_url') as string;

  // Validation
  const errors: string[] = [];

  if (!naam || naam.trim() === '') {
    errors.push('Naam is verplicht');
  }

  if (!soort_eten || soort_eten.trim() === '') {
    errors.push('Soort eten is verplicht');
  }

  if (!locatie || locatie.trim() === '') {
    errors.push('Locatie is verplicht');
  }

  if (!omschrijving || omschrijving.trim() === '') {
    errors.push('Omschrijving is verplicht');
  }

  if (!afbeelding_url || afbeelding_url.trim() === '') {
    errors.push('Afbeelding URL is verplicht');
  }

  // At least one of TikTok or Google Maps URL is required
  if ((!tiktok_url || tiktok_url.trim() === '') && (!google_maps_url || google_maps_url.trim() === '')) {
    errors.push('Minstens één van TikTok URL of Google Maps URL is verplicht');
  }

  if (errors.length > 0) {
    // In a real app, you'd handle this better, but for simplicity we'll just redirect
    // In practice, you might use cookies or query params to pass error messages
    return;
  }

  // Add spot to database
  addSpot({
    naam: naam.trim(),
    soort_eten: soort_eten.trim(),
    locatie: locatie.trim(),
    omschrijving: omschrijving.trim(),
    afbeelding_url: afbeelding_url.trim(),
    tiktok_url: tiktok_url.trim() || null,
    google_maps_url: google_maps_url.trim() || null,
  });

  redirect('/spots');
}

export default function AddSpotPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
            Nieuwe Spot Toevoegen
          </h1>

          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
            <form action={addSpotAction} className="space-y-6">
              {/* Naam */}
              <div>
                <label htmlFor="naam" className="block text-sm font-bold text-gray-700 mb-2">
                  Naam *
                </label>
                <input
                  type="text"
                  id="naam"
                  name="naam"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Bijv. De Burgerkraam"
                />
              </div>

              {/* Soort eten */}
              <div>
                <label htmlFor="soort_eten" className="block text-sm font-bold text-gray-700 mb-2">
                  Soort Eten *
                </label>
                <input
                  type="text"
                  id="soort_eten"
                  name="soort_eten"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Bijv. Burgers, Sushi, Vegan, etc."
                />
              </div>

              {/* Locatie */}
              <div>
                <label htmlFor="locatie" className="block text-sm font-bold text-gray-700 mb-2">
                  Locatie *
                </label>
                <input
                  type="text"
                  id="locatie"
                  name="locatie"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Bijv. Amsterdam Centrum"
                />
              </div>

              {/* Omschrijving */}
              <div>
                <label htmlFor="omschrijving" className="block text-sm font-bold text-gray-700 mb-2">
                  Omschrijving *
                </label>
                <textarea
                  id="omschrijving"
                  name="omschrijving"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Vertel over deze streetfood spot..."
                />
              </div>

              {/* Afbeelding URL */}
              <div>
                <label htmlFor="afbeelding_url" className="block text-sm font-bold text-gray-700 mb-2">
                  Afbeelding URL *
                </label>
                <input
                  type="url"
                  id="afbeelding_url"
                  name="afbeelding_url"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Tip: Gebruik een link naar een afbeelding (bijv. van Unsplash of Imgur)
                </p>
              </div>

              {/* TikTok URL */}
              <div>
                <label htmlFor="tiktok_url" className="block text-sm font-bold text-gray-700 mb-2">
                  TikTok URL (optioneel)
                </label>
                <input
                  type="url"
                  id="tiktok_url"
                  name="tiktok_url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://www.tiktok.com/@user/video/1234567890"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Voeg een TikTok video link toe
                </p>
              </div>

              {/* Google Maps URL */}
              <div>
                <label htmlFor="google_maps_url" className="block text-sm font-bold text-gray-700 mb-2">
                  Google Maps URL (optioneel)
                </label>
                <input
                  type="url"
                  id="google_maps_url"
                  name="google_maps_url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://maps.google.com/?q=Amsterdam+Centrum"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Voeg een Google Maps link toe
                </p>
              </div>

              {/* Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <strong>Let op:</strong> Minstens één van de volgende velden is verplicht: TikTok URL of Google Maps URL
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white font-bold text-lg py-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Spot Toevoegen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
