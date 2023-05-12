const presence = new Presence({
		clientId: "633795089600348160",
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
		largeImageKey: "https://i.imgur.com/yQShI1r.png",
	};

	if (document.location.hostname === "yagpdb.xyz") {
		presenceData.startTimestamp = browsingTimestamp;
		switch (document.URL) {
			case "yagpdb.xyz": {
				presenceData.details = "Viewing the homepage";
				break;
			}
			case "yagpdb.xyz/#features": {
				presenceData.details = "Viewing the features";
				break;
			}
			case "yagpdb.xyz/#about": {
				presenceData.details = "Viewing the about section";
				break;
			}
			default:
				if (document.querySelector("#main-content > header > h2")) {
					title = document.querySelector("#main-content > header > h2");
					presenceData.details = "Control Panel - Editing:";
					presenceData.smallImageKey = Assets.Writing;
					presenceData.state = title.textContent;
					if (title.textContent === "News and updates") {
						presenceData.details = "Reading the news";
						presenceData.smallImageKey = Assets.Reading;
						delete presenceData.state;
					}
				} else if (document.location.pathname.includes("/manage/"))
					presenceData.details = "Viewing the Control Panel";
		}
	} else if (document.location.hostname === "docs.yagpdb.xyz") {
		title = document.querySelector("head > title");
		search = document.querySelector(
			"#__GITBOOK__ROOT__ > div > div.reset-3c756112--bodyContent-2f98451b > div > div.reset-3c756112--backdrop-1322b68a--sheetBackdrop-457fd54f > div > div.reset-3c756112--sheetHeader-2187bd71--small-2783b5d4 > div.reset-3c756112--sheetHeaderInner-96159b50 > div > div > div.reset-3c756112--inputInnerSizer-756c9114 > input"
		);
		presenceData.startTimestamp = browsingTimestamp;
		if (search) {
			if (search.value !== "") {
				presenceData.details = "Docs searching for:";
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			} else {
				presenceData.details = "Docs going to search something up";
				presenceData.smallImageKey = Assets.Search;
			}
		} else if (title.textContent === "MEE6 Helpdesk")
			presenceData.details = "Browsing the helpdesk";
		else {
			presenceData.details = "Docs viewing:";
			presenceData.state = title.textContent.replace(" - YAGPDB", "");
			presenceData.smallImageKey = Assets.Reading;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
