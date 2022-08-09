import React, { useState } from "react";
import "./App.css";
import api from "./api.json";

function App() {
	const [searchLocation, setSearchLocation] = useState("");
	const [location, setLocation] = useState("-");
	const [temperature, setTemperature] = useState("-");
	const [forecast, setForecast] = useState("-");

	const API_KEY = api.key;
	const API_URL = api.base;

	const handleSearchLocationChange = (e) => {
		setSearchLocation(() => e.target.value);
	};

	async function getLocationData() {
		console.log(`${API_URL}q=${searchLocation}&appid=${API_KEY}`);

		const response = await fetch(
			`${API_URL}q=${searchLocation}&appid=${API_KEY}`
		);

		return response.json();
	}

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(searchLocation);
		const data = getLocationData().then((json) => {
			console.log(json);
			const {
				name: city,
				main: { temp },
				weather,
			} = json;

			setLocation(() => city);
			setTemperature(() => temp);
			setForecast(() => weather[0].main);
		});

		setSearchLocation(() => "");
	};

	return (
		<div className="app">
			<form
				className={temperature < 15 ? "cold" : "warm"}
				onSubmit={handleFormSubmit}
			>
				<div className="search-box">
					<input
						className="search-box-input"
						type="text"
						value={searchLocation}
						onChange={handleSearchLocationChange}
						placeholder="Search..."
					/>
				</div>
				<div className="weather-details">
					<h1 className="weather-details-location">{location}</h1>
					<em className="weather-details-date">
						{new Date(Date.now()).toUTCString()}
					</em>
					<strong className="weather-details-temp">{temperature}&#xb0;C</strong>
					<strong className="weather-details-forecast">{forecast}</strong>
				</div>
			</form>
		</div>
	);
}

export default App;
