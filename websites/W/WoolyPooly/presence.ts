const presence = new Presence({
		clientId: "783702757021581352",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let currencyTitle, currencyEffort, effortType, wallet24Revenue: string;

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
