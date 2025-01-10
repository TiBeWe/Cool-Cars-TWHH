# Kompetenznachweis – Projekt "Cool Cars"

**Namen:** Weber Timo und Heiko Ho

**Datum der Abgabe:** 10. Januar 2025  

## Einleitung

Das Projekt "Cool Cars" wurde im Rahmen des Moduls 323 mit dem Ziel umgesetzt, eine benutzerfreundliche Anwendung zur Verwaltung von Fahrzeugdaten zu entwickeln. Besonderer Fokus lag auf der Anwendung funktionaler Programmierkonzepte in JavaScript/React.

Die App umfasst Funktionen zur Sortierung, Suche und eine Paginierungsfunktion, die durch die Prinzipien der funktionalen Programmierung effizient umgesetzt wurden. Ein besonderes Augenmerk wurde auf die Verwendung von **Pure Functions**, **Higher-Order Functions** und **Immutable Data Structures** gelegt, um den Code möglichst modular, wiederverwendbar und leicht testbar zu gestalten.

## Technologien und Konzepte

- **Frontend:** React.js  
- **Backend:** Node.js mit REST-API  
- **Design:** Tailwind CSS  
- **Funktionale Programmierung:** Pure Functions, Higher-Order Functions, Immutable Data Structures  

## Persönliche Kompetenzstufe

**Einschätzung:** Fortgeschritten  

### Begründung:

- **Pure Functions:** Wir konnten diese Konzepte sicher anwenden, wie etwa bei der Implementierung der Sortierfunktion, die ohne Seiteneffekte arbeitet.  
- **Immutable Data:** Die Daten werden in der App niemals direkt verändert, sondern durch neue Kopien ersetzt. Dies zeigt sich beispielsweise in der Filterfunktion.  
- **Higher-Order Functions:** Funktionen wie `map`, `filter` und `reduce` wurden erfolgreich eingesetzt, um Code modular und wiederverwendbar zu gestalten.  

Diese Erfahrungen bestätigen unsere Kompetenz auf einem fortgeschrittenen Niveau, da wir die Konzepte gezielt auf komplexe Anforderungen anwenden konnten.

## Umsetzung der Funktionalen Programmierung

### Pure Functions im Code: `sortBy`

Eine **Pure Function** ist eine Funktion, die keine Seiteneffekte hat und deren Ausgabewerte nur von den Eingabewerten abhängen. Sie verändert keine globalen Zustände und beeinflusst keine anderen Teile der Anwendung.

**Beispiel im Code:**

```javascript
function sortCars(cars, option) {
    let sortedCars = [...cars]; // Erstellen einer Kopie der Liste
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
    return sortedCars; // Rückgabe einer neuen, unveränderten Liste
}
```

- **Erstellt eine Kopie der Liste** und verändert die Originaldaten nicht:
  - `const sortedCars = [...cars];` kopiert das Array, um es zu sortieren, ohne das Original zu ändern.
  
- **Gibt eine neue sortierte Liste zurück**:
  - `return sortedCars;` gibt die sortierte Kopie zurück, ohne den globalen Zustand zu beeinflussen.

- **Bezug zur Kompetenz AF1**:  
  - Die Funktion erstellt eine Kopie der Liste, um Datenmanipulation und Seiteneffekte zu vermeiden.

### Immutable Data Structures

**Immutable Data** bedeutet, dass die Daten niemals direkt verändert werden, sondern immer neue Kopien erzeugt werden. Dies verhindert unerwünschte Nebeneffekte, da der Zustand der Anwendung immer nachvollziehbar bleibt.

**Beispiel im Code:**

```javascript
function filterCars(cars, query) {
    return cars.filter(car =>
        `${car.brand} ${car.model} ${car.horsePower}`.toLowerCase().includes(query.toLowerCase())
    );
}
```

- **Daten werden nicht verändert**, sondern eine neue Liste wird zurückgegeben:
  - Das Original-Array wird niemals bearbeitet, stattdessen wird ein neues Array erzeugt und zurückgegeben.

### Higher-Order Functions

Eine **Higher-Order Function (HOF)** ist eine Funktion, die entweder eine andere Funktion als Argument akzeptiert oder eine Funktion zurückgibt. Dies ermöglicht eine sehr hohe Flexibilität und Modularität im Code.

**Beispiel im Code:**

```javascript
const carBrands = cars.map(car => car.brand);
const uniqueBrands = [...new Set(carBrands)];
```

- `map`: Eine Higher-Order Function, die eine Funktion als Argument akzeptiert und auf jedes Element des Arrays anwendet. In diesem Fall wird eine Liste der Marken aus den Fahrzeugen extrahiert.
- `Set`: Eine native JavaScript-Datenstruktur, die automatisch doppelte Einträge entfernt.

### Lambda-Ausdrücke

Ein **Lambda-Ausdruck** (auch als anonyme Funktion bezeichnet) ermöglicht die Definition von Funktionen direkt innerhalb anderer Funktionen, häufig in der Form von Arrow Functions.

**Beispiel im Code:**

```javascript
cars.filter(car => 
    `${car.brand} ${car.model} ${car.horsePower}`
        .toLowerCase()
        .includes(searchQuery)
);
```

- `car => \${car.brand} ${car.model} ${car.horsePower}`: Eine Lambda-Funktion, die für jedes Fahrzeug eine Zeichenkette aus den Eigenschaften `brand`, `model` und `horsePower` erstellt.
- `.includes(searchQuery)`: Überprüft, ob die Suchanfrage in dieser Zeichenkette enthalten ist.

- **Kompetenzbezug**:
  - *C3F*: Verarbeitung von Argumenten innerhalb des Lambda-Ausdrucks.
  - *C3E*: Verwendung von Lambda-Ausdrücken für das Filtern basierend auf der Suchanfrage.

---

## Reflexion

### Herausforderungen

- **Sortierfunktion (ASC/DESC):** Eine Sortierfunktion implementieren, die es ermöglicht, die Einträge in der App sowohl aufsteigend als auch absteigend zu sortieren. Hierbei sollte garantiert werden, dass keine Seiteneffekte entstehen und die Originaldaten unverändert bleiben.
  
- **Suchfunktion:** Eine Suchfunktion entwickeln, die es ermöglicht, nach spezifischen Begriffen in allen gespeicherten Einträgen zu suchen.

- **Paginierung:** Eine Paginierungsfunktion implementieren, die es ermöglicht, große Datenmengen in überschaubaren Seiten zu navigieren. Die Daten sollen in kleinen, unveränderlichen Chunks geladen und angezeigt werden.

- **Filterfunktion:** Eine Filterfunktion hinzufügen, die es den Benutzern ermöglicht, Einträge nach bestimmten Kriterien zu filtern. Dabei soll sichergestellt werden, dass die Originaldaten unverändert bleiben.
- Die Doku hat einige Schwierigkeiten mit sich gebracht, weil wir sehr unsicher waren wie wir sie aufbauen wollen, ausserdem hat es sehr viel Zeit in anspruch genommen, welche noch zusätzlich erbracht werden musste.
- Github hat einige Probleme mit sich gebracht mit dem Mergen. Jemand musste das Projekt dann jeweils neu klonen, war unsere Lösung

### Lösungsansätze

- **Verwendung von Pure Functions:** Wir haben Pure Functions eingesetzt, um sicherzustellen, dass keine Seiteneffekte entstehen. Beispielsweise wurde eine Sortierfunktion implementiert, die immer eine Kopie der Daten erstellt und nie das Original verändert. Diese Methode entspricht der funktionalen Programmierung und verhindert unvorhergesehene Änderungen an den Daten.
  
  - *Beispiel:* Die Sortierfunktion `sortBy(option, cars)` nutzt eine Kopie der Liste `cars`, sodass das Original-Array unverändert bleibt.

- **Immutable Data Structures:** Wir haben Immutable Data Structures verwendet, um Daten immer durch neue Kopien zu ersetzen, anstatt sie direkt zu verändern. Dies sichert die Unveränderlichkeit der Daten und vereinfacht das Management von State.
  
  - *Beispiel:* Beim Filtern der Fahrzeuge wird das Original-Array `cars` nicht verändert, sondern es wird ein neues Array zurückgegeben.

- **Effiziente Paginierung:** Die Daten wurden in kleine, unveränderliche Chunks aufgeteilt, um die Performance bei großen Datenmengen zu verbessern. Die Paginierungslogik sorgt dafür, dass nur die relevanten Daten angezeigt werden, ohne das gesamte Set zu laden, was die Performance steigert.
  
  - *Beispiel:* Die Paginierung wurde so umgesetzt, dass bei jeder Seitenanfrage nur ein kleiner Teil der Daten geladen wird, ohne die Originaldaten zu verändern.

- **Verwendung von Higher-Order Functions:** Funktionen wie `map`, `filter` und `reduce` wurden eingesetzt, um die Modularität und Wiederverwendbarkeit des Codes zu erhöhen und das State-Management zu vereinfachen.
  
  - *Beispiel:* Die `filter`-Funktion wird verwendet, um die Fahrzeugdaten basierend auf einer Suchanfrage zu filtern, ohne das Originalarray zu verändern.

## Gelerntes und zukünftige Anwendung

Die funktionale Programmierung erlaubt es, modularen und gut testbaren Code zu schreiben. Besonders die Anwendung von **Pure Functions**, **Higher-Order Functions** und die Arbeit mit **Immutable Data** haben den Code nicht nur robuster, sondern auch wartungsfreundlicher gemacht. Der Code ist viel übersichtlicher geworden.

In zukünftigen Projekten möchten wir diese Konzepte weiter vertiefen. Wir haben gemerkt, dass einige Probleme mit funktionaler Programmierung viel einfacher zu lösen sind und uns persönlich (Timo) macht es auch mehr Spaß als die imperative Programmierung.

## Notengebung

**Selbsteinschätzung:** 6.0 / 6.0

**Begründung:**
- Das Projekt wurde erfolgreich und termingerecht abgeschlossen.  
- Die Anforderungen der funktionalen Programmierung wurden vollständig erfüllt.  
- Sogar noch die zusätzliche Funktion hinzugefügt, um neue Autos zu erstellen.
