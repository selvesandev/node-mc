const http = require('http');

var server = http.createServer(function (req, res) {
    if (req.url === '/') {
        res.write('Hello world');
        res.end();
    }
});// the server variable is a event emitter inherited from EventEmitter it has on, emit etc methods


// server.on('connection', function () {
//     console.log('request received');
// });//the server emits the connection emitter
//
server.listen(3000);
console.log('listening on port 3000');
