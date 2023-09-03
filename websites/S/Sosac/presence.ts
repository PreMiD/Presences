const presence = new Presence({
		clientId: "1079537235076071524",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});
let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/S/Sosac/assets/logo.png",
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const strs = await strings,
		presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		};

	if (
		video &&
		!isNaN(video.duration) &&
		document.location.pathname.includes("/player")
	) {
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		const firstH3Title = document.querySelector("h3");

		if (firstH3Title) {
			const originalText = firstH3Title.textContent,
				// Movie/Series name

				// Episode number
				epimatch = originalText.match(/\d+x\d+/);

			presenceData.details = `${originalText.match(/^([^\n]+)/)[1]} ${
				epimatch ? epimatch[0] : " "
			}`;
		}

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused ? strs.pause : strs.play;

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData, !video.paused);
	} else {
		presenceData.details = strs.browsing;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strs.browsing;
		presence.setActivity(presenceData);
	}
});
