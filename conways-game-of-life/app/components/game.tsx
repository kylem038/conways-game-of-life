'use client';

import React, {useCallback, useRef, useState} from 'react';
import Grid from './grid';

const Game = () => {
    const rows = 10;
    const cols = 10;

    const [isRunning, setIsRunning] = useState(false);

    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

    // Keep the simulate function memoized
    const simulate = useCallback(() => {
        if(!isRunningRef.current) {
            return;
        } else {
            setTimeout(simulate, 1000);
        }

    }, []);

    return (
        <div className="mt-10 flex flex-col">
            <h1 style={{textAlign: "center"}}>Conway's Game Of Life</h1>
            <button 
                style={{ 
                    border: "1px solid white",
                    padding: "5px",
                    borderRadius: "5px",
                    margin: "10px auto" 
                }}
                onClick={() => {
                    setIsRunning(!isRunning);
                    if (!isRunning) {
                        // Need to forcefully set ref to true because ref takes time to set itself
                        isRunningRef.current = true;
                        simulate();
                    }
                }}
            >{isRunning ? "Running" : "Start"}</button>
            <Grid rows={rows} cols={cols} />
        </div>
    );
}

export default Game;