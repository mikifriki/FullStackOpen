import React, {useState, useEffect} from 'react';
import Filter from './Filter';
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import personService from '../../Services/persons';
import Notification from "./Notifications";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNbr, setNewNbr] = useState('');
	const [newfilter, setNewFilter] = useState('');
	const [statusMessage, setStatusMessage] = useState('');
	const [statusType, setStatusType] = useState('');

	const handleClick = (e) => {
		e.preventDefault();
		const nameExists = persons.some(person => person.name === newName);
		const numberExists = persons.some(person => person.number === newNbr);

		if (nameExists && numberExists) {
			alert(`${newName} and ${newNbr} is already added to the phonebook.`);

		} else if (nameExists && !numberExists) {
			if (window.confirm(`${newName} is already added to the phonebook. Replace ${newName}s number?`)) {
				updateNumber(newName, newNbr);
				setStatusMessage(`Updated ${newName}'s number to ${newNbr}`);
				setStatusType('success');
				setTimeout(() => {
					setStatusMessage(null)
				}, 5000)
			}
		} else if (numberExists && !nameExists) {
			if (window.confirm(`${newNbr} is already added to the phonebook. Replace ${newNbr} owner?`)) {
				updateName(newNbr, newName);
				setStatusMessage(`Updated ${newNbr}'s owner to ${newName}`);
				setStatusType('success');
				setTimeout(() => {
					setStatusMessage(null)
				}, 5000)
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
			setStatusMessage(`Added ${newName}`);
			setStatusType('success');
			setTimeout(() => {
				setStatusMessage(null)
			}, 5000)
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
			}).catch(error => {
			console.log(error);
			setStatusMessage(
				`The entry '${nameID}' has already been deleted from the server`
			);
			setStatusType('error');
			setTimeout(() => {
				setStatusMessage(null)
			}, 5000);
			setPersons(persons.filter(p => p.id !== nameID))
		})
	};

	const updateNumber = (name, number) => {
		const entry = persons.find(person => person.name === name);
		const entryID = entry.id;
		const modifiedEntry = {...entry, number: number};
		serviceRunner(entryID, modifiedEntry)
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
			});


	}, []);


	const handlePersonsChange = (e) => {
		setNewName(e.target.value)
	};
	const handleNbrChange = (e) => {
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
				});
			setStatusMessage(
				`The entry '${id}' was successfully removed from the server`
			);
			setStatusType('warning');
			setTimeout(() => {
				setStatusMessage(null)
			}, 5000)
		}
	};


	return (
		<div>
			<h1>Phonebook</h1>
			<Notification status={statusMessage} statusType={statusType}/>
			Filter with <Filter onChange={handleFilter}/>
			<h3>Add a new</h3>
			<PersonForm onNameChange={handlePersonsChange} nameValue={newName} numberValue={newNbr}
						onNumberChange={handleNbrChange} onSubmit={handleClick}/>
			<h2>Numbers</h2>
			<Persons deleteEntry={deleteEntry} people={personsToShow}/>
		</div>
	)
};


export default App
