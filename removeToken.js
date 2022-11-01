const fs = require("fs");
let file = JSON.parse(fs.readFileSync("./tokens.json"));
delete file[process.argv[2]];
fs.writeFileSync("tokens.json", JSON.stringify(file));
console.log(`removed ${process.argv[2]}`);
