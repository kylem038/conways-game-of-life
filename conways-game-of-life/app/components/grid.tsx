import React, {useEffect, useState} from "react";

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

    useEffect(() => {
        setGrid(createGrid());
    }, []);

    const calculateGridWidth = () => {
        return cols * cellWidth;
    }

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

    const handleCellClick = () => {
        
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
                            onClick={}
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
