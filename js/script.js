const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const regex = /((\-|\d)(\d*)(\.?\d*)?(\+|\-|\*|\/)?){1,10}/;
const displayExpression = document.querySelector('.display-expression');
const displayResult = document.querySelector('.display-result');
let expression = '';
let result = 0;
let digitsArray = [];
let operationArray = [];
let digitsIter = 0;
let opIter = 0;
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
        createDigitsArray(e.target.id);
    }
    else if(e.target.id === '+') {
        plus(e);
        createOperationArray(e.target.id);
        createDigitsArray(e.target.id);
    }
    else if(e.target.id === '*') {
        multiply(e);
        createOperationArray(e.target.id);
        createDigitsArray(e.target.id);
    }
    else if(e.target.id === '/') {
        divide(e);
        createOperationArray(e.target.id);
        createDigitsArray(e.target.id);
    }
    else if(e.target.id === '.') {
        dot(e);
    }
    else if(e.target.id === '=') {
        createDigitsArray(e.target.id);
        calculate();
    }
    else {
        digitsInput(e);
    }
    // calculate();
}

function calculate() {
    if (operationArray.length == 0 || digitsArray.length < 2) {
        return;
    }

    else {
        for (let i = 0; i < digitsArray.length; i++) {
            if (operationArray[i] === '-') {
                result = parseFloat(digitsArray[i]) - parseFloat(digitsArray[i + 1]);
            }
            if (operationArray[i] === '+') {
                result = parseFloat(digitsArray[i]) + parseFloat(digitsArray[i + 1]);
            }
            if (operationArray[i] === '*') {
                result = parseFloat(digitsArray[i]) * parseFloat(digitsArray[i + 1]);
            }
            if (operationArray[i] === '/') {
                result = parseFloat(digitsArray[i]) / parseFloat(digitsArray[i + 1]);
            }  
        }
    }
    displayResult.textContent = result;
}

function createOperationArray(id) {
    operationArray[opIter] = id;
    console.log(operationArray);
    opIter++;
    console.log('iterOper:'+ opIter);
}

function createDigitsArray(id) {
     if (id === '=') {
        if (digitsIter == 0 && opIter == 0) {
            console.log(digitsArray);
            digitsArray[digitsIter] = expression;
            console.log(digitsArray);
            console.log('iterOper=:'+ opIter);
            console.log('iterDigits=:'+ digitsIter);

        }
        // if (opIter == 0 && digitsIter == 1) {
        //     console.log(digitsArray);
        //     digitsArray[digitsIter] = expression;
        //     console.log(digitsArray);
        // }

        // if (opIter == 1 && digitsIter == 0) {
        //     digitsArray = expression.split(operationArray[operationArray.length - 1]);
        //     digitsArray.pop();
        //     console.log(digitsArray); 
        // }
    
        if (opIter == 1 && digitsIter == 1) {
            digitsArray = expression.split(operationArray[operationArray.length - 1]);
            // digitsArray.pop();
            console.log(digitsArray);
            console.log('iterOper=:'+ opIter);
            console.log('iterDigits=:'+ digitsIter);

        }

        if (opIter == 1 && digitsIter == 2) {
            digitsArray = expression.split(operationArray[operationArray.length - 1]);
            // digitsArray.pop();
            console.log(digitsArray);
            console.log('iterOper=:'+ opIter);
            console.log('iterDigits=:'+ digitsIter);
        }
        else {
            let tempArr = [];
            tempArr = expression.split(operationArray[operationArray.length - 1]);
            console.log(tempArr);
            digitsArray[digitsIter] = tempArr[tempArr.length - 1];
            console.log(digitsArray);
        }
     }


   else {
        if (digitsIter < 1) {
            console.log(digitsArray);
            console.log('iterDigits:'+ digitsIter);
            //digitsIter++;
            //return;
        }

        else if (digitsIter == 1){
            if (operationArray[operationArray.length - 1] == operationArray[operationArray.length - 2]) {
                digitsArray = expression.split(operationArray[operationArray.length - 1]);
                digitsArray.pop();
                console.log(digitsArray);
            }
            else {
                digitsArray = expression.split(operationArray[operationArray.length - 2]);
                digitsArray[digitsIter] = digitsArray[digitsIter].substring(0, digitsArray[digitsIter].length - 1);
                console.log(digitsArray);
            }
        }

        else {
            if (operationArray[operationArray.length - 1] == operationArray[operationArray.length - 2]) {
                let tempArr = [];
                tempArr = expression.split(operationArray[operationArray.length - 1]);
                tempArr.pop();
                digitsArray[digitsIter] = tempArr[tempArr.length - 1];
                console.log(tempArr);
                console.log(digitsArray);
            }
            else {
                let tempArr = [];
                tempArr = expression.split(operationArray[operationArray.length - 2]);
                console.log(tempArr);
                digitsArray[digitsIter] = tempArr[tempArr.length - 1].substring(0, tempArr[tempArr.length - 1].length - 1);
                console.log(digitsArray);
            }
        }
    }

    digitsIter++;
}

function digitsInput(e) {
    console.log(`digits input: ${e.target.id}`);
    cleanExpressionEnter(e.target.id);
}

function clean() {
    console.log('clean:');
    expression = '';
    result = 0;
    console.log('expression: '+ expression);
    console.log('result: '+ result);
    opIter = 0;
    digitsIter = 0;
    operationArray = [];
    digitsArray = [];
    console.log('digitsArr: '+ digitsArray);
    console.log('operationArray: '+ operationArray);
    displayExpression.textContent = expression;
    displayResult.textContent = result;
}

function remove() {
    console.log('remove:');
    console.log('expression before: '+ expression);
    expression = expression.substring(0, expression.length - 1);
    console.log('expression after: '+ expression);
    displayExpression.textContent = expression;
}

function plusMinus() {
    console.log('plusMinus:');
    console.log('result before: '+ result);
    result = result * -1;
    console.log('result after: '+ result);
    displayResult.textContent = result;
}

function minus(e) {
    console.log('minus:');
    cleanExpressionEnter(e.target.id);
}

function plus(e) {
    console.log('plus:');
    cleanExpressionEnter(e.target.id);
}

function multiply(e) {
    console.log('multiply:');
    cleanExpressionEnter(e.target.id);
}

function divide(e) {
    console.log('division:');
    cleanExpressionEnter(e.target.id);
}

function dot(e) {
    console.log('dot:');
    cleanExpressionEnter(e.target.id);
}

function cleanExpressionEnter(id) {
    console.log('expression before: '+ expression);
    expression = expression.concat(id);
    console.log('expression after: '+ expression);
    if (regex.test(expression)) {
        console.log(`cleanExpressionEnter ${regex.test(expression)}:`); 
        console.log('expression: '+ expression);
        displayExpression.textContent = expression;
    }
    else {
        console.log(`cleanExpressionEnter ${regex.test(expression)} -> remove:`); 
        remove();
    }
}

function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', displayInput));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));
