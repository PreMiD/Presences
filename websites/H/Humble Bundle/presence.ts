const presence = new Presence({
		clientId: "633816611022962708",
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
let title: HTMLElement, search: HTMLInputElement;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/BOUZiVY.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "www.humblebundle.com": {
			search = document.querySelector("#site-search");
			if (document.location.pathname === "/")
				presenceData.details = "Viewing homepage";
			else if (document.location.pathname.includes("/monthly"))
				presenceData.details = "Viewing Humdle Monthly";
			else if (document.location.pathname.includes("/store/")) {
				if (document.location.pathname.includes("/promo")) {
					presenceData.details = "Viewing promo:";
					title = document.querySelector("head > title");
					presenceData.state = title.textContent;
				} else if (document.location.pathname.includes("/search")) {
					presenceData.details = "Searching for something";
					presenceData.state = "in the store";
					presenceData.smallImageKey = Assets.Search;
				} else if (document.location.pathname.includes("/about"))
					presenceData.details = "Viewing about section of the store";
				else if (document.location.pathname.includes("/wishlist"))
					presenceData.details = "Viewing their wishlist";
				else {
					presenceData.details = "Viewing item:";
					title = document.querySelector(
						"body > div.page-wrap > div.base-main-wrapper > div.inner-main-wrapper > section > div.main-content > div.full-width-container.js-page-content > div > div.row-view.gray-row.showcase-row > div > div:nth-child(1) > div > div > h1"
					);
					presenceData.state = title.textContent;
				}
			} else if (document.location.pathname.includes("/store"))
				presenceData.details = "Browsing the store";
			else if (document.location.pathname.includes("/refer"))
				presenceData.details = "Viewing refer program";
			else if (document.location.pathname.includes("/accessibility"))
				presenceData.details = "Viewing accessibility";
			else if (document.location.pathname.includes("/about"))
				presenceData.details = "Viewing about section";
			else if (document.location.pathname.includes("/charities"))
				presenceData.details = "Viewing charities";
			else if (document.location.pathname.includes("/rewards"))
				presenceData.details = "Viewing rewards";
			else if (document.location.pathname.includes("/partner"))
				presenceData.details = "Viewing partners";
			else if (document.location.pathname.includes("/publishing"))
				presenceData.details = "Viewing publishing";
			else if (document.location.pathname.includes("/user"))
				presenceData.details = "Viewing their account";
			else if (document.location.pathname.includes("/home"))
				presenceData.details = "Viewing their homepage";

			if (search.value?.length >= 2) {
				presenceData.details = "Searching for:";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			}

			break;
		}
		case "jobs.humblebundle.com": {
			presenceData.details = "Viewing jobs at Humble";
			break;
		}
		case "support.humblebundle.com": {
			title = document.querySelector("head > title");
			if (
				document.location.pathname === "/" ||
				title.textContent === "Humble Bundle"
			)
				presenceData.details = "Browsing Support Center";
			else {
				presenceData.details = "Support - Reading:";
				presenceData.state = title.textContent.replace(" – Humble Bundle", "");
				presenceData.smallImageKey = Assets.Reading;
			}

			break;
		}
		case "blog.humblebundle.com": {
			if (document.location.pathname === "/")
				presenceData.details = "Browsing Blog";
			else {
				presenceData.details = "Blog - Reading:";
				title = document.querySelector("#main > article > header > h1");
				presenceData.state = title.textContent;
				presenceData.smallImageKey = Assets.Reading;
			}

			break;
		}
		// No default
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
