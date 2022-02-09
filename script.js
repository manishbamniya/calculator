const numberButtons = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const allClear = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalButton = document.querySelector('[data-equal]');
const currentOperand = document.querySelector('[data-current-operand]');
const previousOperand = document.querySelector('[data-previous-operand]');
var n = operations;

window.addEventListener('message',(e) => {
    window.opener.postMessage('close','localhost:3000')
})

function compute(){
    const last = parseFloat(previousOperand.innerText);
    const current = parseFloat(currentOperand.innerText);
    let calculate ;
    if(isNaN(last) || isNaN(current)){
        alert("Not a Number");
    }
    else{
        switch(n){
            case '+':
                calculate = last + current;
                break;
            case '-':
                calculate = last - current;
                break;
            case 'x':
                calculate = last * current;
                break;
            case "÷":
                if(current === 0){
                    return alert("Divide By 0 is not possible");
                    break;
                } else{
                    calculate = last / current;
                    break;
                }
            default:
                return null
        }
    }
    currentOperand.innerText = calculate;
    previousOperand.innerText = "";
}

n.forEach(function(button){
    button.addEventListener("click", function(){
        n = button.innerText;
        
        if(currentOperand.innerText === "" && previousOperand.innerText !== ""){
            previousOperand.innerText = previousOperand.innerText.replace(previousOperand.innerText.slice(-1), n);
        }
        else if(currentOperand.innerText === ""){
            return null
        }
        else{
            previousOperand.innerText = currentOperand.innerText + " " + n;
            currentOperand.innerText = "";
        }
        
    });
});

numberButtons.forEach(function(button){
    button.addEventListener("click", function(){
        if(button.innerText === "." && currentOperand.innerText.includes(".")){
            return null
        }
        else{
            currentOperand.innerText += button.innerText;
        }

    });
});

equalButton.addEventListener("click",function(){
    if(currentOperand.innerText === "" && previousOperand.innerText === ""){
        return null
    }
    else if(previousOperand.innerText !== "" && currentOperand.innerText !== ""){
        compute();
    }
});

deleteButton.addEventListener("click", function(){
    currentOperand.innerText = currentOperand.innerText.slice(0,-1);
});


allClear.addEventListener("click", function(){
    currentOperand.innerText = ""; 
    previousOperand.innerText = "";
});

