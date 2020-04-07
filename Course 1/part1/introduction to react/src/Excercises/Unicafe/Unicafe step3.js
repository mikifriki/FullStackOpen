import React, { useState } from 'react';

const Statistics = ({good, neutral, all, bad}) => {
	return(
		<>
			<p>{good}</p>
			<p>{neutral}</p>
			<p>{bad}</p>
			<p>All: {all}</p>
			<p>Average: {(good + bad*(-1)) / (good + neutral + bad)}</p>
			<p>Positive: {good / (good + neutral + bad) * 100}%</p>
		</>
	)
};

const UniCafeStep3 = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);

	const addGoodFeedback = () => {
		setAll(all + 1);
		setGood(good + 1)
	};
	const addNeutralFeedback = () => {
		setAll(all + 1);
		 setNeutral(neutral + 1)
	};
	const addBadFeedback = () => {
		setAll(all + 1);
		setBad(bad + 1)
	};
	return (
		<div>
			<h2>Give Feedback</h2>
			<button onClick={addGoodFeedback}>Good</button>
			<button onClick={addNeutralFeedback}>Neutral</button>
			<button onClick={addBadFeedback}>Bad</button>
			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} all={all} average={(good + bad*(-1)) / all} positive={good / all * 100}/>
		</div>
	)
};

export default UniCafeStep3;
