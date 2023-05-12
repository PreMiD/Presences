const presence = new Presence({
	clientId: "607651992567021580",
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

let oldLang: string = null,
	albumCoverURL: string,
	albumCoverId: string,
	podcastCoverURL: string,
	podcastCoverId: string;

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/GKMQi3h.png",
		},
		strings = await getStrings(),
		paused = false;

	const [buttons, newLang, cover] = await Promise.all([
		presence.getSetting<boolean>("buttons"),
		presence.getSetting<string>("lang").catch(() => "en"),
		presence.getSetting<boolean>("cover"),
	]);

	oldLang ??= newLang;
	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const pages: Record<string, PresenceData> = {
		shows: {
			details: "Browsing shows",
		},
		channels: {
			details: "Browsing channels",
		},
		loved: {
			details: "Browsing user's loved",
		},
		playlists: {
			details: "Browsing user's playlists",
		},
		albums: {
			details: "Browsing user's albums",
		},
		artists: {
			details: "Browsing user's artists",
		},
		podcasts: {
			details: "Browsing user's podcasts",
		},
		playlist: {
			details: "Looking at a playlist",
		},
		album: {
			details: "Looking at an album",
		},
		artist: {
			details: "Looking at an artist",
		},
	};

	for (const [path, data] of Object.entries(pages)) {
		if (location.pathname.includes(path))
			presenceData = { ...presenceData, ...data };
	}

	if (document.querySelector(".page-player")) {
		const [albumLink, artistLink] = document.querySelector<HTMLAnchorElement>(
				"div.marquee-content"
			).children as unknown as [HTMLAnchorElement, HTMLAnchorElement],
			currentTime = document.querySelector(
				"div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-current"
			).textContent,
			duration = document.querySelector(
				"div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-max"
			).textContent,
			timestamps = presence.getTimestamps(
				presence.timestampFromFormat(currentTime),
				presence.timestampFromFormat(duration)
			),
			albumId = albumLink.href.split("/")[5];

		if (
			document
				.querySelector(
					"#page_player > div > div.player-controls > ul > li:nth-child(3) > button > svg > path"
				)
				.outerHTML.match('<path d="m3 1 12 7-12 7V1z"></path>')
		)
			paused = true;

		if (document.querySelector(".track-link:nth-child(2)")) {
			presenceData.details = document.querySelector(
				".track-link:nth-child(1)"
			).textContent;
			presenceData.state = document.querySelector(
				".track-link:nth-child(2)"
			).textContent;

			albumCoverId ??= albumId;
			albumCoverURL ??= (
				await fetch(`https://api.deezer.com/album/${albumCoverId}/image`)
			).url;

			if (albumCoverId !== albumId) {
				albumCoverId = albumId;
				albumCoverURL = (
					await fetch(`https://api.deezer.com/album/${albumCoverId}/image`)
				).url;
			}

			presenceData.largeImageKey = cover ? albumCoverURL : "deezer";
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? strings.pause : strings.play;
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			if (buttons) {
				presenceData.buttons = [
					{
						label: strings.viewArtist,
						url: (artistLink as HTMLAnchorElement).href,
					},
					{
						label: strings.viewAlbum,
						url: (albumLink as HTMLAnchorElement).href,
					},
				];
			}
		} else {
			const [podcastLink] = document.querySelector<HTMLAnchorElement>(
					"div.marquee-content"
				).children as unknown as [HTMLAnchorElement, HTMLAnchorElement],
				podcastId = podcastLink.href.split("/")[5];
			[presenceData.state, presenceData.details] = document
				.querySelector("div.marquee-content")
				.textContent.split(" · ");

			podcastCoverId ??= podcastId;
			podcastCoverURL ??= (
				await (
					await fetch(`https://api.deezer.com/podcast/${podcastCoverId}`)
				).json()
			).picture;

			if (podcastCoverId !== podcastId) {
				podcastCoverId = podcastId;
				podcastCoverURL = (
					await (
						await fetch(`https://api.deezer.com/podcast/${podcastCoverId}`)
					).json()
				).picture;
			}

			presenceData.largeImageKey = cover ? podcastCoverURL : "deezer";
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? strings.pause : strings.play;
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}

			if (buttons) {
				presenceData.buttons = [
					{
						label: (await strings).viewPodcast,
						url: (podcastLink as HTMLAnchorElement).href,
					},
				];
			}
		}
	}

	presence.setActivity(presenceData);
});

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			viewAlbum: "general.buttonViewAlbum",
			viewArtist: "general.buttonViewArtist",
			viewPodcast: "general.buttonViewPodcast",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}
