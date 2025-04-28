const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Gets input from input field
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// Generates and writes calculation log
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(
  operationIdentifier,
  preResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    operation: operationIdentifier,
    preResult: preResult,
    number: operationNumber,
    result: newResult,
  };
  logEntries.push(logEntry);
  console.log(logEntries);
}

// function add() {
//   const enteredNumber = getUserNumberInput();
//   const initialResult = currentResult;
//   currentResult += enteredNumber;
//   createAndWriteOutput('+', initialResult, enteredNumber);
//   writeToLog('ADD', initialResult, enteredNumber, currentResult);
// }

// function subtract() {
//   const enteredNumber = getUserNumberInput();
//   const initialResult = currentResult;
//   currentResult -= enteredNumber;
//   createAndWriteOutput('-', initialResult, enteredNumber);
//   writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult);
// }

// function multiply() {
//   const enteredNumber = getUserNumberInput();
//   const initialResult = currentResult;
//   currentResult *= enteredNumber;
//   createAndWriteOutput('*', initialResult, enteredNumber);
//   writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
// }

// function divide() {
//   const enteredNumber = getUserNumberInput();
//   const initialResult = currentResult;
//   currentResult /= enteredNumber;
//   createAndWriteOutput('/', initialResult, enteredNumber);
//   writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
// }

function calculate(operation) {
  const enteredNumber = getUserNumberInput();
  if(
     operation !== 'ADD' && 
     operation !== 'SUBTRACT' && 
     operation !== 'MULTIPLY' && 
     operation !== 'DIVID' || 
     !enteredNumber
    )
  { 
    return; 
  }
  const initialResult = currentResult;
  let operator;
  if (operation === 'ADD') {
    currentResult += enteredNumber;
    operator = '+';
  } else if (operation === 'SUBTRACT') {
    currentResult -= enteredNumber;
    operator = '-';
  } else if (operation === 'MULTIPLY') {
    currentResult *= enteredNumber;
    operator = '*';
  } else {
    currentResult /= enteredNumber;
    operator = '/';
  }
  createAndWriteOutput(operator, initialResult, enteredNumber);
  writeToLog(operation, initialResult, enteredNumber, currentResult);
}

addBtn.addEventListener('click', calculate.bind(this, 'ADD'));
subtractBtn.addEventListener('click', calculate.bind(this, 'SUBTRACT'));
multiplyBtn.addEventListener('click', calculate.bind(this, 'MULTIPLY'));
divideBtn.addEventListener('click', calculate.bind(this, 'DIVID'));

// add(5, 5);
// currentResult = add(1, 2);
// currentResult = ((currentResult + 10) * 3) / 2 - 1;
// let calculationDescription = '(' + defaultResult + ' + 10) * 3 / 2 - 1';
// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;
// let errorMessage = 'An error \n' + 'occurred!';
// function add(num1, num2) {
//   const result = num1 + num2;
//   // alert('The result is ' + result);
//   return result;
// }

// alert('This works!');
