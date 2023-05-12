const presence = new Presence({
		clientId: "620721262112538625", // CLIENT ID FOR YOUR PRESENCE
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

let item: HTMLElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/eKl4W7F.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "investors.etsy.com": {
			presenceData.details = "Viewing page:";
			presenceData.state = "Etsy Investors";

			delete presenceData.smallImageKey;

			break;
		}
		case "help.etsy.com": {
			presenceData.details = "Viewing page:";
			presenceData.state = "Etsy Help Center";

			delete presenceData.smallImageKey;

			break;
		}
		case "www.etsy.com": {
			if (document.location.pathname.includes("/listing/")) {
				item = document.querySelector(
					"#listing-page-cart > div > div.listing-page-title-component > h1"
				) as HTMLElement;
				presenceData.details = "Viewing product:";
				if (item.textContent.length > 128)
					presenceData.state = `${item.textContent.substring(0, 125)}...`;
				else presenceData.state = item.textContent;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/c/")) {
				item = document.querySelector(
					"#content > div > div > div > div > div > h1"
				);
				presenceData.details = "Viewing category:";
				presenceData.state = item.textContent;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/shop/")) {
				item = document.querySelector(
					"#content > div.shop-home > div:nth-child(1) > div > div > div > div > div > div > h1"
				);

				presenceData.details = "Viewing shop:";
				presenceData.state = item.textContent;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/people/")) {
				item = document.querySelector(
					"#content > div > div:nth-child(1) > div > div > div > div > h1"
				);

				presenceData.details = "Viewing profile:";
				presenceData.state = item.textContent;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/redeem")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Redeem codes";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/cart")) {
				presenceData.details = "Viewing cart";
				delete presenceData.state;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/purchases")) {
				presenceData.details = "Viewing purchases";
				delete presenceData.state;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/account")) {
				presenceData.details = "Viewing their account";
				delete presenceData.state;

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/about")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "About Etsy";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/team")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Etsy Team";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/careers")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Etsy Careers";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/press")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Etsy Press";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/impact")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Etsy Impact";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/search")) {
				item = document.querySelector("#global-enhancements-search-query");

				presenceData.details = "Searching for:";
				presenceData.state = (item as HTMLInputElement).value;

				presenceData.smallImageKey = Assets.Search;
			} else if (document.location.pathname.includes("/sell")) {
				presenceData.details = "Viewing page:";
				presenceData.state = "Etsy Sell";

				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/conversations")) {
				if (
					document.querySelector(
						"#root > div > div > div > div > div > div > div > div > h3 > span:nth-child(2)"
					) !== null
				) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Reading DMs with:";
					presenceData.state = item.textContent;

					presenceData.smallImageKey = Assets.Reading;
				} else if (document.location.pathname.includes("/sent")) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing sent messages";

					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/unread")) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing unreaded messages";

					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/spam")) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing spam messages";

					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/trash")) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing trash can";

					delete presenceData.smallImageKey;
				} else if (document.location.pathname.includes("/all")) {
					item = document.querySelector(
						"#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
					);

					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing all messages";

					delete presenceData.smallImageKey;
				} else {
					presenceData.details = "Etsy Direct Messages";
					presenceData.state = "Viewing the inbox";

					delete presenceData.smallImageKey;
				}
			}

			break;
		}
		// No default
	}
	presence.setActivity(presenceData);
});
