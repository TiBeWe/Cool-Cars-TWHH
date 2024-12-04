"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // Paging state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Load cars from the backend
    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {
        try {
            const response = await fetch("http://localhost:8080/cars");
            if (!response.ok) throw new Error("Failed to load cars");
            const data = await response.json();
            setCars(data);
            setFilteredCars(data); // Initial alle Autos anzeigen
            setCurrentPage(1); // Zurück zur ersten Seite
        } catch (error) {
            console.error("Error loading cars:", error);
        }
    }

    async function deleteCar(id) {
        try {
            const response = await fetch(`http://localhost:8080/cars/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete car");
            await loadCars(); // Refresh the list after deleting
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    }

    // Sort function
    function sortBy(option, cars) {
        const sortedCars = [...cars];
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

    useEffect(() => {
        applyFilters();
    }, [searchQuery, sortOption]);

    function applyFilters() {
        let result = cars.filter(car =>
            `${car.brand} ${car.model} ${car.horsePower}`
                .toLowerCase()
                .includes(searchQuery)
        );
        result = sortBy(sortOption, result);
        setFilteredCars(result);
        setCurrentPage(1); // Zurück zur ersten Seite nach Filter/Suche
    }

    // Paging logic
    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredCars.slice(startIndex, endIndex);

    return (
        <div className="App">
            <h1>Cool Cars App</h1>

            {/* Search and Sort */}
            <div>
                <label htmlFor="searchInput">Search: </label>
                <input
                    id="searchInput"
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value.toLowerCase())}
                    placeholder="Search by brand, model, or horsepower..."
                />
                <br />
                <label htmlFor="sortDropdown">Sort By: </label>
                <select
                    id="sortDropdown"
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                >
                    <option value="">-- Select Option --</option>
                    <option value="brand-asc">Brand (Ascending)</option>
                    <option value="brand-desc">Brand (Descending)</option>
                    <option value="horsePower-asc">HorsePower (Ascending)</option>
                    <option value="horsePower-desc">HorsePower (Descending)</option>
                </select>
            </div>

            {/* Cars List */}
            <ul>
                {currentItems.map(car => (
                    <li key={car.id}>
                        {car.brand} {car.model} ({car.horsePower} HP)
                        <button onClick={() => deleteCar(car.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={currentPage === page}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <br />
            <Link href="/carform">Add a New Car</Link>
        </div>
    );
}
