# Testing Checklist

Dit document bevat een overzicht van alle geïmplementeerde user stories en hoe deze te testen.

## ✅ Geïmplementeerde User Stories

### Must-have (M) - Basis Functionaliteit

#### ✅ M1: Klant kan afspraak maken
**User Story:** Als klant kan ik een afspraak maken door mijn naam, emailadres, datum, tijd, dienst (dropdown), en optionele opmerking in te vullen in een formulier en dit te verzenden zodat de afspraak direct in het systeem staat.

**Test:**
1. Ga naar http://localhost:5173
2. Vul het formulier in:
   - Naam: Test Gebruiker
   - Email: test@example.com
   - Datum: Selecteer een datum in de toekomst
   - Tijd: Selecteer een tijdslot
   - Dienst: Kies een dienst (Haircut, Color, Styling, of Consultation)
   - Opmerkingen: Optionele tekst
3. Klik op "Afspraak maken"
4. Verificatie: Je krijgt een succesbericht met het afspraak ID

**Validatie:**
- Alle verplichte velden worden gevalideerd
- Email format wordt gecontroleerd
- Datum in het verleden wordt niet geaccepteerd
- Server-side validatie wordt ook uitgevoerd

---

#### ✅ M2: Medewerker kan inloggen
**User Story:** Als medewerker kan ik inloggen in de applicatie met mijn emailadres en wachtwoord zodat ik toegang heb tot het beveiligde gedeelte.

**Test:**
1. Ga naar http://localhost:5173/login
2. Log in met testaccount:
   - Email: employee@example.com
   - Wachtwoord: password123
3. Klik op "Inloggen"
4. Verificatie: Je wordt doorgestuurd naar het dashboard

**Beveiliging:**
- Wachtwoorden zijn gehashed in de database (bcrypt)
- JWT token wordt opgeslagen in localStorage
- Token vervalt na 24 uur
- Ongeldige credentials geven een foutmelding

---

#### ✅ M3: Medewerker kan overzicht zien
**User Story:** Als medewerker kan ik een overzicht zien van alle afspraken zodat ik weet welke afspraken er zijn gemaakt.

**Test:**
1. Log in als medewerker
2. Je wordt automatisch doorgestuurd naar /dashboard
3. Verificatie: Alle afspraken worden weergegeven in een tabel (desktop) of kaarten (mobiel)

**Features:**
- Responsive design (tabel op desktop, kaarten op mobiel)
- Toont ID, naam, email, datum, tijd, dienst
- Real-time data van de backend
- Vernieuw knop om data opnieuw op te halen

---

#### ✅ M4: Medewerker kan afspraken filteren
**User Story:** Als medewerker kan ik een afspraak zoeken door de lijst te filteren op naam, datum en dienst zodat ik alleen de relevante afspraken zie.

**Test:**
1. Log in als medewerker en ga naar dashboard
2. Gebruik de filter sectie:
   - **Filter op naam:** Type een naam (bijv. "Jan") - Live filtering
   - **Filter op datum:** Selecteer een datum
   - **Filter op dienst:** Kies een dienst uit dropdown
3. Klik op "Filters wissen" om alle filters te verwijderen
4. Verificatie: De lijst wordt dynamisch gefilterd

**Features:**
- Live filtering zonder pagina refresh
- Meerdere filters kunnen tegelijk actief zijn
- Aantal afspraken wordt weergegeven
- Filters kunnen gewist worden met één klik

---

### Should-have (S) - Extra Functionaliteit

#### ✅ S1: Medewerker kan afspraak bewerken
**User Story:** Als medewerker kan ik een afspraak bewerken zodat een klant telefonisch wijzigingen kan doorgeven.

**Test:**
1. Log in als medewerker
2. Klik op "Bewerken" bij een afspraak
3. Wijzig één of meer velden in de modal
4. Klik op "Opslaan"
5. Verificatie: Afspraak wordt bijgewerkt en modal sluit

**Features:**
- Modal met edit formulier
- Alle velden kunnen gewijzigd worden
- Validatie op gewijzigde data
- Geen email verificatie nodig (medewerker privilege)
- Succesbericht na opslaan

---

#### ✅ S2: Medewerker kan afspraak verwijderen
**User Story:** Als medewerker kan ik een afspraak verwijderen zodat een klant telefonisch een afspraak kan annuleren.

**Test:**
1. Log in als medewerker
2. Klik op "Verwijderen" bij een afspraak
3. Bevestig in de modal
4. Verificatie: Afspraak wordt verwijderd uit de lijst

**Features:**
- Confirmatie modal voor veiligheid
- Toont details van te verwijderen afspraak
- Geen email verificatie nodig (medewerker privilege)
- Succesbericht na verwijderen

---

### Could-have (C) - Klant Self-Service

#### ✅ C1: Klant kan eigen afspraak aanpassen
**User Story:** Als klant kan ik mijn afspraak aanpassen, zodat ik zonder bellen een wijziging kan doorgeven.

**Test:**
1. Ga naar http://localhost:5173/mijn-afspraak
2. Vul afspraak ID en email in
3. Klik op "Afspraak zoeken"
4. Klik op "Afspraak wijzigen"
5. Wijzig één of meer velden
6. Klik op "Opslaan"
7. Verificatie: Afspraak wordt bijgewerkt

**Beveiliging:**
- Email verificatie: alleen eigenaar kan wijzigen
- Nieuwe email wordt ook opgeslagen bij wijziging
- Server valideert of email matcht met afspraak

---

#### ✅ C2: Klant kan eigen afspraak verwijderen
**User Story:** Als klant kan ik mijn afspraak verwijderen, zodat ik zonder bellen een afmelding kan doorgeven.

**Test:**
1. Ga naar http://localhost:5173/mijn-afspraak
2. Vul afspraak ID en email in
3. Klik op "Afspraak zoeken"
4. Klik op "Afspraak annuleren"
5. Bevestig in de modal
6. Verificatie: Afspraak wordt verwijderd

**Beveiliging:**
- Email verificatie: alleen eigenaar kan annuleren
- Confirmatie modal voorkomt ongelukken
- Duidelijk succesbericht na annulering

---

## 🎨 Extra Functionaliteiten

### Responsive Design
**Test verschillende schermformaten:**
- 📱 Mobiel (< 640px): Hamburger menu, kaarten layout
- 📱 Tablet (640-1024px): Aangepaste layouts
- 💻 Desktop (> 1024px): Volledige tabel views

### Validatie
**Client-side:**
- Real-time validatie bij blur
- Error messages onder velden
- Disabled submit bij fouten

**Server-side:**
- Express-validator op alle endpoints
- Duidelijke error messages
- 400 Bad Request bij fouten

### User Experience
- Loading states tijdens API calls
- Success en error alerts
- Smooth transitions en hover effects
- Professional color scheme (blue/teal primary, orange accent)
- Google Fonts (Inter)

---

## 🔒 Beveiliging Tests

### Authenticatie
- [x] Login met juiste credentials werkt
- [x] Login met foute credentials faalt
- [x] Dashboard redirect naar login als niet ingelogd
- [x] JWT token vervalt na 24 uur
- [x] Logout verwijdert token en redirect naar login

### Autorisatie
- [x] Klant kan alleen eigen afspraken wijzigen (email check)
- [x] Klant kan alleen eigen afspraken verwijderen (email check)
- [x] Medewerker kan alle afspraken wijzigen
- [x] Medewerker kan alle afspraken verwijderen

### Input Validatie
- [x] SQL injection bescherming
- [x] XSS bescherming
- [x] Email format validatie
- [x] Datum in toekomst validatie
- [x] Required fields validatie

---

## 📊 Browser Compatibility

Getest in:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## 🚀 Performance

- Fast page loads met Vite
- Optimized builds
- Efficient database queries met better-sqlite3
- Client-side filtering voor snelle UX

---

## ✅ Alle Requirements Voldaan

### Verplichte Architectuur
- ✅ Svelte + Tailwind CSS voor frontend
- ✅ Node.js backend
- ✅ SQLite database
- ✅ REST API

### Functionaliteit
- ✅ Alle Must-have (M) user stories
- ✅ Alle Should-have (S) user stories
- ✅ Alle Could-have (C) user stories

### Kwaliteit
- ✅ Gebruiksvriendelijk en responsive
- ✅ Mooie vormgeving met Tailwind
- ✅ Validatie (client en server)
- ✅ Beveiliging (bcrypt, JWT)
- ✅ Error handling

### Documentatie
- ✅ Uitgebreide README
- ✅ API documentatie
- ✅ Installatie instructies
- ✅ Testing checklist
