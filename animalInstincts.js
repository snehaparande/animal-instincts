const fs = require('fs');
const { EventEmitter } = require('events');
const { Person } = require('./person.js');

const latestEvent = (instructions) =>
  instructions.trim().split('\n').slice(-1)[0];

const startGame = (eventEmitter) => {

  fs.watchFile('instructions.txt', () => {

    const events = fs.readFileSync('instructions.txt', 'utf8');
    const event = latestEvent(events);
    eventEmitter.emit(event);
  });

};

const main = () => {

  const eventEmitter = new EventEmitter();
  const person = new Person;

  eventEmitter.on('maw-maw', () => person.moveFront());
  eventEmitter.on('maw-maw', () => person.toString());
  eventEmitter.on('bhow-bhow', () => person.moveLeft());
  eventEmitter.on('bhow-bhow', () => person.toString());
  eventEmitter.on('kaa-kaa', () => person.moveRight());
  eventEmitter.on('kaa-kaa', () => person.toString());

  startGame(eventEmitter);
};

main();
