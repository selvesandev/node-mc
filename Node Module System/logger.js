var url = 'http://mylogger.io/log';//imaginary url

function log(message) {
    //sent an HTTP request.
    console.log(message);
}


module.exports.log = log;
// module.exports.endPoint = url; //lets keep this private.