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
            setMessage("Car added successfully!");
            setTimeout(() => router.push("/"), 2000); // Navigate back to Home after 2 seconds
        } catch (error) {
            setMessage("Error adding car: " + error.message);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setCar({
            ...car,
            [name]: name === "horsePower" ? parseInt(value, 10) : value,
        });
    }

    return (
        <div>
            <h1>Car Form</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="brand">Brand:</label>
                    <input
                        id="brand"
                        name="brand"
                        type="text"
                        value={car.brand}
                        onChange={handleChange}
                        placeholder="Enter car brand"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="model">Model:</label>
                    <input
                        id="model"
                        name="model"
                        type="text"
                        value={car.model}
                        onChange={handleChange}
                        placeholder="Enter car model"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="horsePower">HorsePower:</label>
                    <input
                        id="horsePower"
                        name="horsePower"
                        type="number"
                        value={car.horsePower}
                        onChange={handleChange}
                        placeholder="Enter car horsepower"
                        required
                    />
                </div>
                <button type="submit">Add Car</button>
                <button type="button" onClick={() => router.push("/")}>
                    Cancel
                </button>
            </form>
        </div>
    );
}
