import React, {useEffect, useState, useCallback, useRef} from "react";
import { produce } from "immer";

type GridProps = {
    rows: number;
    cols: number;
    isRunning: boolean;
};

type GridState = {
    grid: [[number]];
};

const Grid: React.FC<GridProps> = ({ rows, cols, isRunning }) => {
    const [grid, setGrid] = useState<GridState>();

    // Because simulate is memoized we need to reflect the value of isRunning
    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

    const cellHeight = 40;
    const cellWidth = 40;

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
            // Rules of the game of life:
            // 1. Any live cell with < 2 living neighbors dies
            // 2. Any live cell with 2 || 3 live neighbors lives on
            // 3. Any live cell with > 3 live neighbors dies (overpopulation)
            // 4. Any dead cell with 3 live neighbors is now alive (repopulation)
           
            setTimeout(simulate, 1000);
        }

    }, []);
    
    return (
        <div 
            className={`mt-6 flex flex-wrap`}
            style={{maxWidth: calculateGridWidth()}}
        >
            {grid && 
                grid.map((row: [[number]], i: number) => {
                    return row.map((col: [number], k: number) => (
                        <div 
                            key={`${i}-${k}`}
                            onClick={() => handleCellClick(i, k)}
                            className={`h-10 w-10 ${grid[i][k] ? "bg-green-100" : ""} border`}
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
