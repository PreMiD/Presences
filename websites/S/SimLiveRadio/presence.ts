const presence = new Presence({
		clientId: "699961797041455174",
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
		largeImageKey: "https://i.imgur.com/GCpxrYu.png",
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.host === "laut.fm") {
		if (
			document.querySelector(
				".player-display--meta.player-display__meta--station-name"
			) &&
			document.querySelector(
				".player-display--meta.player-display__meta--station-name"
			).textContent === "SimLiveRadio"
		) {
			presenceData.details = document
				.querySelector(".player-display__meta.player-display__meta--artist")
				.textContent.trim();
			presenceData.state = document
				.querySelector(".player-display__meta.player-display__meta--title")
				.textContent.trim()
				.replace('"', "")
				.replace('"', "");
			presenceData.smallImageKey = Assets.Play;

			presence.setActivity(presenceData);
		}
	} else if (document.location.host === "simliveradio.net") {
		if (document.location.pathname === "/")
			presenceData.details = "Browsing...";
		else if (document.querySelector(".entry-title")) {
			presenceData.details = "Reading article:";
			presenceData.state = document.querySelector(".entry-title").textContent;
		} else if (document.location.pathname.includes("/hoeren"))
			presenceData.details = "Reading how to listen to SimLiveRadio";
		else if (document.location.pathname.includes("/historie"))
			presenceData.details = "Viewing the song history";
		else if (document.location.pathname.includes("/mediathek"))
			presenceData.details = "Viewing the mediathek";
		else if (document.location.pathname.includes("/sendeplan"))
			presenceData.details = "Viewing the upcoming DJs";
		else if (document.location.pathname.includes("/wunschbox"))
			presenceData.details = "Viewing the wish box";
		else if (document.location.pathname.includes("/news"))
			presenceData.details = "Viewing the latest articles";
		else if (document.location.pathname.includes("/team"))
			presenceData.details = "Viewing the team";
		else if (document.location.pathname.includes("/jobs"))
			presenceData.details = "Viewing the jobs";
		else if (document.location.pathname.includes("/kontakt")) {
			presenceData.details = "Writing to SimLiveRadio";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/studiohotline"))
			presenceData.details = "Viewing the Studio Hot Line";
		else if (document.location.pathname.includes("/teamspeak"))
			presenceData.details = "Viewing TeamSpeak";
		else if (document.location.pathname.includes("/projektanfrage")) {
			presenceData.details = "Reading about the interviews";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/unterstuetzen"))
			presenceData.details = "Viewing the support page";
		else if (document.location.pathname.includes("/downloads"))
			presenceData.details = "Viewing the downloads page";
		else if (document.location.pathname.includes("/lets-player-und-streamer"))
			presenceData.details = "Viewing the streamer page";
		else if (document.location.pathname.includes("/partner"))
			presenceData.details = "Viewing the partner page";
		else if (document.location.pathname.includes("/ueber-uns")) {
			presenceData.details = "Reading about SimLiveRadio";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/faq")) {
			presenceData.details = "Reading the FAQs";
			presenceData.smallImageKey = Assets.Reading;
		}

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
