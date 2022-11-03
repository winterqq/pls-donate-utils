const noblox = require("noblox.js");
const fs = require("fs");
let retry = true;
async function validate() {
	try {
		let currentUser = await noblox.setCookie(process.argv[2]);
		let username = currentUser.UserName;
		let file;
		if (fs.existsSync("./tokens.json")) {
			file = JSON.parse(fs.readFileSync("./tokens.json"));
		} else {
			file = {};
		}
		file[username] = process.argv[2];
		fs.writeFileSync("tokens.json", JSON.stringify(file));
		console.log(`added ${username}`);
	} catch (e) {
		if (retry) {
			retry = false;
			console.log("invalid cookie or rate limited\nretrying in 60 seconds...");
			await new Promise((r) => setTimeout(r, 60000));
			validate();
		} else {
			return console.log("invalid cookie");
		}
	}
}
validate();
