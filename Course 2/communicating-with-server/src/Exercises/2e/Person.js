import React from 'react'

const Person = ({ name, number, deleteHandler }) => {

	return (
		<>
			<p>{name} {number}</p>
			<button onClick={deleteHandler}>Delete</button>
		</>
	)
};


export default Person
