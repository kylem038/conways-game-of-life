# conways-game-of-life

Conway's game of life done in React using NextJS & Typescript. 

## Running the Game

- `cd` to the sub-folder `conways-game-of-life` 
- run `npm i`
- run `npm run dev` from the sub-folder to start local server
- visit `localhost:3000` 

## Playing the Game Of Life
The Game Of Life is a zero player game. It's more of a simulation.\
That being said the user can interact with the grid by clicking on a grid cell.\
Clicking a cell toggles the state of the cell between `alive` and `dead`.

You can set the initial state of the grid and then hit Start to start the simulation.\
The simulation can be paused (or stopped) at any point.\
Hitting the Clear button will set the state of the grid back to an empty grid. 

The rules of the Game Of Life are as follows:
- Any live cell with fewer than two live neighbours dies, as if by underpopulation.
- Any live cell with two or three live neighbours lives on to the next generation.
- Any live cell with more than three live neighbours dies, as if by overpopulation.
- Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

Enjoy!

![conways-game-of-life-for-readme](https://github.com/user-attachments/assets/8b2dadb6-a588-49ce-9868-035f7439194a)

