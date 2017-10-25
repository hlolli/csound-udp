const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const spawn = require('child_process').spawn;

var csound_proc = spawn('csound', ['-odac', '--port=6006', '--0dbfs=1']);

csound_proc.stdout.on('data', (data) => {
    console.log(`${data}`);
});

csound_proc.stderr.on('data', (data) => {
    console.log(`${data}`);
});

csound_proc.on('close', (code) => {
    console.log(`csound process exited with code ${code}`);
});

process.on('exit', function() {
    csound_proc.kill();
});


exports.compileOrc = function(orc) {
    client.send(orc, 6006, 'localhost', (err) => {
	if (err) {
	    console.log(`err: ${err}`)
	}
    });
}

exports.inputMessage = function(message) {
    client.send(Buffer.from('$' + message), 6006, 'localhost', (err) => {
	if (err) {
	    console.log(`err: ${err}`);
	}
    });
}


var cleanExit = function() {csound_proc.kill();process.exit(0);};

process.on('SIGINT', cleanExit); // catch ctrl-c

process.on('SIGTERM', cleanExit); // catch kill
