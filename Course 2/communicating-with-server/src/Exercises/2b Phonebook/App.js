import React, {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '5555'}]);
	const [newName, setNewName] = useState('');
	const [newNbr, setNewNbr] = useState('');

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

	return (
		<div>
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
			{persons.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}
		</div>
	)
};

export default App
