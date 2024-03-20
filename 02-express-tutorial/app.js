const express = require('express');
const app = express();

const peopleRouter = require('./routes/people');

// static assets
app.use(express.static('./methods-public'));

// Middleware to parse url-encoded and JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// router
app.use('/api/v1/people', peopleRouter);

app.listen(3000);
