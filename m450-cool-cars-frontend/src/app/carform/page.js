"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ Navigation


export default function CarForm() {
    const [car, setCar] = useState({ brand: "", model: "", horsePower: 0 });
    const [message, setMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(car),
            });
            if (!response.ok) throw new Error("Failed to add car");
            setMessage("✅ Car added successfully!");
            setTimeout(() => router.push("/"), 1000); // Navigate back to Home after 2 seconds
        } catch (error) {
            setMessage("❌ Error adding car: " + error.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setCar({
            ...car,
            [name]: name === "horsePower" && value !== "" ? parseInt(value, 10) : value,
        });
    }

    return (
        <div className="overflow-hidden flex items-start justify-center bg-gray-100 dark:bg-gray-900 pt-12">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-4">
                    Add a New Car 🚗
                </h1>
                {message && (
                    <p
                        className={`text-center text-sm ${
                            message.startsWith("✅")
                                ? "text-green-500"
                                : "text-red-500"
                        } mb-4`}
                    >
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Brand
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            type="text"
                            value={car.brand}
                            onChange={handleChange}
                            placeholder="Enter car brand"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="model"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            Model
                        </label>
                        <input
                            id="model"
                            name="model"
                            type="text"
                            value={car.model}
                            onChange={handleChange}
                            placeholder="Enter car model"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="horsePower"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            HorsePower
                        </label>
                        <input
                            id="horsePower"
                            name="horsePower"
                            type="number"
                            value={car.horsePower || ""}
                            onChange={handleChange}
                            placeholder="Enter car horsepower"
                            required
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Add Car
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

