const presence = new Presence({
		clientId: "641402862961950733",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video: HTMLVideoElement;

presence.on("iFrameData", (data: { iframeVideo: HTMLVideoElement }) => {
	video = data.iframeVideo;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/K/KissAsian/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/")
		presenceData.details = "Viewing home page";
	else if (document.location.pathname.includes("/drama/")) {
		const dramaTitle = document
				.querySelector('[class="Animeinfo"]')
				?.querySelector("a"),
			selectEpisode = document
				.querySelector("option[selected]")
				.textContent.match(/Episode [0-9]*/gm);

		if (!isNaN(video?.duration) && (dramaTitle || selectEpisode[0])) {
			delete presenceData.startTimestamp;
			if (dramaTitle) presenceData.details = dramaTitle?.textContent;
			else {
				presenceData.details = document
					.querySelector("#navsubbar > p > a")
					.textContent.split("\n")[2]
					.trim();
			}
			presenceData.state = selectEpisode[0];
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);
			if (video.paused) delete presenceData.endTimestamp;
		} else if (dramaTitle) {
			presenceData.details = "Viewing drama:";
			presenceData.state = dramaTitle.textContent;
			presenceData.smallImageKey = Assets.Reading;
		}
	} else if (document.location.pathname.includes("/DramaList")) {
		presenceData.details = "Viewing drama list";
		presenceData.smallImageKey = Assets.Reading;
	} else if (document.location.pathname.includes("AreYouHuman"))
		presenceData.details = "Completing a captcha...";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
