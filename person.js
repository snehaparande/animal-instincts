class Person {
  constructor() {
    this.position = { x: 0, y: 0 };
  }

  moveFront() {
    this.position.y += 1;
  }

  moveBack() {
    this.position.y += -1;
  }

  moveLeft() {
    this.position.x += -1;
  }

  moveRight() {
    this.position.x += 1;
  }

  toString() {
    console.log(`Person is at (${this.position.x}, ${this.position.y})`);
  }
}

exports.Person = Person;
