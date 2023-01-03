const presence = new Presence({
		clientId: "640194732718292992",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let user: HTMLElement | Element | string, title: HTMLElement | Element | string;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/24VLERu.png",
	};

	if (document.location.hostname === "ani.gamer.com.tw") {
		if (document.location.pathname === "/") {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing home page";
		} else if (document.querySelector("#ani_video_html5_api")) {
			const video = document.querySelector<HTMLVideoElement>(
				"#ani_video_html5_api"
			);
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
			if (!isNaN(video.duration)) {
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;

				title = document.querySelector<HTMLElement>(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
				);
				presenceData.details = title.textContent;

				user = document.querySelector<HTMLElement>(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > div > p"
				);

				if (user) presenceData.state = user.textContent;

				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(video.duration)) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Looking at: ";
				title = document.querySelector(
					"#BH_background > div.container-player > div.anime-title > div.anime-option > section.videoname > div.anime_name > h1"
				);
				presenceData.state = title.textContent;
				presenceData.smallImageKey = "reading";
			}
		} else if (document.location.pathname.includes("/animeList")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing all animes";
		}
	}

	if (!presenceData.details) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = "Viewing page:";
		presenceData.state = document
			.querySelector("head > title")
			.textContent.replace(" - 巴哈姆特動畫瘋", "");
		presence.setActivity(presenceData);
	} else presence.setActivity(presenceData);
});
