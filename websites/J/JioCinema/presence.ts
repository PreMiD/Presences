const presence: Presence = new Presence({
		clientId: "632479205707350037",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/J/JioCinema/assets/logo.png",
			startTimestamp,
		},
		url = window.location.href;
		if (url.includes("/movies") || url.includes("/tv-shows")) {
			presenceData.type = ActivityType.Watching;
			const [video] = document.querySelectorAll("video"),
			title =
				document.querySelector('meta[property="og:title"]')?.getAttribute("content");
			presenceData.largeImageKey =
				"https://cdn.rcd.gg/PreMiD/websites/J/JioCinema/assets/logo.png";
			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused
				? (await strings).pause
				: (await strings).play;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					Math.floor(video.currentTime),
					Math.floor(video.duration)
				);
			if (url.includes("/watch")) {
				presenceData.details = title.match(/^(.+?)\s*(\((\d{4})\))/)[1].trim();
				presenceData.state = "Movie";
			} else if (title) {
				const tvshowtitle = title.match(/Watch\s+(.+?)\s+Season\s+(\d+)\s+Episode\s+(\d+)\s*:\s*(.+?)\s*-/);
				presenceData.details = tvshowtitle[1].trim();
				presenceData.state = `S${parseInt(tvshowtitle[2], 10)} E${parseInt(tvshowtitle[3], 10)} · ${tvshowtitle[4].trim()}`;
			} else presenceData.state = "Video";
	
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (url.includes("/search")) {
			presenceData.details = "Searching...";
			presenceData.smallImageKey = Assets.Search;
		} else presenceData.details = "Browsing";
	
		presence.setActivity(presenceData, true);
   });
