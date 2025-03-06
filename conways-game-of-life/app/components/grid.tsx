type GridProps = {
    grid: number[][] | undefined;
    handleCellClick: (i: number, k:number) => void;
    gridWidth: number;
    cellHeight: number;
    cellWidth: number;
};

const Grid: React.FC<GridProps> = ({ grid, handleCellClick, gridWidth, cellHeight, cellWidth }) => {
    return (
        <div 
            className={`mt-6 flex flex-wrap`}
            style={{maxWidth: gridWidth}}
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
