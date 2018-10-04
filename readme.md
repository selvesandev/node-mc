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
#### OS Module 
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

#### File Module
How to work with file.
```
const fs = require('fs');
const files = fs.readdirSync('./');//list of all the files in current directry.
console.log(files);


//Synchronous
fs.readdir('./', function (err, files) {
    console.log(files);
    //only one of the value will have value if there is a error the files will be null is there is not the err will be null
});
```

#### Event Module.
A lot of node core functionality is based on the concept of events. 

A Event is basically a signal which indicates that something has happened in our application   
eg:- 

The `HTTP` class where we listen to a given port and every time we receive request on that port that http class raises and `Event`.
Our job here is listening to that event a turning it into right response.

**Raising an Event**
```
const EventEmitter = require('events');//we get the event emitter class.
const emitter = new EventEmitter();

//
emitter.emit('messageLogged');
```

**Listening to an Event**
```
emitter.on('messageLogged', function () {
    //on can be replace by addListener
    console.log('listener called');
});
```

**Note** The event listener should always be registered before the event is fired.

**Event Argument**
```
emitter.on('messageLogged', function (argument) {
    //on can be replace by addListener
    console.log('listener called', argument);
});

//
emitter.emit('messageLogged', {name: 'Ram', id: 2});
```

**Extending EventEmitter**
```

class logger extends EventEmitter {
    log() {
        this.emit('messageLogged', {name: 'ram', id: 2});
    }
    //always use the emitter like this
}

logger.on('messageLogged',function(){
//do something
});

const logger=new Logger();
logger.log();
```

#### Http Module
To create the web server that listen for a http request for a given port with this we can make a backend server.
The server variable is a event emitter inherited from `net.Server` which is a `EventEmitter`, Therefore it has on, emit, addListener etc methods.


```
var server = http.createServer();
server.listen(3000);
```

When we run this application this server will listen on port `3000`. Everytime there is a new connection
this server will raise and event named `connection`

```
server.on('connection', function () {
    console.log('request received');
});//the server emits the connection emitter

```
**Note** of course you will have to register this before listening to port 3000.


**We can also**
```
//use this instead.
var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.write('Hello world');
        res.end();
    }
    if(req.url === '/api'){
        res.write(JSON.strigify([1,2,4]));
        res.end();
    }
});
server.listen(3000);
console.log('listening on port 3000');
```


## REST API
> Representational State Transfer.
```
http://vidly.com/api/customers

HTTP REQUEST VERB
-----------------------
GET > Getting Data
POST > Creating Data
PUT > Updating Data
DELETE > Deleting Data

```


### Express
A most popular framework to give our application a structure.
```
http://expressjs.com/en/4x/api.html#app
```

**Your first Express Server**
```
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
```

### Nodemon (Node Monitor)
As far you have seen every time we make changes to the code we have to
quiz and restart the server which is a hidious process.  
So we are going to install a node package called nodemon.
```
sudo npm i -g nodemon
```
Now instead of running your application with node we will run it with `nodemon`
```
nodemon app.js
```

### Environment Variables.
A variable that is part of the node environment in which the process runs.
It's value is set outside this application.   
Setting up the port with environment variable.

```

//PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on port 4000 ${port}`);
});
```

**Here** if the environment variable port is set then use that else use `4000`

**Setting up ENVIRONMENT VARIABLE**  
In mac you can set the Environment variable with `export` command on windows use `set`
```
export PORT=5000
```
Now as we have environment variable the app will run on port 5000
```
nodemon index.js
```

#### Handling POST AND GET
In order to parse the POST data from the request you need to parse the body into json.
```

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//with extended true you can pass complex data like arrays from the request

```

#### Validate Input with JOI.
```
npm install joi
```
```
const Joi=require('joi'); // since joi return a class we store it in a constant with Uppercase since we should use pascal case for classes.

app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    if (result.error) {
        res.status(400).send(result.error);
    }
    res.send(req.body);
});

```


### Express Middleware.
Is a function that resides in a request and response pipelines.

```
app.use(function (req, res, next) {
    next();
});
```

OR

```
function log(req,res,next){
    
}

module.exports=log;
const log=require('.log');
app.use(log);
```


##### Build In Middleware.
`app.use(express.urlencoded())` This parse the incoming request with url encoded payload.

`app.use(express.static('public'));` To handle all our static assets. Here our images,css and so are put on the `public` folder.  
So that we can access it from the url `localhost:3000/file.name` from the root of the url no public.

##### Third Party Middleware.
`expressjs.com/en/resources/middleware.html`

```
const morgan=require('morgan');
app.use(morgan('tiny'));

//with morgan everytime we sent a request to the server it will be logged in the termal you can also configure morgain to log in certain file.
```


### Mongo DB
A document or No SQL Database We don't have the concept of tables, schemas, views, records, columns here.
Unlike relational databases where you have to design your databases ahead of time in mongo db there is no such thing
called schema or design you simply store a json object in mongo db.

#### Installation On Mac.
```
brew install mongodb
```
Once the mongodb has been installed create `/data/db` as mongo db stores the data in this path.
```
sudo mkdir -p /data/db
```
Now you have to give the right permission to this data directory.
```
sudo chown -R `id -un` /data/db
```
Now run the mongo damon `service that runs on the background and listens on a connection on a given port`
```
mongod
```
Also download the mongodb client `(mongodb compass)`.

#### Connect with Mongo DB
```
npm i mongoose

```

Now connect with the mongoose library.
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playground'); //playground is the name of the database. 

```
This connection is for the mongodb that is installed in our local machine. when you want to connect 
to mongodb in production environment a different connection string in the production environment. It's better to
use this configuration string from a config file.


If you haven't created the playground database it does not matter because the first time you write
into this database mongodb will automatically create it.

Then `connect` method return a promise therefore we can.
```
mongoose.connect('mongodb://localhost', {useNewUrlParser: true}).then(() => {
    console.log('connected to mongodb');
}).catch(err => {
    console.log('Could not connect to mongo db', err);
});
```

##### Schema
We use schema to define the shape of document or collection in mongodb. A collection in 
mongodb is like a table in relational database. A document in mongodb is kind of similay to row in RDBMS.


Schema is a part of mongoose not mongodb.  
**Course Schema**
```
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now()
    },
    isPublished: Boolean
});
```

##### Models.
We need to compile the schema into a mongodb model.
```
const Course = mongoose.model('Course', courseSchema); //returns a class
const courseObj = new Course({
    name: 'Node js Course',
    author: 'Selvesan',
    tags: ['node', 'backend'],
    isPublished: true
});
```

##### Saving to Database
```
courseObj.save();
```
This is a asynchronous task as it takes some time to save the data to the database.
Therefore using `await` and when using the `await` keyword you can only do so inside a async function. Therefore now
the code looks like this.
```
const Course = mongoose.model('Course', courseSchema);
  
async function createCourse(){
    const courseObj = new Course({
        name: 'Node js Course',
        author: 'Selvesan',
        tags: ['node', 'backend'],
        isPublished: true
    });
    const result=await courseObj.save();
}

```
refactoring the model and the save function into the `async function`.


##### Retrieving Data.
```

async function getCourse() {
    const courses = await Course.find();
    console.log(courses);
}
getCourse();

```

**Filtering Data**
```
const courses = await Course.find({author: 'Selvesan', isPublished: true});
console.log(courses);
```
Here the find method can take one or more key value pair for the filter.

**More complex select**
```
    const courses = await Course.find({
        author: 'Selvesan',
        isPublished: true
    }).limit(10).sort({name: 1}).select({name: 1, tags: 1}); // sort by name in asc -1 for desc
    console.log(courses);
```

**Comparison Operators in Query**  
Comparison operators for mongodb.
`eq(equal)`, `ne(not equal)`,`gt(greater than)`,
`gte(greater or equal)`,`lt(less than)`,`lte(less than or equal)`,
`nin(not in)`

_`searching courses which have price greater than 10$.`_
```
await Course.find({price:{
        $gt:10 //here using the gt operator as a property with $sign.
    }})
```
_`greater than 10 and less than or equal to 20`_
```
await Course.find({price:{
        $gt:10, 
        $lte:20 
    }})
```

_`where price in 10,20 or 30`_
```
await Course.find({price:{
        $in:[10,20,30]
    }})
```

**Logical Operators in Query**  
Logical operators in mongodb. `OR` , `AND`
_`courses that have author selvesan or courses that are published`_
```
await Course.find().or([{author:'selvesan'},{isPublished:true}])
```
_`courses that have author selvesan and courses that are published`_
```
await Course.find().and([{author:'selvesan'},{isPublished:true}])
//or you can also use
await Course.find({author:'selvesan',isPublished:true})
```

**Regular Expression in Query**  
_`courses whose author name starts with sel`_
```
await Course.find().and({author:/^sel/i}) // i for case insensitive.
```

**Counting Data**
```
await Course.find({
        author: 'Selvesan',
        isPublished: true
    }).count()
```

**Pagination**  
Pagination is done by `limit` and `skip`.  

```
const pageNumber = 2;
const pageSize = 10;


await Course.find({
        author: 'Selvesan',
        isPublished: true
    }).skip((pageNumber-1) * pageSize) //formula to get the skip value for pagination.
    .limit(pageSize)
    .select()
```

