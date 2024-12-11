"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [sortOption, setSortOption] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        loadCars();
    }, []);

    async function loadCars() {
        try {
            const response = await fetch("http://localhost:8080/cars");
            if (!response.ok) throw new Error("Failed to load cars");
            const data = await response.json();
            setCars(data);
            setFilteredCars(data);
            setCurrentPage(1);
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
            await loadCars();
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    }

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
        setCurrentPage(1);
    }

    const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredCars.slice(startIndex, endIndex);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto dark:bg-gray-800">
            
            {/* Search and Sort */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value.toLowerCase())}
                    placeholder="Search by brand, model, or horsepower..."
                    className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <select
                    value={sortOption}
                    onChange={e => setSortOption(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                    <option value="">Sort By</option>
                    <option value="brand-asc">Brand (Ascending)</option>
                    <option value="brand-desc">Brand (Descending)</option>
                    <option value="horsePower-asc">HorsePower (Ascending)</option>
                    <option value="horsePower-desc">HorsePower (Descending)</option>
                </select>
            </div>

            {/* Cars List */}
            <ul className="space-y-4">
                {currentItems.map(car => (
                    <li
                        key={car.id}
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm dark:bg-gray-700"
                    >
                        <div>
                            <h3 className="text-lg font-semibold dark:text-white">
                                {car.brand} {car.model}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {car.horsePower} HP
                            </p>
                        </div>
                        <button
                            onClick={() => deleteCar(car.id)}
                            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        disabled={currentPage === page}
                        className={`px-4 py-2 rounded-md ${
                            currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <div className="mt-6 text-center">
                <Link
                    href="/carform"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Add a New Car
                </Link>
            </div>
        </div>
    );
}
