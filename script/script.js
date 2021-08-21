const display = document.querySelector('#display');
let displayValue="";
display.textContent= displayValue;

const operation = {
    calculatedValue: null,
    lastOperation: null,
    save(value, operation){
        if(!this.calculatedValue){
            this.calculatedValue=value;
        }else{
            console.log(this.calculatedValue, value);
            console.log(operate(this.lastOperation, this.calculatedValue, value));
            this.calculatedValue= operate(this.lastOperation, this.calculatedValue, value);       
            display.textContent=this.calculatedValue;
        }
        this.lastOperation=operation;
    },
}

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

function saveOperation(){
    console.log(this);
    operation.save(displayValue, this.value);
    displayValue='';
}

function operate(operator, aNum, bNum){
    switch(operator){
        case '+':
            return add(parseInt(aNum), parseInt(bNum));
        case '-':
            return subtract(parseInt(aNum), parseInt(bNum));
        case '*':
            return multiply(parseInt(aNum), parseInt(bNum));
        case '/':
            return divide(parseInt(aNum), parseInt(bNum));
    }
}

function equal(){
    displayValue = operate(operation.lastOperation, operation.calculatedValue, displayValue);
    display.textContent=displayValue;
    operation.calculatedValue = null;
}

function populateDisplay(){
    displayValue+=this.value;
    display.textContent= displayValue;
}

const operandButtons = document.querySelectorAll('.operand');
operandButtons.forEach(button=>{
    button.addEventListener('click',populateDisplay);
})

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button=>{
    button.addEventListener('click', saveOperation);
});

const equalButton = document.querySelector('#equals');
equalButton.addEventListener('click', equal);