const fs = require("fs");
let file = JSON.parse(fs.readFileSync("./tokens.json"));
for (let x in file) {
	console.log(x);
}
