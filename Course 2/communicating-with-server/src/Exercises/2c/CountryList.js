import React from "react";
import CountryData from "./CountryData";

const CountryList = ({ countries, filter, setFilterWithButton }) => {
	let filteredList = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()));

	if (filter.length === 0 || filteredList.length === 0) {
		return <h2>Please enter a valid input</h2>;
	}

	if (filteredList.length >= 10) {
		return <h2>Too many matches, specify another filter</h2>;
	}

	if (filteredList.length > 1) {
		return filteredList.map(country => (
			<div key={country.area}>
				{country.name}
				<button value={country.name} onClick={setFilterWithButton}>show</button>
			</div>
		));
	} else {
		return (
			<div>
				<CountryData country={filteredList[0]} />
			</div>
		);
	}
};

export default CountryList;
