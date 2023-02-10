const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const regex = /((\-|\d)(\d*)(\.?\d*)?(\+|\-|\*|\/)?){1,10}/;
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
        minus(e);
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '+') {
        plus(e);
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '*') {
        multiply(e);
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '/') {
        divide(e);
        createOperationArray(e.target.id);
    }
    else if(e.target.id === '.') {
        changeDotFlag();
    }
    else if(e.target.id === '=') {
        calculate();
    }
    else {
        createDigitsArray(e);
    }
    // calculate();
}


function createOperationArray(id) {
    operationArray[opIter] = id;
    console.log(operationArray);
    opIter++;
    digitsIter = 0;
    dotFlag = false;
    console.log('iterOper:'+ opIter);
    displayArrays();
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
}

function createDigitsArray(e) {
    if (dotFlag == false) {
        if (digitsIter == 0) {
            digitsArray[opIter] = parseFloat(e.target.id);
        }
        else {
            digitsArray[opIter] = parseFloat(digitsArray[opIter] + e.target.id);
        }
    }
    else {
        if (digitsIter == 0) {
            digitsArray[opIter] = Math.round(parseFloat(e.target.id) * 10) / 100;
            digitsIter++;
        }
        else {
            digitsArray[opIter] += Math.round(parseFloat(e.target.id) * Math.pow(10, digitsIter)) / Math.pow(100, digitsIter);
        }
    }
    
    displayArrays();
    console.log(`digits input: ${e.target.id}`);
    console.log('iterOper=:'+ opIter);
    console.log('iterDigits='+ digitsIter);
    console.log(digitsArray);
    digitsIter++;
}

function changeDotFlag() {
    console.log('dotFlag:');
    if (dotFlag == false) {
        dotFlag = true;
    }
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
    displayExpression.textContent = ''
}

function remove() {
    console.log('remove:');
    let string = digitsArray[opIter].toString();
    dotFlag = false;
    console.log(`${string}`);
    string = string.substring(0, string.length - 1);
    console.log(`${string}`);
    digitsArray[opIter] = parseFloat(string);
    if (isNaN(digitsArray[opIter])) {
        digitsArray[opIter] = 0;
    }
    displayArrays();
}

function plusMinus() {
    console.log('plusMinus:');
    digitsArray[opIter] *= -1;
    displayArrays();
}

function minus(e) {
    console.log('minus:');
    //cleanExpressionEnter(e.target.id);
}

function plus(e) {
    console.log('plus:');
    //cleanExpressionEnter(e.target.id);
}

function multiply(e) {
    console.log('multiply:');
    //cleanExpressionEnter(e.target.id);
}

function divide(e) {
    console.log('division:');
    //cleanExpressionEnter(e.target.id);
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
            
    //function cleanExpressionEnter(id) {
    //     console.log('expression before: '+ expression);
    //     expression = expression.concat(id);
    //     console.log('expression after: '+ expression);
    //     if (regex.test(expression)) {
    //         console.log(`cleanExpressionEnter ${regex.test(expression)}:`); 
    //         console.log('expression: '+ expression);
    //         displayExpression.textContent = expression;
    //     }
    //     else {
    //         console.log(`cleanExpressionEnter ${regex.test(expression)} -> remove:`); 
    //         remove();
    //     }
    //}
                                        
function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', displayInput));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));