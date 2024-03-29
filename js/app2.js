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
let theme;

const themeColors = {
  1: {
    color: "#E8EADF",
    bg: "#1c1917",
    accent: "#aba29e",
  },
  "-1": {
    color: "#a3846d",
    bg: "#E8EADF",
    accent: "#a3846d",
  },
};
// cache ------------------------------------------------
const puzzContainer = document.getElementById("puzz-container");
const gameBoardDiv = document.getElementById("game-board");
const colorBankDiv = document.getElementById("color-tiles");
const msgDiv = document.getElementById("message");
const clickCountDiv = document.getElementById("click-data");
const refreshBtn = document.getElementById("refresh-board");
const levelBtns = document.getElementById("level-btns-game");
const logoBtn = document.getElementById("logo-nav");
const themeToggle = document.getElementById("theme-toggle");
// event listeners
puzzContainer.addEventListener("click", handleGameActions);
refreshBtn.addEventListener("click", () => {
  window.location.href = "blendoku.html";
});
logoBtn.addEventListener("click", () => {
  window.location = "index.html";
});
themeToggle.addEventListener("click", changeTheme);

// initialize game ------------------------------------------------
init();

function init(level) {
  level = JSON.parse(localStorage.getItem("level"));
  key1 = 0;
  key2 = level;
  key4 = (level + 1) * (level + 1) - 1;
  key3 = key4 - level;
  theme = 1;
  gameState = 1;
  isSolved = false;
  clickCount = 0;
  render(level);
}

function changeTheme(evt) {
  const e = evt.target;

  if (theme === 1) {
    themeToggle.style.justifyContent = "flex-end";
  }

  if (theme === -1) {
    themeToggle.style.justifyContent = "flex-start";
  }

  theme *= -1;

  document.body.style.color = themeColors[theme].color;
  document.body.style.background = themeColors[theme].bg;
  emptyDivArr.forEach((div) => {
    div.style.border = `1px solid ${themeColors[theme].accent}`;
  });
  refreshBtn.style.color = themeColors[theme].bg;
  refreshBtn.style.background = themeColors[theme].accent;
}

// event listener functions
function startNewLevel(evt) {
  localStorage.setItem("level", JSON.parse(evt));
  window.location.href = "blendoku.html";
}

function handleGameActions(evt) {
  let e = evt.target;
  let eTargetId = e.id;

  if (
    e === puzzDivArr[key1] ||
    e === puzzDivArr[key2] ||
    e === puzzDivArr[key3] ||
    e === puzzDivArr[key4] ||
    eTargetId === "game-board" ||
    eTargetId === "color-tiles" ||
    eTargetId === "puzz-container" ||
    isSolved
  ) {
    return;
  }

  if (gameState === 1) {
    if (e.style.background === "none") return;
    prevClick = e;
    getFill = e.style.background;
    e.style.width = "80%";
    e.style.height = "80%";
  }
  if (gameState === -1) {
    prevClick.style.background = e.style.background;
    e.style.background = getFill;
    prevClick.style.width = "100%";
    prevClick.style.height = "100%";
    clickCount += 1;
  }

  gameState *= -1;
  checkSolved();
}

function checkSolved() {
  let solveCount = 0;

  const filledDivs = puzzDivArr.map((div) => {
    let bgColor = div.style.background;
    bgColor = bgColor.replace(/\s/g, "");
    return bgColor;
  });

  const convertkey = convertToRgbVal(puzzKey);

  for (let i = 0; i < convertkey.length; i++) {
    if (filledDivs[i] === convertkey[i]) {
      solveCount += 1;
    } else {
      solveCount += 0;
    }
  }

  if (solveCount < convertkey.length) {
    isSolved = false;
  } else {
    isSolved = true;
  }

  renderControls();
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

function convertToRgbVal(arr) {
  const color = arr.map((elem) => {
    return `rgb(${elem})`;
  });

  return color;
}

// render DOM functions ------------------------------------------------
function render(level) {
  renderPuzzleData(level);
  renderLevelSetUp(level);
  renderControls();
}

function renderPuzzleData(level) {
  puzzKey = getPuzzKey(level);
  guessBankVals = getGuessBank();
  puzzBoard = initPuzzBoard();
}

function renderGuessTiles() {
  const guessTileColorArr = convertToRgbVal(guessBankVals);
  const randomize = guessTileColorArr.sort((a, b) => 0.5 - Math.random());
  let numRow = Math.floor(guessTileColorArr.length / 7) + 1;
  const templateGrid = `repeat(${numRow}, 1fr)`;

  randomize.forEach((color) => {
    const guessBankTile = document.createElement("div");
    guessBankTile.classList.add("color-tile");
    guessBankTile.style.background = color;
    colorBankDiv.appendChild(guessBankTile);
  });

  colorBankDiv.style.gridTemplateRows = templateGrid;
}
function renderGameBoard() {
  puzzBoard.forEach((color, idx) => {
    const puzzBoardDiv = document.createElement("div");
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty-space");
    emptyDiv.style.border = ".5px solid white";
    puzzBoardDiv.appendChild(emptyDiv);
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

  puzzDivArr = [...document.querySelectorAll("#game-board > div")];
  emptyDivArr = [...document.querySelectorAll(".empty-space")];
}

function renderControls() {
  levelBtns.style.display = "none";
  let length = puzzDivArr.length + 5;
  if (isSolved) {
    colorBankDiv.style.display = "none";
    emptyDivArr.forEach((div) => {
      div.style.visibility = "hidden";
    });
    msgDiv.innerText = "";
    puzzDivArr.forEach((div, idx) => {
      setTimeout(() => {
        div.classList.add("grow-shrink");
      }, 75 * idx);
    });

    setTimeout(() => {
      levelBtns.style.display = "grid";
    }, 75 * length);
  }

  isSolved
    ? (msgDiv.innerText = `Congrats! You solved the puzzle in ${clickCount} clicks`)
    : (msgDiv.innerText =
        "Correctly place all color tiles to solve the puzzle");

  clickCountDiv.innerText = clickCount;
}
