const { readFileSync, writeFileSync } = require('fs');

writeFileSync('./temporary/fileA.txt', 'first line\n');
writeFileSync('./temporary/fileA.txt', 'second line\n', {
  flag: 'a',
});
writeFileSync('./temporary/fileA.txt', 'third line\n', {
  flag: 'a',
});

const fileA = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(fileA);
