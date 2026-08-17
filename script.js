let buttons = document.querySelector(".buttons")
let text = document.querySelector("#screen")
let btnOperators = document.querySelectorAll(".operator")

let operator = document.getElementById("operator")
let firstNumber = document.getElementById("firstNumber")
let secondNumber = document.getElementById("secondNumber")
let zeroCondition = 0; // checks if zero was pressed in current instance
let comma = document.getElementById("comma")

const operators = ["x", "+", "-", "/"]
// CONTROL FLOW, CHECK THE FLOW!!!

function havesOperator(option, isDisabled, endEarly){ // option: text or target, isDisabled: True or False, endEarly: True or False,
    if(operators.some(operator => option.textContent.includes(operator))){ 
        if(endEarly) return true;
        btnOperators.forEach(button => button.disabled = isDisabled)
    }
} // estoy orgulloso de esta funcion loco :3

function checkComma(option, target) {
    if(option.textContent.includes(",") || target.id == "comma") {
        comma.disabled = true
    } else if(!option.textContent.includes(",")) {
        comma.disabled = false
    } 
}

function whatNumber(target, firstOrSecond) {
    let op
    if(target.classList.contains("operator")) op = target.textContent

    checkComma(firstOrSecond, target)
    if(firstNumber.textContent == "") firstNumber.textContent="0"
    if(firstNumber.textContent == 0 && zeroCondition == 0){
        if(op) return
        firstOrSecond.textContent=target.textContent
        zeroCondition = 1
    } else {
        firstOrSecond.textContent+=target.textContent
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
    havesOperator(text, false) // si no hay un operador

    if(target.id == "delete") remove(target)

    if(target.id == "clear") {
        firstNumber.textContent="0" 
        operator.textContent=""
        secondNumber.textContent=""
        zeroCondition = 0
        comma.disabled = false
    }

    // poner porcentage, cambiar signo antes de return
    
    if(target.classList.contains("noWrite")) return
        
    // si no es ninguno de los botones q no se dibujan

    if(havesOperator(text, false, true)) whatNumber(target, secondNumber)
    if(!havesOperator(text, false, true)) whatNumber(target, firstNumber)
    

    havesOperator(text, true)
    
    // if(target.id == "run") operate() Math.floor(text.textContent) - Math.floor(text.textContent) // convertir a int recortar letras
};

buttons.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName !== "BUTTON") return
    console.log(`${event.target.id || event.target.classList} was clicked`)
    write(event.target)
});



// 3 hours~ first session 15/08/2026
// 1.5 ~? second session 16/08/2026