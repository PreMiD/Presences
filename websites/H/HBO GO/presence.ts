const presence = new Presence({
		clientId: "605437254776651786",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing...",
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/H/HBO%20GO/assets/logo.png",
			type: ActivityType.Watching,
		},
		video: HTMLVideoElement = document.querySelector("video");

	if (!isNaN(video?.duration) && !!document.querySelector("div.movie-title")) {
		const title = document.querySelector("div.movie-title").textContent;

		if (location.pathname.includes("/series/")) {
			const lastColonIndex = title.lastIndexOf(":"),
				episode = title.substring(0, lastColonIndex).split(" ");

			presenceData.details = `Season ${episode[episode.length - 2]}, Episode ${
				episode[episode.length - 1]
			}`;
			presenceData.state = title.substring(lastColonIndex + 1).trim();
		} else {
			presenceData.details = title;
			presenceData.state = location.pathname.includes("/movies/")
				? "Movie"
				: "Extra";
		}

		presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = video.paused
			? (await strings).pause
			: (await strings).play;
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (video.paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	presence.setActivity(presenceData);
});
