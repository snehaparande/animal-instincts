const fs = require('fs');
const { EventEmitter } = require('events');

const moveFront = () => console.log('Move Front');
const turnLeft = () => console.log('Turn Left >');
const turnRight = () => console.log('< Turn Right');

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

  eventEmitter.on('maw-maw', moveFront);
  eventEmitter.on('bhow-bhow', turnLeft);
  eventEmitter.on('kaa-kaa', turnRight);

  startGame(eventEmitter);
};

main();
