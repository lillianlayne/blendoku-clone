const darkBlack = "#1c1917";
const darkWhite = "#fafaf9";
const darkScndWhite = "#aba29e";

let boardSolved;
let board;
let colorTileSelection;
// let bgColor;
let bgDefaultColor = 'rgba(28,25,23)';


// cahce
const gameBoardDiv = document.getElementById("game-board");
const colorTilesDiv = document.getElementById("color-tiles");
const gameContainer = document.getElementById("game-container");
let colorTile;

// event listeners 

// gameBoardDiv.addEventListener('click', handlePuzzleBoard);
// colorTilesDiv.addEventListener('click', handlePuzzleBoard);
colorTilesDiv.addEventListener('click', handleGetColor);
// gameContainer.addEventListener('click', handleClick);

// render
function render() {
  renderBoard();
  renderColorSelectionDiv();
}

function renderBoard() {
  board.forEach((color, idx) => {
    color.join("");
    const colorInTile = `rgba(${color})`;
    const gameBoardIdx = `c${idx}`;
    const gameBoardTile = document.getElementById(gameBoardIdx);
    gameBoardTile.style.background = colorInTile;
    gameBoardTile.style.border = "none";

    if (color.includes(28 && 25 && 23)) {
      gameBoardTile.style.border = `1px solid ${darkScndWhite}`;
    }
  });

}

function renderColorSelectionDiv() {
  colorTileSelection = [];

  board.forEach((color, idx) => {
    if (color.includes(28 && 25 && 23)) {
        colorTileSelection.push(idx);
    }
  });

  colorTileSelection.forEach((color, idx) => {
    const colorTileId = `g${idx}`;
    const colorFromBoard = boardSolved[color].join(',');
    const backgroundColor = `rgba(${colorFromBoard})`;
    const tileSelectionDiv = document.createElement('div');
    tileSelectionDiv.id = colorTileId;
    tileSelectionDiv.style.background = backgroundColor;
    tileSelectionDiv.classList.add('color-tile');
    colorTilesDiv.appendChild(tileSelectionDiv);

  })
  
}

let state = -1;
// event listener functions 
// function handleClick(event) {
//     let e = event.target;
//     let bgColor;

//     if (state === -1) {
//         bgColor = e.style.background;
//         e.style.border = `1px solid ${darkScndWhite}`;
//         state *= -1
//     }

//     if (state === 1) {
//         e.style.background = bgColor
//     }



// }

function handleGetColor(event) {
    let e = event.target;
    const bgColor = e.style.background;
    gameBoardDiv.addEventListener('click', handleFillColor)
    console.log(bgColor)
    
    function handleFillColor(event) {
        event.target.style.background = bgColor;
        event.target.style.border = "none";
        e.style.background = 'none'
    }
}



// init
function init() {
  boardSolved = [
    [232, 186, 71],
    [141, 153, 81],
    [63, 127, 84],
    [213, 151, 71],
    [0, 0, 0],
    [100, 81, 50],
    [197, 116, 70],
    [151, 66, 40],
    [110, 16, 16],
  ];

  board = [
    [232, 186, 71],
    [28, 25, 23],
    [63, 127, 84],
    [28, 25, 23],
    [0, 0, 0, 0],
    [28, 25, 23],
    [197, 116, 70],
    [28, 25, 23],
    [110, 16, 16],
  ];

  render();
}

init();
