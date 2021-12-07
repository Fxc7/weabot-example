const nodeFetch = require('node-fetch');
const formData = require('form-data');
const fs = require('fs');
const { fromBuffer } = require('file-type');

/**
 * Upload image to telegra.ph
 * Supported mimetype:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`s
 * @param {Buffer} buffer Image Buffer
 */
module.exports = async buffer => {
	const { ext } = await fromBuffer(buffer);
	let form = new formData();
	form.append('file', buffer, new Date() + ext);
	let res = await nodeFetch('https://telegra.ph/upload', {
		method: 'POST',
		body: form
	});
	let img = await res.json();
	if (img.error) throw img.error;
	return 'https://telegra.ph' + img[0].src;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(`Update uploader.js`);
	delete require.cache[file];
	require(file);
});