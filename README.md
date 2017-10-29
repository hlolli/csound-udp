# Useage
```js
const csound_udp = require('csound_udp');

//This starts a csound instance on port 6006 (optional)
csound_udp.spawnCsound(6006);

//use compileOrc to evaluate orchestra code
//port number is mandatory
csound_udp.compileOrc(`
    instr 2
     aout2 vco2 0.2, p4
     outs aout2/16, aout2/16
    endin
`, 6006);


//send score event with inputMessage as string
//port number is mandatory
csound_udp.inputMessage(`i2 0 1 440`, 6006);
```

# Requirements
* Csound 6.10 or later
* Only works with nodejs
