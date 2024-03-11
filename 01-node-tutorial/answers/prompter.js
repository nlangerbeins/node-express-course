const http = require('http');
var StringDecoder = require('string_decoder').StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder('utf-8');
  let body = '';

  req.on('data', function (data) {
    body += decode.write(data);
  });

  req.on('end', function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split('&');
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split('=');
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let guessNumber = Math.floor(Math.random() * 10) + 1;
let prevGuesses = '';

// form
const form = (message) => {
  return `
    <body>
      <h1>Guess the Number!</h1>
      <h2>I'm thinking of a number between 1 and 10</h2>
      <p>Can you guess what it is?</p>
      <form method="POST">
        <input type="number" name="item" pattern="\d+" title="Please enter a number" required>
        <button type="submit">Submit</button>
      </form>
      <p>Previous guesses: ${prevGuesses}</p>
      <p>${message}</p>
    </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log('req.method is ', req.method);
  console.log('req.url is ', req.url);

  if (req.method === 'POST') {
    getBody(req, (body) => {
      console.log('The body of the post is ', body);

      if (body['item']) {
        const userGuess = parseInt(body['item'], 10);
        prevGuesses += userGuess + ' ';

        if (userGuess === guessNumber) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(
            `<p>Congratulations! You guessed the correct number: ${guessNumber}</p>`
          );

          // reset the game by generating a new random number
          guessNumber = Math.floor(Math.random() * 10) + 1;
          prevGuesses = '';
          return;
        } else if (userGuess < guessNumber) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(form(`${userGuess} is too low!`));
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(form(`${userGuess} is too high!`));
        }
      } else {
        prevGuesses += 'Nothing was entered. ';
        res.writeHead(303, { Location: '/' });
        res.end();
      }
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(form(''));
  }
});

server.on('request', (req) => {
  console.log('event received: ', req.method, req.url);
});

server.listen(3000);
console.log('The server is listening on port 3000.');
