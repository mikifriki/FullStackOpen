import React, { useState } from 'react';

const UniCafeStep2 = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const addGoodFeedback = () => {
		return setGood(good + 1)
	};
	const addNeutralFeedback = () => {
		return setNeutral(neutral + 1)
	};
	const addBadFeedback = () => {
		return setBad(bad + 1)
	};
	return (
		<div>
			<h2>Give Feedback</h2>
			<button onClick={addGoodFeedback}>Good</button>
			<button onClick={addNeutralFeedback}>Neutral</button>
			<button onClick={addBadFeedback}>Bad</button>
			<h2>Statistics</h2>
			<p>{good}</p>
			<p>{neutral}</p>
			<p>{bad}</p>
			<p>All: {bad + good + neutral}</p>
			<p>Average: {(good + bad*(-1)) / (good + neutral + bad)}</p>
			<p>Positive: {good / (good + neutral + bad) * 100}%</p>
		</div>
	)
};

export default UniCafeStep2;
