const result = document.querySelector(".calcResult");
const buttons = document.querySelectorAll(".button");
const preTyped = document.querySelector(".preTyped");

buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

function handleButtonClick(event) {
  if (isError) {
    resetCalculator();
    isError = false;
    return;
  }
  const buttonType = event.target.getAttribute("data-type");

  if (buttonType === "number") {
    handleNumber(event.target.textContent);
  } else if (buttonType === "operator") {
    handleOperator(event.target.textContent);
  } else if (buttonType === "function") {
    handleFunction(event.target.id);
  }
}

function handleNumber(number) {
  if (isOperatorPressed) {
    // Replace the operator with the number
    result.textContent = number;
    isOperatorPressed = false; // Reset the flag
  } else {
    const currentDisplay = result.textContent;
    if (currentDisplay === "0") {
      result.textContent = number;
    } else {
      result.textContent = currentDisplay + number;
    }
  }
}

let storedNumber = "";
let currentOperator = "";
let isOperatorPressed = false;

function handleOperator(operator) {
  if (currentOperator && result.textContent === "") {
    currentOperator = operator;
    updatePreTypedOperator(operator);
  } else {
    storedNumber = result.textContent;
    currentOperator = operator;
    result.textContent = operator;
    isOperatorPressed = true;
  }
}

function updatePreTypedOperator(newOperator) {
  preTyped.textContent = preTyped.textContent.replace(
    /[\+\-\X\/] $/,
    newOperator + " "
  );
}

function handleFunction(functionType) {
  if (functionType === "C") {
    result.textContent = "0";
    storedNumber = "";
    currentOperator = "";
    preTyped.textContent = "";
    calculationHistory = [];
  } else if (functionType === "D") {
    if (result.textContent.length > 0) {
      result.textContent = result.textContent.slice(0, -1);
      if (result.textContent === "") {
        result.textContent = "0";
      }
    }
  } else if (functionType === "equals") {
    calculateResult();
  }
}

let calculationHistory = [];
let isError = false;

function calculateResult() {
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
      case "X":
        resultNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
    }
  }

  result.textContent = resultNumber;

  calculationHistory.push(calculation + " = " + resultNumber);

  if (calculationHistory.length > 3) {
    calculationHistory.shift();
  }

  preTyped.textContent = calculationHistory.join("\n");
}

function resetCalculator() {
  storedNumber = "";
  currentOperator = "";
  result.textContent = "0";
  preTyped.textContent = "";
  calculationHistory = [];
  isError = false;
}
