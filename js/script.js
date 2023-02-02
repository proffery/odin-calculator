const keyboard = ['CE', '/', '*', '-', '7', '8', '9', '+', '4', '5', '6', '.', '1', '2', '3', '+/-', '0', '='];
const keysContainer = document.querySelector('.keyboard');
function drawKeyboard() {
    keysContainer.innerHTML = keyboard.map((key) => `<div class="key" id="${key}">${key}</div>`).join('');
}

function displayInput(e) {
    const pressedKey = document.querySelector(`[id="${e.target.id}"]`);
    const display = document.querySelector('.display');
    pressedKey.classList.add('.key-click');
    display.textContent = `${e.target.id}`;
    console.log(e.target.id);
}

function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('.key-click');
} 
drawKeyboard();
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click', displayInput));
keys.forEach(key => key.addEventListener('transitionend', removeAllTransition));

