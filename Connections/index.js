'use strict';

require("./../config");
const {
	WAConnection: _WAConnection,
	waChatKey
} = require("@adiwajshing/baileys");
const chalk = require("chalk");
const fs = require("fs");
const { start, success } = require("./../functions");
const simple_connection = require("./../SimpleConnections");
const WAConnection = simple_connection.WAConnection(_WAConnection);

async function Starting() {
	const xcoders = new WAConnection();
	xcoders.browserDescription = [global.browserDescription.set_name, global.browserDescription.set_browser, '3.0'];
	xcoders.chatOrderingKey = waChatKey(true);
	xcoders.connectOptions.maxRetries = Infinity;
	xcoders.logger.level = 'fatal';
	xcoders.on("qr", () => {
		console.log(chalk.gray.bgBlack.bold.italic("[ XCODERS ] SCAN THIS QR CODE..."));
	});

	fs.existsSync("./Xcoders.json") && xcoders.loadAuthInfo("./Xcoders.json");
	xcoders.on("connecting", () => {
	  start("2", "Connecting...");
	});

	xcoders.on("open", () => {
		success("2", "Connected");
	});

	await xcoders.connect({ timeoutMs: 30 * 1000 });
	fs.writeFileSync("./Xcoders.json", JSON.stringify(xcoders.base64EncodedAuthInfo(), null, "\t"));

	let getbattery = [];
	xcoders.on(`CB:action,,battery`, json => {
		getbattery = [];
		getbattery.push(json[2][0][1]);
		console.log(JSON.stringify(json, null, 2));
	});


	xcoders.on("chat-update", async (love) => {
		require("./../WAMessage")(xcoders, love, getbattery);
	});

	xcoders.on("close", async ({ reason, isReconnecting }) => (
		console.log(chalk.gray.bold("Disconnected "+ chalk.yellow.underline(isReconnecting) +" Because "+ chalk.yellow.underline(reason)))
	));

}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update connect.js`);
	delete require.cache[file];
	require(file);
});

Starting().catch(e => console.log(e));
