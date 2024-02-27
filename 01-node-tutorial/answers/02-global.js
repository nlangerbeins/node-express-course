// Printing out the value of __dirname
console.log('__dirname:', __dirname);

// Printing out the value of process.env.MY_VAR
// works only with single qoutes ' '
console.log('process.env.MY_VAR:', process.env.MY_VAR);

// Printing out other globals
console.log('Node.js version:', process.version);
console.log('Node.js platform:', process.platform);
console.log('Process ID:', process.pid);
console.log('Execution path:', process.execPath);
console.log('Current working directory:', process.cwd());
