import { useState, useContext, useEffect } from 'react';
import { TimerContext } from './Timer_context';
import { ProgressBar } from 'react-bootstrap';



const Progress_bar = () => {
    
    const counter = useContext(TimerContext);
    const [progress, setProgress] = useState(counter);
    const [progressBar, setProgressBar] = useState(60);




    useEffect(() => {
        setProgress(progressBar - counter);
        
    }, [counter])
            
    

    return (
        <>
            <ProgressBar striped now={progress} max={progressBar} />
        </>
    )
}

export default Progress_bar;