const getStep = (max) => {
    return Math.floor(Math.random() * (max / 10)) + 10
}


function getTopVert(level) {
    let start =  Math.floor(Math.random() * (255 - 40)) + 40;
    const step = getStep(start);
    const array = [start];
    console.log('start: ', start, 'step: ', step)
    for (let i = 0; i < level; i++) {
        array.push(start - step);
        start = start - step;
    }

    return array
}


function setRgbArr() {
    const rStart = getTopVert(3);
    const gStart = getTopVert(3);
    const bStart = getTopVert(3);
    
    const array = [];

    for (let i = 0; i < rStart.length; i ++) {
        let value = [];
        value.push(rStart[i])
        value.push(gStart[i])
        value.push(bStart[i])
        array.push(value)
    }

return array

}

function createColor(array) {
    const colorConvert = array.map((elem) => {
        return `rgba(${elem.join(',')})`
    })

    return colorConvert
}


const firstGradient = setRgbArr()
const firstGradientConverted = createColor(firstGradient)
console.log(firstGradientConverted)