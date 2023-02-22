const numbersBlock = document.querySelector('.numbers-block');

const checkOperationType = (target, output) => {
  if (target.classList.contains('clear-sign')) {
    return 'clear';
  }
  if (target.classList.contains('invert-sign') && isDone(output)) {
    return 'invert';
  }
  if (target.classList.contains('backspace-sign')) {
    return 'backspace';
  }
  if (target.classList.contains('arithmetic')) {
    return 'arithmetic';
  }
  if (target.classList.contains('equal-sign')) {
    return 'equal';
  }
}
const execOperation = (operationType, output, event) => {
  switch (operationType) {
    case 'clear':
      clear(output);
      return;
    case 'invert':
      invert(output);
      return;
    case 'backspace':
      backspace(output);
      return;
    case 'arithmetic':
      performArithmeticOperation(event, output);
      return;
    case 'equal':
      equal(output);
      return;
    default:
      return;
  }
}
const performArithmeticOperation = (event, output) => {
  if (isDone(output) && !isEmpty(output)) {
    output.value += event.target.textContent;
  } else if (!isDone(output) && isLastSymbolArithmeticOperator(output)) {
    backspace(output);
    output.value += event.target.textContent;
  } else {
    equal(output);
    output.value += event.target.textContent;
  }
}
const isLastSymbolArithmeticOperator = (output) => {
  return /[+*\/-]/.test(output.value.at(-1));
}
const isEmpty = (output) => {
  return output.value === '';
}
const parse = (output) => {
  let operator, operatorIndex, leftOperand, rightOperand;
  for (let i = 0; i < output.value.length; i++) {
    if (i === 0 && output.value[0] === '-') {
      continue;
    }
    if (/[+*\/-]/.test(output.value[i])) {
      operatorIndex = i;
      break;
    }
  }
  operator = output.value[operatorIndex];
  leftOperand = Number(output.value.slice(0, operatorIndex));
  rightOperand = Number(output.value.slice(operatorIndex + 1));
  return {
    operator,
    leftOperand,
    rightOperand,
  }
}
const isDividableByZero = (parsedObj) => {
  const { rightOperand } = parsedObj;
  return rightOperand !== 0;
}
const showErrorDivByZero = (output) => {
  const prevOutputValue = output.value;
  output.style.color = 'red';
  output.value = 'ERROR';
  setTimeout(() => {
    output.value = prevOutputValue;
    output.style.color = 'black';
  }, 1000);
  return output.value;
}
const calculate = (parsedObj, output) => {
  const { operator, leftOperand, rightOperand } = parsedObj;
  switch (operator) {
    case '/':
      if (isDividableByZero(parsedObj)) {
        return parseFloat((leftOperand / rightOperand).toFixed(8)).toString();
      }
      return showErrorDivByZero(output);
    case '*':
      return parseFloat((leftOperand * rightOperand).toFixed(8)).toString();
    case '-':
      return parseFloat((leftOperand - rightOperand).toFixed(8)).toString();
    case '+':
      return parseFloat((leftOperand + rightOperand).toFixed(8)).toString();
    default:
      return;
  }
}

const isDone = (output) => {
  if ( /^-/.test(output.value) ) {
    return !/[+*\/-]/gm.test(output.value.slice(1));
  } else if ( /[+*\/-]/gm.test(output.value) ) {
    return false;
  }
  return true;
}
const clear = (output) => {
  output.value = '';
}
const invert = (output) => {
  output.value = (-output.value).toString();
}
const backspace = (output) => {
  output.value = output.value.slice(0, -1);
}
const isValidParsedObj = (parsedObj) => {
  const { operator, leftOperand, rightOperand } = parsedObj;
  return !(rightOperand === null || rightOperand === undefined || operator === null || operator === undefined ||
    leftOperand === null || leftOperand === undefined);
}
const equal = (output) => {
  const parsedObj = parse(output);
  if (isValidParsedObj(parsedObj)) {
    output.value = calculate(parsedObj, output);
  }
}

const handleClick = (event) => {
  const output = document.getElementById('screen-block');
  if (event.target.classList.contains('operation')) {
    const operationType = checkOperationType(event.target, output);
    execOperation(operationType, output, event);
  } else if (event.target.classList.contains('double-zero-sign') && isEmpty(output)) {
    output.value += '0';
  } else {
    output.value += event.target.textContent;
  }
}
numbersBlock.addEventListener('click', handleClick);