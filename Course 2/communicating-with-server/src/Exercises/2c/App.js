import React, {useState, useEffect} from "react";
import axios from "axios";

import Filter from "./Filter";
import CountryList from "./CountryList";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all")
			.then(response => {
				setCountries(response.data);
			}).catch(console.log);
	}, []);

	const setFilterWithButton = e => setFilter(e.target.value);

	return (
		<div>
			<Filter filter={filter} setFilter={setFilter}/>
			<CountryList
				countries={countries}
				filter={filter}
				setFilterWithButton={setFilterWithButton}
			/>
		</div>
	);
};

export default App;
