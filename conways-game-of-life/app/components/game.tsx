'use client';

import Grid from './grid';

const Game = () => {
    const rows = 5;
    const cols = 5;

    return (
        <div className="">
            <h1>Conway's Game Of Life</h1>
            <Grid rows={rows} cols={cols} />
        </div>
    );
}

export default Game;