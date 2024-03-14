// source: https://blog.logrocket.com/localstorage-javascript-complete-guide/

function setLevel(level) {
    localStorage.setItem('level', JSON.parse(level));
    window.location.href = 'blendoku.html'
}

