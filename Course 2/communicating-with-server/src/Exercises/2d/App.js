import React, {useState, useEffect} from 'react';
import Filter from './Filter';
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from '../../Services/persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNbr, setNewNbr] = useState('');
	const [newfilter, setNewFilter] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		const nameExists = persons.some(person => person.name === newName);
		const numberExists = persons.some(person => person.number === newNbr);

		if (nameExists && numberExists) {
			alert(`${newName} and ${newNbr} is already added to the phonebook.`);

		} else if (nameExists && !numberExists) {
			if (window.confirm(`${newName} is already added to the phonebook. Replace ${newName}s number?`)) {
				updateNumber(newName, newNbr);
			}
		} else if (numberExists && !nameExists) {
			if (window.confirm(`${newNbr} is already added to the phonebook. Replace ${newNbr} owner?`)) {
				updateName(newNbr, newName);
			}
		} else {
			const newPersons = {
				name: newName,
				number: newNbr
			};
			personService
				.create(newPersons)
				.then(returnedPersons => {
					setPersons(persons.concat(returnedPersons));
				});
			setPersons(persons.concat(newPersons));
		}
		setNewName('');
		setNewNbr('');
	};

	const serviceRunner = (nameID, modified) => {
		personService
			.update(nameID, modified)
			.then(returnedEntry => {
				setPersons(persons.map(person => {
					if (person.id !== nameID) {
						return person
					} else {
						return returnedEntry
					}
				}))
			})
	};

	const updateNumber = (name, number) => {
		const entry = persons.find(person => person.name === name);
		const entryID = entry.id;
		const modifiedEntry = {...entry, number: number};
		serviceRunner(entryID, modifiedEntry);
	};

	const updateName = (number, name) => {
		const entry = persons.find(person => person.number === number);
		const entryID = entry.id;
		const modifiedEntry = {...entry, name: name};
		serviceRunner(entryID, modifiedEntry);
	};

	useEffect(() => {
		personService
			.getAll()
			.then(initialNotes => {
				console.log(initialNotes);
				setPersons(initialNotes)
			})

	}, []);

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

	const deleteEntry = (id) => {
		if (window.confirm("Do you want to delete this?")) {
			personService
				.remove(id)
				.then(returnedPersons => {
					setPersons(returnedPersons)
				})
				.then(console.log('retrieved updated entries'))
		}
	};


	return (
		<div>
			<h2>Phonebook</h2>
			Filter with <Filter onChange={handleFilter}/>
			<h3>Add a new</h3>
			<PersonForm onNameChange={handlePersonsChange} nameValue={newName} numberValue={newNbr}
						onNumberChange={handleNmbrChange} onSubmit={handleClick}/>
			<h2>Numbers</h2>
			<Persons deleteEntry={deleteEntry} people={personsToShow}/>
		</div>
	)
};


export default App
