const axios = require("axios");
const spin = require("spinnies");
const fs = require("fs-extra");
const chalk = require("chalk");
const { sizeFormatter } = require("human-readable");

/*
* @Media To Buffer
* @param {url} String
*/
const getBuffer = async (url) => {
	try {
		const res = await axios({
			method: "get",
			url,
			headers: {
				"DNT": 1,
				"Upgrade-Insecure-Request": 1,
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36"
			},
			responseType: "arraybuffer"
		});
		return res.data;
	} catch (e) {
		console.log(`Error : ${e}`);
	}
};

/*
* @Response Json
* @param {url} String
*/

const getJson = (url) => new Promise(async (resolve, reject) => {
	await axios.get(url)
		.then(({ data }) => {
			resolve(data);
		})
		.catch((err) => {
			reject(err);
		});
});

/*
* @Get Admins Group
* @param {participants} Array
*/

const getGroupAdmins = (participants) => {
	let admins = [];
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : "";
	}
	return admins;
};

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`;
};
/*
* @Parse 
* @param {number} Integer
*/
const h2k = (number) => {
	var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"];
	var tier = Math.log10(Math.abs(number)) / 3 | 0;
	if (tier == 0) return number;
	var postfix = SI_POSTFIXES[tier];
	var scale = Math.pow(10, tier * 3);
	var scaled = number / scale;
	var formatted = scaled.toFixed(1) + "";
	if (/\.0$/.test(formatted))
		formatted = formatted.substr(0, formatted.length - 2);
	return formatted + postfix;
};
const spinner = {
	"interval": 120,
	"frames": [
		"🕐",
		"🕑",
		"🕒",
		"🕓",
		"🕔",
		"🕕",
		"🕖",
		"🕗",
		"🕘",
		"🕙",
		"🕚",
		"🕛"
	]
};

let globalSpinner;

/*
* @Spin Console
* @param {disableSpins} Boolean
*/

const getGlobalSpinner = (disableSpins = false) => {
	if (!globalSpinner) globalSpinner = new spin({ color: "yellow", succeedColor: "aqua", spinner, disableSpins });
	return globalSpinner;
};

const spins = getGlobalSpinner(false);

const start = (id, text) => {
	spins.add(id, { text: text });
};
const info = (id, text) => {
	spins.update(id, { text: text });
};
const success = (id, text) => {
	spins.succeed(id, { text: text });
};
const close = (id, text) => {
	spins.fail(id, { text: text });
};

const tanggal = () => {
	myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
	myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum at", "Sabtu"];
	var tgl = new Date();
	var day = tgl.getDate();
	bulan = tgl.getMonth();
	var thisDay = tgl.getDay();
	ThisDay = myDays[thisDay];
	var yy = tgl.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	return `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
};

const sizeFormat = sizeFormatter({
	std: "JEDEC",
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`,
});

const color = (text, color) => {
	return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text);
};

const kyun = (seconds) => {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " Days, ") : "";
	var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " Hours, ") : "";
	var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " Minutes, ") : "";
	var sDisplay = s > 0 ? s + (s == 1 ? " second" : " Seconds") : "";
	return dDisplay + hDisplay + mDisplay + sDisplay;
};

const formatDate = (n, locale = "id") => {
	let d = new Date(n);
	return d.toLocaleDateString(locale, {
		weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"
	});
};

const sleep = (ms) => { 
	return new Promise((resolve) => setTimeout(resolve, ms))
};

module.exports = {
	getGroupAdmins,
	getBuffer,
	getJson,
	h2k,
	start,
	info,
	success,
	close,
	getRandom,
	tanggal,
	sizeFormat,
	color,
	bgcolor,
	kyun,
	formatDate,
	sleep
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update functions.js`);
	delete require.cache[file];
	require(file);
});