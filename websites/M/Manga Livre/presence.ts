const presence = new Presence({
		clientId: "641409342566039558",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/It14Tbn.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "mangalivre.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Browsing...";
		else if (
			document.querySelector(".page-navigation > span > em:nth-child(1)") !==
			null
		) {
			presenceData.details = `Reading '${
				document.querySelector("div.series-title > span.title").textContent
			}'`;
			presenceData.state = `Chapter ${document
				.querySelector(".current-chapter")
				.textContent.replace("Cap ", "")} - Page ${
				document.querySelector(".page-navigation > span > em:nth-child(1)")
					.textContent
			}`;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/manga/")) {
			presenceData.details = "Viewing the manga:";
			presenceData.state = document.querySelector(
				"#series-data > .series-info > .series-title > h1"
			).textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/lista-de-mangas")) {
			presenceData.details = "Viewing manga list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/lista-de-categorias")) {
			presenceData.details = "Viewing category list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/grupos")) {
			presenceData.details = "Viewing group list";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/scanlator/")) {
			presenceData.details = "Viewing group:";
			presenceData.state = document.querySelector(".series-title").textContent;
		} else if (document.location.pathname.includes("/mangas/")) {
			presenceData.details = "Viewing category:";
			presenceData.state = document
				.querySelector("#wraper > div > a > div > h2")
				.textContent.replace(
					document.querySelector("#wraper > div > a > div > h2 > div > span")
						.textContent,
					""
				)
				.trim();
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
