const { readFile, writeFile } = require('fs').promises;
const path = './temporary/temp.txt';

writeFile(path, 'write line 1  \n')
  .then(() => {
    return writeFile(path, 'write line 2  \n', { flag: 'a' });
  })
  .then(() => {
    return writeFile(path, 'write line 3  \n', { flag: 'a' });
  })
  .then(() => {
    return readFile(path, 'utf8');
  })
  .then((res) => console.log(res))
  .catch((error) => console.log('An error occurred:', error));
