const display = document.querySelector('#display');
let displayValue="";
display.textContent= displayValue;

function checkLongDecimal(value){
    if(value.toString().includes('.')){
        return value.toString().split('.')[1].length>6;
    }
    return false;
}

const operation = {
    calculatedValue: null,
    lastOperation: null,
    save(value, operation){
        if(displayValue===""){//means they input operator after an operator without an operand
            return;
        }
        if(!this.calculatedValue){
            this.calculatedValue=value;
        }else{
            if(this.lastOperation==='/' && value ==='0'){
                const alert = document.querySelector('#alert');
                alert.textContent="Cannot divide with 0 please input another value than the last operation after / or equal";
                displayValue="";
                return;
            }
            // console.log(this.calculatedValue, value);
            // console.log(operate(this.lastOperation, this.calculatedValue, value));
            this.calculatedValue= operate(this.lastOperation, this.calculatedValue, value);  
            if(checkLongDecimal(this.calculatedValue)){
                display.textContent= this.calculatedValue.toFixed(6);
            }else{
                display.textContent=this.calculatedValue;
            }            
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
    const operationButtons = document.querySelectorAll('.operator');
    operationButtons.forEach(button=>button.disabled = true);
    operation.save(displayValue, this.value);
    displayValue='';
}

function operate(operator, aNum, bNum){
    const firstNum = parseFloat(aNum);
    const secondNum = parseFloat(bNum);
    switch(operator){
        case '+':
            return add(firstNum, secondNum);
        case '-':
            return subtract(firstNum, secondNum);
        case '*':
            return multiply(firstNum, secondNum);
        case '/':
            return divide(firstNum, secondNum);
    }
}

function equal(){
    if(operation.lastOperation==='/' && displayValue ==='0'){
        const alert = document.querySelector('#alert');
        alert.textContent="Cannot divide with 0 please input another value than the last operation after / or equal";
        displayValue="";
        return;
    }
    if(!operation.lastOperation || !operation.calculatedValue || !displayValue){
        return;
    }
    displayValue = operate(operation.lastOperation, operation.calculatedValue, displayValue);
    if(checkLongDecimal(displayValue)){
        display.textContent = displayValue.toFixed(6);
    }else {
        display.textContent=displayValue;
    }
    operation.calculatedValue = null;
}

function populateDisplay(){
    const alert = document.querySelector('#alert');
    alert.textContent='';
    displayValue+=this.value;
    display.textContent= displayValue;
    const operationButtons = document.querySelectorAll('.operator');
    operationButtons.forEach(button=>button.disabled = false);
}

function clear(){
    displayValue="";
    display.textContent= displayValue;
    operation.calculatedValue=null;
    operation.lastOperation=null;
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

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click',clear);