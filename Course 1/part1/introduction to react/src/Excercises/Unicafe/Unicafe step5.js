import React, {useState} from 'react';

const Button = ({handleClick, text}) => {
	return (
		<button onClick={handleClick}>{text}</button>
	)
};

const Statistic = (props) => {
	return (
		<p>{props.text}: {props.value}</p>
	)
};

const Statistics = ({good, neutral, all, average, positive, bad}) => {
	if (all === 0) return <div>No feedback given</div>;

	return (
		<>
			<Statistic text="Good" value={good}/>
			<Statistic text="Neutral" value={neutral}/>
			<Statistic text="Bad" value={bad}/>
			<Statistic text="All ratings" value={all}/>
			<Statistic text="Avarage rating" value={average}/>
			<Statistic text="Positive" value={positive}/>
		</>
	)
};

const UniCafeStep5 = () => {
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
			<Button handleClick={addGoodFeedback} text="Good"/>
			<Button handleClick={addNeutralFeedback} text="Neutral"/>
			<Button handleClick={addBadFeedback} text="Bad"/>
			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} all={all} average={(good + bad * (-1)) / all}
						positive={good / all * 100}/>
		</div>
	)
};

export default UniCafeStep5;
