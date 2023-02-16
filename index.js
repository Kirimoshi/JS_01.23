// Task 1

class Stack {
  constructor(maxStackLimit) {
    if (maxStackLimit) {
      if (!(Number.isFinite(maxStackLimit) && Number.isInteger(maxStackLimit) && Number.isSafeInteger(maxStackLimit)
        && maxStackLimit > 0)) {
        throw new Error('Invalid limit value');
      }
      this.maxStackLimit = maxStackLimit;
    } else {
      this.maxStackLimit = 10;
    }
    this.storage = [];
    this.size = 0;
  }

  push = (elem) => {
    if (this.size === this.maxStackLimit) {
      throw new Error('Limit exceeded');
    }
    this.storage[this.size] = elem;
    this.size++;
  }
  pop = () => {
    if (this.isEmpty()) {
      throw new Error('Empty stack');
    }
    const removed = this.storage[this.size - 1];
    this.storage[this.size - 1] = null;
    this.size--;
    return removed;
  }
  peek = () => {
    if (this.isEmpty()) {
      return null;
    }
    return this.storage[this.size - 1];
  }
  isEmpty = () => {
    return this.size === 0;
  }
  toArray = () => {
    const arrayFromStack = [];
    this.storage.forEach((elem) => {
      if (elem !== null) {
        arrayFromStack.push(elem);
      }
    })
    return arrayFromStack;
  }

  static fromIterable(iterable) {
    if (!iterable[Symbol.iterator]) {
      throw new Error('Not iterable');
    }

    let maxStackLimit = 0;
    for (const iterableElement of iterable) {
      maxStackLimit++;
    }
    const newStack = new Stack(maxStackLimit);

    for (const iterableElement of iterable) {
      newStack.push(iterableElement);
    }
    return newStack;
  }
}

// Task 2

class Node {
  constructor(elem) {
    this.value = elem;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append = (elem) => {
    if (this.head === null) {
      this.head = new Node(elem);
      return;
    }
    let lastNode = this.head;
    while (lastNode.next) {
      lastNode = lastNode.next;
    }
    lastNode.next = new Node(elem);
  }
  prepend = (elem) => {
    const firstNode = this.head;
    this.head = new Node(elem);
    this.head.next = firstNode;
  }
  find = (elem) => {
    if (this.head === null) {
      return null;
    }
    let lastNode = this.head;
    while (lastNode) {
      if (lastNode.value === elem) {
        return lastNode;
      }
      lastNode = lastNode.next;
    }
    return null;
  }
  toArray = () => {
    if (this.head === null) {
      return [];
    }
    let lastNode = this.head;
    const arrayFromLinkedList = [];
    let arrayIndex = 0;
    while (lastNode) {
      arrayFromLinkedList[arrayIndex] = lastNode.value;
      lastNode = lastNode.next;
      arrayIndex++;
    }
    return arrayFromLinkedList;
  }

  static fromIterable(iterable) {
    if (!iterable[Symbol.iterator]) {
      throw new Error('Not iterable');
    }

    const newLinkedList = new LinkedList();
    for (const iterableElement of iterable) {
      newLinkedList.append(iterableElement);
    }
    return newLinkedList;
  }
}

// Task 3

class Car {
  constructor() {}

  #brand = '';
  #model = '';
  #yearOfManufacturing = 1950;
  #maxSpeed = 100;
  #maxFuelVolume = 20;
  #fuelConsumption = 1;
  #damage = 1;
  #currentFuelVolume = 0;
  #isStarted = false;
  #mileage = 0;
  #health = 100;

  get brand() {
    return this.#brand;
  }
  get model() {
    return this.#model;
  }
  get yearOfManufacturing() {
    return this.#yearOfManufacturing;
  }
  get maxSpeed() {
    return this.#maxSpeed;
  }
  get maxFuelVolume() {
    return this.#maxFuelVolume;
  }
  get fuelConsumption() {
    return this.#fuelConsumption;
  }
  get damage() {
    return this.#damage;
  }
  get currentFuelVolume() {
    return this.#currentFuelVolume;
  }
  get isStarted() {
    return this.#isStarted;
  }
  get mileage() {
    return this.#mileage;
  }
  get health() {
    return this.#health;
  }


  set brand(brandName) {
    if (!(typeof brandName === 'string' && brandName.length >= 1 && brandName.length <= 50)) {
      throw new Error('Invalid brand name');
    }
    this.#brand = brandName;
  }
  set model(modelName) {
    if (!(typeof modelName === 'string' && modelName.length >= 1 && modelName.length <= 50)) {
      throw new Error('Invalid model name');
    }
    this.#model = modelName;
  }
  set yearOfManufacturing(year) {
    if (!(Number.isFinite(year) && year >= 1950 && year <= 2023)) {
      throw new Error('Invalid year of manufacturing');
    }
    this.#yearOfManufacturing = year;
  }
  set maxSpeed(maxSpeed) {
    if (!(Number.isFinite(maxSpeed) && maxSpeed >= 100 && maxSpeed <= 330)) {
      throw new Error('Invalid max speed');
    }
    this.#maxSpeed = maxSpeed;
  }
  set maxFuelVolume(maxFuelVolume) {
    if (!(Number.isFinite(maxFuelVolume) && maxFuelVolume >= 20 && maxFuelVolume <= 100)) {
      throw new Error('Invalid max fuel volume');
    }
    this.#maxFuelVolume = maxFuelVolume;
  }
  set fuelConsumption(fuelConsumption) {
    if (!(Number.isFinite(fuelConsumption) && fuelConsumption > 0)) {
      throw new Error('Invalid fuel consumption');
    }
    this.#fuelConsumption = fuelConsumption;
  }
  set damage(damage) {
    if (!(Number.isFinite(damage) && damage >= 1 && damage <= 5)) {
      throw new Error('Invalid damage');
    }
    this.#damage = damage;
  }

  start() {
    if (this.#isStarted) {
      throw new Error('Car has already started');
    }
    this.#isStarted = true;
  }
  shutDownEngine() {
    if (!this.#isStarted) {
      throw new Error(`Car hasn't started yet`);
    }
    this.#isStarted = false;
  }
  fillUpGasTank(fuelAmount) {
    if (!(Number.isFinite(fuelAmount) && fuelAmount > 0)) {
      throw new Error('Invalid fuel amount');
    }
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.#currentFuelVolume + fuelAmount > this.#maxFuelVolume) {
      throw new Error('Too much fuel');
    }
    this.#currentFuelVolume = this.#currentFuelVolume + fuelAmount;
  }
  drive(speed, hours) {
    if (!(Number.isFinite(speed) && speed > 0)) {
      throw new Error('Invalid speed');
    }
    if (!(Number.isFinite(hours) && hours > 0)) {
      throw new Error('Invalid duration');
    }
    if (speed > this.#maxSpeed) {
      throw new Error('Car can\'t go this fast');
    }
    if (!this.#isStarted) {
      throw new Error(`You have to start your car first`);
    }
    const estimateEndFuelAmount = () => {
      return this.#currentFuelVolume - (this.#fuelConsumption / 100 * speed * hours);
    }
    if (this.#currentFuelVolume === 0 || estimateEndFuelAmount() < 0) {
      throw new Error('You don\'t have enough fuel');
    }
    const estimateEndHealthValue = () => {
      return this.#health - (this.#damage / 100 * speed * hours);
    }
    if (this.#health === 0 || estimateEndHealthValue() <= 0) {
      throw new Error('Your car won\'t make it');
    }
    const estimateMileage = () => {
      return this.#mileage + speed * hours;
    }
    this.#currentFuelVolume = estimateEndFuelAmount();
    this.#health = estimateEndHealthValue();
    this.#mileage = estimateMileage();
  }
  repair() {
    if (this.#isStarted) {
      throw new Error('You have to shut down your car first');
    }
    if (this.#currentFuelVolume !== this.#maxFuelVolume) {
      throw new Error(`You have to fill up your gas tank first`);
    }
    this.#health = 100;
  }
  getFullAmount() {
    if (this.#currentFuelVolume === this.#maxFuelVolume) {
      return 0;
    }
    return this.#maxFuelVolume - this.#currentFuelVolume;
  }
}