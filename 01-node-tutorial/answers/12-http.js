const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('Welcome to home page!');
    return;
  }

  if (req.url === '/about') {
    console.log('This is About page');
    return;
  }

  res.end('Oops! try again later');
});

server.listen(3000);
