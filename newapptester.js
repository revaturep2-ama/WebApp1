const exec = require('child_process').exec;
var shell = require('shelljs');


shell.echo('Sorry, this script requires git');

shell.exec('touch alex.txt');

var yourscript = exec('sh hi.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
});