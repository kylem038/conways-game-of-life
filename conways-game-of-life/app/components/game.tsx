'use client';

import React, {useRef, useState} from 'react';
import Grid from './grid';

const Game = () => {
    const rows = 10;
    const cols = 10;

    const [isRunning, setIsRunning] = useState(false);

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
                }}
            >{isRunning ? "Running" : "Start"}</button>
            <Grid isRunning={isRunning} rows={rows} cols={cols} />
        </div>
    );
}

export default Game;