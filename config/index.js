'use strict';
const fs = require("fs");

global.restAPIs = "https://api-xcoders.xyz";
global.apikeys = "your apikeys";
global.packname = "Created By";
global.author = "Farhannn";
global.watermark = "𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐅𝐚𝐫𝐡𝐚𝐧𝐧𝐧𝐧𝐧";
global.ownerNumber = ["628xxxxxxxxxx@s.whatsapp.net"];
global.thumbnails = fs.readFileSync("./image/thumbnail.png");
global.banChats = false;
global.offline = false;
global.multiprefix = false;
global.nonprefix = false;
global.prefix = "#";
global.browserDescription = {
  set_name: "Xcoders",
  set_browser: "Chrome"
};
global.response = {
  "wait": "[ ⏳ ] Wait processed...",
  "sukses": "[ ✓ ] Success...\n\n\nDon't Forget to Follow My Instagram\nhttps://www.instagram.com/only_fxc7",
  "error": {
    "bug": "[ !!! ] Your Request Error '_'",
    "url": "[ !! ] Invalid Links!!"
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update config`);
  delete require.cache[file];
  require(file);
});
