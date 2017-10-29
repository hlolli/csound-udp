const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const spawn = require('child_process').spawn;

var csound_proc;

exports.spawnCsound = function(port) {

    if (!csound_proc) {
	csound_proc = spawn('csound', ['-odac', `--port=${port}`, '--0dbfs=1']);

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
	
    } else {
	console.log('Csound Process is already running, kill it first before spawning a new one.')
    }
}

exports.killCsound = function() {
    if (csound_proc) {
	csound_proc.kill();    
	csound_proc = null;
    } else {
	console.log('No Csound process to kill!');
    }
}


exports.compileOrc = function(orc, port) {
    client.send(Buffer.from(orc), port, 'localhost', (err) => {
	if (err) {
	    console.log(`err: ${err}`)
	}
    });
}

exports.inputMessage = function(message, port) {
    client.send(Buffer.from('$' + message), port, 'localhost', (err) => {
	if (err) {
	    console.log(`err: ${err}`);
	}
    });
}


var cleanExit = function() {
    if (csound_proc) {
	csound_proc.kill();
    }
    process.exit(0);
};

process.on('SIGINT', cleanExit); // catch ctrl-c

process.on('SIGTERM', cleanExit); // catch kill
