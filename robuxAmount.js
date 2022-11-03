const puppeteer = require("puppeteer");
const noblox = require("noblox.js");
const colors = require("colors");
const fs = require("fs");
let file = JSON.parse(fs.readFileSync("./tokens.json"));
let total = [];
let pendingTotal = [];
console.log("this may take a few minutes...\n\n");
(async () => {
	for (let x in file) {
		let cookies = [
			{
				name: ".ROBLOSECURITY",
				value: file[x],
				domain: ".roblox.com",
			},
		];
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setCookie(...cookies);
		await page.goto("https://www.roblox.com/transactions", { waitUntil: "networkidle0" });
		let robux = await page.evaluate(async () => {
			try {
				let pending = document.getElementsByClassName("amount icon-robux-container text-disabled")[0].innerText;
				let current = document.getElementsByClassName("rbx-text-navbar-right text-header")[0].innerText;
				return [pending, current];
			} catch (e) {}
		});
		if (robux) {
			if (robux[0] > 0 || robux[1] > 0) {
				total.push(parseInt(robux[1]));
				pendingTotal.push(parseInt(robux[0]));
				console.log(x.cyan);
				console.log(`Current: $${robux[1]}`);
				console.log(`Pending: $${robux[0]}`.grey);
			}
		}
		await browser.close();
	}
	let totalAdded = total.reduce((a, b) => a + b, 0);
	let pendingTotalAdded = pendingTotal.reduce((a, b) => a + b, 0);
	console.log("\nTotal".cyan);
	console.log(`Current: $${totalAdded}`);
	console.log(`Pending: $${pendingTotalAdded}`.grey);
	console.log(`$${totalAdded + pendingTotalAdded}`.green);
})();
