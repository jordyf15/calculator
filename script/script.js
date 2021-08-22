const display = document.querySelector('#display');
let displayValue="";
display.textContent= displayValue;

function setDisableElement(selector, disabled, multiple){
    if(multiple){
        const elements = document.querySelectorAll(selector);
        elements.forEach(element=>element.disabled=disabled);
    }else{
        const element = document.querySelector(selector);
        element.disabled=disabled;
    }
}
setDisableElement('.operator', true, true);

function checkLongDecimal(value){
    if(value.toString().includes('.')){
        return value.toString().split('.')[1].length>6;
    }
    return false;
}

const operation = {
    calculatedValue: null,
    lastOperation: null,
    justEqual: false,//after equal if user input operand it should overwrite it
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
    setDisableElement('.operator', true, true);
    setDisableElement('#decimal', false, false);
    setDisableElement('#backspace', true, false);
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
    operation.calculatedValue = "";
    operation.justEqual=true;
}

function populateDisplay(){
    if(operation.justEqual){
        displayValue='';
        operation.justEqual=false;
    }
    if(this.value==='.'){
        const decimalButton = document.querySelector('#decimal');
        decimalButton.disabled=true;
        if(!displayValue){
            displayValue='0';
        }
    }
    if(displayValue.toString().includes('.') && this.value==='.') {
        return;
    }
    const alert = document.querySelector('#alert');
    alert.textContent='';
    displayValue+=this.value;
    display.textContent= displayValue;
    if(this.value!=='.'){
        setDisableElement('.operator', false, true);
    }
    setDisableElement('#backspace', false, false);
}

function clear(){
    displayValue="";
    const alert = document.querySelector('#alert');
    alert.textContent='';
    display.textContent= displayValue;
    operation.calculatedValue=null;
    operation.lastOperation=null;
    setDisableElement('.operator', true, true);
    setDisableElement('#decimal', false, false);
}

function backSpace(){
    if(displayValue.length===1){
        setDisableElement('.operator', true, true);
    }
    displayValue = displayValue.slice(0,displayValue.length-1);
    display.textContent = displayValue;
}

function keyboardSupport(e){
    const element = document.querySelector(`button[data-key="${e.key}"`);
    if(element && !element.disabled){
        element.click();
    }
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

const backspaceButton = document.querySelector('#backspace');
backspaceButton.addEventListener('click', backSpace);

window.addEventListener('keydown', keyboardSupport)