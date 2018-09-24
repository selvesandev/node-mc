const EventEmitter = require('events');//we get the event emitter class.
const emitter = new EventEmitter();


emitter.on('messageLogged', function (argument) {
    //on can be replace by addListener
    console.log('listener called', argument);
});

//
emitter.emit('messageLogged', {name: 'Ram', id: 2});


class logger extends EventEmitter {
    log() {
        this.emit('messageLogged', {name: 'ram', id: 2});
    }
    //always use the emitter like this
}