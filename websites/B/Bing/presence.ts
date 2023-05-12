const presence = new Presence({
	clientId: "691575527190036480",
});

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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/vyaJqJh.png",
	};

	// Get search query from HTML form input.
	function searchQuery(): HTMLInputElement {
		return document.querySelector("#sb_form_q") as HTMLInputElement;
	}

	//  Get amount of results from query.
	function queryResults(): HTMLElement {
		return document.querySelectorAll(".sb_count")[0] as HTMLElement;
	}

	// Sets the timestamp.
	function setTimestamp(): number {
		return Math.floor(Date.now() / 1000);
	}

	/**
	 * Get's the setting specified and replaces %search% with the search input.
	 * @param {String} settingName Name of the setting
	 */
	async function handleFormatting(settingName: string): Promise<string> {
		const setting = await presence.getSetting<string>(settingName);
		return setting.replace("%search%", searchQuery().value);
	}

	if (
		document.URL === "https://www.bing.com/" ||
		document.URL === "https://www.bing.com" ||
		document.location.href.includes("/?cc=") ||
		document.location.href.includes("/?FORM=Z9FD1")
	) {
		presenceData.details = await presence.getSetting<string>("homepageMessage");
		presenceData.startTimestamp = setTimestamp();
	} else if (document.location.href.includes("/account/general")) {
		presenceData.details = await presence.getSetting<string>("settingsMessage");
		presenceData.startTimestamp = setTimestamp();
	} else if (document.location.href.includes("?q=")) {
		presenceData.startTimestamp = setTimestamp();
		presenceData.smallImageKey = Assets.Search;

		if (document.location.href.includes("/images/"))
			presenceData.details = await handleFormatting("imageSearch");
		else if (document.location.href.includes("/videos/"))
			presenceData.details = await handleFormatting("videoSearch");
		else if (document.location.href.includes("/news/"))
			presenceData.details = await handleFormatting("newsSearch");
		else {
			presenceData.details = await handleFormatting("standardSearch");
			presenceData.state = queryResults().textContent;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
