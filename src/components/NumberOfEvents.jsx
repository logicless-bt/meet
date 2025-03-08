import React, { useState } from 'react';


const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorNotif, setErrorAlert }) => {
    const [eventNum, setEventNum] = useState(currentNOE);
    const handleInputChanged = (event) => {
        const value = event.target.value;

		setEventNum(value);

		if (isNaN(value) || value <= 0) {
			setErrorAlert('Enter a valid number');
		} else if (value > 32) {
			setErrorAlert('Only maximum of 32 is allowed');
		} else {
			setErrorAlert('');
			setCurrentNOE(parseInt(value));
		}
    }
    
    return (
        <div id="number-of-events">
            <label data-testid="event-num"># of Events: 
                <input 
                type="text"
                className="eventNumber"
                id="event-num-input"
                value={eventNum}
                onChange={handleInputChanged}
                />
            </label>
        </div>
    )
}


export default NumberOfEvents;