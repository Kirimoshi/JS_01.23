// Task 1
function doCalculationsTask1() {
  const queryUserInput = () => prompt('Please enter valid number', '5');
  const getFactorial = (num) => {
    let result = 1;
    if (num === 0 || num === 1) {
      return result;
    }
    while (num !== 1) {
      result *= num;
      num -= 1;
    }
    return result;
  };
  const assertPrime = (num) => {
    if (num <= 1) {
      return false;
    }
    if (num % 2 === 0 && num > 2) {
      return false;
    }
    const SQUARED_ROOT = Math.sqrt(num);
    for (let i = 3; i <= SQUARED_ROOT; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };
  const assertEven = (num) => {
    return num % 2 === 0;
  };
  const getDenominators = (num) => {
    if (num === 0) {
      return `any except for zero`;
    }
    let denominators = `${num}`;
    if (assertEven(num)) {
      for (let i = num / 2; i > 0; i--) {
        if (num % i === 0) {
          denominators += `, ${i}`;
        }
      }
    } else {
      for (let i = num - 1; i > 0; i--) {
        if (num % i === 0) {
          denominators += `, ${i}`;
        }
      }
    }
    return denominators;
  };
  const getResult = (validated) => {
    return `Number: ${validated}
            \nFactorial: ${getFactorial(validated)}
            \nSquare: ${Math.pow(validated, 2)}
            \nisPrime: ${assertPrime(validated)}           
            \nisEven: ${assertEven(validated)}             
            \nDenominators: ${getDenominators(validated)}`;
  };
  const printCalculationsResult = (result) => {
    console.log(result);
  };

  function validateUserInput(inputNumberType) {
    if (Number.isNaN(inputNumberType)) {
      console.log('Incorrect input!');
      const inputNumberType = Number(queryUserInput());
      return validateUserInput(inputNumberType);
    } else if (!(Number.isFinite(inputNumberType) && Number.isInteger(inputNumberType) && inputNumberType >= 0)) {
      console.log('Incorrect input!');
      const inputNumberType = Number(queryUserInput());
      return validateUserInput(inputNumberType);
    } else {
      return inputNumberType;
    }
  }

  const inputNumberType = Number(queryUserInput());
  const validated = validateUserInput(inputNumberType);
  printCalculationsResult(getResult(validated));
}

doCalculationsTask1();

// Task 2
function printMatrixTask2() {
  const queryUserInputCharSet = () => prompt('Please enter valid character set (1..3 chars)', 'abc');
  const queryUserInputMatrixDimension = () => prompt('Please enter valid number (1..10)', '3');

  function validateUserInputCharSet(charSet) {
    if (charSet.trim().length === 0 || charSet.trim().length > 3) {
      console.log('Incorrect input!');
      return validateUserInputCharSet(queryUserInputCharSet());
    }
    return charSet;
  }

  function validateUserInputMatrixDimension(matDim) {
    if (Number.isNaN(matDim)) {
      console.log('Incorrect input!');
      return validateUserInputMatrixDimension(Number(queryUserInputMatrixDimension()));
    } else if (!(Number.isFinite(matDim) && Number.isInteger(matDim) && matDim >= 1 && matDim <= 9)) {
      console.log('Incorrect input!');
      return validateUserInputMatrixDimension(Number(queryUserInputMatrixDimension()));
    } else {
      return matDim;
    }
  }

  function getResult(validatedCharSet, validatedMatrixDimension) {
    let result = `${validatedCharSet}`;
    for (let i = 0; i < validatedMatrixDimension - 1; i++) {
      result += ` ${validatedCharSet}`;
    }
    const row = result;
    for (let i = 0; i < validatedMatrixDimension - 1; i++) {
      result += `\n${row}`;
    }
    return result;
  }

  function print(result) {
    console.log(result);
  }

  const charSet = queryUserInputCharSet();
  const validatedCharSet = validateUserInputCharSet(charSet);
  const matDim = Number(queryUserInputMatrixDimension());
  const validatedMatrixDimension = validateUserInputMatrixDimension(matDim);
  print(getResult(validatedCharSet, validatedMatrixDimension));
}

printMatrixTask2();