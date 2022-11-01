const noblox = require("noblox.js");
const fs = require("fs");
let file = JSON.parse(fs.readFileSync("./tokens.json"));
(async () => {
	await noblox.setCookie(file[process.argv[2]]);
	await noblox.configureItem(process.argv[4], "placeholder", "", false, parseInt(process.argv[3]));
})();
