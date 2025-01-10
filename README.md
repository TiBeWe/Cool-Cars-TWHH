# Kompetenznachweis – Projekt "Cool Cars"

**Namen:** Weber Timo und Heiko Ho
**Datum der Abgabe:** 10. Januar 2025  

## Einleitung

Das Projekt "Cool Cars" wurde im Rahmen des Moduls 323 mit dem Ziel umgesetzt, eine benutzerfreundliche Anwendung zur Verwaltung von Fahrzeugdaten zu entwickeln. Besonderer Fokus lag auf der Anwendung funktionaler Programmierkonzepte in JavaScript/React.

Die App umfasst Funktionen zur Sortierung, Suche und Paginierung, welche durch die Prinzipien der funktionalen Programmierung effizient und modular umgesetzt wurden.

## Technologien und Konzepte

- **Frontend:** React.js  
- **Backend:** Node.js mit REST-API  
- **Funktionale Programmierung:** Pure Functions, Higher-Order Functions, Immutable Data Structures  

## Persönliche Kompetenzstufe

**Einschätzung:** Fortgeschritten  

### Begründung:

- **Pure Functions:** Ich konnte diese Konzepte sicher anwenden, wie etwa bei der Implementierung der Sortierfunktion, die ohne Seiteneffekte arbeitet.  
- **Immutable Data:** Die Daten werden in der App niemals direkt verändert, sondern durch neue Kopien ersetzt. Dies zeigt sich beispielsweise in der Filterfunktion.  
- **Higher-Order Functions:** Funktionen wie `map`, `filter` und `reduce` wurden erfolgreich eingesetzt, um Code modular und wiederverwendbar zu gestalten.  

Diese Erfahrungen bestätigen meine Kompetenz auf einem fortgeschrittenen Niveau, da ich die Konzepte gezielt auf komplexe Anforderungen anwenden konnte.

## Umsetzung der Funktionalen Programmierung

### Angewendete Konzepte und Beispiele

#### Pure Functions

Die Sortierfunktion wurde als pure Function implementiert:

```javascript
function sortCars(cars, option) {
    let sortedCars = [...cars];
    switch (option) {
        case "brand-asc":
            sortedCars.sort((a, b) => a.brand.localeCompare(b.brand));
            break;
        case "brand-desc":
            sortedCars.sort((a, b) => b.brand.localeCompare(a.brand));
            break;
        case "horsePower-asc":
            sortedCars.sort((a, b) => a.horsePower - b.horsePower);
            break;
        case "horsePower-desc":
            sortedCars.sort((a, b) => b.horsePower - a.horsePower);
            break;
        default:
            break;
    }
    return sortedCars;
}
```

### Diese Funktion verändert die Originaldaten nicht und erzeugt stets ein neues Array.

## Immutable Data Structures

Beim Filtern der Fahrzeugdaten wird das Original-Array nicht verändert:

```javascript
function filterCars(cars, query) {
    return cars.filter(car =>
        `${car.brand} ${car.model} ${car.horsePower}`.toLowerCase().includes(query.toLowerCase())
    );
}
## Higher-Order Functions

Die Verwendung von `map` und `filter` optimiert die Verarbeitung von Daten:

```javascript
const carBrands = cars.map(car => car.brand);
const uniqueBrands = [...new Set(carBrands)];

Hier wird `map` genutzt, um eine Liste der Marken zu erzeugen, und `Set`, um doppelte Einträge zu entfernen.

## Reflexion

### Herausforderungen

- **State-Management:** Das Handling von sortierten und gefilterten Daten in React erforderte eine klare Struktur des States, um unerwünschte Seiteneffekte zu vermeiden.  
- **Performance bei großen Datenmengen:** Bei der Implementierung der Paginierung mussten wir sicherstellen, dass die App auch bei vielen Einträgen reibungslos funktioniert.

### Lösungsansätze

- Wir haben Redux vermieden und stattdessen lokale State-Management-Methoden genutzt, die einfacher zu handhaben sind.  
- Die Daten wurden effizient in kleine Abschnitte aufgeteilt, um die Performance zu verbessern.

## Gelerntes und zukünftige Anwendung

Die funktionale Programmierung erlaubt es, modularen und gut testbaren Code zu schreiben.

In zukünftigen Projekten möchte ich die Konzepte weiter vertiefen und etwa mit TypeScript und funktionalen Bibliotheken wie Ramda oder Lodash arbeiten.

## Notengebung

**Selbsteinschätzung:** 5.5 / 6.0

**Begründung:**
- Das Projekt wurde erfolgreich und termingerecht abgeschlossen.  
- Die Anforderungen der funktionalen Programmierung wurden vollständig erfüllt.  
- Es gibt jedoch noch Potenzial zur Optimierung der Performance bei sehr großen Datenmengen.


