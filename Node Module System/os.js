const OS = require('os');

var memory = OS.totalmem();
var freeMemory = OS.freemem();

//Template string

console.log(`Total Memory ${memory}`);
console.log(`Free Memory ${freeMemory}`);

