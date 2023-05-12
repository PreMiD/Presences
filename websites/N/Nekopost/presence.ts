const presence = new Presence({
		clientId: "846071986902925312",
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
		largeImageKey: "https://i.imgur.com/uoFY9IP.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname.includes("/manga")) {
		if (document.location.pathname.includes("/manga/")) {
			if (document.querySelector("head > title").textContent.includes("Ch")) {
				presenceData.details = `Manga :${
					document.querySelector("head > title").textContent.split("-")[1]
				}!`;

				presenceData.state = document
					.querySelector("head > title")
					.textContent.split(" ")[0];
				presenceData.smallImageKey = Assets.Reading;
			} else {
				presenceData.details = `Manga :${
					document.querySelector("head > title").textContent
				}!`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else {
			presenceData.details = "กำลังเลือก Manga";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.includes("/novel")) {
		if (document.location.pathname.includes("/novel/")) {
			if (document.querySelector("head > title").textContent.includes("Ch")) {
				presenceData.details = `Novel :${
					document.querySelector("head > title").textContent.split("-")[1]
				}!`;

				presenceData.state = document
					.querySelector("head > title")
					.textContent.split(" ")[0];
				presenceData.smallImageKey = Assets.Reading;
			} else {
				presenceData.details = `Novel :${
					document.querySelector("head > title").textContent
				}!`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else {
			presenceData.details = "กำลังเลือก Novel";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.includes("/comic")) {
		if (document.location.pathname.includes("/comic/")) {
			if (document.querySelector("head > title").textContent.includes("Ch")) {
				presenceData.details = `Comic :${
					document.querySelector("head > title").textContent.split("-")[1]
				}!`;

				presenceData.state = document
					.querySelector("head > title")
					.textContent.split(" ")[0];
				presenceData.smallImageKey = Assets.Reading;
			} else {
				presenceData.details = `Comic :${
					document.querySelector("head > title").textContent
				}!`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else {
			presenceData.details = "กำลังเลือก Original Comic";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.includes("/fiction")) {
		if (document.location.pathname.includes("/fiction/")) {
			if (document.querySelector("head > title").textContent.includes("Ch")) {
				presenceData.details = `ONovel :${
					document.querySelector("head > title").textContent.split("-")[1]
				}!`;

				presenceData.state = document
					.querySelector("head > title")
					.textContent.split(" ")[0];
				presenceData.smallImageKey = Assets.Reading;
			} else {
				presenceData.details = `ONovel :${
					document.querySelector("head > title").textContent
				}!`;
				presenceData.smallImageKey = Assets.Search;
			}
		} else {
			presenceData.details = "กำลังเลือก Original Novel";
			presenceData.smallImageKey = Assets.Search;
		}
	} else if (document.location.pathname.includes("/explore")) {
		presenceData.details = "กำลังเลือก Project";
		presenceData.smallImageKey = Assets.Search;
	} else if (document.location.pathname === "/") {
		presenceData.details = "กำลังหา...";
		presenceData.smallImageKey = Assets.Search;
	}
	presence.setActivity(presenceData);
});
