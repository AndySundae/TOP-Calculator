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

function whatNumber(target, firstOrSecond, del) {
    if(del){
        console.log(target)
        if(target.id == "delete") firstOrSecond.textContent = firstOrSecond.textContent.slice(0, -1)
        if(firstNumber.textContent == "") firstOrSecond.textContent="0"
        return
    } 
    if(firstOrSecond.textContent == 0){
        if(havesOperator(target, false, true)) return
        firstOrSecond.textContent=target.textContent
    } else firstOrSecond.textContent+=target.textContent
}

// if(target.id == "delete") text.textContent = text.textContent.slice(0, -1)
//     if(target.id == "clear" || text.textContent == "") text.textContent="0"
//     if(target.classList.contains("noWrite")) return


// if(text.textContent == 0){
//         if(havesOperator(target, false, true)) return
//         text.textContent=target.textContent
//     } else text.textContent+=target.textContent


function write(target){
    let number;
    let op;
    if(target.classList.contains("number")) number = target.textContent
    if(target.classList.contains("operator")) op = target.textContent

    havesOperator(text, false)
    if(!havesOperator(text, false, true)) whatNumber(target, firstNumber, true) 
    if(havesOperator(text, false, true)) whatNumber(target, secondNumber, true)

    if(target.id == "clear") {
        firstNumber.textContent="0" 
        secondNumber.textContent=""
    }
    if(target.classList.contains("noWrite")) return
    if(!havesOperator(text, false, true)) whatNumber(target, firstNumber)
    if(havesOperator(text, false, true)) whatNumber(target, secondNumber)

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