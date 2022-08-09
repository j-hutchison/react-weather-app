import React, { useState } from "react";
import "./App.css";
import keys from "./keys.json";

function App() {
	const [searchLocation, setSearchLocation] = useState("");
	const [location, setLocation] = useState("-");
	const [date, setDate] = useState(new Date(Date.now()).toUTCString());
	const [temperature, setTemperature] = useState("-");
	const [forecast, setForecast] = useState("-");

	const API_KEY = keys.API_KEY;
	const API_URL = keys.WEATHER_URL;

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
					<em className="weather-details-date">{date}</em>
					<strong className="weather-details-temp">{temperature}&#xb0;C</strong>
					<strong className="weather-details-forecast">{forecast}</strong>
				</div>
			</form>
		</div>
	);
}

export default App;
