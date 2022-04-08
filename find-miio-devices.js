const miio = require('miio');

async function run() {
	miio.devices({cacheTime: 300}).on('available', (device) => {
		console.info(device);
	});
}

run();