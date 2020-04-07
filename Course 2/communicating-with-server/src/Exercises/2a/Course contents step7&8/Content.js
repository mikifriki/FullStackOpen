import React from "react";
import Part from "./Parts";

const Content = ({course}) => {
	return (
		<>
			{course.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}/>)}
		</>
	)
};

export default Content;
