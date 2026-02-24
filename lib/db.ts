import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.db');
const db = new Database(dbPath);

// Initialize database and create table if it doesn't exist
export function initDatabase() {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS spots (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      naam TEXT NOT NULL,
      soort_eten TEXT NOT NULL,
      locatie TEXT NOT NULL,
      omschrijving TEXT NOT NULL,
      afbeelding_url TEXT NOT NULL,
      tiktok_url TEXT,
      google_maps_url TEXT
    )
  `;
  
  db.exec(createTableSQL);
  
  // Check if we need to seed the database
  const count = db.prepare('SELECT COUNT(*) as count FROM spots').get() as { count: number };
  
  if (count.count === 0) {
    seedDatabase();
  }
}

// Seed database with example spots
function seedDatabase() {
  const insertSpot = db.prepare(`
    INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const spots = [
    {
      naam: 'De Burgerkraam',
      soort_eten: 'Burgers',
      locatie: 'Amsterdam Centrum',
      omschrijving: 'De beste streetfood burgers van Amsterdam met verse ingrediënten en heerlijke sauzen. Elke burger wordt vers bereid met liefde en passie.',
      afbeelding_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Amsterdam+Centrum'
    },
    {
      naam: 'Sushi Street',
      soort_eten: 'Sushi',
      locatie: 'Rotterdam Markthal',
      omschrijving: 'Verse sushi gemaakt door ervaren chefs. Van klassieke maki tot moderne fusion rolls, alles is mogelijk bij Sushi Street.',
      afbeelding_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Rotterdam+Markthal'
    },
    {
      naam: 'Green & Go',
      soort_eten: 'Vegan',
      locatie: 'Utrecht Centraal',
      omschrijving: 'Heerlijke vegan streetfood met Aziatische invloeden. Van bao buns tot pokebowls, alles 100% plantaardig en super vers.',
      afbeelding_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Utrecht+Centraal'
    },
    {
      naam: 'Bubble Tea Paradise',
      soort_eten: 'Bubble Tea',
      locatie: 'Den Haag Centrum',
      omschrijving: 'De lekkerste bubble tea met tientallen smaken en toppings. Vers gemaakt met echte thee en natuurlijke ingrediënten.',
      afbeelding_url: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Den+Haag+Centrum'
    },
    {
      naam: 'Taco Fiesta',
      soort_eten: 'Mexican',
      locatie: 'Eindhoven Stratumseind',
      omschrijving: 'Authentieke Mexicaanse taco\'s met verse salsa en guacamole. Kies uit verschillende vleessoorten of ga voor vegetarisch.',
      afbeelding_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Eindhoven+Stratumseind'
    },
    {
      naam: 'Waffle Wonder',
      soort_eten: 'Dessert',
      locatie: 'Groningen Grote Markt',
      omschrijving: 'Verse Belgische wafels met alle toppings die je maar kan bedenken. Van Nutella tot vers fruit, alles is mogelijk.',
      afbeelding_url: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500',
      tiktok_url: null,
      google_maps_url: 'https://maps.google.com/?q=Groningen+Grote+Markt'
    }
  ];
  
  const insertMany = db.transaction((spots) => {
    for (const spot of spots) {
      insertSpot.run(
        spot.naam,
        spot.soort_eten,
        spot.locatie,
        spot.omschrijving,
        spot.afbeelding_url,
        spot.tiktok_url,
        spot.google_maps_url
      );
    }
  });
  
  insertMany(spots);
}

// Initialize on module load
initDatabase();

export interface Spot {
  id: number;
  naam: string;
  soort_eten: string;
  locatie: string;
  omschrijving: string;
  afbeelding_url: string;
  tiktok_url: string | null;
  google_maps_url: string | null;
}

// Get all spots
export function getAllSpots(): Spot[] {
  const stmt = db.prepare('SELECT * FROM spots ORDER BY id DESC');
  return stmt.all() as Spot[];
}

// Get spot by ID
export function getSpotById(id: number): Spot | undefined {
  const stmt = db.prepare('SELECT * FROM spots WHERE id = ?');
  return stmt.get(id) as Spot | undefined;
}

// Search spots by name or location
export function searchSpots(query: string): Spot[] {
  if (!query || query.trim() === '') {
    return getAllSpots();
  }
  
  const searchTerm = `%${query}%`;
  const stmt = db.prepare(`
    SELECT * FROM spots 
    WHERE naam LIKE ? OR locatie LIKE ?
    ORDER BY id DESC
  `);
  return stmt.all(searchTerm, searchTerm) as Spot[];
}

// Add a new spot
export function addSpot(data: Omit<Spot, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO spots (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    data.naam,
    data.soort_eten,
    data.locatie,
    data.omschrijving,
    data.afbeelding_url,
    data.tiktok_url,
    data.google_maps_url
  );
  
  return result.lastInsertRowid as number;
}
