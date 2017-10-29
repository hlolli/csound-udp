const csound_udp = require('./index.js');

csound_udp.spawnCsound(6006);

setTimeout(function(){
    csound_udp.compileOrc(`
instr 2
  aout2 vco2 0.2, p4
  outs aout2/16, aout2/16
endin
`, 6006);
}, 1000);


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

setTimeout(function(){
    setInterval(function() {
	var rnd = getRandomArbitrary(80, 400);
	csound_udp.inputMessage(`i2 0 0.05 ${rnd}`, 6006);
    }, 100);
}, 1100);

