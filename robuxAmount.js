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
		let robux = [];
		async function getBalance() {
			robux = await page.evaluate(async () => {
				try {
					let pending = document.getElementsByClassName("amount icon-robux-container text-disabled")[0] ? document.getElementsByClassName("amount icon-robux-container text-disabled")[0].innerText : "0";
					let current = document.getElementsByClassName("rbx-text-navbar-right text-header")[0] ? document.getElementsByClassName("rbx-text-navbar-right text-header")[0].innerText : "0";
					return [pending.replace(/\,/g, ""), current.replace(/\,/g, "")];
				} catch (e) {}
			});
			if (!robux) await getBalance();
		}
		await getBalance();
		pendingTotal.push(parseInt(robux[0]));
		total.push(parseInt(robux[1]));
		console.log(x.cyan);
		console.log(`Current: ${robux[1]} R$`);
		console.log(`Pending: ${robux[0]} R$`.grey);
		await browser.close();
	}
	let totalAdded = total.reduce((a, b) => a + b, 0);
	let pendingTotalAdded = pendingTotal.reduce((a, b) => a + b, 0);
	console.log("\nTotal".cyan);
	console.log(`Current: R$${totalAdded}`);
	console.log(`Pending: R$${pendingTotalAdded}`.grey);
	console.log(`R$${totalAdded + pendingTotalAdded}`.green);
	console.log(`Total when transferring: R$${Math.floor((totalAdded + pendingTotalAdded) * 0.7)}`.green);
})();
