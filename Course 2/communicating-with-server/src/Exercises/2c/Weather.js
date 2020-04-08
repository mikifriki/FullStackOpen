import React, {useState, useEffect} from "react";
import axios from "axios";

const Weather = ({capital}) => {
	const [weather, setWeather] = useState([]);
	const API_KEY = process.env.REACT_APP_API_KEY;

	useEffect(() => {
		axios
			.get("http://api.weatherstack.com/current", {
				params: {
					access_key: API_KEY,
					query: capital
				}
			})
			.then(response => {
				console.log(response.data.current);
				setWeather(response.data.current);
			});
	}, [capital]);

	if (weather === undefined) {
		return (
			<div>An herror has occured, please refresh the page </div>
		)
	}
	return (
		<div>
			<h2>Weather in {capital}</h2>
			<strong>temperature: </strong>
			{weather.temperature} Celsius
			<br/>
			<img src={weather.weather_icons} alt="current weather"/>
			<br/>
			<strong>wind: </strong> {weather.wind_speed} kph {weather.wind_dir}
		</div>
	);
};

export default Weather;
