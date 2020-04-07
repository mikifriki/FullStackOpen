import React, {useState} from 'react'

const anecdotes = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const AnecdotesFinal = () => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState([0,0,0,0,0,0]);
	const [max, setMax] = useState([0,0]);

	const getRndAnecdote = () => setSelected(Math.floor((Math.random() * anecdotes.length)));
	const vote = () => {
		let newVotes = [...votes];
		newVotes[selected] += 1;
		setVotes(newVotes);
		if(newVotes[selected] >= max[1]) {
			let newMax = [selected, newVotes[selected]];
			setMax(newMax)
		}
	};

	console.log(max[0]);
	return (
		<div>
			<p>{anecdotes[selected]}</p>
			<p>{votes[selected]}</p>
			<button onClick={vote}>vote</button>
			<button onClick={getRndAnecdote}>next anecdote</button>
			<h1>anecdote with most votes </h1>
			<p>{anecdotes[max[0]]}, has {max[1]} </p>
		</div>
	)
};

export default AnecdotesFinal;
