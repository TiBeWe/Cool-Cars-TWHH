"use client"

import {useState} from "react";
import CarForm from "@/app/carform/page";
import Link from "next/link";


export default function Home() {
  const [cars, setCars] = useState([])

  function buttonHandler() {
    fetch("http://localhost:8080/cars")
      .then(response => response.json())
      .then(data => setCars(data))
  }

  return (
    <div className="App">
      <h1>My Frontend - The very beginning</h1>
        <button onClick={buttonHandler}>load cars</button>
        <br/>
        <ul>
          { cars.map(car =>
            <li key={car.id}>
                {car.brand + " " + car.model + " (" + car.horsePower + ")"}
            </li>
          )}
        </ul>
        <Link href="/carform">add a new car</Link>
    </div>
  )
}
