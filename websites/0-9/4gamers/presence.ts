const presence = new Presence({
		clientId: "648494004870184981",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let title: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/zjbM0Um.png",
	};

	if (document.location.hostname === "www.4gamers.com.tw") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("/new")) {
			title = document.querySelectorAll(".news-header-title")[0].textContent;
			presenceData.details = title;
			presenceData.state = `Category: ${
				document.querySelectorAll(".news-header-category")[0].textContent
			}`;
		} else if (document.location.pathname.includes("magazine")) {
			title = document.querySelectorAll(".magazine-content-title")[0]
				.textContent;
			presenceData.details = title;
			presenceData.state = `Publish Date: ${
				document.querySelectorAll(".magazine-content-time")[0].textContent
			}`;
		} else if (document.location.pathname.includes("tournament"))
			presenceData.details = "賽事專欄";
	}
	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
