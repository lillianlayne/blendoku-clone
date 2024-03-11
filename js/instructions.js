const fwdBtn = document.getElementById('arrow-fwd');
const backBtn = document.getElementById('arrow-back');

const card1 = document.getElementById('intro-1');
const card2 = document.getElementById('intro-2');
const card3 = document.getElementById('intro-3');

let cardVisible;

fwdBtn.addEventListener('click', shuffleCardsFwd);
backBtn.addEventListener('click', shuffleCardsBack);
