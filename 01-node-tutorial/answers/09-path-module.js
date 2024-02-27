const path = require('path');

const dir1 = 'folder';
const dir2 = 'subfolder';
const file = 'file.txt';

const filePath = path.join(dir1, dir2, file);
console.log(filePath);
