const presence = new Presence({
	clientId: "808756700022702120",
});

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
async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewPlaylist: "general.buttonViewPlaylist",
			viewArtist: "general.buttonViewArtist",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/AUKbzxX.png",
		},
		[buttons, newLang, showPlaylist, cover] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("showPlaylist"),
			presence.getSetting<boolean>("cover"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (navigator.mediaSession.metadata) {
		const paused = navigator.mediaSession.playbackState === "paused";

		if (
			!document.querySelector(
				"div._2kGtEHAlQ5t5sY3jvz-wwl > div._1Wgs9MKFGuL58IFgKSM811 > div._2HXusrWftEtKAYukKt5IuO > music-button"
			)
		) {
			const playlistLink = document
					.querySelector("music-app.hydrated music-horizontal-item")
					?.shadowRoot.querySelector("div > div > span")
					?.children[2]?.querySelector("a")?.href,
				artistLink = document
					.querySelector("music-app.hydrated music-horizontal-item")
					?.shadowRoot.querySelector("div > div > span")
					?.children[0]?.querySelector("a")?.href;

			if (showPlaylist && buttons && artistLink && playlistLink) {
				presenceData.buttons = [
					{
						label: strings.viewArtist,
						url: artistLink,
					},
					{
						label: strings.viewPlaylist,
						url: playlistLink,
					},
				];
			} else if (artistLink && buttons) {
				presenceData.buttons = [
					{
						label: strings.viewArtist,
						url: artistLink,
					},
				];
			}
		}

		presenceData.details = navigator.mediaSession.metadata.title;
		presenceData.state = navigator.mediaSession.metadata.artist;
		presenceData.smallImageKey = paused ? "pause" : "play";
		presenceData.smallImageText = paused ? strings.pause : strings.play;
		presenceData.endTimestamp =
			Date.now() / 1000 +
			presence.timestampFromFormat(
				document
					.querySelector("div.sXaGQzYs9WqImj2uxDCBs > span:nth-child(2)")
					.textContent.match(/[0-9:]+/)[0]
			);

		if (cover) {
			presenceData.largeImageKey =
				navigator.mediaSession.metadata.artwork[0].src;
		}

		if (paused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}

		presence.setActivity(presenceData);
	} else {
		presenceData.details = "Browsing...";
		presence.setActivity(presenceData);
	}
});
