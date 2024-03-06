const EventEmitter = require('events');

const emitter = new EventEmitter();

const quotes = [
  'Be the change you want to see in the world.',
  'Live in the moment.',
  'Dream big.',
  'Embrace the journey, not the destination.',
  'Less perfection, more authenticity.',
];

emitter.on('randomQuote', (quote) => {
  console.log(quote);
});

setInterval(() => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  emitter.emit('randomQuote', quotes[randomIndex]);
}, 2000);
