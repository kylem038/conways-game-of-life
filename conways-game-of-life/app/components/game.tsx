'use client';

import Grid from './grid';

const Game = () => {
    const rows = 10;
    const cols = 10;

    return (
        <div className="mt-10">
            <h1 style={{textAlign: "center"}}>Conway's Game Of Life</h1>
            <Grid rows={rows} cols={cols} />
        </div>
    );
}

export default Game;