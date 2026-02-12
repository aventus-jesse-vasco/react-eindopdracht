# AfspraakPlanner - Appointment Booking System

Een volledige webapplicatie waarmee klanten van een bedrijf (bijvoorbeeld een kapsalon of praktijk) zelf afspraken kunnen maken. Medewerkers kunnen, na inloggen, de afspraken bekijken, bewerken en verwijderen.

## 📋 Inhoudsopgave

- [Functionaliteiten](#functionaliteiten)
- [Tech Stack](#tech-stack)
- [Vereisten](#vereisten)
- [Installatie](#installatie)
- [Gebruik](#gebruik)
- [API Endpoints](#api-endpoints)
- [Gebruikersrollen](#gebruikersrollen)
- [Screenshots](#screenshots)

## ✨ Functionaliteiten

### Voor Klanten
- ✅ Afspraak maken met validatie (naam, email, datum, tijd, dienst, opmerkingen)
- ✅ Eigen afspraak opzoeken met ID en email
- ✅ Afspraak wijzigen
- ✅ Afspraak annuleren

### Voor Medewerkers
- ✅ Inloggen met email en wachtwoord
- ✅ Overzicht van alle afspraken
- ✅ Afspraken filteren op naam, datum en dienst
- ✅ Afspraken bewerken (zonder email verificatie)
- ✅ Afspraken verwijderen (zonder email verificatie)

### Extra Features
- 🎨 Moderne, responsive UI met Tailwind CSS
- ✅ Client-side en server-side validatie
- 🔒 JWT-authenticatie voor medewerkers
- 📱 Volledig responsive design (mobiel, tablet, desktop)
- ⚡ Real-time filtering en zoeken
- 🎯 Gebruiksvriendelijke error handling

## 🛠 Tech Stack

### Frontend
- **Svelte 5** - Modern JavaScript framework
- **SvelteKit** - Framework voor Svelte applicaties
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool en development server

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite** - Embedded database
- **better-sqlite3** - Synchrone SQLite library
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authenticatie
- **express-validator** - Input validatie

## 📋 Vereisten

Voordat je begint, zorg ervoor dat je het volgende hebt geïnstalleerd:

- **Node.js** versie 18 of hoger
- **npm** (komt met Node.js)

Controleer je versies:
```bash
node --version  # Moet v18.0.0 of hoger zijn
npm --version   # Moet v9.0.0 of hoger zijn
```

## 🚀 Installatie

### 1. Clone de repository

```bash
git clone <repository-url>
cd react-eindopdracht
```

### 2. Backend installatie

```bash
# Ga naar de backend directory
cd backend

# Installeer dependencies
npm install

# De database wordt automatisch aangemaakt bij eerste start
```

### 3. Frontend installatie

```bash
# Ga naar de frontend directory (vanuit root)
cd ../frontend

# Installeer dependencies
npm install
```

## 🎯 Gebruik

### Backend starten

```bash
cd backend
npm start
```

De backend server draait nu op: **http://localhost:3000**

Je zou de volgende output moeten zien:
```
Initializing database...
Default employee account created:
  Email: employee@example.com
  Password: password123
3 sample appointments created
Database initialized successfully
🚀 Server is running on http://localhost:3000
📊 API available at http://localhost:3000/api
```

### Frontend starten

Open een **nieuwe terminal** en voer uit:

```bash
cd frontend
npm run dev
```

De frontend applicatie draait nu op: **http://localhost:5173**

Open je browser en ga naar **http://localhost:5173** om de applicatie te gebruiken.

## 🔑 Gebruikersrollen

### Standaard Medewerker Account

Voor testing is er een standaard medewerker account aangemaakt:

- **Email:** `employee@example.com`
- **Wachtwoord:** `password123`

Gebruik deze credentials om in te loggen op: http://localhost:5173/login

### Testdata

Er zijn 3 voorbeeld afspraken aangemaakt in de database die je direct kunt zien in het dashboard.

## 📡 API Endpoints

### Publieke Endpoints

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| POST | `/api/afspraken` | Maak een nieuwe afspraak |
| GET | `/api/afspraken/:id` | Haal een specifieke afspraak op |
| PUT | `/api/afspraken/:id` | Wijzig een afspraak (met email verificatie) |
| DELETE | `/api/afspraken/:id` | Verwijder een afspraak (met email verificatie) |
| POST | `/api/login` | Medewerker login |

### Beveiligde Endpoints (Vereist JWT token)

| Method | Endpoint | Beschrijving |
|--------|----------|--------------|
| GET | `/api/afspraken` | Haal alle afspraken op (met optionele filters) |
| PUT | `/api/employee/afspraken/:id` | Wijzig afspraak als medewerker |
| DELETE | `/api/employee/afspraken/:id` | Verwijder afspraak als medewerker |

### Voorbeeld API Requests

#### Afspraak maken (POST /api/afspraken)
```json
{
  "customer_name": "Jan de Vries",
  "email": "jan@example.com",
  "date": "2026-02-20",
  "time": "10:00",
  "service": "Haircut",
  "remarks": "Graag kort aan de zijkanten"
}
```

#### Medewerker login (POST /api/login)
```json
{
  "email": "employee@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "employee": {
    "id": 1,
    "name": "Admin Employee",
    "email": "employee@example.com"
  }
}
```

## 🎨 Beschikbare Diensten

De applicatie ondersteunt de volgende diensten:
- **Haircut** - Knippen
- **Color** - Kleuren
- **Styling** - Styling
- **Consultation** - Consult

## 📱 Pagina's

### Voor Klanten
- **Homepage (/)** - Afspraak maken formulier met hero sectie
- **Mijn Afspraak (/mijn-afspraak)** - Afspraak opzoeken en beheren

### Voor Medewerkers
- **Login (/login)** - Inloggen voor medewerkers
- **Dashboard (/dashboard)** - Overzicht en beheer van alle afspraken

## 🔒 Beveiliging

- Wachtwoorden worden gehashed met bcrypt (10 salt rounds)
- JWT tokens met 24 uur geldigheid
- Input validatie op client en server
- SQL injection bescherming
- CORS geconfigureerd
- Klanten kunnen alleen hun eigen afspraken wijzigen (email verificatie)

## 📂 Project Structuur

```
react-eindopdracht/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Business logica
│   │   ├── db/               # Database initialisatie
│   │   ├── middleware/       # Auth, validatie, error handling
│   │   ├── models/           # Database models
│   │   ├── routes/           # API routes
│   │   └── server.js         # Express server
│   ├── database.sqlite       # SQLite database (auto-created)
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── lib/
│   │   │   ├── components/  # Herbruikbare componenten
│   │   │   └── stores/      # Svelte stores (state management)
│   │   ├── routes/          # SvelteKit routes (pages)
│   │   ├── app.css          # Global styles
│   │   └── app.html         # HTML template
│   ├── static/              # Statische bestanden
│   ├── package.json
│   └── .env
└── README.md
```

## 🐛 Troubleshooting

### Backend start niet
- Controleer of poort 3000 vrij is: `lsof -i :3000`
- Verwijder `database.sqlite` en start opnieuw

### Frontend start niet
- Verwijder `node_modules` en `.svelte-kit` mappen
- Voer `npm install` opnieuw uit
- Controleer of poort 5173 vrij is

### API errors
- Controleer of backend draait op http://localhost:3000
- Check console logs in de browser (F12)
- Controleer backend terminal voor error messages

### Database errors
- Verwijder `backend/database.sqlite`
- Herstart backend server (database wordt opnieuw aangemaakt)

## 📝 Development Scripts

### Backend
```bash
npm start      # Start de server
npm run dev    # Start met --watch (auto-reload)
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build voor productie
npm run preview  # Preview productie build
```

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden.

## 👥 Contact

Voor vragen of problemen, neem contact op via:
- Email: info@afspraakplanner.nl
- Telefoon: 020 123 4567

---

**Gemaakt met ❤️ voor de Svelte eindopdracht**
