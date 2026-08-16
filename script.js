let buttons = document.querySelector(".buttons")
let text = document.querySelector("#screen")
let btnOperators = document.querySelectorAll(".operator")

let operator = document.getElementById("operator")

let firstNumber = document.getElementById("firstNumber")
let secondNumber = document.getElementById("secondNumber")

const operators = ["x", "+", "-", "/"]
// CONTROL FLOW, CHECK THE FLOW!!!
// comma no deberia estar en operadores

function havesOperator(option, isDisabled, endEarly){ // option: text or target, isDisabled: True or False, endEarly: True or False,
    if(operators.some(operator => option.textContent.includes(operator))){ 
        if(endEarly) return true;
        btnOperators.forEach(button => button.disabled = isDisabled)
    }
} // estoy orgulloso de esta funcion loco :3
let zeroCondition = 0;
function whatNumber(target, firstOrSecond) {
    
    let op
    if(target.classList.contains("operator")) op = target.textContent
    if(firstNumber.textContent == "") firstNumber.textContent="0"

    // if(op) {
    //         operator.textContent=op
    //     } return

    if(firstNumber.textContent == 0 && zeroCondition == 0){
        if(op) return
        firstOrSecond.textContent=target.textContent
        zeroCondition = 1
    } else {
        firstOrSecond.textContent+=target.textContent
        
    }
}

function remove() {
    if(!secondNumber.textContent == "") {
        secondNumber.textContent = secondNumber.textContent.slice(0, -1)
    } else if(!operator.textContent == ""){
        operator.textContent = operator.textContent=""
    } else if(!firstNumber.textContent == "") {
        firstNumber.textContent = firstNumber.textContent.slice(0, -1)
        if(firstNumber.textContent == "") firstNumber.textContent=0
    }
}



function write(target){
    havesOperator(text, false) // si no hay un operador

    if(target.id == "delete") remove()

    if(target.id == "clear") {
        firstNumber.textContent="0" 
        operator.textContent=""
        secondNumber.textContent=""
        zeroCondition = 0
    }

    // poner porcentage, cambiar signo antes de return
    
    if(target.classList.contains("noWrite")) return
        
    // si no es ninguno de los botones q no se dibujan

    if(havesOperator(text, false, true)) whatNumber(target, secondNumber)
    if(!havesOperator(text, false, true)) whatNumber(target, firstNumber)
    

    havesOperator(text, true)
    
    // if(target.id == "run") operate() Math.floor(text.textContent) - Math.floor(text.textContent) // convertir a int recortar letras
};
// al inputear un numero cuando se le de a un operator crea otro string con el segundo numero, para que puedas haber mas de 1 comma


buttons.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName !== "BUTTON") return
    console.log(`${event.target.id || event.target.classList} was clicked`)
    write(event.target)
});



// 3 hours~ first session 15/08/2026