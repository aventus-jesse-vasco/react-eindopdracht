import { initDb, getDb } from "./db";

export type Spot = {
  id: number;
  naam: string;
  soort_eten: string;
  locatie: string;
  omschrijving: string;
  afbeelding_url: string;
  tiktok_url: string | null;
  google_maps_url: string | null;
};

export type CreateSpotInput = Omit<Spot, "id">;

declare global {
  var __spotsDbReady: boolean | undefined;
}

function ensureReady() {
  initDb();
  const db = getDb();

  if (globalThis.__spotsDbReady) return;

  const row = db.prepare("SELECT COUNT(*) as cnt FROM spots").get() as {
    cnt: number;
  };

  if (row.cnt === 0) {
    const insert = db.prepare(`
      INSERT INTO spots
        (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
      VALUES
        (@naam, @soort_eten, @locatie, @omschrijving, @afbeelding_url, @tiktok_url, @google_maps_url)
    `);

    const sample: CreateSpotInput[] = [
      {
        naam: "Midnight Tacos",
        soort_eten: "tacos",
        locatie: "Rotterdam Centrum",
        omschrijving:
          "Kleine kraam met knapperige tacos en verse salsa. Snel, pittig en altijd druk.",
        afbeelding_url:
          "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80",
        tiktok_url: "https://www.tiktok.com/@scout2015/video/6718335390845095173",
        google_maps_url: null
      },
      {
        naam: "Bubble Tea Corner",
        soort_eten: "bubble tea",
        locatie: "Utrecht Stationsgebied",
        omschrijving:
          "Zoet, fris en veel toppings. Perfect voor onderweg na school of werk.",
        afbeelding_url:
          "https://images.unsplash.com/photo-1627998254558-0e56c1f72473?auto=format&fit=crop&w=1200&q=80",
        tiktok_url: null,
        google_maps_url: "https://maps.google.com/?q=Utrecht+Centraal"
      },
      {
        naam: "Vegan Dumpling Lab",
        soort_eten: "vegan",
        locatie: "Amsterdam De Pijp",
        omschrijving:
          "Gestoomde dumplings met verrassende vullingen. Alles plantaardig, heel veel smaak.",
        afbeelding_url:
          "https://images.unsplash.com/photo-1604908177072-1a09b5cde6a2?auto=format&fit=crop&w=1200&q=80",
        tiktok_url: "https://www.tiktok.com/@scout2015/video/6718335390845095173",
        google_maps_url: null
      },
      {
        naam: "Sate Alley",
        soort_eten: "sate",
        locatie: "Den Haag",
        omschrijving:
          "Saté van de grill met pindasaus en krokante uitjes. Klassieker die nooit faalt.",
        afbeelding_url:
          "https://images.unsplash.com/photo-1632352555421-7f4f7f66b74c?auto=format&fit=crop&w=1200&q=80",
        tiktok_url: null,
        google_maps_url: "https://maps.google.com/?q=Den+Haag"
      },
      {
        naam: "Seoul Street Bites",
        soort_eten: "Korean",
        locatie: "Eindhoven",
        omschrijving:
          "Krokante kip, kimchi en spicy mayo. Comfort food met een kick.",
        afbeelding_url:
          "https://images.unsplash.com/photo-1626082927375-6f9d7f89f480?auto=format&fit=crop&w=1200&q=80",
        tiktok_url: "https://www.tiktok.com/@scout2015/video/6718335390845095173",
        google_maps_url: null
      }
    ];

    const tx = db.transaction((items: CreateSpotInput[]) => {
      for (const item of items) insert.run(item);
    });
    tx(sample);
  }

  globalThis.__spotsDbReady = true;
}

export function listSpots(opts: { q?: string | null }) {
  ensureReady();
  const db = getDb();

  const q = (opts.q ?? "").trim();
  if (!q) {
    return db
      .prepare("SELECT * FROM spots ORDER BY id DESC")
      .all() as Spot[];
  }

  const like = `%${q}%`;
  return db
    .prepare(
      "SELECT * FROM spots WHERE naam LIKE ? OR locatie LIKE ? ORDER BY id DESC"
    )
    .all(like, like) as Spot[];
}

export function getSpotById(id: number) {
  ensureReady();
  const db = getDb();
  return db.prepare("SELECT * FROM spots WHERE id = ?").get(id) as
    | Spot
    | undefined;
}

export function createSpot(input: CreateSpotInput) {
  ensureReady();
  const db = getDb();
  const info = db
    .prepare(`
      INSERT INTO spots
        (naam, soort_eten, locatie, omschrijving, afbeelding_url, tiktok_url, google_maps_url)
      VALUES
        (@naam, @soort_eten, @locatie, @omschrijving, @afbeelding_url, @tiktok_url, @google_maps_url)
    `)
    .run(input);

  return Number(info.lastInsertRowid);
}

