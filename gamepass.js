const puppeteer = require("puppeteer-extra");
const { executablePath } = require("puppeteer");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const noblox = require("noblox.js");
const axios = require("axios").default;
const fs = require("fs");
let retry = true;
let file = JSON.parse(fs.readFileSync("./tokens.json"));
let token = file[process.argv[2]];
if (!token) return console.log("user not found");

let gamepassPrices = [5, 10, 25, 50, 100, 250, 1000, 5000, 10000, 100000, 1000000]; //change these if you want different prices

(async () => {
	let cookies = [
		{
			name: ".ROBLOSECURITY",
			value: token,
			domain: ".roblox.com",
		},
	];
	let currentUser = await noblox.setCookie(token);
	let gameId;
	let placeId;
	await axios.get(`https://games.roblox.com/v2/users/${currentUser.UserID}/games?sortOrder=Asc&limit=50`).then(function (response) {
		gameId = response.data.data[0].id;
		placeId = response.data.data[0].rootPlace.id;
	});
	const browser = await puppeteer.launch({ executablePath: executablePath() });
	const page = await browser.newPage();
	await page.setCookie(...cookies);
	await page.goto(`https://www.roblox.com/build/upload?AssetTypeId=34&GroupId=&TargetPlaceId=${placeId}`, { waitUntil: "networkidle0" });
	async function create() {
		try {
			let upload = await page.$("input[type=file]");
			await upload.uploadFile("./Donation.png");
			await page.click("#upload-button");
			await page.waitForTimeout(1000);
			await page.$("#upload-button");
			await page.click("#upload-button");
			await page.waitForTimeout(1000);
		} catch (e) {
			if (retry) {
				retry = false;
				console.log("failed, retrying in 60 seconds");
				await new Promise((r) => setTimeout(r, 60000));
				await create();
			} else {
				return console.log("failed");
			}
		}
	}
	let gamepass = await noblox.getGamePasses(gameId);
	let gamepassold = await noblox.getGamePasses(gameId);
	while (gamepass.length < gamepassPrices.length) {
		await create();
		gamepass = await noblox.getGamePasses(gameId);
		if (gamepassold.length == gamepass.length) {
			console.log("rate limited, retrying in 60 seconds");
			await new Promise((r) => setTimeout(r, 60000));
		} else {
			console.log(`created gamepass ${gamepass.length}/${gamepassPrices.length}`)
		}
		gamepassold = await noblox.getGamePasses(gameId);
	}
	for (let i = 0; i < gamepassPrices.length; ++i) {
		await noblox.configureGamePass(gamepass[i].id, gamepass[i].name, "", gamepassPrices[i]);
	}
	await browser.close();
})();
