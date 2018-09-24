# Node

## Node Module System.
`Os`, `fs`, `events`,`http`  etc are the example of modules.


### Global Objects.
`console.log()` Here the `console` is a global object which can be accessed anywhere.
`setTimout`, `clearTimeout`, `setInterval`, `clearInterval` are some other example of global objects.

In browser we have `window` global object which holds everything inside it.
eg:- `window.console.log()` which we can also use as `console.log` like this `setTimeout, setInterval` 
are also registered in `window` object as `window.setTimeout`.

Moreover the variable that we declare `var a=10` is also a `window.a=10`.

**Note** In Node we do not have this object. But we have `global` so all those function and object that were
related to the `window` object in javascript is related to the `global` object in node js.

**Note** One thing you have to note in node that the variables that we declare `var a=10` are not the part of `global` object.
```
var a=10;
console.log(window.a); // undefined.
```


### Defining Modules.
Variable or function declared with a same name gets overridden. Therefore in order to overcome this problem
we create modules in node.

Every file in a node application is considered a `module`. The variable and functions defined in that module or file
is scoped to that file.

If you want to use the variable or function outside that module you need to explicitly `export` it and make it public.

Every node application have at least one file or one module which we call main module. 
```
console.log(module);
// this is not a global object it appears to be but is not so you cannot do.
console.log(global.module); // do not do this.
```
The `module` object contains the information such as filename, loaded, children, path etc.


**logger.js** `Module for loggin example`

```
var url = 'http://mylogger.io/log';//imaginary url
function log(message) {
    //sent an HTTP request.
    console.log(message);
}
module.exports.log = log;
//exports.log=log;//you can also do this.
// module.exports.endPoint = url; //lets keep this private.
```
Using Module
```
const logger = require('./logger');
logger.log('testing..');
```
**More over** In this example rather that exporting a object we could simple export the function only.
```
module.exports = log;
```
Using Module
```
const log = require('./logger');
log('testing..');
```

**So in you module you can export a object or a single function**


### Module Wrapper Function.
A Module is wrapped inside a function. At run time our code is converted to something like this
```
(function (exports,require,module,__filename,__dirname)){
    //our code
}) // this is immediately invoked functional expression.
```
Make a syntactical error on the first line or your module to view this function in console.
```
var a=; // on the first line.
```

The arguments `require`,`exports` etc are passed inside every module automatically.

`__filename`: is the name of the current file along with the complete path.  
`__dirname`: is the name of the current directory.
 
 ### Other Useful Module.
 `File System`  
 `HTTP`  
 `OS` 
 `PATH`  
 `PROCESS` 
 `QUERY String`  
 `Stream`
 `Path`
 
 
 #### Path Module
```
var pathObj = path.parse(__filename);
console.log(pathObj);
```
### OS Module 
How to get Information about the current operating system.

*Getting The Ram eg*
```
const OS = require('os');

var memory = OS.totalmem();
var freeMemory = OS.freemem();

//Template string

console.log(`Total Memory ${memory}`);
console.log(`Free Memory ${freeMemory}`);


```