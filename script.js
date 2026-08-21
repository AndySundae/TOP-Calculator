let buttons = document.querySelector(".buttons")
let text = document.querySelector("#screen")
let btnOperators = document.querySelectorAll(".operator")

let operator = document.getElementById("operator")
let firstNumber = document.getElementById("firstNumber")
let secondNumber = document.getElementById("secondNumber")
let endOfOperation = 0;
let zeroCondition = 0; // checks if zero was pressed in current instance
let comma = document.getElementById("comma")

// let totalNumbers = firstNumber.textContent // AHHHH

const operators = ["x", "+", "-", "/"]
// CONTROL FLOW, CHECK THE FLOW!!!
// AGAIN, CHECK ALWAYS THE FLOW

function havesOperator(option, isDisabled, endEarly, target){ // option: text or target, isDisabled: True or False, endEarly: True or False,
    if(operators.some(operator => option.textContent.includes(operator))){ 
        if(endEarly) return true;
        if(firstNumber.textContent[0] == "-" || secondNumber.textContent[0] == "-") return false
        if(isComplete() && target.classList.contains("operator")) {
            run(target)
        } return
        // btnOperators.forEach(button => button.disabled = isDisabled) // dead code, delete later
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

    

    if(target.id == "subtract" && 
        (firstOrSecond.textContent[0] == 0 || firstOrSecond.textContent[0] == "") && 
        !firstOrSecond.textContent.includes(".") && zeroCondition == 0) {
        firstOrSecond.textContent = "-"
        return
    } 

    //if(target.id == "subtract" && firstOrSecond.textContent.includes("-")) return

    if(operator.textContent != "" && target.id == "subtract" && secondNumber.textContent=="") {
        secondNumber.textContent = "-"
        return
    } else if(isComplete() && target.classList.contains("operator")) run(target)
    

    checkComma(firstOrSecond, target)
    if(firstNumber.textContent == "") firstNumber.textContent="0"
    if(firstNumber.textContent == 0 && zeroCondition == 0){
        if(op) return
        if(target.id == "comma") { 
            comma.disabled = false
            return
        }
        firstOrSecond.textContent=num
        zeroCondition = 1
    } else {
        if(op && !isComplete()) { // aca
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
    havesOperator(text, false, false, target)
    console.log(endOfOperation)

    switch (target.id) {
        case "delete": remove(target); break;
        case "clear": clear(); break;
        case "changeSign": changeSign(); break;
        case "percentage": percentage(target); break;
        case "run": run(target); break;
    }

    if(endOfOperation == 1 && !havesOperator(text, false, true, target) && target.classList.contains("number")) clear()

    if(target.classList.contains("noWrite")) return
        
    // si no es ninguno de los botones q no se dibujan

    if(havesOperator(operator, false, true, target)) {
        whatNumber(target, secondNumber)
        // if(secondNumber.textContent[0] == "-"){
        //     secondNumber.textContent=`(${secondNumber.textContent})`
        // }
    } 
    if(!havesOperator(operator, false, true, target)) {
        whatNumber(target, firstNumber)
    }
    havesOperator(text, true, false, target)
};

function run(target) {
    // deleteParenthesis()
    let num1 = Number(firstNumber.textContent)
    let operate = operator.textContent
    let num2 = Number(secondNumber.textContent)
    if(operate == "" || num2 == "") return
    console.log( firstNumber.textContent , operator.textContent , secondNumber.textContent )
    switch (operate) {
        case "+":  
            firstNumber.textContent = add(num1, num2)
            endOfOperation = 1;
            break;
        case "-":
            firstNumber.textContent = subtract(num1, num2)
            endOfOperation = 1;
            break;
        case "x":
            firstNumber.textContent = multiply(num1, num2)
            endOfOperation = 1;
            break;
        case "/":
            firstNumber.textContent = divide(num1, num2)
            endOfOperation = 1;
            break;
    }
    operator.textContent = ""
    secondNumber.textContent = ""
    checkComma(firstNumber, target)
}

function isComplete() {
    if(firstNumber.textContent != "" && operator.textContent != "" && secondNumber.textContent != "" && secondNumber.textContent != "-") return true
    return false
}

function clear() {
    firstNumber.textContent="0" 
    operator.textContent=""
    secondNumber.textContent=""
    zeroCondition = 0
    endOfOperation = 0;
    comma.disabled = false
}

function percentage(target) {
    if(havesOperator(operator, false, true, target)) {
        secondNumber.textContent = secondNumber.textContent / 100
    } else if(!havesOperator(operator, false, true, target)) firstNumber.textContent = firstNumber.textContent / 100
}

function deleteParenthesis() {
    secondNumber.textContent.replace(/[()]/g, "") // CHECK
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



buttons.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName !== "BUTTON") return
    console.log(`${event.target.id || event.target.classList} was clicked`)
    write(event.target)
});

// patch having the posibility to spam -
// add parenthesis when secondNumber haves -
// fix changeSign so it actually works xd
// weird 0 behaviour, nothink operates when 0 is present
// add keyboard support

// 3 hours~ first session 15/08/2026
// 2 ~? second session 16/08/2026
// 1.5 third session 17/08/2026
// 1? fourth session 18/08/2026
// 1? fifth session 19/08/2026
// 2 sixth session 20/08/2026
