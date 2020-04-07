import React, {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]);
	const [newName, setNewName] = useState('');
	const [newNbr, setNewNbr] = useState('');
	const [newfilter, setNewFilter] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		const newPersons = {
			name: newName,
			number: newNbr
		};


		if (persons.some(person => person.name === newPersons.name)) {
			alert(`${newPersons.name} is already added to phonebook`);
		} else {
			setPersons(persons.concat(newPersons));
			setNewName('');

		}
	};

	const handlePersonsChange = (e) => {
		setNewName(e.target.value)
	};

	const handleNmbrChange = (e) => {
		setNewNbr(e.target.value)
	};

	const handleFilter = (e) => {
		setNewFilter(e.target.value);
	};

	const personsToShow = newfilter ? persons.filter(person => person.name.toLowerCase().search(newfilter.toLowerCase()) !== -1) : persons;

	return (
		<div>
			<input onChange={handleFilter}/>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input onChange={handlePersonsChange} value={newName}/>
				</div>
				<div>
					number: <input onChange={handleNmbrChange}/>
				</div>
				<div>
					<button type="submit" onClick={handleClick}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{personsToShow.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}
		</div>
	)
};

export default App
