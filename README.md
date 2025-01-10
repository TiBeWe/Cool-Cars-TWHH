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
