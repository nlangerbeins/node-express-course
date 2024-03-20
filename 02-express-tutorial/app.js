const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

const peopleRouter = require('./routes/people');

// static assets
app.use(express.static('./methods-public'));

// Middleware to parse url-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router
app.use('/api/v1/people', peopleRouter);

// cookie parser
app.use(cookieParser());

const auth = (req, res, next) => {
  const { name } = req.cookies;

  if (!name) {
    res.status(401).send('unauthorized');
  }
  req.user = name;
  next();
};

app.post('/logon', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  res.cookie('name', name);
  res.status(200).send(`Hello ${name}`);
});

app.delete('/logoff', (req, res) => {
  res.clearCookie('name');
  res.status(200).json({ msg: 'The user is logged off' });
});

app.get('/test', auth, (req, res) => {
  res.status(200).json({ msg: `Welcome ${req.user}` });
});

app.listen(3000);
