const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const displayExpression = document.querySelector('.display-expression');
const displayResult = document.querySelector('.display-result');
let result = 0;
let digitsArray = [];
let operationArray = [];
let digitsIter = 0;
let opIter = 0;
let dotFlag = false;

function drawKeyboard() {
    keysContainer.innerHTML = keyboard.map((key) => `<div class="key" id="${key}">${key}</div>`).join('');
}

function displayInput(e) {
    const pressedKey = document.querySelector(`[id="${e.target.id}"]`);
    pressedKey.classList.add('key-click');
    
    if(e.target.id === 'CE') {
        clean();
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
        createDigitsArray(e.target.id);
    }
    // calculate();
}


function createOperationArray(id) {
    if (digitsArray.length > 0 ) {
        if (operationArray.length < digitsArray.length) {
            operationArray[opIter] = id;
            console.log(operationArray);
            opIter++;
            digitsIter = 0;
            dotFlag = false;
            console.log('iterOper:'+ opIter);
            displayArrays();
        }
        else {
            opIter--;
            operationArray[opIter] = id;
            opIter++;
            digitsIter = 0;
            dotFlag = false;
            displayArrays();
        }
    }
    
}
                            
function displayArrays() {
    let expression = '';
    for (let i = 0; i < digitsArray.length; i++) {
        if (operationArray.length == digitsArray.length ) {
            expression += digitsArray[i].toString() + operationArray[i];
        }
        if (operationArray.length < digitsArray.length ) {
            if (operationArray.length == 0){
                expression = digitsArray[i].toString();
            }
            else {
                expression += operationArray[i - 1] + digitsArray[i].toString();
                if (operationArray[i - 1] == undefined) {
                    expression = expression.replaceAll('undefined', '');
                }
            }
        }
    }
    displayExpression.textContent = expression;
    console.log(digitsArray);
    console.log(operationArray);
}

function createDigitsArray(id) {
    if (dotFlag == false) {
        if (digitsIter == 0) {
            digitsArray[opIter] = parseFloat(id);
        }
        else {
            digitsArray[opIter] = parseFloat(digitsArray[opIter] + id);
        }
    }
    else {
        if (digitsArray[opIter] == undefined) {
            digitsArray[opIter] = Math.round(parseFloat(id) * 10) / 100;
        }
        else {
            if (digitsArray[opIter] < 0) {
                digitsArray[opIter] *= -1;
                digitsArray[opIter] += Math.round(parseFloat(id) * Math.pow(10, digitsIter)) / Math.pow(100, digitsIter);
                digitsArray[opIter] = Math.round(digitsArray[opIter] * 1000000) / 1000000;
                digitsArray[opIter] *= -1;    
            }
            else {
                digitsArray[opIter] += Math.round(parseFloat(id) * Math.pow(10, digitsIter)) / Math.pow(100, digitsIter);
                digitsArray[opIter] = Math.round(digitsArray[opIter] * 1000000) / 1000000;
            }
        }
    }
    
    displayArrays();
    console.log(`digits input: ${id}`);
    console.log('iterOper=:'+ opIter);
    console.log('iterDigits='+ digitsIter);
    console.log(digitsArray);
    digitsIter++;
}

function changeDotFlag() {
    console.log('dotFlag:');
    if (digitsArray[opIter] % 1 == 0 || digitsIter == 0) {
        dotFlag = true;
        digitsIter = 1;
    }
    displayArrays();
    console.log('dotflag => '+ dotFlag);
}

function clean() {
    console.log('clean:');
    result = 0;
    opIter = 0;
    digitsIter = 0;
    operationArray = [];
    digitsArray = [];
    dotFlag = false;
    console.log('digitsArr: '+ digitsArray);
    console.log('operationArray: '+ operationArray);
    displayArrays();
}

function remove() {
    if (digitsArray.length > 0) {
        console.log('remove:');
        dotFlag = false;
        digitsIter--;
        if (digitsArray.length > operationArray.length){
            let string = digitsArray[opIter].toString();
            console.log(`${string}`);
            string = string.substring(0, string.length - 1);
            console.log(`${string}`);
            digitsArray[opIter] = parseFloat(string);
            if (isNaN(digitsArray[opIter])) {
                digitsIter = 0;
                digitsArray.pop();
                if (digitsArray.length == 0) {
                    clean();
                }
            }
        }
        else {
            operationArray.pop();
            opIter--;
        }
        
        console.log(digitsArray);
        console.log(operationArray);
        displayArrays();
    }
    else {
        clean();
    }
}

function plusMinus() {
    if (digitsArray.length > 0) {
        console.log('plusMinus:');
        if (!isNaN(digitsArray[opIter])) {
            digitsArray[opIter] *= -1;
        }
        displayArrays();
    }
}

function calculate() {
// if (operationArray.length == 0 || digitsArray.length < 2) {
    //     return;
    // }
    
    // else {
    //     for (let i = 0; i < digitsArray.length; i++) {
    //         if (operationArray[i] === '-') {
    //             result = parseFloat(digitsArray[i]) - parseFloat(digitsArray[i + 1]);
    //         }
    //         if (operationArray[i] === '+') {
    //             result = parseFloat(digitsArray[i]) + parseFloat(digitsArray[i + 1]);
    //         }
    //         if (operationArray[i] === '*') {
    //             result = parseFloat(digitsArray[i]) * parseFloat(digitsArray[i + 1]);
    //         }
    //         if (operationArray[i] === '/') {
    //             result = parseFloat(digitsArray[i]) / parseFloat(digitsArray[i + 1]);
    //         }  
    //     }
    //}
    // displayResult.textContent = result;
}
                                        
function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', displayInput));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));