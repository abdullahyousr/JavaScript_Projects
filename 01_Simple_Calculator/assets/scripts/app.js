const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(usrInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

function calculateResult(calculateType) {
  const enteredNumber = getUserNumberInput();
  if (
    (calculateType !== 'ADD' &&
      calculateType !== 'SUBTRACT' &&
      calculateType !== 'MULTIPLY' &&
      calculateType !== 'DIVIDE') ||
    !enteredNumber
  ) {
    return;
  }
  const initialResult = currentResult;
  let mathOperation;
  if (calculateType === 'ADD') {
    currentResult += enteredNumber;
    mathOperation = '+';
  } else if (calculateType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperation = '-';
  } else if (calculateType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperation = '*';
  } else if (calculateType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperation = '/';
  }
  createAndWriteOutput(mathOperation, initialResult, enteredNumber);
  writeToLog(calculateType, initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener('click', calculateResult.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculateResult.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click',  calculateResult.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click',  calculateResult.bind(this, 'DIVIDE'));
