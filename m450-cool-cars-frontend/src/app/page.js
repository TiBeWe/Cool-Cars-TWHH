"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [sortOption, setSortOption] = useState(""); // Aktuell gewählte Sortieroption

    function loadCars() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => setCars(data));
    }

    function sortCars(option) {
        let sortedCars;
        switch (option) {
            case "brand-asc":
                sortedCars = [...cars].sort((a, b) => a.brand.localeCompare(b.brand));
                break;
            case "brand-desc":
                sortedCars = [...cars].sort((a, b) => b.brand.localeCompare(a.brand));
                break;
            case "horsePower-asc":
                sortedCars = [...cars].sort((a, b) => a.horsePower - b.horsePower);
                break;
            case "horsePower-desc":
                sortedCars = [...cars].sort((a, b) => b.horsePower - a.horsePower);
                break;
            default:
                sortedCars = cars; // Keine Sortierung
        }
        setCars(sortedCars);
    }

    function handleSortChange(event) {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
        sortCars(selectedOption); // Sortierung basierend auf der Auswahl
    }

    return (
        <div className="App">
            <h1>My Frontend - Cool Cars</h1>
            <button onClick={loadCars}>Load Cars</button>
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
                {cars.map(car => (
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
