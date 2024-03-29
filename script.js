const result = document.querySelector(".calcResult");
const buttons = document.querySelectorAll(".button");
const preTyped = document.querySelector(".preTyped");

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  if (isError) {
    resetCalculator();
  }
  const buttonValue = event.target.textContent;
  const buttonType = event.target.getAttribute("data-type");

  if (buttonValue === "." && !result.textContent.includes(".")) {
    result.textContent += ".";
    preTyped.textContent += ".";
    return;
  }

  if (buttonType === "number") {
    handleNumber(event.target.textContent);
  } else if (buttonType === "operator") {
    handleOperator(event.target.textContent);
  } else if (buttonType === "function") {
    handleFunction(event.target.id);
  }
}

function handleNumber(number) {
  if (number === "." && result.textContent.includes(".")) {
    return;
  }
  if (isOperatorPressed) {
    result.textContent = number;
    preTyped.textContent += " " + number;
    isOperatorPressed = false;
  } else {
    const currentDisplay = result.textContent;
    if (currentDisplay === "0") {
      result.textContent = number;
      preTyped.textContent = number;
    } else {
      result.textContent = currentDisplay + number;
      preTyped.textContent += number;
    }
  }
}

let storedNumber = "";
let currentOperator = "";
let isOperatorPressed = false;

function handleOperator(operator) {
  if (isOperatorPressed) {
    updatePreTypedOperator(operator);
    currentOperator = operator;
    return;
  }
  if (currentOperator && result.textContent !== "") {
    calculateResult();
    // currentOperator = operator;
    preTyped.textContent = result.textContent + " " + " ";
    updatePreTypedOperator(operator);
  } else if (result.textContent !== "") {
    storedNumber = result.textContent;
    preTyped.textContent += " " + operator + " "; // append only for the first operator
  }
  currentOperator = operator;
  isOperatorPressed = true;
}

function updatePreTypedOperator(newOperator) {
  if (isOperatorPressed) {
    let parts = preTyped.textContent.trim().split(" ");
    parts[parts.length - 1] = newOperator;
    preTyped.textContent = parts.join(" ") + " ";
  } else {
    preTyped.textContent += newOperator + " ";
  }
}

function handleFunction(functionType) {
  if (isError) {
    resetCalculator();
    return;
  }
  if (functionType === "C") {
    result.textContent = "0";
    storedNumber = "";
    currentOperator = "";
    preTyped.textContent = "";
    calculationHistory = [];
  } else if (functionType === "D") {
    if (result.textContent.length > 0) {
      result.textContent = result.textContent.slice(0, -1);
            preTyped.textContent = preTyped.textContent.slice(0, -1);
      if (result.textContent === "") {
        result.textContent = "0";
      }
    }
  } else if (functionType === "equals") {
    calculateResult();
  } else if (functionType === "negate") {
    toggleNegate();
  } else if (functionType === "sqrt") {
    calculateSqrt();
  }
}

let calculationHistory = [];
let isError = false;
// let lastNumber = ""

function calculateResult() {
  if (isError) {
    resetCalculator();
    return;
  }

  let currentNumber = result.textContent;

  if (!currentOperator || currentNumber === "") {
    return;
  }

  let resultNumber;
  let calculation = `${storedNumber} ${currentOperator} ${currentNumber}`;

  if (currentOperator === "/" && parseFloat(currentNumber) === 0) {
    result.textContent = "Error: Division by 0";
    isError = true;
    return;
  } else {
    switch (currentOperator) {
      case "+":
        resultNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        resultNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "/":
        resultNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
      case "x":
        resultNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      default:
        resultNumber = currentNumber;
    }
  }

  result.textContent = resultNumber;

  calculationHistory.push(calculation + " = " + resultNumber);

  if (calculationHistory.length > 3) {
    calculationHistory.shift();
  }

  preTyped.textContent = calculationHistory.join(" ");

  storedNumber = resultNumber.toString();
  currentOperator = "";
  isOperatorPressed = false;
}

function toggleNegate() {
  let currentNumber = result.textContent;
  if (currentNumber.startsWith("-")) {
    result.textContent = currentNumber.slice(1);
    preTyped.textContent = currentNumber.slice(1);
  } else {
    result.textContent = "-" + currentNumber;
    preTyped.textContent = "-" + currentNumber;
  }
}

function calculateSqrt() {
  let currentNumber = parseFloat(result.textContent);
  if (!isNaN(currentNumber) && currentNumber >= 0) {
    result.textContent = Math.sqrt(currentNumber);
  } else {
    result.textContent = "Error";
    isError = true;
  }
}

function resetCalculator() {
  storedNumber = "";
  currentOperator = "";
  result.textContent = "0";
  preTyped.textContent = "";
  calculationHistory = [];
  isError = false;
}
