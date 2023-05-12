const presence = new Presence({
		clientId: "642122988925485086",
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

let user: string, title: string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/WTfjamG.png",
	};

	if (document.location.hostname === "www.skillshare.com") {
		if (
			document.location.pathname === "/" ||
			document.location.pathname === "/home"
		) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.location.pathname.includes("/classes/")) {
			let currentTime: number,
				duration: number,
				paused: boolean,
				startTimestamp: number,
				endTimestamp: number,
				video: HTMLVideoElement;
			video = document.querySelector("#vjs_video_3_html5_api");
			if (!video)
				video = document.querySelector(".video-player-module > div > video");

			title = document
				.querySelector(".class-details-header-name")
				.textContent.trim();
			user = document
				.querySelector(".class-details-header-teacher")
				.textContent.trim()
				.replace(
					document.querySelector(".follow-button-wrapper-class-details")
						.textContent,
					""
				);

			if (video) {
				({ currentTime, duration, paused } = video);
				[startTimestamp, endTimestamp] = presence.getTimestamps(
					Math.floor(currentTime),
					Math.floor(duration)
				);
			}
			if (!isNaN(duration)) {
				presenceData.smallImageKey = paused ? "pause" : "play";
				presenceData.smallImageText = paused
					? (await strings).pause
					: (await strings).play;
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;

				presenceData.details = title;
				presenceData.state = user.replace(title.trim(), "");

				if (paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(duration)) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Viewing class:";
				presenceData.state = title;
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (document.location.pathname.includes("/profile/")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing profile of:";
			presenceData.state = document.querySelector(".full-name").textContent;
		} else if (document.location.pathname.includes("/workshops/")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing workshop:";
			presenceData.state = document.querySelector(".header-text").textContent;
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/workshops")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing for workshops...";
			presenceData.smallImageKey = Assets.Search;
		} else if (document.location.pathname.includes("/browse")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Browsing in type:";
			presenceData.state = document.querySelector(".main-header").textContent;
			presenceData.smallImageKey = Assets.Search;
		} else if (document.location.pathname.includes("/search")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Searching for:";
			presenceData.state = document.querySelector(
				"#search-form > div > div > div.search-input-wrapper.clear > div.ellipsis.query-placeholder.left"
			).textContent;
			presenceData.smallImageKey = Assets.Search;
		} else if (document.location.pathname.includes("/your-classes")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their classes";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/my-workshops")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their workshops";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/teach")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Writing their teacher application";
			presenceData.smallImageKey = Assets.Writing;
		} else if (document.location.pathname.includes("/lists/saved-classes")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their saved classes";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/lists/watch-history")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing their watch history";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/settings")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Changing their settings...";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
