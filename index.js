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
        return new Map(Array.from(obj).map((item) => innerDeepCopy(item)));
      case Set:
        return new Set(Array.from(obj).map((item) => innerDeepCopy(item)));
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