import React, { useState } from 'react';


const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorNotif }) => {
    const [eventNum, setEventNum] = useState(currentNOE);
    const handleInputChanged = (event) => {
        const value = event.target.value;

		setEventNum(value);

		if (isNaN(value) || value <= 0) {
			setErrorNotif('Enter a valid number');
		} else if (value > 32) {
			setErrorNotif('Only maximum of 32 is allowed');
		} else {
			setErrorNotif('');
			setCurrentNOE(value);
		}
    }
    
    return (
        <div id="number-of-events">
            <label># of Events: 
                <input 
                type="text"
                className="eventNumber"
                value={eventNum}
                onChange={handleInputChanged}
                />
            </label>
        </div>
    )
}


export default NumberOfEvents;