const presence = new Presence({
		clientId: "754742129221173278",
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

let item;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/qEbuRPv.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "linustechtips.com") {
		if (document.location.pathname === "/") {
			presenceData.details = "Browsing";
			presenceData.state = "Categories";

			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/forum/")) {
			item = document.querySelector("h1") as HTMLElement;

			presenceData.details = "Browsing Category";
			presenceData.state = item.textContent;

			presenceData.smallImageKey = Assets.Search;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/topic/")) {
			item = document.querySelector("h1.ipsType_pageTitle") as HTMLElement;

			presenceData.details = "Viewing Thread";
			presenceData.state = item.textContent;

			presenceData.smallImageKey = Assets.Reading;
			presence.setActivity(presenceData);
		} else if (document.location.pathname.includes("/profile/")) {
			item = document.querySelector(
				"div.ipsColumns div.ipsColumn_fluid h1"
			) as HTMLElement;

			presenceData.details = "Viewing Profile";
			presenceData.state = item.textContent;

			presence.setActivity(presenceData);
		} else presence.setActivity();
	}
});
