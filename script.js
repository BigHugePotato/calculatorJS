const result = document.querySelector(".calcResult");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  const buttonType = event.target.getAttribute("data-type");

  if (buttonType === "number") {
    handleNumber(event.target.textContent);
  } else if (buttonType === "operator") {
    handleOperator(event.target.textContent);
  } else if (buttonType === "function") {
    handleFunction(event.target.textContent);
  }
}

function handleNumber(number) {
  currentDisplay = result.textContent;

  if (currentDisplay === "Result") {
    result.textContent = number;
  } else {
    result.textContent = currentDisplay + number;
  }
}

let storedNumber = "";
let currentOperator = "";

function handleOperator(operator) {
  storedNumber = result.textContent;
  currentOperator = operator;
  result.textContent = "";
}

function handleFunction(functionType) {
  if (functionType === "C") {
    result.textContent = "Result";
    storedNumber = "";
    currentOperator = "";
  } else if (functionType === "=") {
    calculateResult();
  }
}

function calculateResult() {
    let currentNumber = result.textContent;
    let resultNumber;

    switch (currentOperator) {
      case "+":
        resultNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
      case "-":
        resultNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
      case "/":
        resultNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
      case "X":
        resultNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
    }


    result.textContent = resultNumber;
}