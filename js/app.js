let puzzKey;
let puzzBoard;
let gameState;
let guessTileBoard;
let key1;
let key2;
let key3;
let key4;
let gameKey1;
let gameKey2;
let gameKey3;
let gameKey4;
let solved;


const gameActions = {
  getFill: {
    handleColorDrop: function(event) {
      previousClick = event;

      event.style.border = '4px solid #1c1917';
      }
  }, 
  setFill: {
    handleColorDrop: function(event) {
      event.background = fill;
      previousClick.style.border = "none";
    }
  }
}
// cache
const gameBoardDiv = document.getElementById("game-board");
const guessContainerDiv = document.getElementById("color-tiles");
const gameBoardTileDiv = document.querySelectorAll("#game-board > div");

// event listeners 
document.getElementById('game-container').addEventListener('click', handleSelection);
// render
function render() {
  renderBoard();
  renderGuessTiles();
  renderControls();
  getWinner();

}

function renderBoard() {
  puzzBoard.forEach((color, idx) => {
    const divId = `r${idx}`;
    const rgbColor = createRgbColor(color)
    const gameTileDiv = document.getElementById(divId);
    gameTileDiv.style.background = rgbColor;
  });
}

function renderGuessTiles() {
  guessTileBoard = puzzKey.filter((val) => {
    return val !== key1 && val !== key2 && val !== key3 && val !== key4
  })
  
  guessTileBoard.sort((a, b) => .5 - Math.random());
  
  guessTileBoard.forEach((color, idx) => {
    const guessTileColor = createRgbColor(color);
    const guessTileDiv = document.createElement('div');
    guessTileDiv.classList.add('color-tile');
    guessTileDiv.style.background = guessTileColor;
    guessContainerDiv.appendChild(guessTileDiv)
  })
  
  }


// functions to set up puzzle colors
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

function getPuzzleKey() {
  const rValues = getRdmValue(201, 61);
  const gValues = getRdmValue(115, 61);
  const bValues = getRdmValue(89, 3);

  bValues.sort((a, b) => a - b);
  rgbArr = [];

  for (let i = 0; i < rValues.length; i++) {
    let rgb = [rValues[i], gValues[i], bValues[i]];
    rgbArr.push(rgb);
  }
  return rgbArr;
}

function getWinner() {
  // create a new array of the background colors of the gameBoard 
  // compare it to the puzzKey
  let puzzState = 0;
  const tileDivArr = [...gameBoardTileDiv];
  const puzzGuessArr = tileDivArr.map((div) => {
    let color = div.style.background
    color = color.replace(/\s/g, '');
    return color
  })
  
  const puzzKeyArr = puzzKey.map((value) => {
    return createRgbColor(value)
  })

for (let i = 0; i < tileDivArr.length; i++) {
  if (puzzGuessArr[i] === puzzKeyArr[i]) {
    puzzState += 1
  }  puzzState += 0
}

if (puzzState === puzzKeyArr.length) {
  solved = true
} solved = false;

}

function createRgbColor(arr) {
  arr.join(',');
  return `rgb(${arr})`;
}
let previousClick;
let fill;


// event listener functions
function handleSelection(event) {
  const e = event.target;
  const currColor = e.style.background;

  if (gameState === 1) {
    previousClick = e;
    fill = e.style.background;
    e.style.transform = 'scale(.75)'
  }
  
  if (gameState === -1) {
    previousClick.style.background = currColor;
    e.style.background = fill;
    previousClick.style.transform = 'scale(1)';

    

  }
  console.log(fill)
  gameState *= -1
}

function init() {
  puzzKey = [
    [61, 61, 89],
    [116, 112, 132],
    [175, 168, 177],
    [237, 228, 225],
    [114, 78, 71],
    [155, 124, 113],
    [198, 172, 157],
    [234, 224, 204],
    [158, 96, 49],
    [189, 136, 92],
    [219, 177, 136],
    [247, 219, 183],
    [201, 115, 3],
    [220, 148, 67],
    [237, 181, 114],
    [251, 215, 162],
  ];

  gameKey1 = 0;
  gameKey2 = 3;
  gameKey3 = 12;
  gameKey4 = 15;

  key1 = puzzKey[0];
  key2 = puzzKey[3];
  key3 = puzzKey[12];
  key4 = puzzKey[15];
  puzzBoard = [
      key1, 
      [],
      [],
      key2, 
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      key3, 
      [],
      [],
      key4, 
  ];

  render();
  gameState = 1;
}

init();
