const presence = new Presence({
		clientId: "783702757021581352",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let currencyTitle, currencyEffort, effortType, wallet24Revenue: string;

const assets = {
	etc: "https://cdn.discordapp.com/app-assets/783702757021581352/783709805708836935.png?size=512",
	aion: "https://cdn.discordapp.com/app-assets/783702757021581352/783714274563719198.png?size=512",
	mwc: "https://cdn.discordapp.com/app-assets/783702757021581352/783714275021553725.png?size=512",
	ae: "https://cdn.discordapp.com/app-assets/783702757021581352/783714276891295745.png?size=512",
	cfx: "https://cdn.discordapp.com/app-assets/783702757021581352/783714277311250442.png?size=512",
	ctxc: "https://cdn.discordapp.com/app-assets/783702757021581352/783714277369708565.png?size=512",
	rvn: "https://cdn.discordapp.com/app-assets/783702757021581352/783714277574836224.png?size=512",
	eth: "https://cdn.discordapp.com/app-assets/783702757021581352/783714277889802241.png?size=512",
	veil: "https://cdn.discordapp.com/app-assets/783702757021581352/783714277936726047.png?size=512",
	grin: "https://cdn.discordapp.com/app-assets/783702757021581352/783714278175801344.png?size=512",
	sero: "https://cdn.discordapp.com/app-assets/783702757021581352/783714278318014485.png?size=512",
	btg: "https://cdn.discordapp.com/app-assets/783702757021581352/783714278392856577.png?size=512",
	zel: "https://cdn.discordapp.com/app-assets/783702757021581352/783714278695501835.png?size=512",
	ergo: "https://cdn.discordapp.com/app-assets/783702757021581352/806847524555325460.png?size=512",
	xzc: "https://cdn.discordapp.com/app-assets/783702757021581352/806850115151200286.png?size=512",
	erg: "https://cdn.discordapp.com/app-assets/783702757021581352/808285506939912252.png?size=512",
};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/W/WoolyPooly/assets/logo.png",
	};

	switch (window.location.pathname) {
		case "/":
			presenceData.state = `${
				document.querySelector("div.contentContainer > span").childElementCount
			} Coins`;
			presenceData.details = "Charts Overview";
			break;

		case "/faq":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "FAQ";
			break;

		case "/privacy":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Privacy Policy";
			break;

		case "/tos":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Terms of Service";
			break;

		case "/raveos":
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Rave OS Redirect";
			break;

		default:
			if (window.location.pathname.includes("coin")) {
				currencyTitle = document.querySelector(
					"div.mainContent > div.typeSelection > div.coinTitle.flexEqual > div:nth-child(2)"
				).textContent;

				if (window.location.pathname.includes("wallet")) {
					wallet24Revenue = document.querySelector(
						"div.mainContent > div.mainContainer.flex.flex-wrap > div.card.cardSpec > div > div:nth-child(4) > div.miningBShortCell.ctr.cbold.tooltip.tooltipx > span:nth-child(1)"
					).textContent;

					presenceData.state = `24h Revenue: ${wallet24Revenue} ${currencyTitle}`;
					currencyTitle += " Wallet";
				} else {
					currencyEffort = document.querySelector(
						"div.mainContainer.flex.flex-wrap > div:nth-child(2) > div:nth-child(3) > div.cardValue > span:nth-child(1) > span:nth-child(1)"
					).textContent;

					effortType = document.querySelector(
						"body > div.layout > div.contentWrapper > div.mainContent > div.typeSelection > div.typeSelectionRight.flexEqual > div > div.baseTab.activeTab"
					).textContent;

					presenceData.state = `Effort (${effortType}): ${currencyEffort}%`;
				}
				presenceData.details = currencyTitle;
				presenceData.smallImageKey =
					assets[window.location.pathname.split("/")[2] as keyof typeof assets];
				presenceData.smallImageText = currencyTitle;
			} else {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Charts Overview";
			}
	}

	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Charts Overview";
	} else presence.setActivity(presenceData);
});
