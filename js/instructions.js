const fwdBtn = document.getElementById('arrow-fwd');
const backBtn = document.getElementById('arrow-back');

const card1 = document.getElementById('intro-1');
const card2 = document.getElementById('intro-2');
const card3 = document.getElementById('intro-3');

const cardArr = [card1, card2, card3]

let currIdx;
let nextIdx;


fwdBtn.addEventListener('click', handleFwd)



function handleFwd() {
    

if (!card1.classList.contains('hide') && card2.classList.contains('hide')) {
    card2.classList.remove('hide');
    card1.classList.add('hide')
} else if (!card2.classList.contains('hide') && card3.classList.contains('hide')) {
    card3.classList.remove('hide');
    card2.classList.add('hide')
} else if (!card3.classList.contains('hide') && card1.classList.contains('hide')) {
card1.classList.remove('hide');
    card3.classList.add('hide')
}

  


  console.log(currIdx)
}

function showStart() {
    card2.classList.add('hide');
    card3.classList.add('hide');

    currIdx = 0;
    console.log(currIdx)
}

showStart();