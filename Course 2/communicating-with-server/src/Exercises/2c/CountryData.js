import React from "react";
import Weather from "./Weather";

const CountryData = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Population: {country.population.toLocaleString()}</p>
			<h3>Languages</h3>
			<ul>
				{country.languages.map(language => (<li key={language.name}>{language.name}</li>))}
			</ul>
			<img
				src={country.flag}
				alt={`${country.name}'s flag`}
				width="200px"
			/>
			<Weather capital={country.capital} />
		</div>
	);
};

export default CountryData;
