import React from 'react'
import Person from './Person'

const Persons = ({people, deleteEntry}) => {

	return (
		<div>
			{people.map(person =>
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					deleteHandler={() => deleteEntry(person.id)}
				/>)}
		</div>
	)
};

export default Persons
