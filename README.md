# StreetfoodSpotter

Een moderne, mobielvriendelijke webapplicatie voor het ontdekken, zoeken en toevoegen van streetfood spots in Nederland, gebouwd met Next.js, TypeScript, Tailwind CSS en SQLite.

## Functies

- 🏠 **Homepage**: Aantrekkelijke landingspagina met gradient achtergrond en call-to-actions
- 📍 **Spots Overzicht**: Grid van interactieve cards met alle streetfood spots
- 🔍 **Zoekfunctie**: Real-time zoeken op naam of locatie met SQL LIKE queries
- 📄 **Detailpagina's**: Uitgebreide informatie per spot met grote afbeeldingen
- ➕ **Spot Toevoegen**: Formulier met validatie om nieuwe spots toe te voegen
- 🎨 **TikTok & Maps Integratie**: Embedded TikTok videos of Google Maps links per spot
- 📱 **Responsive Design**: Werkt perfect op mobiel, tablet en desktop
- ✨ **Animaties**: Soepele hover-effecten en transitions

## Technologieën

- **Framework**: Next.js 14 (App Router)
- **TypeScript**: Voor type-veilige code
- **Styling**: Tailwind CSS met custom animaties
- **Database**: SQLite met better-sqlite3
- **Features**: Server Components, Server Actions, Client Components

## Installatie

1. Clone de repository:
```bash
git clone <repository-url>
cd svelte-eindopdracht
```

2. Installeer dependencies:
```bash
npm install
```

3. Start de development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in je browser

## Projectstructuur

```
/app
  /page.tsx                    # Homepage (/)
  /spots
    /page.tsx                  # Spots overzicht (/spots)
    /SearchBar.tsx             # Client component voor zoeken
    /[id]
      /page.tsx                # Detail pagina (/spots/[id])
  /add-spot
    /page.tsx                  # Spot toevoegen (/add-spot)
  /layout.tsx                  # Root layout met navigatie
  /globals.css                 # Global styles met Tailwind
/lib
  /db.ts                       # Database connectie & queries
/database.db                   # SQLite database (auto-generated)
```

## Database Schema

```sql
CREATE TABLE spots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  naam TEXT NOT NULL,
  soort_eten TEXT NOT NULL,
  locatie TEXT NOT NULL,
  omschrijving TEXT NOT NULL,
  afbeelding_url TEXT NOT NULL,
  tiktok_url TEXT,
  google_maps_url TEXT
)
```

## Seed Data

De database wordt automatisch gevuld met 6 voorbeeldspots:
- De Burgerkraam (Burgers) - Amsterdam
- Sushi Street (Sushi) - Rotterdam
- Green & Go (Vegan) - Utrecht
- Bubble Tea Paradise (Bubble Tea) - Den Haag
- Taco Fiesta (Mexican) - Eindhoven
- Waffle Wonder (Dessert) - Groningen

## API Functies

De `lib/db.ts` module bevat de volgende functies:

- `getAllSpots()`: Haal alle spots op
- `getSpotById(id)`: Haal specifieke spot op
- `searchSpots(query)`: Zoek spots op naam of locatie
- `addSpot(data)`: Voeg nieuwe spot toe

## Styling Highlights

- **Gradients**: `bg-gradient-to-r from-orange-500 to-red-500`
- **Hover Animaties**: `hover:scale-105 hover:rotate-1`
- **Focus States**: `focus:ring-2 focus:ring-orange-500`
- **Transitions**: `transition-all duration-300`
- **Shadows**: `shadow-lg hover:shadow-xl`
- **Responsive**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

## Build & Deploy

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Assessment Voorbereiding

Voor het criteriumgericht interview, wees voorbereid om uit te leggen:

1. **Database**: Hoe SQLite is opgezet met better-sqlite3 en hoe queries werken
2. **Zoekfunctie**: Implementatie van SQL LIKE queries voor dynamisch filteren
3. **Media**: Hoe TikTok embeds vs Google Maps links conditioneel worden weergegeven
4. **Formulier**: Validatie en opslag met Next.js Server Actions
5. **Styling**: Gebruik van Tailwind classes voor visuele hiërarchie en interacties
6. **Routing**: Next.js App Router met dynamic routes en layouts
7. **Components**: Verschil tussen Server Components en Client Components

## Beoordelingscriteria Checklist

- ✅ Database: SQLite correct opgezet met 6+ spots
- ✅ Navigatie: Duidelijk menu, responsive
- ✅ Homepage: Uitleg, animaties, call-to-action, visueel verzorgd
- ✅ Spotoverzicht: Cards met spotinfo + TikTok/Maps
- ✅ Zoekfunctie: Werkt correct via database
- ✅ Detailpagina: Juiste gegevens en media
- ✅ Toevoegen: Formulier met validatie
- ✅ Styling: Tailwind, aantrekkelijke layout
- ✅ Inlevering: Checklist gevolgd
- ✅ Demonstratie: Alles werkt live

## Bronnen

- [Next.js Documentatie](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [React Documentatie](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

## Licentie

Dit project is gemaakt voor educatieve doeleinden.
