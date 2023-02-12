const keyboard = ['C', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const dispExpression = document.querySelector('.display-expression');
const dispResult = document.querySelector('.display-result');
const display = document.querySelector('.display');
const CALC_ACCURACY = 1000000000;
let numbersArray = [];
let operationArray = [];
let numbersCounter = 0;
let operationCounter = 0;
let dotFlag = false;

function drawKeyboard() {
    keysContainer.innerHTML = keyboard.map((key) => `<div class="key" id="${key}">${key}</div>`).join('');
}

function input(e) {
    const pressedKey = document.querySelector(`[id="${e.target.id}"]`);
    pressedKey.classList.add('key-click');
    if(e.target.id === 'C') {
        clear();
    }
    else if(e.target.id === '<-') {
        remove();
    }
    else if(e.target.id === '+/-') {
        plusMinus();
    }
    else if(e.target.id === '-') {
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '+') {
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '*') {
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '/') {
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '.') {
        changeDotFlag();
    }
    else if(e.target.id === '=') {
        equals();
    }
    else {
        createNumbersArray(e.target.id);
    }
    displayExpression();
    displayResult(calculate());
}

function displayError() {
    display.classList.add('error');
}

function equals() {
    if (numbersArray.length > 0) {
        let resultToArray = calculate();
        clear();
        numbersArray[0] = resultToArray;
    }
    else {
        displayError();
    }
}

function createOperationArray(id) {
    if (numbersArray.length > 0 ) {
        if (operationArray.length < numbersArray.length) {
            operationArray[operationCounter] = id;
            operationCounter++;
            numbersCounter = 0;
            dotFlag = false;
        }
        else {
            operationCounter--;
            operationArray[operationCounter] = id;
            operationCounter++;
            numbersCounter = 0;
            dotFlag = false;
        }
    }
    else {
        displayError();
    }
}
function createNumbersArray(id) {
    if (dotFlag == false) {
        if (numbersCounter == 0) {
            numbersArray[operationCounter] = parseFloat(id);
        }
        else {
            numbersArray[operationCounter] = parseFloat(numbersArray[operationCounter] + id);
        }
    }
    else {
        if (numbersArray[operationCounter] == undefined) {
            numbersArray[operationCounter] = Math.round(parseFloat(id) * 10) / 100;
        }
        else {
            if (numbersArray[operationCounter] < 0) {
                numbersArray[operationCounter] *= -1;
                numbersArray[operationCounter] += Math.round(parseFloat(id) * Math.pow(10, numbersCounter)) / Math.pow(100, numbersCounter);
                numbersArray[operationCounter] = Math.round(numbersArray[operationCounter] * CALC_ACCURACY) / CALC_ACCURACY;
                numbersArray[operationCounter] *= -1;    
            }
            else {
                numbersArray[operationCounter] += Math.round(parseFloat(id) * Math.pow(10, numbersCounter)) / Math.pow(100, numbersCounter);
                numbersArray[operationCounter] = Math.round(numbersArray[operationCounter] * CALC_ACCURACY) / CALC_ACCURACY;
            }
        }
    }
    numbersCounter++;
}     

function displayExpression() {
    let expression = '';
    for (let i = 0; i < numbersArray.length; i++) {
        if (operationArray.length == numbersArray.length ) {
            expression += numbersArray[i].toString() + operationArray[i];
        }
        if (operationArray.length < numbersArray.length ) {
            if (operationArray.length == 0){
                expression = numbersArray[i].toString();
            }
            else {
                expression += operationArray[i - 1] + numbersArray[i].toString();
                if (operationArray[i - 1] == undefined) {
                    expression = expression.replaceAll('undefined', '');
                }
            }
        }
    }
    dispExpression.textContent = expression;
}

function displayResult(result) {
    if (isNaN(result)) {
        dispResult.textContent = '';
    }
    else {
        dispResult.textContent = result;
    }
}

function changeDotFlag() {
    if (numbersArray[operationCounter] % 1 == 0 || numbersCounter == 0) {
        dotFlag = true;
        numbersCounter = 1;
    }
    else {
        displayError();
    }
}

function clear() {
    result = 0;
    operationCounter = 0;
    numbersCounter = 0;
    operationArray = [];
    numbersArray = [];
    dotFlag = false;
}

function remove() {
    if (numbersArray.length > 0) {
        dotFlag = false;
        numbersCounter--;
        if (numbersArray.length > operationArray.length){
            let string = numbersArray[operationCounter].toString();
            string = string.substring(0, string.length - 1);
            numbersArray[operationCounter] = parseFloat(string);
            if (isNaN(numbersArray[operationCounter])) {
                numbersCounter = 0;
                numbersArray.pop();
                if (numbersArray.length == 0) {
                    clear();
                }
            }
        }
        else {
            operationArray.pop();
            operationCounter--;
        }
    }
    else {
        displayError();
    }
}

function plusMinus() {
    if (numbersArray.length > 0) {
        if (!isNaN(numbersArray[operationCounter])) {
            numbersArray[operationCounter] *= -1;
        }
    }
    else {
        displayError();
    }
}

function calculate() {
    let tempDigitsArray = Array.from(numbersArray);
    let tempOperationArray = Array.from(operationArray);
    for (let i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === '*') {
            tempDigitsArray[i] *= tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
            i--;
        }
    }
    for (let i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === '/') {
            tempDigitsArray[i] /= tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
            i--;
        }
    } 
    for (let i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === '+') {
            tempDigitsArray[i] += tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
            i--;
        }
    }
    for (let i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === '-') {
            tempDigitsArray[i] -= tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
            i--;
        }
    } 
    return Math.round(tempDigitsArray[0] * CALC_ACCURACY) / CALC_ACCURACY;
}
                                        
function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
    display.classList.remove('error');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', input));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));