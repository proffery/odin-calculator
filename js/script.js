const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
let expression = '';
let result = '';

function drawKeyboard() {
    keysContainer.innerHTML = keyboard.map((key) => `<div class="key" id="${key}">${key}</div>`).join('');
}

function displayInput(e) {
    const pressedKey = document.querySelector(`[id="${e.target.id}"]`);
    const displayExpression = document.querySelector('.display-expression');
    const displayResult = document.querySelector('.display-result');
    pressedKey.classList.add('key-click');
    
    if(e.target.id === 'CE') {
        clean(displayExpression, displayResult);
    }
    
    else if(e.target.id === '<-') {
        remove(displayExpression);
    }

    else if(e.target.id === '+/-') {
        plusMinus(displayExpression);
    }

    else {
        expression = expression.concat(e.target.id);
        displayExpression.textContent = expression;
        console.log(expression); 
    }
    
}

function clean(displayExp, displayRes) {
    expression = '';
    result = '';
    displayExp.textContent = '0';
    displayRes.textContent = '';
}

function remove(displayExp) {
    expression = expression.substr(0, expression.length - 1);
    if (expression === '') {
        displayExp.textContent = '0';
    }
    else {
        displayExp.textContent = expression;
    }
}

function plusMinus(displayExp) {
    if (expression.charAt(0) === '-') {
        expression = expression.replace('-', '');
        displayExp.textContent = expression;
    }

    else {
        expression = '-' + expression;
        displayExp.textContent = expression;
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

