const { EventEmitter } = require('events');

const moveFront = () => console.log('Move Front');
const turnLeft = () => console.log('Turn Left >');
const turnRight = () => console.log('< Turn Right');

const randomInt = (limit) => Math.floor(Math.random() * limit);

const startGame = (events, eventEmitter) => {
  setInterval(() => {
    const event = events[randomInt(events.length)];
    eventEmitter.emit(event);
  }, 2000);
};

const main = () => {

  const eventEmitter = new EventEmitter();

  eventEmitter.on('maw-maw', moveFront);
  eventEmitter.on('bhow-bhow', turnLeft);
  eventEmitter.on('kaa-kaa', turnRight);

  const events = eventEmitter.eventNames();

  startGame(events, eventEmitter);
};

main();
