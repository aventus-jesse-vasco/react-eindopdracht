Svelte - 07. Eindopdracht
Due January 16, 2026 12:00 PM
Svelte (Laravel frontend)
Instructions
Hey Jij! 

 

Je bent klaar met de praktische vaardigheden uit de module. Het is nu tijd om je praktische vaardigheden te toetsen aan de hand van een criterium gericht interview of anders gezegd: assessment. Dit doe je door het maken van een eindopdracht en een gesprek erover.  

 

🎯 Leerdoelen 

Na deze opdracht: 

Kun je uitleggen hoe een Svelte project is opgebouwd. 
Kun je werken met componenten, props en reactiviteit in Svelte. 
Kun je een backend opzetten met Laravel en NodeJS. 
Kun je gegevens opslaan en ophalen uit een database(SQL of NO-SQL). 
Kun je frontend (Svelte) en Backend (Laravel/Node.js) koppelen via een eigen gemaakte API. 
Kun je formulieren bouwen met validatie. 
Kun je gebruikers authentiseren en autoriseren (inloggen met gebruikersrollen). 
Kun je data dynamisch weergeven op basis van invoer. 
 

📝 Instructie – Praktijkopdracht 

Je maakt een volledige webapplicatie waarmee klanten van een bedrijf (bijvoorbeeld een kapsalon of praktijk) zelf afspraken kunnen maken. Medewerkers van het bedrijf kunnen, na inloggen, de afspraken bekijken, bewerken en verwijderen. User stories 

 

De applicatie is gebruiksvriendelijk, responsive, voorzien van aansprekende foto’s en stijlvolle kleuren. Validatie is toegepast. 



Verplichte Architectuur 

Svelte + Tailwind CSS voor de voorkant 
NodeJs of Laravel backend voor het ophalen en opslaan van gegevens 
Een database (bijv. SQLite, MYSQL, PostgreSQL of Firebase) om de afspraken op te slaan. 


User stories 

Als klant kan ik een afspraak maken door mijn naam, emailadres, datum, tijd, dienst (dropdown), en optionele opmerking in te vullen in een formulier en dit te verzenden zodat de afspraak direct in het systeem staat (M). 
Als medewerker kan ik inloggen in de applicatie met mijn emailadres en wachtwoord zodat ik toegang heb tot het beveiligde gedeelte (M). 
Als medewerker kan ik een overzicht zien van alle afspraken zodat ik weet welke afspraken er zijn gemaakt (M). 
Als medewerker kan ik een afspraak zoeken door de lijst te filteren op naam, datum en dienst zodat ik alleen de relevante afspraken zie (M). 
Als medewerker kan ik een afspraak bewerken zodat een klant telefonisch wijzigingen kan doorgeven (S). 
Als medewerker kan ik een afspraak verwijderen zodat een klant telefonisch een afspraak kan annuleren (S). 
Als klant kan ik mijn afspraak aanpassen, zodat ik zonder bellen een wijziging kan doorgeven (C). 
Als klant kan ik mijn afspraak verwijderen, zodat ik zonder bellen een afmelding kan doorgeven (C), 
 

Backend 

Je maakt een api met routes waarmee je afspraakgegevens kunt ophalen, toevoegen, bewerken en verwijderen. De backend wordt gerealiseerd in NodeJS of Laravel met een (mysql, postgresql of sqlite) database.  



Routes: 

/api/afspraken              GET                 Haalt een lijst op van alle afspraken 
/api/afspraken              POST               Voegt een nieuwe afspraak toe 
/api/afspraken/[id]         GET                 Haalt de gegevens op van één specifieke afspraak 
/api/afspraken/[id]         PUT                 Past een bestaande afspraak aan 
/api/afspraken/[id]         DELETE           Verwijdert een afspraak 
/api/login                      POST              Controleert of de medewerker correct inlogt 
 

📝 Instructie – Assessment 

Je kunt je voorbereiden op het gesprek door alvast te kijken naar de leerdoelen en hierbij jezelf af te vragen of je alle doelen hebt toegepast in eerdere opdrachten en dit kan uitleggen. 

 

📤 Inleveren 

Screenshot van de frontend van de werkende applicatie. 
Screenshot van de backend van de werkende applicatie. 
Readme met installatie instructie voor de frontend, de backend en de database 
Link naar de repository met daarin de uitwerking van de opdracht. 
 

✅ Voorwaarden 

Alle user stories zijn gerealiseerd. 
De applicatie is gebruiksvriendelijk, netjes vormgegeven en responsive. 
De code is gerealiseerd volgens de conventies van de meest actuele versie van het framework  
De gevraagde screenshots en de applicatie met readme zijn ingeleverd via git 
Je kunt helder en volledig toelichten hoe een Svelte-project is opgebouwd, inclusief de rol van componenten, bestandsstructuur en build-omgeving. 
Je kunt begrijpelijk verklaren hoe Svelte-componenten werken, hoe props worden doorgegeven en hoe reactiviteit wordt toegepast in functionele voorbeelden. 
Je kunt duidelijk beschrijven welke stappen nodig zijn om een backend op te zetten, inclusief routing, controllers en basisconfiguratie in Laravel of Node.js. 
Je kunt begrijpelijk uitleggen hoe databaseconnecties werken en hoe gegevens kunnen worden opgeslagen en opgehaald in zowel SQL- als NoSQL-systemen. 
Je kunt inzichtelijk toelichten hoe de frontend (Svelte) communiceert met de backend (Laravel/Node.js) via deze API. 
Je kunt duidelijk beschrijven hoe je formulieren bouwt met client-side en server-side validatie en hoe je foutafhandeling toepast. 
Je kunt helder verklaren hoe gebruikers worden geauthenticeerd en geautoriseerd, inclusief het gebruik van verschillende gebruikersrollen. 
Je kunt duidelijk uitleggen hoe gebruikersinvoer wordt verwerkt en hoe dit leidt tot dynamische weergave of updates van data in de interface. 
 

 

📚 Bronnen 

Svelte E-learning: https://svelte.dev/tutorial 
Svelte documentatie https://svelte.dev/docs 
NodeJS https://nodejs.org/         
Laravel https://laravel.com/        
Firebase https://firebase.google.com/     
PostgreSQL https://www.postgresql.org/            
Vite https://vite.dev/       
Tailwind Css https://tailwindcss.com       
