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