import Database from "better-sqlite3";
import path from "node:path";

const DB_FILE = path.join(process.cwd(), "spots.db");

declare global {
  var __spotsDb: Database.Database | undefined;
}

export function getDb() {
  if (!globalThis.__spotsDb) {
    globalThis.__spotsDb = new Database(DB_FILE);
    globalThis.__spotsDb.pragma("journal_mode = WAL");
  }

  return globalThis.__spotsDb;
}

export function initDb() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS spots (
      id INTEGER PRIMARY KEY,
      naam TEXT,
      soort_eten TEXT,
      locatie TEXT,
      omschrijving TEXT,
      afbeelding_url TEXT,
      tiktok_url TEXT,
      google_maps_url TEXT
    );
  `);
}

