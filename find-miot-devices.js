const mihome = require('node-mihome');


const AVAILABLE_REGIONS = [/*"ru", "us", "tw", "sg", */"cn"/*, "de"*/];

const list_devices = module.exports = async function (username, password) {
	if (!mihome.miCloudProtocol.isLoggedIn) {
		await mihome.miCloudProtocol.login(username, password);
	}

	const device_group = new Map();
	for (const country of AVAILABLE_REGIONS) {
		const devices = await mihome.miCloudProtocol.getDevices([], {country});
		if (devices && devices.length > 0) {
			device_group.set(country, devices);
		}
	}

	return device_group;
}

async function run() {
	let devices = await list_devices(process.env.XIAOMI_USERNAME, process.env.XIAOMI_PASSWORD);
	devices.forEach(
		(device) => {
			console.info(device);
		}
	)
}


run();
