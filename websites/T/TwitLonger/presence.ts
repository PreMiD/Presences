const presence = new Presence({
		clientId: "719119956486258749",
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
		largeImageKey: "https://i.imgur.com/Sl7M64D.png",
	};

	if (document.location.pathname === "/") {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Home";
	} else if (document.location.pathname.includes("/show/")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Reading an post";
		presenceData.state = `${
			document.querySelector<HTMLElement>("#postcontent > h3").textContent
		} by ${
			document.querySelector<HTMLElement>(
				"#user-info > div > h4 > a:nth-child(1)"
			).textContent
		} (${
			document.querySelector<HTMLElement>(
				"#user-info > div > h4 > a:nth-child(2)"
			).textContent
		})`;
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("/about")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "About";
	} else if (document.location.pathname.includes("/privacy")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Privacy";
	} else if (document.location.pathname.includes("/ad-free")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Ad-free";
	} else if (document.location.pathname.includes("/post")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Writing an Post";
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
