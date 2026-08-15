let buttons = document.querySelector(".buttons")
let text = document.querySelector("#screen")
let btnOperators = document.querySelectorAll(".operator")

let firstNumber = "";
let operator = "";
let secondNumber = "";

console.log(btnOperators)
const operators = ["x", "+", "-", "/"]
// CONTROL FLOW, CHECK THE FLOW!!!
// comma no deberia estar en operadores

function havesOperator(option, isDisabled, endEarly){ // option: text or target, isDisabled: True or False, endEarly: true
    if(operators.some(operator => option.textContent.includes(operator))){ 
        if(endEarly) return true;
        btnOperators.forEach(button => button.disabled = isDisabled)
    }
}

function write(target){
    havesOperator(text, false)
    if(target.id == "delete") text.textContent = text.textContent.slice(0, -1)
    if(target.id == "clear" || text.textContent == "") text.textContent="0"
    if(target.classList.contains("noWrite")) return
    if(text.textContent == 0){
        if(havesOperator(target, false, true)) return
    
        text.textContent=target.textContent
    } else text.textContent+=target.textContent

    havesOperator(text, true)
    
    // if(target.id == "run") operate()
};
// al inputear un numero cuando se le de a un operator crea otro string con el segundo numero, para que puedas haber mas de 1 comma


buttons.addEventListener("click", (event) => {
    event.preventDefault();
    if(event.target.tagName !== "BUTTON") return
    console.log(`${event.target.id || event.target.classList} was clicked`)
    write(event.target)
});


