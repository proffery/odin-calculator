const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
const regex = /^(\-|\d)(\d*)(\.?\d*)?$/;
const displayExpression = document.querySelector('.display-expression');
const displayResult = document.querySelector('.display-result');
let expression = '';
let result = 0;

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
    }

    else if(e.target.id === '+') {
        plus(e);
    }

    else if(e.target.id === '*') {
        multiply(e);
    }

    else if(e.target.id === '/') {
        division(e);
    }

    else if(e.target.id === '.') {
        dot(e);
    }

    else {
        digitsInput(e);
    }
    
}


function digitsInput(e) {
    console.log(`digits input: ${e.target.id}`);
    cleanExpressionEnter(e.target.id);
}

function clean() {
    console.log('clean:');
    console.log('expression before: '+expression);
    console.log('result before: '+result);
    expression = '';
    result = 0;
    console.log('expression after: '+expression);
    console.log('result after: '+result);
    displayExpression.textContent = expression;
    displayResult.textContent = result;
}

function remove() {
    console.log('remove:');
    console.log('expression before: '+expression);
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

function division(e) {
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
