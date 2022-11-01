const noblox = require("noblox.js");
const child = require("child_process");
const fs = require("fs");
let currentUser;
let file = JSON.parse(fs.readFileSync("./tokens.json"));
if (!file[process.argv[2]]) return console.log("user not found");
let item = process.argv[3];
(async () => {
	for (let x in file) {
		currentUser = await noblox.setCookie(file[x]);
		console.log(currentUser.UserName + ": " + currentUser.RobuxBalance);
		if (currentUser.RobuxBalance > 4) {
			//too lazy to do this properly
			try {
				await noblox.deleteFromInventory(item);
			} catch (e) {}
			child.execSync(`node product.js ${process.argv[2]} ${currentUser.RobuxBalance} ${item}`, { stdio: "inherit" });
			await noblox.buy(item);
			// rate limit wait
			await new Promise((r) => setTimeout(r, 60000));
		}
	}
})();

//49%
