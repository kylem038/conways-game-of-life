import React, {useEffect, useState} from "react";
import { produce } from "immer";

type GridProps = {
    rows: number;
    cols: number;
};

type GridState = {
    grid: [[number]];
};

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
    const [grid, setGrid] = useState<GridState>();

    const cellHeight = 40;
    const cellWidth = 40;

    // Initialize grid
    useEffect(() => {
        setGrid(createGrid());
    }, []);

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
