const presence = new Presence({
		clientId: "783702757021581352",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let currencyTitle, currencyEffort, effortType, wallet24Revenue: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/l9DGMzK.png",
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
				presenceData.smallImageKey = window.location.pathname.split("/")[2];
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
