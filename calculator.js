var display = document.getElementById("display");
// var btnOne = document.getElementById("one");
// var btnTwo = document.getElementById("two");
// var btnThree = document.getElementById("three");
// var btnFour = document.getElementById("four");
// var btnFive = document.getElementById("five");
// var btnSix = document.getElementById("six");
// var btnSeven = document.getElementById("seven");
// var btnEight = document.getElementById("eight");
// var btnNine = document.getElementById("nine");
// var btnZero = document.getElementById("zero");
var btnNumbers = document.getElementsByClassName("number");
var btnAdd = document.getElementById("add");
var btnSubtract = document.getElementById("substract");
var btnMultiply = document.getElementById("multiply");
var btnDivide = document.getElementById("divide");
var btnEqual = document.getElementById("equal");
var btnDot = document.getElementById("dot");
var btnDel = document.getElementById("delete");

var firstClick = true;

let calculatorArray = [];
let currentNumber = "";

for (let i = 0; i < btnNumbers.length; i++) {
    btnNumbers[i].addEventListener("click", function (e) {
        if (firstClick) {
            display.innerHTML = "";
            firstClick = false;
        }
        currentNumber += btnNumbers[i].innerHTML;
        display.innerHTML += btnNumbers[i].innerHTML;
    })
}

function displayOperation(btnOperation) {
    try {
        let numberValue = parseFloat(currentNumber);
        if (isNaN(numberValue)) {
            if (btnOperation.innerHTML != "-" || currentNumber == "-") {
                alert("Cannot do this operation!");
            }
            else {
                if (firstClick) {
                    display.innerHTML = "-";
                    firstClick = false;
                }
                else {
                    display.innerHTML += "-";
                }
                currentNumber += "-";
            }
        }
        else {
            calculatorArray.push(numberValue);
            calculatorArray.push(btnOperation.innerHTML);
            display.innerHTML = calculatorArray.join(" ") + " ";
            currentNumber = "";
        }
    } catch (error) {
        alert(error);
    }
}

btnMultiply.addEventListener("click", function (e) {
    displayOperation(btnMultiply);
});
btnDivide.addEventListener("click", function (e) {
    displayOperation(btnDivide);
});
btnAdd.addEventListener("click", function (e) {
    displayOperation(btnAdd);
});
btnSubtract.addEventListener("click", function (e) {
    displayOperation(btnSubtract);
});

btnEqual.addEventListener("click", function (e) {
    try {
        let numberValue = parseFloat(currentNumber);
        if (isNaN(numberValue)) {
            alert("Cannot do this operation!");
        }
        else {
            calculatorArray.push(numberValue);
            display.innerHTML = calculatorArray.join(" ") + " ";
            currentNumber = "";
        }
        // calculate the math
        while (calculatorArray.length > 1) {
            let index;
            // Finding mutiply operator
            // Finding divide operator
            let multiplyIndex = calculatorArray.indexOf("x");
            let divideIndex = calculatorArray.indexOf("/");
            if (multiplyIndex != -1 || divideIndex != -1) {
                console.log("mutiplyindex: " + multiplyIndex, "divide index: " + divideIndex);
                let operator = "/";
                index = divideIndex;
                if (((multiplyIndex < index) && multiplyIndex != -1) || index == -1) {
                    index = multiplyIndex;
                    operator = "x";
                    console.log("123");
                }
                console.log(operator, index);
                handleNewCalculation(operator, index);

            }
            else {
                // Finding add operator
                index = calculatorArray.indexOf("+");
                if (index != -1) {
                    handleNewCalculation("+", index)
                }
                else {
                    // Finding substract operator
                    index = calculatorArray.indexOf("-");
                    if (index != -1) {
                        handleNewCalculation("-", index)
                    }
                }
            }
        }
        // }

        display.innerHTML += `<br /> = <span class="final-result">${calculatorArray[0].toLocaleString()}</span>`;
        // reset everything
        reset();

    } catch (error) {
        alert(error);
    }
})

function handleNewCalculation(operatorSymbol, operatorIndex) {
    var calculation = 0;
    switch (operatorSymbol) {
        case "x":
            calculation = calculatorArray[operatorIndex - 1] * calculatorArray[operatorIndex + 1];
            break;
        case "/":
            calculation = calculatorArray[operatorIndex - 1] / calculatorArray[operatorIndex + 1];
            break;
        case "+":
            //check for the one more previous is negative 
            if (calculatorArray[operatorIndex - 2] && calculatorArray[operatorIndex - 2] == "-") {
                calculation = -calculatorArray[operatorIndex - 1] + calculatorArray[operatorIndex + 1];
                calculatorArray[operatorIndex - 2] = "+";
            }
            else {
                calculation = calculatorArray[operatorIndex - 1] + calculatorArray[operatorIndex + 1];
            }
            break;
        case "-":
            calculation = calculatorArray[operatorIndex - 1] - calculatorArray[operatorIndex + 1];
            break;
        default:
            break;
    }
    // remove used items
    calculatorArray.splice(operatorIndex - 1, 3)
    // add the new number to array
    calculatorArray.splice(operatorIndex - 1, 0, calculation);
}

function reset() {
    calculatorArray = [];
    currentNumber = "";
    firstClick = true;
}

btnDel.addEventListener("click", function (e) {
    if (currentNumber) {
        currentNumber = currentNumber.slice(0, -1);
    }
    else {
        calculatorArray.splice(-1, 1)
    }
    display.innerHTML = calculatorArray.join(" ") + " " + currentNumber;
})

// on key press
document.addEventListener("keydown", function (e) {
    // For numbers
    var numberArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."]
    if (numberArr.includes(e.key)) {
        btnNumbers[`key_${e.key}`].click();
    }
    // For add
    if (e.key == "+") {
        btnAdd.click();
    }
    // For substract
    if (e.key == "-") {
        btnSubtract.click();
    }
    // For mutiply
    var multiplyArr = ["x", "*"];
    if (multiplyArr.includes(e.key)) {
        btnMultiply.click();
    }
    // For divide
    if (e.key == "/") {
        btnDivide.click();
    }
    // For equal
    if (e.key == "Enter") {
        btnEqual.click();
    }
    // For delete
    var delArr = ["Backspace", "Delete"];
    if (delArr.includes(e.key)) {
        btnDel.click();
    }
})
