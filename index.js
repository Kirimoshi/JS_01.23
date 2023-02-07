// Task 1

Array.prototype.customFilter = function customFilter (callback, thisArg) {
  let bindedCallback;
  if (thisArg) {
    bindedCallback = callback.bind(thisArg);
  } else {
    bindedCallback = callback;
  }

  const filteredArr = [];

  this.forEach((item, index, array) => {
    if (bindedCallback(item, index, array)) {
      filteredArr.push(item);
    }
  })

  return filteredArr;
}

// Task 2

function createDebounceFunction(callback, delay) {
  let timerId;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}