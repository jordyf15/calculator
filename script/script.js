const display = document.querySelector('#display');
let displayValue="";
let firstValue;
let secondValue;
display.textContent= displayValue;

function add(aNum, bNum){
    return aNum+bNum;
}

function subtract(aNum, bNum){
    return aNum-bNum;
}

function multiply(aNum, bNum){
    return aNum*bNum;
}

function divide(aNum, bNum){
    return aNum/bNum;
}

function operate(operator, aNum, bNum){
    switch(operator){
        case '+':
            return add(aNum, bNum);
        case '-':
            return subtract(aNum, bNum);
        case '*':
            return multiply(aNum, bNum);
        case '/':
            return divide(aNum, bNum);    
    }
}

function populateDisplay(){
    displayValue+=this.value;
    display.textContent= displayValue;
}

const operandButtons = document.querySelectorAll('.operand');
operandButtons.forEach(button=>{
    button.addEventListener('click',populateDisplay);
})