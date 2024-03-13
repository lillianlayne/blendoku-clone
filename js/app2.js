let level;
let gameState; // solved or unsolved (1, -1)
let puzzBoard; // dom gameBoard
let puzzKey;

// cache
const gameBoardDiv = document.getElementById("game-board");
const colorBankDiv = document.getElementById("color-tiles");
const msgDiv = document.getElementById("message");
const resetBtn = document.getElementById("reset");

// initialize game
init();

function init(level) {

    level = 3;
    puzzKey = getPuzzKey(level);  
  gameState = false;
  render(level);
}

// color generation functions

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

        colorMatrix.push(rgbColor)
    }
    return colorMatrix
}

function initColor(level) {
    const start = getVals(level);
    const end = getVals(level);
    const vStart = getBtwnVals(start[0], end[0], level);
    const vEnd = getBtwnVals(start[level], end[level], level);
    const valArr = [];


    for (let i = 0; i < start.length; i++) {
        let btwn = getBtwnVals(vStart[i], vEnd[i], level);
        valArr.push(btwn)
    }

    return valArr;
}

function getBtwnVals(start, end, level) {
    let valStart = start;
    let step = 0;
    let valArr = [start];

    if (start > end) {
        step = Math.floor((start - end) / level);
    }
    else {
        step = Math.floor((end - start) / level);
    }

    for (let i = 0; i < level; i++) {
        if (start > end) {
            step = Math.floor((start - end) / level);
            valArr.push(valStart - step);
            valStart = valStart - step
        }  else {
            step = Math.floor((end - start) / level);
            valArr.push(valStart + step);
            valStart = valStart + step
        }
    }

   return valArr 
}

function getVals(level) {
    let start = Math.floor(Math.random() * (255 - 50)) + 50; // Math.floor(Math.random() * (maxNum - minNum that can be thrown)) + minNum rebalance
    let step = 25 // (startNum / 10 [to make sure the number 2 digits]) + 30 (so the num is higher than 30)
    const valArray = [start];
   
    for (let i = 0; i < level; i ++) {
        valArray.push(start - step); 
        start = start - step;
        step = step + 8
    }

    return valArray
}

// render functions
function render(level) {
 levelSetUp(level)
    // const test = initColor();
    // console.log(test)
}

function levelSetUp(level) {
  
    let bgColor = puzzKey.map((elem) => {
        return `rgb(${elem})`
    })

console.log(puzzKey)
    for (let i = 0; i < bgColor.length; i++) {
        const gameTileDiv = document.createElement('div');
        gameTileDiv.classList.add('game-tile');
        gameTileDiv.style.background = bgColor[i];
        gameBoardDiv.appendChild(gameTileDiv)
    }
}

