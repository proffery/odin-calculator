const keyboard = ['CE', '<-', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
let expression = '';
let result = 0;

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
        plusMinus(displayResult);
    }

    else if(e.target.id === '-') {
        minus(displayExpression);
    }

    else if(e.target.id === '+') {
        plus(displayExpression);
    }

    else if(e.target.id === '*') {
        multiply(displayExpression);
    }

    else if(e.target.id === '/') {
        division(displayExpression);
    }

    else {
        expression = expression.concat(e.target.id);
        displayExpression.textContent = expression;
    }
    
}

function clean(displayExp, displayRes) {
    expression = '';
    result = 0;
    displayExp.textContent = expression;
    displayRes.textContent = result;
}

function remove(displayExp) {
    expression = expression.substring(0, expression.length - 1);
    displayExp.textContent = expression;
}

function plusMinus(displayRes) {
    result = result * -1;
    displayRes.textContent = result;
}

function minus(displayExp) {
    expression = expression.concat('-');
    cleanExpressionEnter();
    displayExp.textContent = expression;
}

function plus(displayExp) {
    expression = expression.concat('+');
    cleanExpressionEnter();
    displayExp.textContent = expression;
}

function multiply(displayExp) {
    expression = expression.concat('*');
    cleanExpressionEnter();
    displayExp.textContent = expression;
}

function division(displayExp) {
    expression = expression.concat('/');
    cleanExpressionEnter();
    displayExp.textContent = expression;
}

function cleanExpressionEnter() {
    if (expression.charAt(0) === '-' && expression.charAt(1) === '-') {
        expression = expression.replace('-', '');
    }

    if (expression.charAt(0) === '-' && expression.charAt(1) === '+') {
        expression = expression.replace('+', '');
        expression = expression.replace('-', '');
    }

    if (expression.charAt(0) === '+') {
        expression = expression.replace('+', '');
    }

    if (expression.charAt(0) === '*') {
        expression = expression.replace('*', '');
    }

    if (expression.charAt(0) === '-' && expression.charAt(1) === '*') {
        expression = expression.replace('*', '');
        expression = expression.replace('-', '');
    }
    if (expression.charAt(0) === '/') {
        expression = expression.replace('/', '');
    }

    if (expression.charAt(0) === '-' && expression.charAt(1) === '/') {
        expression = expression.replace('/', '');
        expression = expression.replace('-', '');
    }
    // for (let i = 0; i < expression.length; i++) {
    //     if (expression.charAt(i) === '-' && expression.charAt(i - 1) === '-') {
    //         expression = expression.replaceAll('--', '-');
    //     }
    //     if (expression.charAt(i) === '+' && expression.charAt(i - 1) === '-') {
    //         expression =  expression.replaceAll('+-', '-'); 
    //     }
    //     if (expression.charAt(i) === '-' && expression.charAt(i - 1) === '+') {
    //         expression = expression.replaceAll('-+', '+');
    //     }
    //     if (expression.charAt(i) === '+' && expression.charAt(i - 1) === '+') {
    //         expression = expression.replaceAll('++', '+');
    //     }

    //     if (expression.charAt(i) === '*' && expression.charAt(i - 1) === '*') {
    //         expression = expression.replaceAll('**', '*');
    //     }

    // }
}

function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('key-click');
} 

drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', displayInput));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));

// function plusMinus(displayRes) {
//     if (result.charAt(0) === '-') {
//         result = result.replace('-', '');
//         displayRes.textContent = result;
//     }

//     else {
//         result = '-' + result;
//         displayRes.textContent = result;
//     }
// }