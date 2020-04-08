import React from "react";

const Filter = ({ filter, setFilter }) => {
	const filterCountries = e => {
		setFilter(e.target.value);
	};

	return (
		<div>
			<span>Find Countries</span>
			<input
				value={filter}
				onChange={filterCountries}
			/>
		</div>
	);
};

export default Filter;
