"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Paging state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Anzahl der Einträge pro Seite

    function loadCars() {
        fetch("http://localhost:8080/cars")
            .then(response => response.json())
            .then(data => {
                setCars(data);
                setFilteredCars(data); // Initial alle Autos anzeigen
                setCurrentPage(1); // Zurück zur ersten Seite
            });
    }

    function sortCars(option) {
        let sortedCars = [...filteredCars];
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
        setCurrentPage(1); // Zurück zur ersten Seite nach Sortierung
    }

    function handleSortChange(event) {
        const selectedOption = event.target.value;
        setSortOption(selectedOption);
        sortCars(selectedOption);
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
        setCurrentPage(1); // Zurück zur ersten Seite nach Suche
    }

    function handlePageChange(page) {
        setCurrentPage(page);
    }

    // Paging logic
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredCars.slice(startIndex, endIndex);

    return (
        <div className="App">
            <h1>My Frontend - Cool Cars</h1>
            <button onClick={loadCars}>Load Cars</button>
            <br />
            <label htmlFor="searchInput">Search: </label>
            <input
                id="searchInput"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by brand, model, or horsepower..."
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
                {currentItems.map(car => (
                    <li key={car.id}>
                        {car.brand + " " + car.model + " (" + car.horsePower + " HP)"}
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
            </div>
            <br />
            <Link href="/carform">Add a new car</Link>
        </div>
    );
}
