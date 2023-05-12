const presence = new Presence({
		clientId: "901608545743683674",
	}),
	strings = presence.getStrings({
		homepage: "general.viewHome",
		reading: "general.reading",
		searchSomething: "general.searchSomething",
		searchFor: "general.searchFor",
		genre: "general.viewGenre",
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
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/TEB9rWf.png",
		details: (await strings).searchFor,
	};

	if (document.location.pathname === "/" || !document.location.pathname)
		presenceData.details = (await strings).searchSomething;
	else if (document.location.pathname.includes("/search")) {
		presenceData.state = `"${
			document.querySelector(".block_area-header i").textContent
		}"`;
	} else if (document.location.pathname.includes("/home"))
		presenceData.details = (await strings).homepage;
	else if (document.location.pathname.includes("/genre")) {
		presenceData.details = (await strings).genre;
		presenceData.state = `📔 ${
			document.querySelector(".block_area-header").textContent
		}`;
	} else if (document.location.pathname.includes("/new-release"))
		presenceData.state = "✌️ New releases";
	else if (document.location.pathname.includes("/completed"))
		presenceData.state = "✅ Completed Manga";
	else if (document.location.pathname.includes("/most-viewed"))
		presenceData.state = "🔥 Most Viewed";
	else if (document.location.pathname.includes("/latest-updated"))
		presenceData.state = "⚡ Latest Updated";
	else if (document.location.pathname.includes("/az-list"))
		presenceData.state = "🔠 A-Z List";
	else if (document.location.pathname.includes("/type")) {
		presenceData.state = `📖 ${
			document.querySelector(".block_area-header").textContent
		}s`;
	} else if (document.location.pathname.includes("/character")) {
		presenceData.details = "Viewing Character:";
		presenceData.state = document.querySelector(".name").textContent;
	} else if (document.location.pathname.includes("/author")) {
		presenceData.details = "Viewing Author:";
		presenceData.state = document.querySelector(".name").textContent;
	} else {
		presenceData.details = document.querySelector(".manga-name").textContent;
		presenceData.buttons = [
			{
				label: "Read Manga",
				url: document.location.href,
			},
		];

		if (document.location.pathname.includes("/read")) {
			presenceData.details = `${(await strings).reading} ${
				presenceData.details
			}`;
			presenceData.state = `${document
				.querySelector("#current-chapter")
				.textContent.replace(" ", " #️")} | ${document
				.querySelector("#c-selected-lang, #v-selected-lang")
				.textContent.replace("Language: ", "")}`;
			presenceData.startTimestamp = browsingTimestamp;
		}
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
