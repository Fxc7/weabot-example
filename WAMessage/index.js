require("./../config");
const {
	MessageType,
	Mimetype,
	WA_DEFAULT_EPHEMERAL,
	GroupSettingChange,
	ChatModification,
	delay
} = require("@adiwajshing/baileys");

const fs = require("fs");
const axios = require("axios");
const util = require("util");
const moment = require("moment-timezone");
const { exec } = require("child_process");
const os = require("os");
const speed = require("performance-now");
const { performance } = require("perf_hooks");

const {
	createSticker,
	getGroupAdmins,
	getBuffer,
	getJson,
	h2k,
	tanggal,
	sizeFormat,
	color,
	kyun,
	formatDate
} = require("./../functions");
const uploader = require("./../library/uploader");
const Xcoders = require("./../SimpleConnections");

//menu
const { Features, botstat } = require("./../helpers");
const { fromBuffer } = require("file-type");

let ownerNumber = global.ownerNumber;
let packname = global.packname;
let author = global.author;
let banChats = global.banChats;
let multiprefix = global.multiprefix;
let nonprefix = global.nonprefix;
let prefa = global.prefix;
let offline = global.offline;
let watermark = global.watermark;
let apikey = global.apikeys;
let restApi = global.restAPIs;
let Waiting = global.response.wait;
let Bug = global.response.error.bug;
let invalidUrl = global.response.error.url;
let Sukses = global.response.sukses;

module.exports = index = async (xcoders, love, getbattery) => {
	try {
		if (!love.hasNewMessage) return;
		love = love.messages.all()[0];
		if (!love.message) return;
		if (love.key && love.key.remoteJid == 'status@broadcast') return;
		love.message = (Object.keys(love.message)[0] === 'ephemeralMessage') ? love.message.ephemeralMessage.message : love.message;
		const type = Object.keys(love.message)[0];
		let m = Xcoders.smsg(xcoders, love);
		global.blocked;
		const cmd = (type === 'conversation' && love.message.conversation) ? love.message.conversation : (type == 'imageMessage') && love.message.imageMessage.caption ? love.message.imageMessage.caption : (type == 'videoMessage') && love.message.videoMessage.caption ? love.message.videoMessage.caption : (type == 'extendedTextMessage') && love.message.extendedTextMessage.text ? love.message.extendedTextMessage.text : ''.slice(1).trim().split(/ +/).shift().toLowerCase();
		if (multiprefix) {
			prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_!#$%^&./\\©^]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_!#$,|`÷?;:%abcdefghijklmnopqrstuvwxyz%^&./\\©^]/gi) : '.';
		} else {
			if (nonprefix) {
				prefix = '';
			} else {
				prefix = prefa;
			}
		}
		const content = JSON.stringify(love.message);
		const from = love.key.remoteJid;
		const responseButtons = (type == 'buttonsResponseMessage') ? love.message.buttonsResponseMessage.selectedDisplayText : '';
		const buttonsResponse = (type == 'buttonsResponseMessage') ? love.message.buttonsResponseMessage.selectedButtonId : '';
		const date = new Date().toLocaleDateString();
		const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");
		const Jam = moment.tz("Asia/Jakarta").format("HH:mm");
		const body = (type === 'conversation' && love.message.conversation.startsWith(prefix)) ? love.message.conversation : (type == 'imageMessage') && love.message.imageMessage.caption.startsWith(prefix) ? love.message.imageMessage.caption : (type == 'videoMessage') && love.message.videoMessage.caption.startsWith(prefix) ? love.message.videoMessage.caption : (type == 'extendedTextMessage') && love.message.extendedTextMessage.text.startsWith(prefix) ? love.message.extendedTextMessage.text : buttonsResponse;
		const budy = (type === 'conversation') ? love.message.conversation : (type === 'extendedTextMessage') ? love.message.extendedTextMessage.text : '';
		var command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase();
		const args = body.trim().split(/ +/).slice(1);
		const isCmd = body.startsWith(prefix);
		const Json = (string) => {
			return util.format(JSON.stringify(string, null, 2));
		};

		const meNumber = xcoders.user.jid;
		const isGroup = from.endsWith('@g.us');
		const sender = love.key.fromMe ? meNumber : isGroup ? love.participant : love.key.remoteJid;
		const isMe = meNumber == sender || ownerNumber.includes(sender);
		const groupMetadata = isGroup ? await xcoders.groupMetadata(from) : "";
		const groupName = isGroup ? groupMetadata.subject : "";
		const groupMembers = isGroup ? groupMetadata.participants : "";
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
		const isGroupAdmins = groupAdmins.includes(sender) || false;
		const contactName = love.key.fromMe ? xcoders.user.jid : xcoders.contacts[sender] || { notify: jid.replace(/@.+/, "") };
		const pushname2 = love.key.fromMe ? xcoders.user.name : contactName.notify || contactName.vname || contactName.name || "Nothing";
		const query = body.trim().substring(body.indexOf(' ') + 1);
		const totalchat = await xcoders.chats.all();
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'));
		};

		let Ucapan = "";
		let hours = moment.tz("Asia/Jakarta").format("HH");
		if (hours >= 19 || hours <= 2) {
			Ucapan += "Good Night 🌚";
		} else if (hours >= 3 && hours <= 10) {
			Ucapan += "Good Morning 🌝";
		} else if (hours >= 11 && hours <= 12) {
			Ucapan += "Good Afternoon 🌛";
		} else if (hours >= 13 && hours <= 18) {
			Ucapan += "Good Evening 🌗";
		}
		const monospace = (string) => {
			return '```' + string + '```';
		};
		const fakeQuoted = {
			key: { fromMe: false, remoteJid: "6285326865280-1506166984@g.us", participant: "0@s.whatsapp.net" }, message: { orderMessage: { itemCount: 69, status: 200, thumbnail: global.thumbnails, surface: 200, message: watermark, orderTitle: "Farhannnnn", sellerJid: "0@s.whatsapp.net" } }
		};
		const reply = async (teks) => {
			await xcoders.sendMessage(from, monospace(teks), "conversation", { quoted: love, contextInfo: { "forwardingScore": 999, "isForwarded": true }, sendEphemeral: true });
		};
		const sendVideo = async (jid, buffer, caption = Sukses) => {
			await xcoders.sendMessage(jid, buffer, "videoMessage", { quoted: love, caption: monospace(caption), mimetype: Mimetype.mp4, contextInfo: { "forwardingScore": 999, "isForwarded": true }, sendEphemeral: true });
		};
		const sendImage = async (jid, buffer, caption = Sukses) => {
			await xcoders.sendMessage(jid, buffer, "imageMessage", { quoted: love, caption: monospace(caption), mimetype: Mimetype.png, contextInfo: { "forwardingScore": 999, "isForwarded": true }, sendEphemeral: true });
		};
		const sendSticker = async (jid, buffer) => {
			await xcoders.sendMessage(jid, buffer, "stickerMessage", { quoted: love, mimetype: Mimetype.webp })
		}
		const sendAudio = async (jid, buffer, namefile) => {
			await xcoders.sendMessage(jid, buffer, "documentMessage", { filename: namefile, mimetype: Mimetype.mp4Audio, quoted: fakeQuoted, contextInfo: { "forwardingScore": 999, "isForwarded": true }, sendEphemeral: true });
		};

		const mentions = (teks, memberr, id) => {
			(id == null || id == undefined || id == false) ? xcoders.sendMessage(from, teks.trim(), "extendedTextMessage", { contextInfo: { "mentionedJid": memberr } }) : xcoders.sendMessage(from, teks.trim(), "extendedTextMessage", { quoted: love, contextInfo: { "mentionedJid": memberr } });
		};
		const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");

		if (!love.key.fromMe && banChats === true) return;
		if ((Object.keys(love.message)[0] === 'ephemeralMessage' && JSON.stringify(love.message).includes('EPHEMERAL_SETTING')) && love.message.ephemeralMessage.message.protocolMessage.type === 3) {
			bugsol = love.participants[0];
			tekuss = `\`\`\`Bug Terdeteksi\`\`\`
				\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n
				\`\`\`@${bugsol.split('@')[0]} Mengirim Bug Digrup ${groupName}\`\`\``;
			xcoders.sendMessage(love.key.remoteJid, 'WAH BUG NIH', "conversation");
			xcoders.sendMessage(love.key.remoteJid, tekuss, "conversation", { contexInfo: { mentionedJid: [bugsol] } });
		}
		if (isGroup) {
			if (isCmd) console.log(color('=> [ EXEC ]', 'yellow'), color(moment(love.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), command, color('from', 'yellow'), pushname2, color('in'), groupName);
			if (!isCmd) console.log(color('=> [ MESSAGE ]', 'red'), color(moment(love.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), color('from', 'yellow'), pushname2, color('in'), groupName);
		}
		if (!isGroup) {
			if (isCmd) console.log(color('=> [ EXEC ]', 'red'), color(moment(love.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), command, color('from', 'yellow'), pushname2);
			if (!isCmd) console.log(color('=> [ MESSAGE ]', 'red'), color(moment(love.messageTimestamp.low * 1000).format('DD/MM/YY HH:mm:ss'), 'green'), color('from', 'yellow'), pushname2);
		}
		//fitur
		switch (command) {
			case 'help':
			case 'menu':
				const fitur = Features(prefix);
				const allFitur = fitur.length / 24;
				const FiturCount = allFitur.toString().split(".")[0];
				xcoders.sendMessage(from,
					{
						"contentText": fitur,
						"footerText": `• *Features Count:* ${FiturCount} Fitur\n\n${Ucapan} & Happy Nice Days 💫`,
						"buttons": [
							{
								"buttonId": `${prefix}runtime`,
								"buttonText": {
									"displayText": "⏳ RUNTIME"
								}, "type": "RESPONSE"
							},
							{
								"buttonId": `${prefix}stat`,
								"buttonText": {
									"displayText": "💻 STATUS"
								}, "type": "RESPONSE"
							},
							{
								"buttonId": `${prefix}information`,
								"buttonText": {
									"displayText": "🔰 INFORMATION"
								}, "type": "RESPONSE"
							}
						], "headerType": 6,
						"locationMessage": {
							"degreesLatitude": 0,
							"degreesLongitude": 0,
							"jpegThumbnail": await fs.readFileSync('./image/menu.png')
						},
					}, MessageType.buttonsMessage, { quoted: love, contextInfo: { mentionedJid: [sender] } });
				break;
			case 'information':
				string = `\n💫 Owner: @${ownerNumber[0].split("@")[0]}\n♨️ Rest APIs: ${restApi}\n🔰 Script: https://github.com/Fxc7/weabot-example/\n⏲️ Jam: ${Jam}\n📆 Tanggal: ${tanggal()}\n\n\nBot Ini Dibuat Untuk Example Rest Api\nMaaf Jika Masih Ada Bug\nUntuk apikey silahkan register/beli\n`
				xcoders.sendMessage(from, string, "conversation", { quoted: love, contextInfo: { mentionedJid: [ownerNumber[0]] } })
				break;
			case 'stat':
				let ii = [];
				let giidd = [];
				const used = process.memoryUsage();
				const cpus = os.cpus().map(cpu => {
					cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
					return cpu;
				});
				const cpu = cpus.reduce((last, cpu, _, { length }) => {
					last.total += cpu.total
					last.speed += cpu.speed / length
					last.times.user += cpu.times.user
					last.times.nice += cpu.times.nice
					last.times.sys += cpu.times.sys
					last.times.idle += cpu.times.idle
					last.times.irq += cpu.times.irq
					return last;
				}, {
					speed: 0,
					total: 0,
					times: {
						user: 0,
						nice: 0,
						sys: 0,
						idle: 0,
						irq: 0
					}
				});
				let timestamp = speed();
				let latensi = speed() - timestamp;
				const newSpeed = performance.now();
				const oldSpeed = performance.now();
				for (mem of totalchat) { ii.push(mem.jid) }
				for (id of ii) { if (id && id.includes('g.us')) { giidd.push(id) } }
				var { device_manufacturer, device_model, mcc, mnc, os_version, os_build_number, wa_version } = xcoders.user.phone;
				totalChat = `${totalchat.length}`;
				groupChat = `${giidd.length}`;
				personalChat = `${totalchat.length - giidd.length}`;
				xcoders.sendMessage(from, monospace(botstat(latensi, oldSpeed, newSpeed, kyun, sizeFormat, used, cpus, cpu, os, xcoders, totalChat, groupChat, personalChat, device_manufacturer, device_model, mcc, mnc, os_version, os_build_number, wa_version)), "conversation", { quoted: fakeQuoted })
				break;
			case 'cekbattery':
				Batre = `${getbattery[0].value !== undefined ? getbattery[0].value : "Not Identification ✖️"}`;
				statusBatre = `${getbattery[0].live == 'true' ? "Charging ⚡" : "Not Charging ✖️"}`;
				reply(`${Batre}% ${statusBatre}`);
				break;

			//downloader fitur
			case 'ytshort':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://youtube.com/shorts/g3DMeUAXqLA?feature=share`);
				if (!query.match(/youtube.com\/short/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/ytshort?url=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				ytshort = `\n\t\t\t\t[ YOUTUBE SHORT ]\n\n⊳ Title: ${res.result.title}\n⊳ Channel: ${res.result.channel}\n⊳ Channel URL: ${res.result.channel_url}\n⊳ Published: ${res.result.uploaded_at}\n⊳ Category: ${res.result.category}\n⊳ Quality: ${res.result.quality}\n⊳ Viewers: ${res.result.views}\n⊳ Size: ${res.result.size}\n\n${res.result.description}\n`;
				thumbnail = await getBuffer(res.result.thumbnail);
				buffer = await getBuffer(res.result.url);
				sendImage(from, thumbnail, ytshort);
				reply(Waiting);
				sendVideo(from, buffer, Sukses);
				break;
			case 'ytmp3':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://youtu.be/Nq5rzeJ5Ab4`);
				if (!query.match(/youtu/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/ytmp3?url=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				ytmp3 = `\n\t\t\t\t[ YOUTUBE MP3 ]\n\n⊳ Title: ${res.result.title}\n⊳ Channel: ${res.result.channel}\n⊳ Channel URL: ${res.result.channel_url}\n⊳ Publish: ${res.result.uploaded_at}\n⊳ Category: ${res.result.category}\n⊳ Quality: ${res.result.quality}\n⊳ Views: ${res.result.views}\n⊳ Size: ${res.result.size}\n`;
				buff = await getBuffer(res.result.thumbnail);
				buffer = await getBuffer(res.result.url);
				sendImage(from, buff, ytmp3);
				reply(Waiting);
				sendAudio(from, buffer, res.result.title);
				break;
			case 'ytmp4':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://youtu.be/Nq5rzeJ5Ab4`);
				if (!query.match(/youtu/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/ytmp4?url=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				ytmp4 = `\n\t\t\t\t[ YOUTUBE MP4 ]\n\n⊳ Title: ${res.result.title}\n⊳ Channel: ${res.result.channel}\n⊳ Channel URL: ${res.result.channel_url}\n⊳ Publish: ${res.result.uploaded_at}\n⊳ Category: ${res.result.category}\n⊳ Quality: ${res.result.quality}\n⊳ Views: ${res.result.views}\n⊳ Size: ${res.result.size}\n⊳ Publish: ${res.result.uploaded_at}\n`;
				thumbnail = await getBuffer(res.result.thumbnail);
				buffer = await getBuffer(res.result.url);
				sendImage(from, thumbnail, ytmp4);
				reply(Waiting);
				sendVideo(from, buffer, Sukses);
				break;
			case 'joox':
				if (args.length < 1) return reply(`Example: ${prefix + command} momolog pamumgkas`);
				res = await getJson(`https://api-xcoders.xyz/api/download/joox?query=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				joox = `\n\t\t\t\t[ JOOX DOWNLOADER ]\n\n⊳ Title: ${res.result.judul}\n⊳ Artist: ${res.result.artist}\n⊳ Album: ${res.result.album}\n⊳ Size: ${res.result.size}\n⊳ Duration: ${res.result.duration}\n`;
				thumbnail = await getBuffer(res.result.thumbnail);
				buffer = await getBuffer(res.result.link);
				sendImage(from, thumbnail, joox);
				reply(Waiting);
				sendAudio(from, buffer, res.result.judul);
				break;
			case 'fbdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.facebook.com/alanwalkermusic/videos/277641643524720`);
				if (!query.match(/facebook/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/fb?url=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				const fbdlUrl = await axios.get(`https://tinyurl.com/api-create.php?url=${res.result.data.url}`);
				if (res.result.data.size > 50000000) {
					fbdl = `\n\t\t\t\t[ FACEBOOK DOWNLOADER ]\n\n⊳ Size: ${res.result.data.formattedSize}\n⊳ Quality: ${res.result.data.quality}\n\n\nOps Your Request Soo Large Please Klick Url Below To Download Video\n\n⊳ Url: ${fbdlUrl.data}`;
					buff = await getBuffer(res.result.thumbnail);
					sendImage(from, buff, fbdl);
				} else {
					fbdl = `\n\t\t\t\t[ FACEBOOK DOWNLOADER ]\n\n⊳ Size: ${res.result.data.formattedSize}\n⊳ Quality: ${res.result.data.quality}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buffer = await getBuffer(fbdlUrl.data);
					sendImage(from, thumbnail, fbdl);
					reply(Waiting);
					sendVideo(from, buffer, Sukses);
				}
				break
			case 'igdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.instagram.com/p/CNtpwxuH5NK/?igshid=g26k5coikzwr`)
				if (!query.match(/instagram\.com\/(?:p|reel)/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/ig?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result == undefined || res.status == false) return reply(Bug);
					if (res.result.media_count == 1) {
						if (res.result.type == "image") {
							caption = `\n\t\t\t\t\t[ INSTAGRAM DOWNLOADER ]\n\n⊳ Username: ${res.result.username}\n⊳ Fullname: ${res.result.name}\n⊳ Like: ${res.result.likes}\n⊳ Caption: ${res.result.caption}\n`;
							reply(Waiting)
							sendImage(from, await getBuffer(res.result.url), caption);
						} else if (res.result.type == "video") {
							caption = `\n\t\t\t\t\t[ INSTAGRAM DOWNLOADER ]\n\n⊳ Username: ${res.result.username}\n⊳ Fullname: ${res.result.name}\n⊳ Duration: ${res.result.duration}\n⊳ ViewsCount: ${res.result.viewCount}\n⊳ Like: ${res.result.likes}\n⊳ Caption: ${res.result.caption}\n`;
							reply(Waiting);
							sendVideo(from, await getBuffer(res.result.url), caption);
						} else {
							reply(Bug);
						}
					} else if (res.result.media_count !== 1) {
						caption = `\n\t\t\t\t\t[ INSTAGRAM DOWNLOADER ]\n\n⊳ Username: ${res.result.username}\n⊳ Fullname: ${res.result.name}\n⊳ Like: ${res.result.likes}\n⊳ Caption: ${res.result.caption}\n`;
						reply(Waiting);
						for (let grapSidecar of res.result.link) {
							if (grapSidecar.type == "image") {
								buff = await getBuffer(grapSidecar.url);
								sendImage(from, buff, caption);
							} else {
								buff = await getBuffer(grapSidecar.url);
								sendVideo(from, buff, caption);
							}
						}
					} else {
						reply(Bug);
					}
				}).catch(() => reply(Bug));
				break;
			case 'igtv':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.instagram.com/tv/CSW1PMohXDm/?utm_medium=copy_link`)
				if (!query.match(/instagram\.com\/tv/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/igtv?url=${query}&apikey=${apikey}`)
				if (res.result == undefined || res.status == false) return reply(Bug);
				const igtvUrl = await axios.get(`https://tinyurl.com/api-create.php?url=${res.result.data.url}`);
				if (res.result.data.size > 50000000) {
					igtv = `\n\t\t[ INSTAGRAM TV DOWNLOADER ]\n\n⊳ Title: ${res.result.title}\n⊳ Size: ${res.result.data.formattedSize}\n⊳ Quality: ${res.result.data.quality}\n\n\nOps Your Request Soo Large Please Klick Url Below To Download Video\n\n⊳ Url: ${igtvUrl.data}`;
					buff = await getBuffer(res.result.thumbnail);
					sendImage(from, buff, igtv);
				} else {
					igtv = `\n\t\t[ INSTAGRAM TV DOWNLOADER ]\n\n⊳ Title: ${res.result.title}\n⊳ Size: ${res.result.data.formattedSize}\n⊳ Quality: ${res.result.data.quality}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buffer = await getBuffer(igtvUrl.data);
					sendImage(from, thumbnail, igtv);
					reply(Waiting);
					sendVideo(from, buffer, Sukses);
				}
				break;
			case 'tiktok': case 'ttdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://vt.tiktok.com/ZSJhvu1AE`);
				if (!query.match(/tiktok/gi)) return reply(invalidUrl);
				res = await getJson(`https://api-xcoders.xyz/api/download/tiktok4?url=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				tiktok = `\n\t\t\t[ TIKTOK DOWNLOADER ]\n\n⊳ Username: ${res.result.username}\n⊳ Nickname: ${res.result.nickname}\n⊳ Viewers: ${res.result.views}\n⊳ Description: ${res.result.description}\n`
				thumbnail = await getBuffer(res.result.thumbnail);
				buff = await getBuffer(res.result.no_wm);
				sendImage(from, thumbnail, tiktok);
				reply(Waiting);
				sendVideo(from, buff, Sukses);
				break;
			case 'soundcloud': case 'scdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://m.soundcloud.com/licooys/pamungkas-monolog`);
				if (!query.match(/soundcloud/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/soundcloud?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result == undefined || res.status == false) return reply(Bug);
					soundCloud = `\n\t\t\t[ SOUND CLOUD DOWNLOADER ]\n\n⊳ Title: ${res.result.title}\n⊳ Duration: ${res.result.duration}\n⊳ Quality: ${res.result.data.quality}\n⊳ Size: ${res.result.data.formattedSize}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buff = await getBuffer(res.result.data.url);
					sendImage(from, thumbnail, soundCloud);
					reply(Waiting);
					sendAudio(from, buff, res.result.title);
				}).catch(() => reply(Bug));
				break;
			case 'ifunny':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://ifunny.co/video/cf-tiktok-hi-lemoine-Ye4Uu0729?s=cl`);
				if (!query.match(/ifunny/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/ifunny?url=${query}&apikey=${apikey}`).then(async res => {
					ifunny = `\n\t\t\t\t[ IFUNNY DOWNLOADER ] \n \n⊳ Title: ${res.result.title}\n⊳ Quality: ${res.result.data.quality}\n⊳ Size: ${res.result.data.formattedSize}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buff = await getBuffer(res.result.data.url);
					sendImage(from, thumbnail, ifunny);
					reply(Waiting);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			case 'imdb':
				if (args.length < 1) return reply(`Example ${prefix + command} https://m.imdb.com/video/vi3698310169?playlistId=tt6806448&ref_=tt_ov_vi`)
				if (!query.match(/imdb/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/imdb?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result.data.size > 50000000) {
						imdb = `\n\t\t\t\t[ IMDB DOWNLOADER ]\n\n⊳ Quality: ${res.result.data.quality}\n⊳ Size: ${res.result.data.formattedSize}\n\n\n Oops Your Request Is Too Large Please Click The Url Below To Download Video\n\n⊳ Url: ${imdbUrl.data}\n`
						thumbnail = await getBuffer(res.result.thumbnail);
						sendImage(from, thumbnail, imdb);
					} else {
						imdb = `\n\t\t\t\t[ IMDB DOWNLOADER ]\n\n⊳ Quality: ${res.result.data.quality}\n⊳ Size: ${res.result.data.formattedSize}\n`
						thumbnail = await getBuffer(res.result.thumbnail);
						buff = await getBuffer(res.result.data.url);
						sendImage(from, thumbnail, imdb);
						reply(Waiting);
						sendVideo(from, buff, Sukses);
					}
				}).catch(() => reply(Bug));
				break;
			case 'twitter':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://twitter.com/AligBocah/status/1416673824058134534?s=20`);
				if (!query.match(/twitter/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/twitter?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result == undefined || res.status == false) return reply(Bug);
					twitterdl = `\n\t\t\t\t[ TWITTER DOWNLOADER ]\n\n${res.result.desc}\n`
					thumbnail = await getBuffer(res.result.thumb);
					buff = await getBuffer(res.result.HD);
					sendImage(from, thumbnail, twitterdl);
					reply(Waiting);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			case 'cocofun':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.icocofun.com/share/post/qUc04yiC8WapxKtUXRy9dg==?lang=id&pkg=id&share_to=copy_link&m=23d0cac4747cc62954b3b1ed94697669&d=387544412ee2b99fddea8cb15c30fdd15b79f282b6c54a2aac6ca62db597c140&nt=1`);
				if (!query.match(/cocofun/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/cocofun?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result == undefined || res.status == false) return reply(Bug);
					cocofun = `\n\t\t\t\t[ COCOFUN DOWNLOADER ] \n\n⊳ Title: ${res.result.title}\n⊳ Desc: ${res.result.desc}\n⊳ Like: ${h2k(res.result.like)}\n⊳ Play Count: ${h2k(res.result.play_count)}\n⊳ Shared: ${h2k(res.result.shared)}\n⊳ Resolusi: ${res.result.resolution}\n⊳ Duration: ${res.result.duration}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buff = await getBuffer(res.result.url);
					sendImage(from, thumbnail, cocofun);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			case 'stickerline':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://store.line.me/stickershop/product/12489506/id`);
				if (!query.match(/sticker\.line\.me/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/linesticker?url=${query}&apikey=${apikey}`).then(async res => {
					if (res.result == undefined || res.status == false) return reply(Bug);
					stickerline = `\n\t\t\t[ STICKER LINE DOWNLOADER ]\n\nTitle: ${res.result.name}\nType: ${res.result.type}\nAuthor: ${res.result.author}\nPrice: ${res.result.price}\nCurrency: ${res.result.currency}\nProduct URL: ${res.result.product_url}\n\n\nGambar Dikirim Di Private Chat Biar Ga Terjadi Spam Di Group.`
					thumbnail = await getBuffer(res.result.thumbnail);
					reply(Waiting);
					sendImage(from, thumbnail, stickerline);
					for (let stickerURL of res.result.sticker) {
						buff = await getBuffer(stickerURL.static_url);
						await createSticker(buff, packname, author, "Love").then(async res => {
							await delay(2000)
							await sendSticker(sender, res);
						})
					}
				}).catch(() => reply(Bug));
				break;
			case 'pindl': case 'pinterest':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://id.pinterest.com/pin/881790802010631188/`);
				if (!query.match(/pin/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/pinterest?url=${query}&apikey=${apikey}`).then(async res => {
					str = `\n\t\t\t\t[ PINTERRST DOWNLOADER ]\n\nDuration: ${res.result.duration}\nQuality: ${res.result.data.quality}\nSize: ${res.result.data.formattedSize}\n`
					thumbnail = await getBuffer(res.result.thumbnail);
					buff = await getBuffer(res.result.data.url);
					sendImage(from, thumbnail, str);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			case 'xvideosdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.xvideos.com/video45738459/pervymother.com_-_mom_and_sister_threeway_fantasy`);
				if (!query.match(/xvideos/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/xvideos?url=${query}&apikey=${apikey}`).then(async res => {
					str = `\n\t\t\t[ XVIDEOS DOWNLOADER ]\n\nTitle: ${res.result.title}\nViewers: ${res.result.views}\nVotes: ${res.result.vote}\nLikes: ${res.result.like_count}\nDislikes: ${res.result.dislike_count}\n\n${res.result.keyword}\n`
					thumbnail = await getBuffer(res.result.thumb);
					buff = await getBuffer(res.result.url);
					sendImage(from, thumbnail, str);
					reply(Waiting);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			case 'xnxxdl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://www.xnxx.com/video-kmyob38/hot_milf_step_mom_huge_boobs_brunette_ryder_skye_sex_with_stepson_pov`);
				if (!query.match(/xnxx/gi)) return reply(invalidUrl);
				await getJson(`https://api-xcoders.xyz/api/download/xnxx?url=${query}&apikey=${apikey}`).then(async res => {
					str = `\n\t\t\t[ XNXX DOWNLOADER ]\n\nTitle: ${res.result.title}\nDuration: ${res.result.duration}\nQuality: ${res.result.quality}\nViewers: ${res.result.views}\n\n${res.result.keyword}\n`
					thumbnail = await getBuffer(res.result.thumb);
					buff = await getBuffer(res.result.url);
					sendImage(from, thumbnail, str);
					reply(Waiting);
					sendVideo(from, buff, Sukses);
				}).catch(() => reply(Bug));
				break;
			//end downloader

			//stalker fitur
			case 'ttstalk':
				if (args.length < 1) return reply(`Example: ${prefix + command} chikakiku`);
				await getJson(`https://api-xcoders.xyz/api/stalk/tiktok?username=${query}&apikey=${apikey}`).then(async res => {
					ttstalk = `\n\t\t\t\t[ TIKTOK STALKER ]\n\nUsername : ${res.result.username}\nNickname : ${res.result.nickname}\nSignature : ${res.result.signature}\nVerified Acc : ${res.result.verified}\nPrivate Acc : ${res.result.privateAccount}\nFollowers : ${h2k(res.result.followers)}\nFollowing : ${h2k(res.result.followings)}\nHeart Count : ${h2k(res.result.hearts)}\nVideo Count : ${h2k(res.result.videoCount)}\n\nCreated Time : ${res.result.createTime}`;
					reply(Waiting);
					sendImage(from, await getBuffer(res.result.profile), ttstalk);
				}).catch(() => reply(Bug));
				break;
			case 'igstalk':
				if (args.length < 1) return reply(`Example: ${prefix + command} only_fxc7`);
				await getJson(`https://api-xcoders.xyz/api/stalk/ig?username=${query}&apikey=${apikey}`).then(async res => {
					Igstlk = `\n\t\t\t[ INSTAGRAM STALKER ]\n\nUsername : ${res.result.username}\nFullname : ${res.result.full_name}\nFollowers : ${res.result.followers}\nFollowing : ${res.result.following}\nPrivate Acc : ${res.result.is_private}\nVerified Acc : ${res.result.is_verified}\nPost Count : ${res.result.posts_count}\nBio :\n${res.result.biography}\n`
					reply(Waiting);
					sendImage(from, await getBuffer(res.result.profile_url), Igstlk)
				}).catch(() => reply(Bug));
				break;
			case 'githubstalk':
				if (args.length < 1) return reply(`Example: ${prefix + command} Fxc7`);
				await getJson(`https://api-xcoders.xyz/api/stalk/github?username=${query}&apikey=${apikey}`).then(async res => {
					Ghstalk = `\n\t\t\t\t\t[ GITHUB STALK ]\n\n`
					Ghstalk += `Username : ${res.result.username}\nName : ${res.result.name}\nBlog : ${res.result.blog}\nCompany : ${res.result.company}\nLocation : ${res.result.location}\nFollowers : ${h2k(res.result.followers)}\nFollowing : ${h2k(res.result.following)}\nRepo Count : ${h2k(res.result.repository_count)}\nBio :\n${res.result.bio}\n\n\nCreated at : ${res.result.created_at}\nUpdate at : ${res.result.update_at}`;
					reply(Waiting);
					sendImage(from, await getBuffer(res.result.profile_url), Ghstalk);
				}).catch(() => reply(Bug));
				break;
			//end stalker

			//Maker fitur
			case 'sticker': case 'stiker': case 's':
				reply(Waiting);
				if (query && /https?:\/\//.test(query)) {
					buff = await getBuffer(query);
					await createSticker(buff, packname, author, "Love").then(async res => {
						await sendSticker(from, res);
					}).catch(() => reply(Bug));
				} else {
					buffer = m.quoted ? m.quoted : m;
					if (!/image|video/.test(buffer.mtype)) return reply(`Reply Video/Gambar dengan caption ${prefix + command}`);
					await createSticker(await buffer.download(), packname, author, "Love").then(async res => {
						await sendSticker(from, res);
					}).catch(() => reply(Bug));
				}
				break;
			case 'tahta': case 'harta':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhan`);
				buff = await getBuffer(`https://api-xcoders.xyz/api/maker/tahta?text=${query}&apikey=${apikey}`)
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff, `HARTA TAHTA ${query.toUpperCase()}`)
				}
				break;
			case 'ssweb':
				if (args.length < 1) return reply(`Example: ${prefix + command} ${restApi}`);
				if (!isUrl(query)) return reply(invalidUrl);
				buff = await getBuffer(`https://api-xcoders.xyz/api/maker/ssweb?url=${query}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff);
				}
				break;
			case 'nulis': case 'tulis':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhan|12 TKR 4|Teks nya`);
				nama = query.split("|")[0];
				kelas = query.split("|")[1];
				teks = query.split("|")[2];
				buff = await getBuffer(`https://api-xcoders.xyz/api/maker/nulis2?nama=${nama}&kelas=${kelas}&text=${teks}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff)
				}
				break;
			case 'costumtahta': case 'costumharta':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhan|and|friend`);
				text1 = query.split("|")[0] || "Farhan";
				text2 = query.split("|")[1] || "And";
				text3 = query.split("|")[2] || "Friends";
				buff = await getBuffer(`https://api-xcoders.xyz/api/maker/costumtahta?text1=${text1}&text2=${text2}&text3=${text3}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff)
				}
				break;
			case 'wasted':
			case 'wanted':
			case 'jail':
			case 'circle':
			case 'delete':
			case 'invert':
			case 'sepia':
			case 'joke':
			case 'blur':
			case 'gay':
			case 'facepalm':
			case 'beautiful':
			case 'trash':
			case 'instagram':
			case 'scary':
			case 'glitch':
			case 'ps4':
			case 'rejected':
			case 'brazzers':
			case 'badut':
			case 'badut2':
			case 'badut3':
				buffer = m.quoted ? m.quoted : m;
				if (!/image/gi.test(buffer.mtype)) return reply(`Reply Gambar dengan caption ${prefix + command}`);
				bufferImage = await buffer.download();
				upload = await uploader(bufferImage);
				buff = await getBuffer(`https://api-xcoders.xyz/api/maker/${command}?url=${upload}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff)
				}
				break;
			//end maker

			//photooxy fitur
			case 'oceansea':
			case 'shadow':
			case 'rainbow':
			case 'gravity':
			case 'burnpaper':
			case 'smoke':
			case 'romantic':
			case 'naruto':
			case 'lovemessage':
			case 'grass':
			case 'doubleheart':
			case 'coffecup':
			case 'lovetext':
			case 'butterfly':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhannnn`);
				buff = await getBuffer(`https://api-xcoders.xyz/api/photooxy/${command}?text=${query}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff)
				}
				break;
			//end photooxy

			//textprome fitur
			case 'layered':
			case 'pornhub':
			case 'aglitch':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhan|bot`);
				text1 = query.split("|")[0];
				text2 = query.split("|")[1];
				buff = await getBuffer(`https://api-xcoders.xyz/api/textpro/${command}?text=${text1}&text2=${text2}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff)
				}
				break;
			case 'embossed':
			case 'paper':
			case 'harrypotter':
			case 'broken':
			case 'blackpink':
			case 'carbon':
			case 'gradient':
			case 'glue':
			case 'blood':
			case 'firework':
			case 'dropwater':
			case 'imglitch':
			case 'glossy':
			case 'bear':
			case 'devil':
			case 'christmas':
			case 'magma':
			case 'stone':
			case 'light':
			case 'berry':
			case 'transformer':
				if (args.length < 1) return reply(`Example: ${prefix + command} Farhannn`);
				buff = await getBuffer(`https://api-xcoders.xyz/api/textpro/${command}?text=${query}&apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff);
				}
				break;
			//end textprome

			//Information fitur
			case 'trendtweet':
				if (args.length < 1) return reply(`Example: ${prefix + command} Indonesia`);
				res = await getJson(`https://api-xcoders.xyz/api/info/trend/twitter?country=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.result.data.length < 1 || res.status == false) return reply(Bug)
				reply(Waiting)
				let trendtweet = `${res.result.message}\n⊳ Updated At ${res.result.updated_at}\n\n`;
				for (let dataResult of res.result.data) {
					trendtweet += `⊳ Rank: ${dataResult.trending_number}\n⊳ Hastag: ${dataResult.hastag}\n⊳ Jumlah Tweet: ${dataResult.tweet_count}\n⊳ URL: ${dataResult.url}\n\n===============\n\n\n`
				}
				reply(trendtweet.trim())
				break;
			case 'trendyt':
				if (args.length < 1) return reply(`Example: ${prefix + command} Indonesia`);
				res = await getJson(`https://api-xcoders.xyz/api/info/trend/youtube?country=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.result.data.length < 1 || res.status == false) return reply(Bug)
				reply(Waiting)
				let trendyt = `${res.result.message}\n⊳ Updated At ${res.result.updated_at}\n\n`;
				let number = 0;
				for (let dataResult of res.result.data) {
					trendyt += `⊳ Rank: ${number += 1}\n⊳ Title: ${dataResult.title}\n⊳ Channel: ${dataResult.channel}\n⊳ Uploaded At: ${dataResult.uploaded_at}\n⊳ Viewers: ${dataResult.viewers}\n⊳ Likes: ${dataResult.likes}\n⊳ Dislikes: ${dataResult.dislikes}\n⊳ CommentCount: ${dataResult.comments}\n⊳ URL: ${dataResult.url}\n\n===============\n\n\n`
				}
				buffer = await getBuffer(res.result.data[0].thumbnail);
				sendImage(from, buffer, trendyt.trim())
				break;
			case 'trendytgaming':
				if (args.length < 1) return reply(`Example: ${prefix + command} Indonesia`);
				res = await getJson(`https://api-xcoders.xyz/api/info/trend/youtube/gaming?country=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.result.data.length < 1 || res.status == false) return reply(Bug)
				reply(Waiting)
				let trendytgaming = `${res.result.message}\n⊳ Updated At ${res.result.updated_at}\n\n`;
				let numb = 0;
				for (let dataResult of res.result.data) {
					trendytgaming += `⊳ Rank: ${numb += 1}\n⊳ Title: ${dataResult.title}\n⊳ Channel: ${dataResult.channel}\n⊳ Uploaded At: ${dataResult.uploaded_at}\n⊳ Viewers: ${dataResult.viewers}\n⊳ Likes: ${dataResult.likes}\n⊳ Dislikes: ${dataResult.dislikes}\n⊳ CommentCount: ${dataResult.comments}\n⊳ URL: ${dataResult.url}\n\n===============\n\n\n`
				}
				buffer = await getBuffer(res.result.data[0].thumbnail);
				sendImage(from, buffer, trendytgaming.trim())
				break;
			case 'infogempa':
				await getJson(`https://api-xcoders.xyz/api/info/gempa?apikey=${apikey}`).then(async res => {
					Gempaa = `\t\t\t[ ${res.result.title} ]\n\n`
					Gempaa += `Waktu :\n${res.result.waktu}\nKoordinat : ${res.result.koordinat}\nMagnitude : ${res.result.magnitude}\nLokasi : ${res.result.lokasi}\nDirasakan :\n${res.result.dirasakan}`;
					reply(Waiting);
					sendImage(from, await getBuffer(res.result.thumbnail), Gempaa)
				}).catch(() => reply(Bug));
				break;
			case 'rsrujukan':
				await getJson(`https://api-xcoders.xyz/api/info/rsrujukan?apikey=${apikey}`).then(res => {
					let rs = '\n\t\t\t\t[ INFO RUMAH SAKIT RUJUKAN ]\n\n';
					for (let i = 0; i < res.result.length; i++) {
						rs += `RS: ${res.result[i].name}\nAlamat: ${res.result[i].address}\nKota: ${res.result[i].region}\nNomer Telepon: ${res.result[i].phone}\nProvinsi: ${res.result[i].province}\n\n\n`;
					}
					reply(Waiting);
					reply(rs.trim());
				}).catch(() => reply(Bug));
				break;
			case 'covidindo':
				await getJson(`https://api-xcoders.xyz/api/info/covidindo?apikey=${apikey}`).then(async res => {
					Kokpitindo = `\t\t\t[ COVID INFORMATION ]\n\n`;
					Kokpitindo += `Country : ${res.result.country}\nPositif : ${res.result.positif}\nSembuh : ${res.result.sembuh}\nMeninggal : ${res.result.meninggal}\nDirawat : ${res.result.dirawat}\n`;
					reply(Waiting);
					reply(Kokpitindo);
				}).catch(() => reply(Bug));
				break;
			case 'covidworld':
				await getJson(`https://api-xcoders.xyz/api/info/covidworld?apikey=${apikey}`).then(async res => {
					Kokpitworld = `\t\t\t[ COVID INFORMATION ]\n\n`
					Kokpitworld += `Data : ${res.result.data}\nTotal Kasus : ${res.result.total_kasus}\nSembuh : ${res.result.sembuh}\nKematian : ${res.result.kematian}\nKasus Aktif : ${res.result.kasus_aktif}\nKasus Tutup : ${res.result.kasus_tutup}\nUpdate :\n${res.result.last_update}`;
					reply(Waiting);
					reply(Kokpitworld);
				}).catch(() => reply(Bug));
				break;
			case 'kbbi':
				if (args.length < 1) return reply(`Example: ${prefix + command} pohon`);
				await getJson(`https://api-xcoders.xyz/api/info/kbbi?query=${query}&apikey=${apikey}`).then(async res => {
					Kbebei = `\t\t\t\t\t\t[ K B B I ]\n\n`
					Kbebei += `Title : ${res.result.lema}\nArti :\n${res.result.arti[0]}`;
					reply(Waiting);
					reply(Kbebei)
				}).catch(() => reply(Bug));
				break;
			case 'infocuaca':
				if (args.length < 1) return reply(`Example: ${prefix + command} Banyuwangi`)
				await getJson(`https://api-xcoders.xyz/api/info/cuaca?query=${query}&apikey=${apikey}`).then(async res => {
					Cuaca = `\t\t\t[ INFO CUACA ${query.toUpperCase()} ]\n\n`
					Cuaca += `Kota : ${res.result.Name}\nLongitude : ${res.result.Longitude}\nLatitude : ${res.result.Latitude}\nSunrise : ${res.result.sunrise}\nSunset : ${res.result.sunset}\nSuhu : ${res.result.Suhu}\nAngin : ${res.result.Angin}\nKelembaban : ${res.result.Kelembaban}\nCuaca : ${res.result.Cuaca}\nUdara : ${res.result.Udara}\nKeterangan : ${res.result.Keterangan}`;
					reply(Waiting);
					reply(Cuaca);
				}).catch(() => reply(Bug));
				break;
			//end information

			//anime search & image fitur
			case 'kusonime':
				if (args.length < 1) return reply(`Example: ${prefix + command} boruto`)
				res = await getJson(`https://api-xcoders.xyz/api/anime/kusonime?query=${query}&apikey=${apikey}`)
				if (anu.result == undefined || anu.status == false) return reply(Bug);
				let kusonime = `\n\t\t\t\t[ KUSONIME SEARCH ]\n\n`
				for (let i = 0; i < res.result.length; i++) {
					kusonime += `Title: ${res.result[i].title}\nGenre: ${res.result[i].genre}\nURL: ${res.result[i].url}\n\n\n`
				}
				reply(Waiting);
				buff = await getBuffer(res.result[0].thumbnail);
				sendImage(from, buff, kusonime)
				break;
			case 'manga':
				if (args.length < 1) return reply(`Example: ${prefix + command} kimetsu no yaiba`);
				res = await getJson(`https://api-xcoders.xyz/api/anime/manga?query=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				manga = `\n\t\t\t\t[ MANGA SEARCHING ]\n\nTitle: ${res.result.title}\nName: ${res.result.name}\nAuthor: ${res.result.author}\nGenre: ${res.result.genre}\nRating: ${res.result.rating}\nRelased: ${res.result.relased}\nPublished: ${res.result.published}\nCategory: ${res.result.category}\n\n${res.result.description}\n\n==========================\n\n\n`;
				for (let i = 0; i < res.result.download.length; i++) {
					manga += `${res.result.download[i].data}\nType: ${res.result.download[i].type}\nUrl: ${res.result.download[i].url}\nType: ${res.result.download[i].type2}\nUrl: ${res.result.download[i].url2}\n\n================\n\n\n`;
				}
				reply(Waiting);
				reply(manga);
				break;
			case 'loli':
			case 'waifu':
			case 'neko':
			case 'husbu':
				buff = await getBuffer(`https://api-xcoders.xyz/api/anime/${command}?apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff);
				}
				break;
			//end anime

			//random fitur
			case 'cerpen':
				if (args.length < 1) return reply(`Example: ${prefix + command} cinta\n\nOptional:\n• cinta\n• sahabat\n• perjuangan\n• horor\n• lucu\n`)
				if (!query.match(/(cinta|sahabat|perjuangan|horor|lucu)/g)) return reply("Option Query not available")
				res = await getJson(`https://api-xcoders.xyz/api/random/cerpen/${query}?apikey=${apikey}`)
				if (res.result == undefined || res.status == false) return reply(Bug);
				reply(Waiting);
				cerpen = `\n\t\t\t\t[ RANDOM CERPEN ${query.toUpperCase()} ]\n\nTitle: ${res.result.judul}\nPenulis: ${res.result.penulis}\nSumber: ${res.result.sumber}\n\n\n${res.result.cerita}\n`
				reply(cerpen);
				break;
			case 'meme': case 'darkjoke':
				buff = await getBuffer(`https://api-xcoders.xyz/api/random/${command}?apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendImage(from, buff);
				}
				break;
			case 'randombokep':
				res = await getJson(`https://api-xcoders.xyz/api/random/cersex?apikey=${apikey}`)
				if (res.result == undefined || res.result == false) return reply(Bug);
				bkp = `\n\t\t\t\t[ RANDOM BOKEP ] \n\nTitle: ${res.result.title}\nUploaded: ${res.result.views}\nURL: ${res.result.url}\n`
				thumbnail = await getBuffer(res.result.thumb);
				reply(Waiting);
				sendImage(from, thumbnail, bkp);
				break;
			case 'cersex':
				res = await getJson(`https://api-xcoders.xyz/api/random/cersex?apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				cersex = `\n\t\t\t\t[ RANDOM CERSEX ] \n\nTitle: ${res.result.title}\nPublished: ${res.result.date}\n\n${res.result.cerita}\n`;
				thumbnail = await getBuffer(res.result.thumbnail);
				reply(Waiting);
				sendImage(from, thumbnail, cersex);
				break;
			case 'randomgore':
				buff = await getBuffer(`https://api-xcoders.xyz/api/random/gore?apikey=${apikey}`);
				filType = await fromBuffer(buff);
				if (filType == undefined) {
					reply(Bug);
				} else {
					reply(Waiting);
					sendVideo(from, buff);
				}
				break;
			case 'ppcouple':
				res = await getJson(`https://api-xcoders.xyz/api/random/ppcouple?apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				ppcwo = await getBuffer(res.result.ppcwo);
				ppcwe = await getBuffer(res.result.ppcwe);
				reply(Waiting);
				sendImage(from, ppcwo, "For Male");
				sendImage(from, ppcwe, "For Female");
				break;
			//end random

			//searching fitur
			case 'tiktoksearch':
				if (args.length < 1) return reply(`Example: ${prefix + command} chikakiku`);
				res = await getJson(`https://api-xcoders.xyz/api/search/tiktok?query=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				ttsearch = `\n\t\t\t\t[ TIKTOK SEARCHING ]\n\nUsername: ${res.result.username}\nNickname: ${res.result.nickname}\nViewers: ${res.result.views}\nDescription: \n${res.result.description}`;
				thumbnail = await getBuffer(res.result.thumbnail);
				buff = await getBuffer(res.result.url);
				sendImage(from, thumbnail, ttsearch);
				reply(Waiting);
				sendVideo(from, buff);
				break;
			case 'ytsearch':
				if (args.length < 1) return reply(`Example: ${prefix + command} Bot WhatsApp`);
				res = await getJson(`https://api-xcoders.xyz/api/search/youtube?query=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.result.length < 1 || res.status == false) return reply(Bug);
				let ytsearch = `\n\t\t\t\t[ YOUTUBE SEARCHING ]\n\n`;
				for (let i = 0; i < res.result.length; i++) {
					ytsearch += `Title: ${res.result[i].title}\nChannel: ${res.result[i].channel}\nPublished: ${res.result[i].published_at}\nURL: ${res.result[i].url}\n\n==========================\n\n\n`
				}
				thumbnail = await getBuffer(res.result[0].thumbnail);
				reply(Waiting);
				sendImage(from, thumbnail, ytsearch);
				break;
			case 'bokepsearch':
				if (args.length < 1) return reply(`Example ${prefix + command} Tante`);
				res = await getJson(`https://api-xcoders.xyz/api/search/bokephub?query=${query}&apikey=${apikey}`);
				if (res.result == undefined || res.result.length < 1 || res.status == false) return reply(Bug);
				bokepsearch = `\n\t\t\t\t[ BOKEP SEARCH ${query.toUpperCase()} ]\n\n`;
				for (let i = 0; i < res.result.length; i++) {
					bokepsearch += `Title: ${res.result[i].title}\nURL: ${res.result[i].url}\n\n========================\n\n\n`;
				}
				thumbnail = await getBuffer(res.result[0].thumb);
				reply(Waiting);
				sendImage(from, thumbnail, bokepsearch);
				break;
			//end searching

			//islam fitur
			case 'asmaulhusna':
				res = await getJson(`https://api-xcoders.xyz/api/muslim/asmaulhusna?apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				reply(Waiting);
				let pp = `\t\t\t\t\t [ ASMAUL HUSNA ]\n`;
				for (let i = 0; i < res.result.length; i++) {
					pp += `⊳ Number: ${res.result[i].number}\n`;
					pp += `⊳ Latin: ${res.result[i].latin}\n`;
					pp += `⊳ Arab: ${res.result[i].arab}\n`;
					pp += `⊳ Translate: ${res.result[i].translate_id}\n\n=======================\n`;
				}
				reply(pp);
				break;
			case 'jadwalsholat':
				if (args.length < 1) return reply(`Example: ${prefix + command} banyuwangi`);
				res = await getJson(`https://api-xcoders.xyz/api/muslim/jadwalshalat?query=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				reply(Waiting);
				str = `\t\t\t\t\t [ JADWAL SHOLAT ]\n\n⊳ Daerah: ${res.result.lokasi}\n⊳ Date: ${res.result.date}\n⊳ Timezone: ${res.result.timezone}\n⊳ Subuh: ${res.result.imsak}\n⊳ Dhuha: ${res.result.sunrise}\n⊳ Dzuhur: ${res.result.dzuhur}\n⊳ Ashar: ${res.result.ashar}\n⊳ Maghrib: ${res.result.maghrib}\n⊳ Isya: ${res.result.isya}`;
				reply(str);
				break;
			case 'surahnumber':
				if (args.length < 1 || !Number(query)) return reply(`Example: ${prefix + command} 10`);
				res = await getJson(`https://api-xcoders.xyz/api/muslim/surah?number=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				reply(Waiting);
				let surahnumber = `\t\t\t\t\t [ SURAH NUMBER ${encodeURIComponent(query)} ]\n\n⊳ Surah: ${res.result.name}\n⊳ All Ayat: ${res.result.all_ayat}\n⊳ Number Surah: ${res.result.surah_number}\n⊳ Type: ${res.result.type}\n\n`;
				for (i = 0; i < res.result.verses.length; i++) {
					surahnumber += `⊳ ${res.result.verses[i].number}\n`;
					surahnumber += `⊳ ${res.result.verses[i].text}\n`;
					surahnumber += `\n⊳ ${res.result.verses[i].translation_id}\n==========================\n`;
				}
				buff = await getBuffer(res.result.audio);
				sendAudio(from, buff, res.result.name);
				reply(surahnumber);
				break;
			case 'hadist':
				text = query.split("/")[0];
				number = query.split("/")[1];
				if (args.length < 1 || !Number(number)) return reply(`Example: ${prefix + command} bukhari/20`);
				res = await getJson(`https://api-xcoders.xyz/api/muslim/hadits?kitab=${text}&number=${number}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				capt = `⊳ ${res.result.hadist}\n\n⊳ ${res.result.result}\n\n⊳ ${res.result.translate_id}`;
				reply(capt);
				break;
			case 'quran':
				number_surah = query.split("/")[0];
				number_ayat = query.split("/")[1];
				if (args.length < 1 || !Number(number_surah) || !Number(number_ayat) || !number_ayat) return reply(`Example: ${prefix + command} 1/5`);
				res = await getJson(`https://api-xcoders.xyz/api/muslim/quran?surah=${number_surah}&ayat=${number_ayat}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				capt = `⊳ Surah: ${res.result.surah}\n⊳ Number: ${res.result.surah_no}\n⊳ Ayat: ${res.result.ayat_no}\n\n ${res.result.text_arab}\n\n${res.result.translate_id}\n\n\t\t\t\t\t\t\t [ TAFSIR AYAT ]\n\n ${res.result.tafsir.long}`;
				reply(capt);
				reply(Waiting);
				buff = await getBuffer(res.result.audio);
				sendAudio(from, buff, res.result.surah);
				break;
			case 'kisahnabi':
				if (args.length < 1) return reply(`Example: ${prefix + command} muhammad`);
				res = await getJson(`https://api-xcoders.xyz/api/muslim/kisahnabi?nabi=${encodeURIComponent(query)}&apikey=${apikey}`);
				if (res.result == undefined || res.status == false) return reply(Bug);
				capt = `\t\t\t[ KISAH NABI ${res.result.name.toUpperCase()} ]\n\n⊳ Lahir: ${res.result.kelahiran}\n⊳ Wafat: ${res.result.wafat_usia}\n⊳ Singgah: ${res.result.singgah}\n\n${res.result.kisah}\n`;
				reply(Waiting);
				reply(capt);
				break;
			//end islamic

			//converter
			case 'tourl':
				buffer = m.quoted ? m.quoted : m;
				if (!/image|video/gi.test(buffer.mtype)) return reply(`Reply Video/Gambar dengan caption ${prefix + command}`);
				reply(Waiting);
				res = await uploader(await buffer.download());
				if (!res) return reply(Bug);
				reply(res);
				break;
			case 'tinyurl':
				if (args.length < 1) return reply(`Example: ${prefix + command} https://api-xcoders.xyz`);
				if (!isUrl(args[0])) return reply(invalidUrl);
				await axios.get(`https://tinyurl.com/api-create.php?url=${args[0]}`)
					.then(({ data }) => {
						reply(Waiting);
						reply(data);
					})
					.catch(e => {
						reply(Bug);
						console.log(e);
					});
				break;
			//end convert

			//Group Features
			case 'grup': case 'group':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				if (args[0] === 'open' || 'buka') {
					reply(Sukses);
					xcoders.groupSettingChange(from, GroupSettingChange.messageSend, false);
				} else if (args[0] === 'close' || 'tutup') {
					reply(Sukses);
					xcoders.groupSettingChange(from, GroupSettingChange.messageSend, true);
				}
				break;
			case 'add':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				isTag = m.sender ? [m.quoted.sender] : m.mentionedJid;
				if (!isTag[0]) return reply("Reply Member Yang Ingin Add");
				isTag.map(add => {
					xcoders.groupAdd(from, [add]).catch(() => {
						reply("Error");
					});
					reply("Sukses Add Member");
				});
				break;
			case 'kick':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				isTag = m.sender ? [m.quoted.sender] : m;
				if (!isTag[0]) return reply("Reply Member Yang Ingin Dikick");
				isTag.map(kick => {
					xcoders.groupRemove(from, [kick]).catch(() => {
						reply("Error");
					});
					reply("Sukses Kick Member");
				});
				break;
			case 'promote': case 'pm':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				isTag = m.sender ? [m.quoted.sender] : love.mentionedJid;
				if (!isTag[0]) return reply("Reply Member Yang Ingin Di promote");
				isTag.map(pm => {
					xcoders.groupMakeAdmin(from, [pm]).catch(() => {
						reply("Error");
					});
					reply("Sukses Promote Member");
				});
				break;
			case 'demote':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				isTag = m.sender ? [m.quoted.sender] : m.mentionedJid;
				if (!isTag[0]) return reply("Reply Member Yang Ingin Demote");
				isTag.map(demote => {
					xcoders.groupDemoteAdmin(from, [demote]).catch(() => {
						reply("Error");
					});
					reply("Sukses Demote Member");
				});
				break;
			case 'del': case 'd':
				try {
					if (!isGroup) return;
					if (!isGroupAdmins) return;
					xcoders.deleteMessage(from, { id: love.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true });
				} catch (e) {
					reply(`Example: ${prefix + command} Dan Reply Pesan Bot Yg Mau Dihapus`);
				}
				break;
			case 'q':
				if (!m.quoted) return reply('reply pesan!');
				let awik = xcoders.serializeM(await m.getQuotedObj());
				if (!awik.quoted) return reply('pesan yang anda reply tidak mengandung reply!');
				await awik.quoted.copyNForward(from, true);
				break;
			case 'adminlist': case 'listadmin':
				if (!isGroup) return;
				if (!isGroupAdmins) return;
				teks = `List admin group ${groupMetadata.subject}\n⊳ Total : ${groupAdmins.length}\n\n`;
				no = 0;
				for (let Admin of groupAdmins) {
					no += 1;
					teks += `[${no.toString()}]⊳ @${Admin.split('@')[0]}\n`;
				}
				mentions(teks, groupAdmins, true);
				break;
			case 'sider':
				if (!m.quoted) return reply('Reply pesan!');
				if (!m.quoted.fromMe) return;
				if (!m.quoted.id) return;
				let members = m.quoted.chat.endsWith('g.us') ? (await xcoders.groupMetadata(m.quoted.chat)).participants.length - 1 : m.quoted.chat.endsWith('@broadcast') ? -1 : 1;
				let { reads, deliveries } = await xcoders.messageInfo(m.quoted.chat, m.quoted.id);
				let txt = `• Read by :\n× ${reads.sort((a, b) => b.t - a.t).map(({ jid, t }) => `@${jid.split`@`[0]}\n_${formatDate(t * 1000)}_`).join('\n')}\n× ${members > 1 ? `${members - reads.length} remaining` : ''}\n\n• Delivered to :\n× ${deliveries.sort((a, b) => b.t - a.t).map(({ jid, t }) => `wa.me/${jid.split`@`[0]}\n_${formatDate(t * 1000)}_`).join('\n')}\n× ${members > 1 ? `${members - reads.length - deliveries.length} remaining` : ''}`.trim();
				m.reply(txt, null, { contextInfo: { mentionedJid: xcoders.parseMention(txt) } });
				break;
			//End Group Features

			//Owner Only
			case 'chatall':
				if (!isMe) return;
				try {
					fil = totalchat.filter(ttj => ttj.jid.endsWith('g.us'));
					teh = ``;
					for (m = 0; m < fil.length; m++) {
						tyt = Object.keys(fil[m]).includes('metadata') ? fil[m].metadata.participants.length : 0;
						tiot = Object.keys(fil[m]).includes('metadata') ? fil[m].metadata.creation : 1;
						teh += `⊳ Id Grub: ${fil[m].jid}\n⊳ Nama: ${fil[m].name}\n⊳ Dibuat : ${moment(`${tiot}` * 1000).tz('Asia/Jakarta').format('DD/MM/YYYY HH:mm:ss')}\n⊳ Total Pesan Belum Di Baca: ${fil[m].messages.length}\n⊳ Total Member: ${tyt} \n\n`;
					}
					teh = teh.trim();
					reply(teh);
				} catch (e) {
					reply(String(e));
				}
				break;
			case 'grouplist':
				if (!isMe) return;
				try {
					fil = totalchat.filter(ttj => ttj.jid.endsWith('g.us'));
					teh = ``;
					for (m = 0; m < fil.length; m++) {
						tyt = Object.keys(fil[m]).includes('metadata') ? fil[m].metadata.participants.length : 0;
						tiot = Object.keys(fil[m]).includes('metadata') ? fil[m].metadata.creation : 1;
						teh += `⊳ Name Group: ${fil[m].name}\n⊳ Group ID: ${fil[m].jid}\n\n`;
					}
					teh = teh.trim();
					reply(teh);
				} catch (e) {
					reply(String(e));
				}
				break;
			case 'peson':
				if (!isMe) return;
				xcoders.toggleDisappearingMessages(from, WA_DEFAULT_EPHEMERAL);
				break;
			case 'pesoff':
				if (!isMe) return;
				xcoders.toggleDisappearingMessages(from, 0);
				break;
			case 'mute':
				if (!isMe) return;
				xcoders.modifyChat(from, ChatModification.mute, 24 * 60 * 60 * 1000);
				reply('succes mute this chat');
				break;
			case 'unmute':
				if (!isMe) return;
				xcoders.modifyChat(from, ChatModification.unmute);
				reply('succes unmute this chat');
				break;
			case 'setfake':
				if (!isMe) return;
				if (!isQuotedImage) return reply('Reply Image');
				buff = m.quoted ? m.quoted : m;
				buffer = await buff.download();
				fs.writeFileSync(`./image/${encodeURIComponent(query)}.png`, buffer);
				reply(Sukses);
				break;
			case 'return':
				if (!isMe) return;
				try {
					var toJSON = j => JSON.stringify(j, null, '\t');
					reply(toJSON(eval(args.join(''))));
				} catch (e) {
					reply(String(e));
				}
				break;
			case 'setprefix':
				if (!isMe) return;
				if (args.length < 1) return reply(`Options:\n• multiprefix\n• nonprefix\n• bebas`);
				if (query === 'multiprefix') {
					multiprefix = true;
					reply(`Berhasil mengubah prefix ke ${query}`);
				} else if (query === 'nonprefix') {
					multiprefix = false;
					nonprefix = true;
					reply(`Berhasil mengubah prefix ke ${query}`);
				} else {
					multiprefix = false;
					nonprefix = false;
					prefa = `${query}`;
					reply(`Berhasil mengubah prefix ke ${query}`);
				}
				break;
			case 'runtime':
				run = process.uptime();
				reply(kyun(run));
				break;
			case 'turnoff':
				if (!isMe) return;
				reply(Sukses);
				setTimeout(() => {
					process.exit();
				}, 2000);
				break;
			case 'restart':
				if (!isMe) return;
				setTimeout(() => {
					return process.send('reset');
				}, 2000);
				setTimeout(() => {
					reply(Sukses);
				}, 0);
				break;
			case 'status':
				reply(`Status BOT\n${offline ? '⊳ Offline' : '⊳ Online'}\n${banChats ? '• Self-Mode' : '• Public-Mode'}`);
				break;
			case 'self':
				if (!isMe) return;
				if (banChats === true) return;
				banChats = true;
				reply('「 Self-Mode 」');
				break;
			case 'public':
				if (!isMe) return;
				if (banChats === false) return;
				banChats = false;
				reply('「 Public-Mode 」');
				break;
			case 'deletechat':
				if (!isMe) return;
				reply('succes delete this chat');
				console.log('succes delete chat = ' + from);
				xcoders.modifyChat(from, ChatModification.delete);
				break;
			case 'inspect':
				if (args.length < 1) return reply('Wrong format!');
				codee = query.split('https://chat.whatsapp.com/')[1];
				res = await xcoders.query({
					json: ["query", "invite", codee],
					expect200: true
				});
				str = `「 Group Link Inspector 」\n\n⊳ Id: ${res.id}\n⊳ Nama grup: ${res.subject}\n⊳ Dibuat oleh @${res.id.split('-')[0]}\n⊳ pada ${formatDate(res.creation * 1000)}${res.subjectOwner ? `\n⊳ Judul diubah oleh @${res.subjectOwner.split(`@`)[0]}\n⊳ pada ${formatDate(res.subjectTime * 1000)}` : ''}${res.descOwner ? `\n⊳  Deskripsi diubah oleh @${res.descOwner.split(`@`)[0]}\n⊳ pada ${formatDate(res.descTime * 1000)}` : ''}\n⊳ Jumlah Member: ${res.size}\n⊳ Teman yang diketahui join: ${res.participants ? '\n' + res.participants.map((user, i) => ++i + '. @' + user.id.split(`@`)[0]).join('\n').trim() : 'Tidak ada'}\n${res.desc ? `\n⊳ Deskripsi:\n${res.desc}` : '\nTidak ada Deskripsi'} `;
				xcoders.sendMessage(from, { text: monospace(str), jpegThumbnail: fs.readFileSync("./image/menu.png") }, 'extendedTextMessage', { quoted: love, contextInfo: { mentionedJid: xcoders.parseMention(str) } });
				break;
			default:
				if ((budy.startsWith('>') || budy.startsWith('=>')) && !m.isBaileys) {
					if (!isMe) return;
					try {
						const evaling = await eval(`;(async () => { ${budy.slice(2)} })()`)
						const formating = util.format(evaling);
						reply('🗿 ' + formating);
					} catch (err) {
						xcoders.sendMessage(from, String(err), "conversation", { quoted: love })
					}
				}
				if (budy.startsWith('$')) {
					if (!isMe) return
					exec(budy.slice(2), (err, stdout) => {
						if (err) return reply(String(err))
						if (stdout) return reply(String(stdout));
					})
				}
		}
	} catch (e) {
		e = String(e);
		if (!e.includes("this.isZero")) {
			console.log('Message Error : %s', color(e, 'yellow'));
		}
	}
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update Case.js`);
	delete require.cache[file];
	require(file);
});