import React, {useEffect, useState, useCallback, useRef} from "react";
import { produce } from "immer";

type GridProps = {
    rows: number;
    cols: number;
    isRunning: boolean;
};

type GridState = {
    grid: number[][];
};

const Grid: React.FC<GridProps> = ({ rows, cols, isRunning }) => {
    const [grid, setGrid] = useState<GridState>();

    // Because simulate is memoized we need to reflect the value of isRunning
    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

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

    // Initialize grid
    useEffect(() => {
        setGrid(createGrid());
    }, []);

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

    // Clicking a div should toggle the cell between alive and dead
    const handleCellClick = (i: number, k: number) => {
        const tempGrid = produce(grid, gridCopy => {
            if(gridCopy) {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
            }
        })
        setGrid(tempGrid);
    }

    // Keep the simulate function memoized
    const simulate = useCallback(() => {
        if(!isRunningRef.current) {
            return;
        } else {
            console.log('inside simulation');
            // G is the current grid
            setGrid(g => {
                return produce(g, gridCopy => {
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
        <div 
            className={`mt-6 flex flex-wrap`}
            style={{maxWidth: calculateGridWidth()}}
        >
            {grid && 
                grid.map((row: number[], i: number) => {
                    return row.map((col: number, j: number) => (
                        <div 
                            key={`${i}-${j}`}
                            onClick={() => handleCellClick(i, j)}
                            className={`h-10 w-10 ${grid[i][j] ? "bg-green-100" : ""} border`}
                            style={{
                                height: cellHeight,
                                width: cellWidth
                            }}
                        >
                        </div>
                    ))
                })
            }
        </div>
    )
};

export default Grid;
