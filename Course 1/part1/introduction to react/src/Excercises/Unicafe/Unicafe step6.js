import React, {useState} from 'react';

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>;

const Statistic = ({text, value}) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
};

const Statistics = ({good, neutral, all, average, positive, bad}) => {
	if (all === 0) return <div>No feedback given</div>;

	return (
		<table>
			<tbody>
			<Statistic text="Good" value={good}/>
			<Statistic text="Neutral" value={neutral}/>
			<Statistic text="Bad" value={bad}/>
			<Statistic text="All ratings" value={all}/>
			<Statistic text="Avarage rating" value={average}/>
			<Statistic text="Positive" value={positive}/>
			</tbody>
		</table>
	)
};

const UniCafeStep6 = () => {
	const [feedback, setFeedback] = useState({good: 0, neutral: 0, bad: 0, all:0 });

	const addGoodFeedback = () => {
		const newFeedback = {
			...feedback,
			all: feedback.all + 1,
			good: feedback.good + 1
		};
		setFeedback(newFeedback);
	};

	const addNeutralFeedback = () => {
		const newFeedback = {
			...feedback,
			all: feedback.all + 1,
			neutral: feedback.neutral + 1
		};
		setFeedback(newFeedback);
	};
	const addBadFeedback = () => {
		const newFeedback = {
			...feedback,
			all: feedback.all + 1,
			bad: feedback.bad + 1
		};
		setFeedback(newFeedback);
	};

	return (
		<div>
			<h2>Give Feedback</h2>
			<Button handleClick={addGoodFeedback} text="Good"/>
			<Button handleClick={addNeutralFeedback} text="Neutral"/>
			<Button handleClick={addBadFeedback} text="Bad"/>
			<h2>Statistics</h2>
			<Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} all={feedback.all} average={(feedback.good + feedback.bad * (-1)) / feedback.all} positive={feedback.good / feedback.all * 100}/>
		</div>
	)
};

export default UniCafeStep6;
