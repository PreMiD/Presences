const presence = new Presence({
		clientId: "698231292172435567",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
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
let currentTime: number,
	duration: number,
	paused: boolean,
	timestamps: number[];

interface IFrameData {
	iframeVideo: {
		dur: number;
		iFrameVideo: boolean;
		paused: boolean;
		currTime: number;
	};
}

presence.on("iFrameData", (data: IFrameData) => {
	if (data.iframeVideo.dur)
		({ paused, dur: duration, currTime: currentTime } = data.iframeVideo);
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/RDkTKRh.png",
	};

	presenceData.startTimestamp = browsingTimestamp;

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/kisscartoon.html"
	)
		presenceData.details = "Viewing home page";
	else if (document.querySelector(".full.watch_container")) {
		timestamps = presence.getTimestamps(
			Math.floor(currentTime),
			Math.floor(duration)
		);
		if (!isNaN(duration)) {
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

			presenceData.details = document
				.querySelector("#adsIfrme > div > div > div > h1 > strong")
				.textContent.replace("Watch ", "")
				.replace(" online free", "");
			presenceData.state = document
				.querySelector("#selectEpisode")
				.textContent.trim();

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (isNaN(duration)) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Looking at:";
			presenceData.state = `${document
				.querySelector("#adsIfrme > div > div > div > h1 > strong")
				.textContent.replace("Watch ", "")
				.replace(" online free", "")} ${document
				.querySelector("#selectEpisode")
				.textContent.trim()}`;
		}
	} else if (document.location.pathname.includes("/CartoonList"))
		presenceData.details = "Viewing the Cartoon List";
	else if (document.location.pathname.includes("/Cartoon")) {
		presenceData.details = "Viewing Cartoon:";
		presenceData.state = document.querySelector(
			"#leftside > div:nth-child(2) > div.barContent.full > div.full > h1 > a"
		).textContent;
	} else if (document.location.pathname.includes("/ReportError")) {
		presenceData.details = "Reporting an error";
		presenceData.smallImageKey = Assets.Writing;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
