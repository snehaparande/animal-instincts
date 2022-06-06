const fs = require('fs');
const { EventEmitter } = require('events');
const { Person } = require('./person.js');

const latestEvent = (instructions) =>
  instructions.trim().split('\n').slice(-1)[0];

const startGame = (eventEmitter, person) => {

  fs.watchFile('instructions.txt', () => {

    const events = fs.readFileSync('instructions.txt', 'utf8');
    const event = latestEvent(events);
    eventEmitter.emit(event);
    if (person.reached()) {
      eventEmitter.emit('reached-target');
      fs.unwatchFile('instructions.txt');
    }
  });

};

const randomInt = (limit) => Math.floor(Math.random() * limit);

const createTarget = () => {
  return { x: randomInt(10), y: randomInt(10) };
};

const winningMessage = () =>
  console.log('Congrats!!!\n You reached the target.');

const addEvents = (eventEmitter, person) => {
  eventEmitter.on('maw-maw', () => person.moveFront());
  eventEmitter.on('maw-maw', () => person.toString());
  eventEmitter.on('bhow-bhow', () => person.moveLeft());
  eventEmitter.on('bhow-bhow', () => person.toString());
  eventEmitter.on('kaa-kaa', () => person.moveRight());
  eventEmitter.on('kaa-kaa', () => person.toString());
  eventEmitter.on('mhehe', () => person.moveBack());
  eventEmitter.on('mhehe', () => person.toString());
  eventEmitter.on('reached-target', winningMessage);
};

const main = () => {

  const eventEmitter = new EventEmitter();
  const target = createTarget();
  const person = new Person(target);

  addEvents(eventEmitter, person);

  startGame(eventEmitter, person);
};

main();
