// Task 1
function makeDeepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error();
  }

  function innerDeepCopy(obj) {
    switch (obj.constructor) {
      case Boolean:
        return Boolean(obj);
      case Number:
        return Number(obj);
      case String:
        return String(obj);
      case Date:
        return new Date().setTime(obj.getTime());
      case Array:
        return obj.map((item) => innerDeepCopy(item));
      case Map:
        return new Map(Array.from(obj, (item) => innerDeepCopy(item)));
      case Set:
        return new Set(Array.from(obj, (item) => innerDeepCopy(item)));
      case RegExp:
        return new RegExp(obj);
      case BigInt:
        return BigInt(obj);
      case Object: {
        let deepCopy = {};

        for (let key in obj) {
          if (Object.hasOwn(obj, key)) {
            deepCopy[key] = innerDeepCopy(obj[key]);
          }
        }
        return deepCopy;
      }
    }
    return obj;
  }
  return innerDeepCopy(obj);
}

// Task 2
function selectFromInterval(array, from, to) {
  if (!Array.isArray(array)) {
    throw new Error();
  }
  if (array.length === 0) {
    throw new Error();
  }
  array.forEach((item) => {
    if (!Number.isFinite(item)) {
      throw new Error();
    }
  });
  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    throw new Error();
  }
  if (to < from) {
    [from, to] = [to, from];
  }
  return array.filter((num) => (num >= from && num <= to));
}

// Task 3
function createIterable(from, to) {
  if (from === null || to === null || !Number.isFinite(from) || !Number.isFinite(to) || to <= from) {
    throw new Error();
  }

  const range = {
    from: from,
    to: to,
  }

  range[Symbol.iterator] = function () {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return {
            done: false,
            value: this.current++,
          };
        } else {
            return {
              done: true
            };
          }
        }
      };
    };

  return range;
}