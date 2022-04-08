import { Devices } from '../device';
import MiCloud from '../lib/micloud';

async function run() {

	const api = new MiCloud({debug: false});

	await api.login(process.env.XIAOMI_ACCOUNT!, process.env.XIAOMI_PASSWORD!);

	console.info('logged in');

	const devices = await api.getDevices([]);

	const lamp = devices.find((device) => {
		return device.model == 'xiaomi.aircondition.mh6';
	})

	if (!lamp) {
		return
	}

	const light = new Devices.Light({
		name: lamp.name, did: lamp.did, ip: lamp.localip, token: lamp.token, model: lamp.model
	}, api);

	await light.inited;

	const properties = light.getPropertiesByAccess('read');

	// console.info('call api');
	// console.info(properties);

	const res = await light.getProperties(properties);

	console.info(res);

	light.onDispose();

	// console.info(light.instanceDefinition);
	// console.info(light.instanceFeatureDefinition);
	// console.info(light.getPropertiesByAccess('read'));
	// await light.setProperties([
	// 	{
	// 		siid: 2,
	// 		piid: 1,
	// 		value: false
	// 	}
	// ])

	// const airpurifier = new AirPurifier({
	// 	name: '净化器', did: '47284947', ip: '192.168.31.8', token: '618ab8d42ea1f604b3c20ae069863df2', model: 'zhimi.airpurifier.m1'
	// }, api);

	// await airpurifier.inited;

	// console.info(airpurifier.instanceDefinition);
	// console.info(airpurifier.instanceFeatureDefinition);
	// console.info(airpurifier.getPropertiesByAccess('read'));

	// await airpurifier.setProperty({
	// 	siid: 2,
	// 	piid: 1,
	// 	value: true
	// });
}

run();　
