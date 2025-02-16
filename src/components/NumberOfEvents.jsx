import React, { useState } from 'react';


const NumberOfEvents = () => {
    const [eventNum, setEventNum] = useState(32);
    const handleInputChanged = (event) => {
        const value = event.target.value;

        if(value < 1){
            throw Error('Enter a valid number.');
        } else if (value > 32) {
            throw Error('List can only show up to 32 events.');
        } else {   
            setEventNum(value);
        }
    }
    
    return (
        <div id="number-of-events">
            <label># of Events: 
                <input 
                type="text"
                className="eventNumber"
                value={eventNum}
                onBlur={handleInputChanged}
                />
            </label>
        </div>
    )
}


export default NumberOfEvents;