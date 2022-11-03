const prompt = require("prompt-sync")();
const child = require("child_process");
const fs = require("fs");
let dataFile;
(async () => {
	let location = prompt("enter the path to roblox account managaer: ");
	if (!fs.existsSync(`${location}\\AccountData.json`)) return console.log("cannot find AccountData.json");
	fs.copyFileSync(`${location}\\AccountData.json`, "./AccountData.json");
	try {
		dataFile = JSON.parse(fs.readFileSync("./AccountData.json", "utf-8"));
	} catch (e) {
		// try statement inside of a try statement very cool
		try {
			child.execSync("echo & echo.|.\\RAMDecrypt\\RAMDecrypt.exe AccountData.json", { stdio: "pipe" });
		} catch (e) {}
		dataFile = JSON.parse(fs.readFileSync("./AccountData.json", "utf-8"));
	}
    for (let x in dataFile) {
        console.log(`adding account ${parseInt(x) + 1}/${dataFile.length}`)
        child.execSync(`node addToken.js "${dataFile[x].SecurityToken}"`, { stdio: "inherit" });
    }
    fs.unlinkSync("./AccountData.json")
})();
