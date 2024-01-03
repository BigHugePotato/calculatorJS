const result = document.querySelector(".calcResult");
const buttons = document.querySelectorAll(".button");
const preTyped = document.querySelector(".preTyped");

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
    handleFunction(event.target.id);
  }
}

function handleNumber(number) {
  currentDisplay = result.textContent;

  if (currentDisplay === "0") {
    result.textContent = number;
  } else {
    result.textContent = currentDisplay + number;
  }
  preTyped.textContent += number;
}

let storedNumber = "";
let currentOperator = "";

function handleOperator(operator) {
  storedNumber = result.textContent;
  currentOperator = operator;
  result.textContent = "";

  if (isTheLastCharAnOperator(preTyped.textContent)) {
    preTyped.textContent = preTyped.textContent.slice(0, -2) + operator + " ";
  } else {
    preTyped.textContent += " " + operator + " ";
  }
}

function isTheLastCharAnOperator(text) {
  const lastChar = text.trim().slice(-1);
  return ["+", "-", "X", "/"].includes(lastChar);
}

function handleFunction(functionType) {
  if (functionType === "C") {
    result.textContent = "0";
    storedNumber = "";
    currentOperator = "";
    preTyped.textContent = "";
  } else if (functionType === "equals") {
    calculateResult();
  }
}

function calculateResult() {
  let currentNumber = result.textContent;
  let resultNumber;

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

  result.textContent = resultNumber;
  preTyped.textContent += " = " + resultNumber;
}
