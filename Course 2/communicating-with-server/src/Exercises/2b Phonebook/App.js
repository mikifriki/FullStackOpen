import React, { useState } from 'react'

const App = () => {
	const [ persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [ newName, setNewName ] = useState('');


	const handleClick = (e) => {
		e.preventDefault();
		const newPersons = {
			name: newName
		};
		setPersons(persons.concat(newPersons));
		setNewName('');
	};

	const handlePersonsChange = (e) => {
		setNewName(e.target.value)
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input onChange={handlePersonsChange} value={newName} />
				</div>
				<div>
					<button type="submit" onClick={handleClick}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, i) => <p key={i}>{person.name}</p>)}
		</div>
	)
};

export default App
