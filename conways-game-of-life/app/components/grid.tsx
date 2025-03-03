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

    useEffect(() => {
        setGrid(createGrid());
    }, []);

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
    
    return (
        <div className="mt-6 flex flex-wrap">
            {grid && 
                grid.map((row: [[number]], i: number) => {
                    return row.map((col: [number], k: number) => (
                        <div key={`${i}-${k}`} className={`h-10 w-10 ${grid[i][k] ? "bg-green-100" : ""} border`}>
                        </div>
                    ))
                })
            }
        </div>
    )
};

export default Grid;
