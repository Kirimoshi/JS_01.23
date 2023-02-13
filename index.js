// Task 1

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

// Task 2

class Calculator {
  constructor(x, y) {
    if (arguments.length !== 2 || typeof x !== 'number' || typeof y !== 'number' || !Number.isFinite(x) ||
      !Number.isFinite(y)) {
      throw new Error();
    }
    this.x = x;
    this.y = y;
  }

  static validateArg(num) {
    if (arguments.length === 0 || typeof num !== 'number' || !Number.isFinite(num)) {
      throw new Error();
    }
  }
  static validateDivByZero(num) {
    if (num === 0) {
      throw new Error();
    }
  }

  setX = (num) => {
    Calculator.validateArg(num);
    this.x = num;
  }
  setY = (num) => {
    Calculator.validateArg(num);
    this.y = num;
  }
  getSum = () => {
    return this.x + this.y;
  }
  getMul = () => {
    return this.x * this.y;
  }
  getSub = () => {
    return this.x - this.y;
  }
  getDiv = () => {
    Calculator.validateDivByZero(this.y);
    return this.x / this.y;
  }
}


