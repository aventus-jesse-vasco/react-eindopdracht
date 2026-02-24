괜괝괞괟괠괡괢괧괣괤괥괦 Week 7-8: React 2 – 07. Eindopdracht
Hey Jij!
Je bent klaar met de praktische vaardigheden uit de module. Het is nu tijd om je praktische
vaardigheden te toetsen aan de hand van een criterium gericht interview of anders gezegd:
assessment. Dit doe je door het maken van een eindopdracht. Je kan je voorbereiden door alvast te
kijken naar de leerdoelen en hierbij jezelf af te vragen of je alle doelen hebt toegepast in eerdere
opdrachten en dit kan uitleggen met steekhoudende argumenten (verklaren).
Je bent zelf verantwoordelijk voor het tijdig inplannen van een assessment. Indien de deadline is
verstreken is herkansing mogelijk, maar dit is enkel binnen het gestelde termijn in de planning.
괜괝괞괟괠괡괢괧괣괤괥괦 Plan je eindgesprek (assessment) in bij je vakdocent.
너넉넊넋넌넍 Maak een .zip-bestand van je hele projectmap uit de eindopdracht(StreetfoodSpotter).
광괒 Zorg voor een duidelijke mappenstructuur in je project (zoals je dat geleerd hebt).
귞귟균귡귢귣귤귥 Lever je .zip-bestand in via Teams, bij de opdracht ‘Eindopdracht StreetfoodSpotter’.
괘괙괚괛 Lees de beoordelingsrubriek goed door, zodat je weet waarop je wordt beoordeeld.
결겱 Oefen je gesprek: leg kort uit wat je hebt gebouwd, waarom je bepaalde keuzes hebt gemaakt en
hoe je het technisch hebt opgelost.
Leerdoelen:
Na de module react 2 (next.js) ben je in staat om:
 Te Beschrijven hoe een Next.js-project is opgebouwd, inclusief routing, layout en
componentstructuur.
 Te beschrijven wat het voordeel is van Vercel en de gekoppelde technieken als postgressql.
 Streaming rendering toe te passen voor het eƯiciënt laden van data in componenten.
 Een toepassing te maken van navigatie, layout en componenthergebruik binnen een App
Router-structuur.
 Gegevens op te halen en weer te geven in een next.js applicatie op basis van data uit een
eigen database.
 Een invoerformulier te creëren dat gebruikersdata verwerkt en opslaat in de database.
 Een implementatie te maken van een zoekfunctie die resultaten dynamisch filtert op basis
van invoer.
 Een integratie te maken van externe media binnen cards en detailpagina’s.
虌虇虈虉虊虋 Eindopdracht – StreetfoodSpotter
Doel:
Je bouwt een webapplicatie waarin je streetfoodspots kunt bekijken, zoeken, toevoegen en beheren.
Elke spot is opgeslagen in een eigen SQLite-database. Je maakt gebruik van Next.js en Tailwind CSS.
Elke spot toont een TikTok-embed of een link naar Google Maps, direct zichtbaar in de kaart op de
overzichtspagina.
껩 Wat moet je maken?
 Je maakt een moderne, mobielvriendelijke webapp in next.js met:
 Een homepage met sfeer en uitleg;
 Een overzicht van spots in mooie interactieve cards;
 Per spot een detailpagina met alle info;
 Een zoekfunctie op naam of locatie;
 Een formulier om zelf spots toe te voegen;
 In elke card: een live preview van TikTok of een Maps-link;
 Styling met Tailwind, inclusief lichte hover-animaties;

너넉넊넋넌넍 Pagina’s die je bouwt
1. Homepage (/)
 Titel, korte uitleg en button "Bekijk spots"
 Gebruik een grote achtergrondafbeelding of kleur
 Styling met Tailwind (bijv. bg-gradient-to-r, text-shadow, hover:scale-105)
 Responsive ontwerp (werkt ook op mobiel)
2. Spots-overzicht (/spots)
 Alle spots worden weergegeven in een Tailwind grid van cards
 Elke card bevat:
o Naam
o Locatie
o Afbeelding
o Preview van TikTok-embed óf een kleine kaartlink
o Button "Meer info"
 Gebruik een lichte 3D-hover animatie:
1. className="transform transition-transform duration-300 hover:scale-105 hover:rotate-1"
 Styling voorbeeld met embedded stuk:
 1. {spot.tiktok_url ? (
 2. <iframe
 3. src={`https://www.tiktok.com/embed/${extractVideoId(spot.tiktok_url)}`}
 4. className="w-full aspect-[9/16] rounded-lg"
 5. allow="autoplay; encrypted-media"
 6. />
 7. ) : spot.google_maps_url ? (
 8. <a href={spot.google_maps_url} target="_blank" className="block text-blue-500 mt-2
underline">
 9. Bekijk op Google Maps
10. </a>
11. ) : (
12. <p className="text-sm text-gray-500">Geen media beschikbaar</p>
13. )}
3. Detailpagina (/spots/[id])
 Toon daar:
o Naam
o Soort eten
o Locatie
o Omschrijving
o Grote afbeelding
o Grote TikTok embed of knop naar Google Maps
4. Spot toevoegen (/add-spot)
 Formulier met velden:
o Naam
o soort eten (bijv. burgers, sushi, vegan, bubble tea, …)
o locatie
o omschrijving
o afbeelding-URL
o TikTok-URL (optioneel)
o Google Maps-URL (optioneel, één van beide verplicht)
 Opslaan spot in SQLite database
꺎꺌꺍 Zoekfunctie (verplicht) – Doe dit pas na alle eerdere stappen -
 Bovenaan de overzichtspagina staat een zoekveld
 Zoeken werkt op naam of locatie
 Resultaten worden dynamisch gefilterd vanuit de database met SQL LIKE of een soortgelijke
manier.
귑귒귓귔귕귖 Database
Gebruik SQLite (better-sqlite3) met deze structuur:
Kolomnaam Datatype Omschrijving
id INTEGER Uniek ID-nummer van de spot (Automatisch gegenereerd)
naam TEXT Naam van de streetfoodspot
soort_eten TEXT Type eten (bijv. burgers, sushi, vegan, bubble tea)
locatie TEXT Plaats of wijk waar de spot staat
omschrijving TEXT Korte toelichting op het eten of concept
afbeelding_url TEXT Link naar een afbeelding van het eten of de kraam
tiktok_url TEXT Embedbare TikTok-video URL (optioneel)
google_maps_url TEXT Link naar Google Maps locatie (optioneel)
Je kan hiervoor de volgende query gebruiken in sqllite:
 1. CREATE TABLE spots (
 2. id INTEGER PRIMARY KEY,
 3. naam TEXT,
 4. soort_eten TEXT,
 5. locatie TEXT,
 6. omschrijving TEXT,
 7. afbeelding_url TEXT,
 8. tiktok_url TEXT,
 9. google_maps_url TEXT
10. );
蘒蘓蘔蘕蘖 Styling
 Gebruik Tailwind CSS
 Zorg voor duidelijke kleuren, leesbaarheid, en een consistente stijl
 Gebruik animaties voor hover, transitions en focus-states
 Zorg dat alles responsive is (werkt op telefoon én laptop)
蘃蘁蘂 Assessment – criteriumgericht interview
Na oplevering leg je je keuzes en werking mondeling uit aan je docent. Je kan bijvoorbeeld worden
gevraagd:
 Hoe je database werkt
 Hoe je zoekfunctie technisch werkt
 Hoe de media-keuze werkt in je cards
 Hoe je formulier gegevens opslaat en valideert
 Hoe je Tailwind hebt gebruikt voor interactie en visuele hiërarchie
De vragen verschillen per assessment, maar zijn altijd in lijn met de beoordelingscriteria.
脥�Beoordelingscriteria:
Onderdeel Niet verklaard( 0) / verklaard (1) Toelichting
Database SQLite is correct opgezet en
gevuld met minimaal 5
spots.
Navigatie Duidelijk menu, werkt goed
op alle apparaten.
Homepage Bevat uitleg, animatie, callto-action en is visueel
verzorgd.
Spotoverzicht Cards tonen spotinfo +
TikTok-embed of Maps-link.
Zoekfunctie Zoekt correct via database
op naam of locatie.
Detailpagina Toont juiste gegevens en
juiste media.
Toevoegen Formulier met validatie,
slaat op in database.
Styling Tailwind gebruikt, layout is
aantrekkelijk en consistent.
Correct inleveren Student gebruikt checklist
van opdracht voor
inleverinstructie en houd
zich hieraan.
Live demonstratie Student is in staat de
website live werkend met
alle eisen te demonstreren.
Cijfer berekening: aantal punten / 10 * 9 + 1.
Bronmateriaal
Bron URL
Next.JS e-learning omgeving https://nextjs.org/learn
Next.JS documentatie https://nextjs.org/docs
React https://react.dev/
NodeJS https://nodejs.org/
Vite https://vite.dev/
Module behaald: Gefeliciteerd je bent gepromoveerd naar de laatste module(6) uit fase 2씌씇씈씉씊씍씎씏씐씑씒씋누!
Module niet behaald: Niet getreurd, je dient samen met jouw docent een afspraak te maken voor
herkansing van het assessment. Oefen vooral met een buur/collega een proef-assessment, hiermee
kun je jouw skills voor het verklaren van de praktische vaardigheden oefenen.