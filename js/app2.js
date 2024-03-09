// states
let puzzleKey; // stores what the final puzzle should be
let guessBoard; // stores the puzzle the user has guessed
let colorKey;
let gameState;

let rValues = getRdmValue(245, 47);
let gValues = getRdmValue(242, 113);
let bValues = getRdmValue(192, 168);
const defaultValue = "rgba(0,0,0,0)";
// game state object
let gamePlay = {
  '1': {
    getFill: function () {
      // gets the fill of the selected function
    },
  },
  '-1': {
    setFill: function () {
      // sets the fill of the selected function
    },
  },
};

// cache
const gameContainerDiv = document.getElementById("game-container");
const guessContainerDiv = document.getElementById("color-tiles");

//event listeners 
gameContainerDiv.addEventListener('click', handleBoard);

function handleBoard(event) {
  const e = event.target;
  let previousClick; //stores the previous click
  let previousBgColor; //stores bgColor of previous
  let currColor = e.style.background;

  if (e === gameContainerDiv) return;
  
  if (gameState === 1) {
   e.style.border = `3px solid #fafaf9`;
   previous = e;
   previousBgColor = e.style.background;
  }

  if (gameState === -1) {
    e.style.background = previous.style.background;
    previous.style.background = currColor;
    previous.style.border = 'none';
  }

  gameState *= -1;


}

// render functions
function render() {
  renderPuzzleKey();
  renderBoard(puzzleKey);
  renderGuessTiles();
}

function renderBoard(puzzleKey) {
  guessBoard = [
    [puzzleKey[0][0], defaultValue, defaultValue, puzzleKey[0][3]],
    [defaultValue, defaultValue, defaultValue, defaultValue],
    [defaultValue, defaultValue, defaultValue, defaultValue],
    [puzzleKey[3][0], defaultValue, defaultValue, puzzleKey[3][3]],
  ];
  // console.log(guessBoard)
  guessBoard.forEach((rowArr, rowIdx) => {
    rowArr.forEach((color, colIdx) => {
      const divId = `r${rowIdx}c${colIdx}`;
      const gameTileDiv = document.getElementById(divId);
      gameTileDiv.style.background = color;
    });
  });
}
function renderGuessTiles() {
  const guessTileBoard = puzzleKey.flat();
  const shuffledArray = guessTileBoard.sort((a, b) => 0.5 - Math.random()); // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  shuffledArray.forEach((color, idx) => {
    const gameTileDiv = document.createElement('div');
    gameTileDiv.classList.add('color-tile');
    gameTileDiv.style.background = color;
    guessContainerDiv.appendChild(gameTileDiv);
  })

}

function getRdmValue(startStep, endStep) {
  const step = Math.floor((startStep - endStep) / 16);
  const stepArr = [];
  stepArr.push(startStep);

  for (let i = 0; i < 15; i++) {
    startStep -= step;
    stepArr.push(startStep);
  }

  return stepArr;
}

function renderPuzzleKey() {
  for (let i = 0; i < puzzleKey.length; i++) {
    for (let j = 0; j < puzzleKey[i].length; j++) {
      puzzleKey[i][j][0] = rValues.shift();
      puzzleKey[i][j][1] = gValues.shift();
      puzzleKey[i][j][2] = bValues.shift();
    }
  }
  puzzleKey.forEach((rowArr, rowIdx) => {
    rowArr.forEach((colArr, colIdx) => {
      return (puzzleKey[rowIdx][colIdx] = `rgba(${colArr})`);
    });
    return puzzleKey;
  });
}

function init() {
  puzzleKey = [
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  ];
  gameState = 1;
  render();
}

init();
