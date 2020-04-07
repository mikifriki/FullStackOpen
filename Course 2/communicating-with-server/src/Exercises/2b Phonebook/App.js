import React, {useState} from 'react';
import Filter from './Filter';
import PersonForm from "./PersonForm";
import Persons from "./Persons";
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
			setNewNbr('');
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
			<h2>Phonebook</h2>
			Filter with <Filter onChange={handleFilter}/>
			<h3>Add a new</h3>
			<PersonForm onNameChange={handlePersonsChange} nameValue={newName} numberValue={newNbr} onNumberChange={handleNmbrChange} onSubmit={handleClick}/>
			<h2>Numbers</h2>
			<Persons people={personsToShow}/>
		</div>
	)
};



export default App
