let buttons = document.querySelector(".buttons")
let text = document.querySelector("#screen")
let btnOperators = document.querySelectorAll(".operator")

let operator = document.getElementById("operator")
let firstNumber = document.getElementById("firstNumber")
let secondNumber = document.getElementById("secondNumber")
let result = 0;
let zeroCondition = 0; // checks if zero was pressed in current instance
let comma = document.getElementById("comma")

let totalNumbers = firstNumber.textContent // AHHHH

const operators = ["x", "+", "-", "/"]
// CONTROL FLOW, CHECK THE FLOW!!!

function havesOperator(option, isDisabled, endEarly, target){ // option: text or target, isDisabled: True or False, endEarly: True or False,
    if(operators.some(operator => option.textContent.includes(operator))){ 
        if(endEarly) return true;
        if(isComplete() && target.classList.contains("operator")) {
            run(target)
        } return
        btnOperators.forEach(button => button.disabled = isDisabled)
    }
} // estoy orgulloso de esta funcion loco :3

function checkComma(option, target) {
    if(option.textContent.includes(".") || target.id == "comma") {
        comma.disabled = true
    } else if(!option.textContent.includes(".")) {
        comma.disabled = false
    } 
}

function whatNumber(target, firstOrSecond) {
    let op
    let num
    if(target.classList.contains("operator")) op = target.textContent
    if(target.classList.contains("number") || target.id == "comma") num = target.textContent
    
    checkComma(firstOrSecond, target)
    if(firstNumber.textContent == "") firstNumber.textContent="0"
    if(firstNumber.textContent == 0 && zeroCondition == 0){
        if(op) return
        // if(op == "-") {
        //     firstOrSecond.textContent=op
        // } 
        if(target.id == "comma") { 
            comma.disabled = false
            return
        }
        firstOrSecond.textContent=num
        zeroCondition = 1
    } else {
        if(op && !isComplete()) { 
            operator.textContent=op 
        } else if(num) firstOrSecond.textContent+=num
    }
    
}

function remove(target) {
    if(!secondNumber.textContent == "") {
        secondNumber.textContent = secondNumber.textContent.slice(0, -1)
        checkComma(secondNumber, target)
    } else if(!operator.textContent == ""){
        operator.textContent = operator.textContent=""
    } else if(!firstNumber.textContent == "") {
        firstNumber.textContent = firstNumber.textContent.slice(0, -1)
        checkComma(firstNumber, target)
        if(firstNumber.textContent == "") {
            firstNumber.textContent=0
            zeroCondition = 0;
        }
    }
}

function write(target){
    havesOperator(text, false, false, target) // si no hay un operador
    console.log(result)
    if(target.id == "delete") remove(target)

    if(target.id == "clear") clear()

    if(target.id == "changeSign") {
        changeSign()
    }

    // poner porcentage, cambiar signo antes de return

    if(target.id == "run") { 
        run(target)
    }
    if(result == 1 && !operators.some(operator => text.textContent.includes(operator)) && target.classList.contains("number")) clear()
    if(target.classList.contains("noWrite")) return
        
    // si no es ninguno de los botones q no se dibujan

    if(havesOperator(text, false, true, target)) whatNumber(target, secondNumber,)
    if(!havesOperator(text, false, true, target)) whatNumber(target, firstNumber)
   
    havesOperator(text, true, false, target)

    // if(target.id == "run") operate() Math.floor(text.textContent) - Math.floor(text.textContent) // convertir a int recortar letras
};

function run(target) {
    let num1 = Number(firstNumber.textContent)
    let operate = operator.textContent
    let num2 = Number(secondNumber.textContent)
    console.log( firstNumber.textContent , operator.textContent , secondNumber.textContent )
    

    switch (operate) {
        case "+":  
            firstNumber.textContent = add(num1, num2)
            result = 1;
            break;
        case "-":
            firstNumber.textContent = subtract(num1, num2)
            result = 1;
            break;
        case "x":
            firstNumber.textContent = multiply(num1, num2)
            result = 1;
            break;
        case "/":
            firstNumber.textContent = divide(num1, num2)
            result = 1;
            break;
    }
    operator.textContent = ""
    secondNumber.textContent = ""
    checkComma(firstNumber, target)
}

function isComplete() {
    if(firstNumber.textContent != "" && operator.textContent != "" && secondNumber.textContent != "") return true
    return false
}

function clear() {
    firstNumber.textContent="0" 
    operator.textContent=""
    secondNumber.textContent=""
    zeroCondition = 0
    result = 0;
    comma.disabled = false
}

function add(a, b) {
    return Number((a + b).toFixed(15))
}

function subtract(a, b) {
    return Number((a - b).toFixed(15))
}

function multiply(a, b) {
    return Number((a * b).toFixed(15))
}

function divide(a, b) {
    return Number((a / b).toFixed(15))
}

function changeSign() {
    if(havesOperator(text, false, true)) {
        secondNumber.textContent = Number(secondNumber.textContent * -1)
    }
    if(!havesOperator(text, false, true)) {
        firstNumber.textContent = Number(firstNumber.textContent * -1)
    }
}

buttons.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName !== "BUTTON") return
    console.log(`${event.target.id || event.target.classList} was clicked`)
    write(event.target)
});

// Add the last operation on top of the display in gray like history
// When an operation is complete like (12 + 7) if another operator is clicked it will run (12+7) an then add the operator
// operator buttons become available and act like run button when an operation haves all his parts (firstNumber, operator and secondNumber)
// Create variable like (zeroCondition) that changes depending if operation is full and lets input operator

// When a result is displayed, pressing a new digit should clear the result and start a new calculation instead 
// of appending the digit to the existing result. Check whether this is the case on your calculator!



// 3 hours~ first session 15/08/2026
// 2 ~? second session 16/08/2026
// 1.5 third session 17/08/2026
// 1? fourth session 18/08/2026