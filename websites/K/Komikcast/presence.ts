const presence = new Presence({
		clientId: "909694033251688449",
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

presence.on("UpdateData", async () => {
	const buttons = await presence.getSetting<boolean>("buttons"),
		time = await presence.getSetting<boolean>("timestamps"),
		presenceData: PresenceData = {
			details: "Page not Supported",
			largeImageKey: "https://i.imgur.com/qN2A1XG.png",
			startTimestamp: browsingTimestamp,
		};

	if (document.location.href === "https://komikcast.com")
		presenceData.details = "Viewing Homepage";
	else if (document.location.pathname.endsWith("/daftar-komik/"))
		presenceData.details = "Viewing Komikcast Manga List";
	else if (document.location.pathname.endsWith("/pasang-iklan/"))
		presenceData.details = "Contact Komikcast";
	else if (document.location.pathname.endsWith("/project-list/"))
		presenceData.details = "Viewing Komikcast Project List";
	else if (document.location.pathname.endsWith("/bookmark/"))
		presenceData.details = "Viewing Bookmark";
	else if (document.location.pathname.endsWith("/download-aplikasi-komikcast/"))
		presenceData.details = "Download APK Komikcast";
	else if (document.location.pathname.startsWith("/komik/")) {
		presenceData.state = document
			.querySelector(".komik_info-content-body-title")
			.textContent.replace(/\t|\n/g, "");
		const type = document
			.querySelector(".komik_info-content-info-type b")
			.textContent.replace("Type:", "Comics");
		presenceData.details = `Viewing ${type}`;
		if (buttons) {
			presenceData.buttons = [
				{
					label: `View ${type}`,
					url: document.location.href,
				},
			];
		}
	} else if (document.location.pathname.startsWith("/chapter/")) {
		const chapter = document.location.pathname
			.match(/chapter-\d+/)[0]
			.replace("c", "C")
			.replace("-", " ");
		presenceData.details = document
			.querySelector("div.chapter_headpost h1")
			.textContent.replace(/\t|\n/g, "")
			.replace(/Chapter \d+/, "");
		presenceData.state = chapter;
		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Comic",
					url: document.location.href
						.replace("chapter", "komik")
						.replace(/-chapter-\d+/, "")
						.replace(/#\d+/, ""),
				},
				{
					label: chapter,
					url: document.location.href.replace(/#\d+/, ""),
				},
			];
		}
	} else if (document.location.href.includes("?s=")) {
		presenceData.state = document
			.querySelector("div.list-update-search-header h1")
			.textContent.replace("SEARCH", "")
			.replace(/\t|\n/g, "");
		presenceData.smallImageKey = Assets.Search;
		presenceData.details = "Doing:";
	}
	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	presence.setActivity(presenceData);
});
