let level;
let isSolved;
let puzzKey;
let guessBankVals;
let puzzBoard;
let key1;
let key2;
let key3;
let key4;
let clickCount;
let gameState;
let getFill;
let prevClick;

// cache ------------------------------------------------
const puzzContainer = document.getElementById("puzz-container");
const gameBoardDiv = document.getElementById("game-board");
const colorBankDiv = document.getElementById("color-tiles");
const msgDiv = document.getElementById("message");
const resetBtn = document.getElementById("reset");
const clickCountDiv = document.getElementById("click-data");
const refreshBtn = document.getElementById('refresh-board');
let puzzDivArr;
let bankDivArr;

// event listeners
puzzContainer.addEventListener('click', handleGameActions);

// initialize game ------------------------------------------------
init();

function init(level) {
  level = 3;

  key1 = 0;
  key2 = level;
  key4 = (level + 1) * (level + 1) - 1;
  key3 = key4 - level;

  puzzKey = getPuzzKey(level);
  guessBankVals = getGuessBank();
  puzzBoard = initPuzzBoard();

  gameState = 1;
  isSolved = false;
  clickCount = 0;
  render(level);
}

// event listener functions
function handleGameActions(evt) {
    let e = evt.target;
    let eTargetId = e.id;
    
    if (e === puzzDivArr[key1] ||
        e === puzzDivArr[key2] ||
        e === puzzDivArr[key3] ||
        e === puzzDivArr[key4] ||
        eTargetId === 'game-board' ||
        eTargetId === 'color-tiles') {
        return
    }

    if (gameState === 1) {
        if (e.style.background === 'none') return;
        prevClick = e;
        getFill = e.style.background;
        e.style.width = '80%';
        e.style.height = '80%';
    }
    if (gameState === -1) {
        console.log(getFill)
        prevClick.style.background = e.style.background
        e.style.background = getFill;
        prevClick.style.width = '100%';
        prevClick.style.height = '100%';

    }
    
  
    gameState *= -1;
    checkSolved();
}

function checkSolved() {
  const filledDivs = puzzDivArr.map((div) => {
    return div.style.background
  })


  console.log(guessBankVals)
}
// color generation functions ------------------------------------------------
// combines values into rgb matrix
function getPuzzKey(level) {
  const rVals = initColor(level);
  const gVals = initColor(level);
  const bVals = initColor(level);

  let r = rVals.flat();
  let g = gVals.flat();
  let b = bVals.flat();

  let colorMatrix = [];

  for (let i = 0; i < r.length; i++) {
    const rgbColor = [];

    rgbColor.push(r[i]);
    rgbColor.push(g[i]);
    rgbColor.push(b[i]);

    colorMatrix.push(rgbColor);
  }
  return colorMatrix;
}

// gets a matrix of colors for r, g, or b
function initColor(level) {
  const start = getVals(level);
  const end = getVals(level);
  const vStart = getBtwnVals(start[0], end[0], level);
  const vEnd = getBtwnVals(start[level], end[level], level);
  const valArr = [];

  for (let i = 0; i < start.length; i++) {
    let btwn = getBtwnVals(vStart[i], vEnd[i], level);
    valArr.push(btwn);
  }

  return valArr;
}

function getVals(level) {
  let start = Math.floor(Math.random() * (255 - 50)) + 60;
  const end = Math.floor(Math.random() * (start - 0) + 1);
  const valArray = [start];
  let step = Math.floor((start - end) / level);

  for (let i = 0; i < level; i++) {
    valArray.push(start - step);
    start = start - step;
  }

  return valArray;
}

// gets the r,g, or b value in between the start and finish
function getBtwnVals(start, end, level) {
  let valStart = start;
  let step = 0;
  let valArr = [start];

  if (start > end) {
    step = Math.floor((start - end) / level);
  } else {
    step = Math.floor((end - start) / level);
  }

  for (let i = 0; i < level; i++) {
    if (start > end) {
      step = Math.floor((start - end) / level);
      valArr.push(valStart - step);
      valStart = valStart - step;
    } else {
      step = Math.floor((end - start) / level);
      valArr.push(valStart + step);
      valStart = valStart + step;
    }
  }

  return valArr;
}

// set up game data ------------------------------------------------
function getGuessBank() {
  const guessTileArr = puzzKey.map((color) => {
    if (
      color === puzzKey[key1] ||
      color === puzzKey[key2] ||
      color === puzzKey[key3] ||
      color === puzzKey[key4]
    ) {
      return 0;
    }
    return color;
  });

  const filteredGuessTiles = guessTileArr.filter((val, idx) => {
    return val !== 0;
  });

  return filteredGuessTiles;
}

function initPuzzBoard() {
  const puzzBoardTiles = puzzKey.map((color) => {
    if (
      color === puzzKey[key1] ||
      color === puzzKey[key2] ||
      color === puzzKey[key3] ||
      color === puzzKey[key4]
    ) {
      return color;
    }
    return (color = "none");
  });

  return puzzBoardTiles;
}

function convertToRgb(arr) {
 
}

function convertToRgbVal(arr) {
  const color = arr.map((elem) => {
    return `rgb(${elem})`;
  });

  return color;
}

// render DOM functions ------------------------------------------------
function render() {
  renderLevelSetUp();
  renderControls();
}

function renderGuessTiles() {
  const guessTileColorArr = convertToRgbVal(guessBankVals);
  const randomize = guessTileColorArr.sort((a, b) => 0.5 - Math.random());

  randomize.forEach((color) => {
    const guessBankTile = document.createElement("div");
    guessBankTile.classList.add("color-tile");
    guessBankTile.style.background = color;
    colorBankDiv.appendChild(guessBankTile);
  });

}
function renderGameBoard() {
  puzzBoard.forEach((color, idx) => {
    const puzzBoardDiv = document.createElement("div");
    puzzBoardDiv.classList.add("game-tile");
    puzzBoardDiv.id = `c${idx}`;
    gameBoardDiv.appendChild(puzzBoardDiv);
    if (color === "none") {
      puzzBoardDiv.style.background = "none";
    }
  });

  const keyArr = [key1, key2, key3, key4];
  keyArr.forEach((val) => {
    const puzzKeyString = convertToRgbVal(puzzKey);
    const keyDivId = `c${val}`;
    const keyDiv = document.getElementById(keyDivId);
    keyDiv.style.background = puzzKeyString[val];
  });
}

function renderLevelSetUp() {
  let gridSize = Math.sqrt(puzzKey.length);
  let tmpltGrid = `repeat(${gridSize}, 1fr)`;

  gameBoardDiv.style.gridTemplateColumns = tmpltGrid;
  gameBoardDiv.style.gridTemplateRows = tmpltGrid;

  renderGuessTiles();
  renderGameBoard();

  puzzDivArr = [...document.querySelectorAll('#game-board > div')];
}

function renderControls() {
  isSolved
    ? (resetBtn.style.visibility = "visibile")
    : (resetBtn.style.visibility = "hidden");
  isSolved
    ? (msgDiv.innerText = "nice")
    : (msgDiv.innerText =
        "Correctly place all color tiles to solve the puzzle");
}
