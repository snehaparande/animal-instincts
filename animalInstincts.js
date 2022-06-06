const fs = require('fs');
const { EventEmitter } = require('events');
const { Player } = require('./player.js');

const winningMessage = () =>
  console.log('Congrats!!!\n You reached the target.');

const latestEvent = (instructions) =>
  instructions.trim().split('\n').slice(-1).join('');

const startGame = (eventEmitter, person) => {
  eventEmitter.emit('game-started');

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

const addEvents = (eventEmitter, person) => {
  eventEmitter.on('game-started', () => person.toString());
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

const randomInt = (limit) => Math.floor(Math.random() * limit);

const targetPosition = () => {
  return { x: randomInt(10), y: randomInt(10) };
};

const main = () => {
  const eventEmitter = new EventEmitter();
  const person = new Player(targetPosition());

  addEvents(eventEmitter, person);
  startGame(eventEmitter, person);
};

main();
