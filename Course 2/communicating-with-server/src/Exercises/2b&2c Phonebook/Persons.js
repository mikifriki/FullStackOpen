import React from "react";

const Persons = ({people}) => <>{people.map((person, i) => <p key={i}>{person.name} {person.number}</p>)}</>;
export default Persons;
