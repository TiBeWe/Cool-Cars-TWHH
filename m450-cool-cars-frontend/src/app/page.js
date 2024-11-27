"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]); // Gefilterte Liste für Anzeige
    const [sortOption, setSortOption] = useState(""); // Aktuell gewählte Sortieroption
    const [searchQuery, setSearchQuery] = useState(""); // Aktuelle Suchanfrage

    function loadCars() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setFilteredCars(data); // Initial alle Autos anzeigen
            });
    }

    function sortCars(option) {
        let sortedCars = [...filteredCars]; // Nur die gefilterte Liste sortieren
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
        setFilteredCars(sortedCars);
    }

    function handleSortChange(event) {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
        sortCars(selectedOption); // Sortierung basierend auf der Auswahl
    }

    function handleSearchChange(event) {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        const searchResult = cars.filter(car =>
            `${car.brand} ${car.model} ${car.horsePower}`
                .toLowerCase()
                .includes(query)
        );
        setFilteredCars(searchResult);
    }

    return (
        <div className="App">
            <h1>My Frontend - Cool Cars</h1>
            <button onClick={loadCars}>Load Cars</button>
            <br />
            <label htmlFor="searchInput">Search by: </label>
            <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="brand, model, horsepower"
            />
            <br />
            <label htmlFor="sortDropdown">Sort By: </label>
            <select
                id="sortDropdown"
                value={sortOption}
                onChange={handleSortChange}
            >
                <option value="">-- Select Option --</option>
                <option value="brand-asc">Brand (Ascending)</option>
                <option value="brand-desc">Brand (Descending)</option>
                <option value="horsePower-asc">HorsePower (Ascending)</option>
                <option value="horsePower-desc">HorsePower (Descending)</option>
            </select>
            <br />
            <ul>
                {filteredCars.map(car => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + " HP)"}
                    </li>
                ))}
            </ul>
            <br />
            <Link href="/carform">Add a new car</Link>
        </div>
    );
}
