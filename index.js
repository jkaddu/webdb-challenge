const server = require('./server.js');

const port = 5000;
server.listen(port, () => {
	console.log('\n*** WebAOI listening on 5k ***\n');
});
