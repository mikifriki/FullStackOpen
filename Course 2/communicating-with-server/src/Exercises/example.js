const Note = ({note, toggleImportance}) => {
	const label = note.important ? 'make not important' : 'make important'
	return (
		<li>
			<button onClick={toggleImportance}>{label}</button>
			{note.content}
		</li>
	)
};

const App = () => {
	const [notes, setNotes] = useState([]);
	const [newNote, setNewNote] = useState('');
	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		noteService
			.getAll()
			.then(initialNotes => {
				setNotes(initialNotes)
			})
	}, [])

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = {...note, important: !note.important}

		noteService
			.update(id, changedNote).then(response => {
			setNotes(notes.map(note => note.id !== id ? note : response.data))
		}).catch(error => {
			alert(`the note '${note.content}', ${error} was already deleted from server`)
			setNotes(notes.filter(n => n.id !== id))
		})
	};


	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() > 0.5
		};

		noteService.create(noteObject).then(response => {
			setNotes(notes.concat(response.data));
			setNewNote('')
		})
	};

	const handleNoteChange = (event) => {
		console.log(event.target.value)
		setNewNote(event.target.value)
	};

	const notesToShow = showAll ? notes : notes.filter(note => note.important);

	return (
		<div>
			<h1>Notes</h1>
			<div>
				<button onClick={() => setShowAll(!showAll)}>
					show {showAll ? 'important' : 'all'}
				</button>
			</div>
			<ul>
				{notesToShow.map((note, i) =>
					<Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
				)}
			</ul>
			<form onSubmit={addNote}>
				<input
					value={newNote}
					onChange={handleNoteChange}
				/>
				<button type="submit">save</button>
			</form>
		</div>
	)
};
