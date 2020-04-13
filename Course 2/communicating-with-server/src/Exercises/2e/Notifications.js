import React from 'react'

const Notification = ({status, statusType}) => {

	const successNotification = {
		color: 'green',
		background: 'lightgrey',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '5px'
	};

	const warningNotification = {
		color: 'orange',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '5px'
	};


	const errorNotification = {
		color: 'red',
		background: 'lightgrey',
		fontSize: '20px',
		borderStyle: 'solid',
		borderRadius: '5px',
		padding: '5px'
	};


	if (status === '' || status === null) {
		return null
	} else if (statusType === 'success') {
		return (
			<div className="status" style={successNotification}>
				{status}
			</div>
		)
	} else if (statusType === 'error') {
		return (
			<div className="status" style={errorNotification}>
				{status}
			</div>
		)
	} else if (statusType === 'warning') {
		return (
			<div className="status" style={warningNotification}>
				{status}
			</div>
		)
	}
};

export default Notification
