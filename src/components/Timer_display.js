import { useState, useContext } from 'react';
import { TimerContext } from './Timer_context';


const Timer_display = () => {

    const counter = useContext(TimerContext);  

    

    return (
            <div className="timer-display">
                <label>{counter ==''? "0":counter }</label>
            </div> 
    )
}

export default Timer_display;
