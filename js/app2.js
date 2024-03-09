// states
let puzzleKey; // stores what the final puzzle should be
let guessBoard; // stores the puzzle the user has guessed
let rValues = getRdmValue(245, 47);
let gValues = getRdmValue(242, 113);
let bValues = getRdmValue(192, 168);

// game state object
let gamePlay = {
  getFill: {
    state: 1,
    getFill: function () {
      // gets the fill of the selected function
    },
  },
  setFill: {
    state: -1,
    setFill: function () {
      // sets the fill of the selected function
    },
  },
};


// render functions 

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

  renderPuzzleKey();
}

init();
