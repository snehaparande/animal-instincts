class Person {
  constructor(target) {
    this.target = target;
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

  reached() {
    return this.position.x === this.target.x &&
      this.position.y === this.target.y;
  }

  toString() {
    console.log(`Person is at (${this.position.x}, ${this.position.y}), 
    Target is (${this.target.x}, ${this.target.y})`);
  }
}

exports.Person = Person;
