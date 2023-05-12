const presence = new Presence({
	clientId: "821810069733376022",
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
		largeImageKey: "https://i.imgur.com/mWyID87.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};
	// Landing Site - kryptonia.fr
	if (window.location.hostname === "kryptonia.fr") {
		presenceData.details = "Navigue sur le site";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace("- Kryptonia", "");
	}
	// Forum - forum.kryptonia.fr
	if (window.location.hostname === "forum.kryptonia.fr") {
		presenceData.details = "Navigue sur le forum";
		if (window.location.pathname.startsWith("/threads/")) {
			presenceData.state = `📝${
				document.querySelector(
					"#top > div.p-body-header > div > div > div.p-title > h1 > span.label-append"
				)
					? ""
					: " "
			}${document
				.querySelector(
					"#top > div.p-body-header > div > div > div.p-title > h1"
				)
				.textContent.replace("Accepté(e)", "")
				.replace("Refusé(e)", "")
				.replace("Résolu(e)", "")
				.replace("Important", "")}`;
		} else if (window.location.pathname.startsWith("/members/")) {
			if (
				document.querySelector(
					"#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
				)
			) {
				presenceData.state = `👤 ${
					document.querySelector(
						"#top > div.p-body > div > div > div > div > div > div > div > div > div > div.memberHeader-main > div > h1 > span > span"
					).textContent
				}`;
			} else {
				presenceData.state = document
					.querySelector("head > title")
					.textContent.replace("| Kryptonia", "");
			}
		} else if (window.location.pathname.includes("/forums/")) {
			presenceData.state = `📌 ${document
				.querySelector("head > title")
				.textContent.replace("| Kryptonia", "")}`;
		} else {
			presenceData.state = document
				.querySelector("head > title")
				.textContent.replace("Kryptonia", "")
				.replace("| ", "");
		}
	}
	presence.setActivity(presenceData);
});
