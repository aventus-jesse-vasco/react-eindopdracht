import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "StreetfoodSpotter",
  description: "Ontdek de beste streetfood spots in Nederland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <nav className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform duration-300">
                🍔 StreetfoodSpotter
              </Link>
              
              <div className="hidden md:flex space-x-6">
                <Link 
                  href="/" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Home
                </Link>
                <Link 
                  href="/spots" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Browse Spots
                </Link>
                <Link 
                  href="/add-spot" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Spot Toevoegen
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <label htmlFor="menu-toggle" className="cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
              </div>
            </div>

            {/* Mobile menu */}
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <div className="hidden peer-checked:block md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <Link 
                  href="/" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Home
                </Link>
                <Link 
                  href="/spots" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Browse Spots
                </Link>
                <Link 
                  href="/add-spot" 
                  className="hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Spot Toevoegen
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold mb-2">StreetfoodSpotter</p>
            <p className="text-gray-400 text-sm">Ontdek de beste streetfood spots in Nederland</p>
            <p className="text-gray-500 text-xs mt-4">&copy; 2026 StreetfoodSpotter. Alle rechten voorbehouden.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
