import { useState, createContext, useContext, useEffect } from "react";
import useSound from 'use-sound';
import ding_dong from '../sounds/ding_dong.wav'; 
import { TimerContext } from "./Timer_context";

import Timer_display from "./Timer_display";
import Progress_bar from "./ProgressBar";


const Timer = () => {
    const [seconds, setSeconds] = useState(100);

    const [time, setTime] = useState('');
    const [intervalId, setIntervalId] = useState('');
    const [timeAmount, setTimeAmount] = useState('');
    const [playAlarm] = useSound(ding_dong);

    const Alert = () => {
        playAlarm();
    }

    const setTimer = (event) => {
        setTime(prevTime => event.target.value)
        setTimeAmount(event.target.value)
        setSeconds(prevSeconds => event.target.value)
    }

   
    const handleSubmit = (event) => {
        event.preventDefault();
        setTimer(event);
    }
   

    const startTimer = (e) => {
        if (time == '') {
            alert('Please set a time');
        } else {
            const newIntervalId = setInterval(() => {
                setTime(prevCount => prevCount - 1)
            }, 600)
            setIntervalId(newIntervalId)
            disabledTrue()
        }
        document.getElementById('btnStart').style.color = "darkred";
        
    }



    useEffect(() => {
        if (time == 0) {
            clearInterval(intervalId)
            disabledFalse()
            Alert()
            document.getElementById('btnReset').style.color = 'limegreen';
            document.getElementById("btnStart").style.color = "#fff";
        } else { document.getElementById('btnReset').style.color = '#fff' }
    }, [time])
    
    const stopTimer = () => {
        clearInterval(intervalId)
        setIntervalId(0)
        disabledFalse()
        document.getElementById("btnStart").style.color = "#fff";
        return;
    }

    const resetTimer = () => {
        setTime(timeAmount)
        document.getElementById("btnStart").disabled = false;
        return;
    }


    function disabledTrue() {
        document.getElementById("btnStart").disabled = true;
        document.getElementById("btnReset").disabled = true;
    }
    function disabledFalse() {
         document.getElementById("btnStart").disabled = false;
         document.getElementById("btnReset").disabled = false;
    }


    return (
        <>
            <h3>Task Duration</h3>
            <form onClick={handleSubmit}>
        	    <button value={20} >20</button>
                <button value={40} >40</button>
                <button value={60} >60</button>
            </form>
            <TimerContext.Provider value={time}>
                <Timer_display />
                <Progress_bar />
                <div className="#">
                    <button id="btnStart" onClick={startTimer}>Start</button>
                    <button onClick={stopTimer}>Stop</button>
                    <button id="btnReset" onClick={resetTimer}>Reset</button>
                </div>
            </TimerContext.Provider> 
        </>
    );
}


export default Timer;