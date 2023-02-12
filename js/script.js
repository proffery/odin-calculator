const keyboard = ['C', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const dispExpression = document.querySelector('.display-expression');
const dispResult = document.querySelector('.display-result');
const CALC_ACCURACY = 10000000000;
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
        calculate();
    }
    else {
        createNumbersArray(e.target.id);
    }
    displayResult(calculate());
}


function createOperationArray(id) {
    if (numbersArray.length > 0 ) {
        if (operationArray.length < numbersArray.length) {
            operationArray[operationCounter] = id;
            console.log(operationArray);
            operationCounter++;
            numbersCounter = 0;
            dotFlag = false;
            console.log('iterOper:'+ operationCounter);
            displayExpression();
        }
        else {
            operationCounter--;
            operationArray[operationCounter] = id;
            operationCounter++;
            numbersCounter = 0;
            dotFlag = false;
            displayExpression();
        }
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
    
    displayExpression();
    console.log(`digits input: ${id}`);
    console.log('iterOper=:'+ operationCounter);
    console.log('iterDigits='+ numbersCounter);
    console.log(numbersArray);
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
    console.log(numbersArray);
    console.log(operationArray);
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
    console.log('dotFlag:');
    if (numbersArray[operationCounter] % 1 == 0 || numbersCounter == 0) {
        dotFlag = true;
        numbersCounter = 1;
    }
    displayExpression();
    console.log('dotflag => '+ dotFlag);
}

function clear() {
    console.log('clear:');
    result = 0;
    operationCounter = 0;
    numbersCounter = 0;
    operationArray = [];
    numbersArray = [];
    dotFlag = false;
    console.log('digitsArr: '+ numbersArray);
    console.log('operationArray: '+ operationArray);
    displayExpression();
}

function remove() {
    if (numbersArray.length > 0) {
        console.log('remove:');
        dotFlag = false;
        numbersCounter--;
        if (numbersArray.length > operationArray.length){
            let string = numbersArray[operationCounter].toString();
            console.log(`${string}`);
            string = string.substring(0, string.length - 1);
            console.log(`${string}`);
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
        console.log(numbersArray);
        console.log(operationArray);
        displayExpression();
    }
}

function plusMinus() {
    if (numbersArray.length > 0) {
        console.log('plusMinus:');
        if (!isNaN(numbersArray[operationCounter])) {
            numbersArray[operationCounter] *= -1;
        }
        displayExpression();
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
        }
        if (tempOperationArray[i] === '/') {
            tempDigitsArray[i] /= tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
        }
        console.log(tempDigitsArray);
        console.log(tempOperationArray);
    } 
    for (let i = 0; i < tempOperationArray.length; i++) {
        if (tempOperationArray[i] === '+') {
            tempDigitsArray[i] += tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
        }
        if (tempOperationArray[i] === '-') {
            tempDigitsArray[i] -= tempDigitsArray[i + 1];
            tempOperationArray.splice(i, 1);
            tempDigitsArray.splice(i + 1, 1);
        }
        console.log(tempDigitsArray);
        console.log(tempOperationArray);
    } 
    return Math.round(tempDigitsArray[0] * CALC_ACCURACY) / CALC_ACCURACY;
}
                                        
function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', input));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));