const { readFile, writeFile } = require('fs').promises;
const path = './temporary/temp.txt';

const writer = async () => {
  try {
    await writeFile(path, 'first  \n');
    await writeFile(path, 'second  \n', { flag: 'a' });
    await writeFile(path, 'third  \n', { flag: 'a' });
  } catch (error) {
    console.log(error);
  }
};

const reader = async () => {
  try {
    const text = await readFile(path, 'utf8');
    console.log(text);
  } catch (error) {
    console.log(error);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (error) {
    console.log(error);
  }
};

readWrite();
