const presence = new Presence({
		clientId: "809133308604055622",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			watch: "general.watching",
			search: "general.searchFor",
			searching: "general.search",
			profile: "general.viewProfile",
			article: "general.readingArticle",
			reading: "general.reading",
			lyrics: "genius.lyrics",
			viewLyrics: "genius.viewLyrics",
			home: "genius.viewHome",
			viewAlbum: "genius.viewAlbum",
			buttonAlbum: "general.buttonViewAlbum",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		buttons = await presence.getSetting<boolean>("buttons");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Genius/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname;

	if (path === "/") presenceData.details = strings.home;
	else if (path.startsWith("/a/")) {
		let article = document.querySelector("h1.article_title").textContent;
		if (article.length > 128) article = `${article.substring(0, 125)}...`;

		presenceData.details = strings.article;
		presenceData.state = article;
		presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = strings.reading;
	} else if (path.startsWith("/artists/")) {
		presenceData.details = strings.profile;
		[presenceData.state] = document
			.querySelector("h1.profile_identity-name_iq_and_role_icon")
			.textContent.split("<");
	} else if (path.startsWith("/albums/")) {
		presenceData.details = strings.viewAlbum;
		presenceData.state = document.querySelector(
			"h1.header_with_cover_art-primary_info-title"
		).textContent;
		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.buttonAlbum,
					url: document.URL,
				},
			];
		}
	} else if (
		document.querySelector("div[class*='SongPageGrid']") !== null ||
		document.querySelector(".song_body-lyrics") !== null
	) {
		const artist = await presence.getPageVariable("_sf_async_config.authors");
		presenceData.details = strings.lyrics;
		presenceData.state = `${artist["_sf_async_config.authors"]} - ${
			document
				.querySelector('h1[class*="SongHeaderdesktop__Title"]')
				?.textContent.trim() ||
			document
				.querySelector('h1[class*="SongHeadermobile__Title"]')
				?.textContent.trim()
		}`;
		if (buttons) {
			presenceData.buttons = [
				{
					label: strings.viewLyrics,
					url: document.URL,
				},
			];
		}
	} else if (
		document.querySelector(".profile_identity-name_iq_and_role_icon") !== null
	) {
		presenceData.details = strings.profile;
		[presenceData.state] = document
			.querySelector("h1.profile_identity-name_iq_and_role_icon")
			.textContent.split("<");
	} else if (path.startsWith("/videos/")) {
		const video: HTMLVideoElement = document.querySelector("video.vjs-tech");
		let title = document.querySelector("h1.article_title").textContent;
		if (title.length > 128) title = `${title.substring(0, 125)}...`;

		presenceData.details = strings.watch;
		presenceData.state = title;
		if (video && !isNaN(video.duration)) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);

			presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = video.paused ? strings.pause : strings.play;

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (path.startsWith("/search")) {
		presenceData.details = strings.search;
		presenceData.state = document.querySelector(
			"h2.search_results_page-header"
		).textContent;
		presenceData.smallImageKey = Assets.Search;
		presenceData.smallImageText = strings.searching;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
