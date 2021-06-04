// preload.js

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const numCont = document.getElementById('number');
const expCont = document.getElementById('exp');
const expValCont = document.getElementById('exp-eval');

const insertFactor = factor => {
    let caretPos = 0;
    if (numCont.selectionStart == 0) {
        numCont.value = `${ factor }${ numCont.value }`
        caretPos = numCont.value.length;
    } else {
        let start = numCont.value.slice(0, numCont.selectionStart);
        caretPos = start.length + factor.length;
        let end = numCont.value.slice(numCont.selectionStart, numCont.value.length);
        numCont.value = `${ start }${ factor }${ end }`
    }

    numCont.focus();
    numCont.setSelectionRange(caretPos, caretPos);
}

const clearExp = () => {
    expCont.innerHTML = '&nbsp;';
    expValCont.innerHTML = '&nbsp;';
}

const evaluateExpression = () => {
    try {
        expValCont.innerHTML = math.evaluate(numCont.value);
        expCont.innerHTML = numCont.value;
        numCont.value = "";
    } catch (error) {
        expCont.innerHTML = '!Error';
    }
}