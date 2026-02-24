import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              🍔 StreetfoodSpotter
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Ontdek de beste streetfood spots in Nederland
            </p>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto">
              Van heerlijke burgers tot authentieke sushi, van vegan delights tot zoete desserts - 
              vind jouw perfecte streetfood ervaring dichtbij!
            </p>
            <Link 
              href="/spots"
              className="inline-block bg-white text-orange-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 transform"
            >
              Bekijk Spots →
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Waarom StreetfoodSpotter?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Gemakkelijk Zoeken</h3>
              <p className="text-gray-600">
                Vind snel je favoriete streetfood spots op basis van naam of locatie
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Alle Locaties</h3>
              <p className="text-gray-600">
                Ontdek spots in heel Nederland, van Amsterdam tot Eindhoven
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Voeg Toe</h3>
              <p className="text-gray-600">
                Ken je een geweldige spot? Voeg hem toe en deel met anderen!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Klaar om te ontdekken?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Begin nu met het verkennen van de beste streetfood spots!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/spots"
              className="inline-block bg-white text-orange-600 font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Browse Spots
            </Link>
            <Link 
              href="/add-spot"
              className="inline-block bg-orange-800 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
              Spot Toevoegen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
