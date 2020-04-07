import React from "react";

const Total = ({total}) => {

	const allExercises = total.reduce((sum, part) => sum + part.exercises, 0);
	return (
		<p>
			All exercises: {allExercises}
		</p>
	)
};

export default Total;
