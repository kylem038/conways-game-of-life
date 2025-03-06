'use client';

import React, {useRef, useState, useEffect, useCallback} from 'react';
import { produce } from "immer";
import Grid from './grid';

export type GridState = {
    grid: number[][];
};

const Game = () => {
    const rows = 10;
    const cols = 10;

    const [grid, setGrid] = useState<number[][]>();
    const [isRunning, setIsRunning] = useState(false);

     // Because simulate is memoized we need to reflect the value of isRunning
     const isRunningRef = useRef(isRunning);
     isRunningRef.current = isRunning;

    // Initialize grid
    useEffect(() => {
        setGrid(createGrid());
    }, []);

    // Create grid dimensions based on props being passed in
    const createGrid = () => {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(0);
            }
            grid.push(row);
        }
        return grid;
    }

    const cellHeight = 40;
    const cellWidth = 40;

    // List of neighbors to scan during simulation
    const neighbors: number[][] = [
        // Left and right of center
        [0, 1],
        [0, -1],
        // The row below center
        [1, 0],
        [1, 1],
        [1, -1],
        // The row above center
        [-1, 0],
        [-1, 1],
        [-1, -1]
    ];

    // Trigger grid updates based on isRunning from the Game component
    useEffect(() => {
        if (isRunning) {
            simulate();
        }
    }, [isRunning])

    // Calc grid width to be used within CSS
    const calculateGridWidth = () => {
        return cols * cellWidth;
    }

    // Clicking a div should toggle the cell between alive and dead
    const handleCellClick = (i: number, k: number) => {
        const tempGrid = produce(grid, gridCopy => {
            if(gridCopy && grid) {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
            }
        })
        setGrid(tempGrid);
    }

    const clearGrid = () => {
        setGrid(createGrid());
    }

    // Keep the simulate function memoized
    const simulate = useCallback(() => {
        if(!isRunningRef.current) {
            return;
        } else {
            // G is the current grid
            // Interesting that taking the same approach as handleCellClick doesn't work, but returning directly inside setGrid does
            setGrid(g => {
                return produce(g, gridCopy => {
                    if(!gridCopy){
                        console.error('Missing gridCopy during simulation');
                        return;
                    }
                    if(!g) {
                        console.error('Missing grid g during simulation');
                        return;
                    }
                    // Rules of the game of life:
                    // 1. Any live cell with < 2 living neighbors dies
                    // 2. Any live cell with 2 || 3 live neighbors lives on
                    // 3. Any live cell with > 3 live neighbors dies (overpopulation)
                    // 4. Any dead cell with 3 live neighbors is now alive (repopulation)
                    for(let i = 0; i < rows; i++) {
                        for(let j = 0; j < cols; j++) {
                            let liveNeighbors = 0;
                            neighbors.forEach(([x, y]) => {
                                // Get neighbor by row
                                const newRow = i + x;
                                // Get neighbor by col
                                const newCol = j + y;
                                if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                                    liveNeighbors += g[newRow][newCol];
                                }
                            });
                            // 1. Any live cell with < 2 living neighbors dies
                            // 3. Any live cell with > 3 live neighbors dies (overpopulation)
                            if (liveNeighbors < 2 || liveNeighbors > 3) {
                                gridCopy[i][j] = 0;
                            // 4. Any dead cell with 3 live neighbors is now alive (repopulation)
                            } else if (g[i][j] === 0 && liveNeighbors === 3) {
                                gridCopy[i][j] = 1;
                            }
                            // Rule 2 keeps the base state of the current cell
                        }
                    }
                })
            })

            setTimeout(simulate, 1000);
        }
    }, []);
 

    return (
        <div className="mt-10 flex flex-col">
            <h1 style={{textAlign: "center"}}>Conway's Game Of Life</h1>
            <div className='flex'>
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
                >{isRunning ? "Stop" : "Start"}</button>
                <button
                    style={{
                        border: "1px solid white",
                        padding: "5px",
                        borderRadius: "5px",
                        margin: "10px auto" 
                    }}
                    onClick={() => clearGrid()}
                >Clear</button>
            </div>
            
            <Grid grid={grid} handleCellClick={handleCellClick} gridWidth={calculateGridWidth()} cellHeight={cellHeight} cellWidth={cellWidth} />
        </div>
    );
}

export default Game;