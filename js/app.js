let board;

// cahce
const gameBoardDiv = document.getElementById("game-board");
const colorTilesDiv = document.getElementById("color-tiles");

// color class
class Colors {
  constructor(idx) {
    this.index = idx;
    this.color = color;
  }

  getColor() {
    board.forEach((color, idx) => {
      color.join(",");
      return (this.color = `rgba(${color})`);
    });
  }
  getIndex() {
    board.forEach((color, idx) => {
      return (this.index = idx);
    });
  }
}

// render
function render() {
  renderBoard();
}

function renderBoard() {
    board.forEach((color, idx) => {
        color.join('');
        const colorInTile = `rgba(${color})`;
        const gameBoardIdx = `c${idx}`;
        const colorTileDiv = document.getElementById(gameBoardIdx)
        colorTileDiv.style.background = colorInTile;
        
    })
}

function init() {
  board = [
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

  render();
}

init();
