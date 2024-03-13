const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// CSS Styles
const STYLE = `<style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
        }
        h1 {
          color: #333;
          margin-top: 50px;
        }
        p {
          color: #666;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        a:hover {
          background-color: #0056b3;
        }
        form {
          padding: 20px;
          border-radius: 5px;
        }
        input[type="text"] {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button[type="submit"] {
          padding: 10px 20px;
          border-radius: 5px;
          background-color: #007bff;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button[type="submit"]:hover {
          background-color: #0056b3;
        }
      </style>`;

// Generate random numbers for the math problem
function generateNumbers() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  return { num1, num2 };
}

app.get('/', (req, res) => {
  res.send(`
      ${STYLE}
      <body style="background-color: #f0f0f0">
        <h1>Welcome to the Treasure Hunt!</h1>
        <p>Are you ready to embark on an adventure to uncover hidden treasures?</p>
        <a href="/clue" style="background-color: #007bff">Start the Hunt!</a>
      </body>
    `);
});

// first clue
app.get('/clue', (req, res) => {
  const { num1, num2 } = generateNumbers();
  const correctAnswer = num1 + num2;

  res.send(`
      ${STYLE}
      <body style="background-color: #e6ffe6">
        <h1>First Clue</h1>
        <p>Calculate the sum of ${num1} and ${num2}:</p>
        <form action="/check-answer" method="post">
          <input type="hidden" name="correctAnswer" value="${correctAnswer}">
          <input type="text" name="userAnswer" placeholder="Your Answer" required>
          <button type="submit" style="background-color: #28a745">Submit</button>
        </form>
      </body>
    `);
});

// answer to the first clue
app.post('/check-answer', (req, res) => {
  const correctAnswer = parseInt(req.body.correctAnswer);
  const userAnswer = parseInt(req.body.userAnswer);

  if (userAnswer === correctAnswer) {
    res.send(`
          ${STYLE}
          <body style="background-color: #ccffcc">
            <h1>Congratulations!</h1>
            <p>You have solved the math problem and unlocked the next clue!</p>
            <a href="/next-clue" style="background-color: #009900">Continue the Adventure!</a>
          </body>
        `);
  } else {
    res.send(`
          ${STYLE}
          <body style="background-color: #ffcccc;">
            <h1>Incorrect Answer</h1>
            <p>Oops! That's not the correct answer. Try again!</p>
            <a href="/clue" style="background-color: #cc0000;">Back to the Clue</a>
          </body>
        `);
  }
});

// second clue
app.get('/next-clue', (req, res) => {
  res.send(`
    ${STYLE}
    <body style="background-color: #ffebee">
      <h1>Cross the Bridge</h1>
      <p>As you approach the bridge, a mythical creature blocks your path.</p>
      <p>"To pass, answer this riddle: What has keys but can't open locks?"</p>
      <form action="/unlock" method="post">
        <input type="text" name="answer" placeholder="Your Answer">
        <button type="submit" style="background-color: #ff4081">Submit</button>
      </form>
    </body>
  `);
});

// answer to the second clue
app.post('/unlock', (req, res) => {
  // Extract answer from the request body
  const answer = req.body.answer.toLowerCase();

  if (answer === 'keyboard') {
    res.send(`
      ${STYLE}
      <body style="background-color: #ccffcc">
        <h1>Congratulations!</h1>
        <p>You have successfully crossed the bridge and uncovered the hidden treasure!</p>
        <p>Claim your reward and enjoy the riches of your adventure!</p>
      </body>
    `);
  } else {
    res.send(`
       ${STYLE}
      <body style="background-color: #ffcdd2">
        <h1>Wrong Answer</h1>
        <p>Oops! That's not the correct answer. Try again!</p>
        <a href="/bridge" style="background-color: #ff8a80; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Back to the Bridge</a>
      </body>
      </body>
    `);
  }
});

app.listen(3000);
