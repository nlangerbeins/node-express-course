const os = require('os');

const methodsOS = {
  name: os.type(),
  release: os.release(),
  platform: os.platform(),
  type: os.type(),
  uptime: os.uptime(),
};

console.log(methodsOS);
