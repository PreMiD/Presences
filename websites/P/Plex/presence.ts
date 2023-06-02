const presence = new Presence({
		clientId: "645028677033132033",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	{ language } = window.navigator; //Make this change-able with presence settings
//en = English
//nl = Nederlands
//Language list can be found here: https://api.premid.app/v2/langFile/list

/**
 * Get Translation
 * @param stringName Name of string you want to get
 */
function getTranslation(stringName: string): string {
	switch (stringName) {
		case "HomePage":
			switch (language) {
				case "nl":
					return "Bekijkt de startpagina";
				case "de":
					return "Ist auf der Startseite";
				case "sv":
					return "Kollar på startsidan";
				default:
					return "Viewing home page";
			}
		case "News":
			switch (language) {
				case "nl":
					return "Bladeren door het niews";
				case "de":
					return "Sieht sich News an";
				case "sv":
					return "Bläddrar igenom nyheter";
				default:
					return "Browsing news";
			}
		case "WebShows":
			switch (language) {
				case "nl":
					return "Bladeren door alle web shows";
				case "de":
					return "Sieht sich Web-Shows an";
				case "sv":
					return "Bläddrar igenom web shows";
				default:
					return "Browsing web shows";
			}
		case "Podcasts":
			switch (language) {
				case "nl":
					return "Bladeren door podcasts";
				case "de":
					return "Sieht sich Podcasts an";
				case "sv":
					return "Bläddrar igenom podcasts";
				default:
					return "Browsing podcasts";
			}
		case "Music":
			switch (language) {
				case "nl":
					return "Bladeren door muziek";
				case "de":
					return "Sieht sich Musik an";
				case "sv":
					return "Bläddrar igenom musik";
				default:
					return "Browsing music";
			}
		case "Search":
			switch (language) {
				case "nl":
					return "Zoekt naar:";
				case "de":
					return "Sucht nach:";
				case "sv":
					return "Söker efter:";
				default:
					return "Searching for:";
			}
		case "Library":
			switch (language) {
				case "nl":
					return "Bekijkt bibliotheek:";
				case "de":
					return "Ist in der Bibliothek:";
				case "sv":
					return "Kollar på bibliotek:";
				default:
					return "Viewing library:";
			}
			break;
		case "Collection":
			switch (language) {
				case "nl":
					return "Bekijkt collectie:";
				case "de":
					return "Ist in der Kollektion";
				case "sv":
					return "Kollar på samling:";
				default:
					return "Viewing collection:";
			}

		case "Playlist":
			switch (language) {
				case "nl":
					return "Bekijkt afspeellijst:";
				case "de":
					return "Ist in der Playlist";
				case "sv":
					return "Kollar på spellista:";
				default:
					return "Viewing playlist:";
			}
		case "Vod":
			switch (language) {
				case "nl":
					return "Bekijkt Film/TV Show/VOD:";
				case "de":
					return "Schaut Film/TV-Sendung/VOD:";
				case "sv":
					return "Kollar på Film/TV Show/VOD:";
				default:
					return "Viewing Movie/TV Show/VOD:";
			}
		default:
			presence.error(
				"Unknown StringName please contact the Developer of this presence!\nYou can contact him/her in the PreMiD Discord (discord.premid.app)"
			);
			return "Unknown stringName";
	}
}

let isUploading = false;

const uploadedImages: Record<string, string> = {};
async function uploadImage(url: string): Promise<string> {
	if (isUploading) return "plex";

	if (uploadedImages[url]) return uploadedImages[url];
	isUploading = true;

	const file = await fetch(url).then(x => x.arrayBuffer()),
		outputUrl = await fetch("https://bashupload.com", {
			method: "POST",
			body: file,
		})
			.then(x => x.text())
			.then(x => x.match(/https(.*)/)?.[0]);

	isUploading = false;
	uploadedImages[url] = outputUrl;
	return outputUrl;
}

function isPrivateIp(ip = location.hostname) {
	return /^(?:(?:10|127|192(\.|-)168|172(\.|-)(?:1[6-9]|2\d|3[01]))(\.|-)|localhost)/.test(
		ip
	);
}

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (url && isPrivateIp(new URL(url).hostname)) return await uploadImage(url);
	if (!url || url.length < 256) return url;

	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/P/Plex/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.querySelector("#plex")) {
		if (document.querySelector("#plex > div:nth-child(4) > div")) {
			const media = document.querySelector<HTMLVideoElement | HTMLAudioElement>(
					"#plex > div:nth-child(4) > div > div:nth-child(1) > :is(video, audio)"
				),
				cover = await presence.getSetting<boolean>("cover");

			if (!media) return;
			if (
				document.querySelector("[class^=PlayerControls-buttonGroupCenter]")
					.children.length > 1
			) {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestampsfromMedia(media);
			}

			if (cover && navigator.mediaSession.metadata?.artwork[0].src) {
				presenceData.largeImageKey = await getShortURL(
					navigator.mediaSession.metadata.artwork[0].src
						.replace(/width=[0-9]{1,3}/, "width=1024")
						.replace(/height=[0-9]{1,3}/, "height=1024")
				);
			}

			presenceData.smallImageKey = media.paused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = media.paused ? "Paused" : "Playing";

			const title = document.querySelector(
					'[class^=PlayerControlsMetadata] [data-testid="metadataTitleLink"]'
				).textContent,
				subTitle = Array.from(
					document.querySelector(
						'[class^=PlayerControlsMetadata] :is([data-testid="metadataTitleLink"] + span, [data-testid="metadataTitleLink"] + div)'
					).childNodes
				)
					.map(node => node.textContent)
					.join(" ");

			presenceData.details = title;
			presenceData.state = subTitle;

			if (media.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		} else if (document.URL.includes("/tv.plex.provider.webshows")) {
			presenceData.details = getTranslation("WebShows");
			const title = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span"
			);
			if (title) {
				presenceData.details = "Viewing webshow:";
				presenceData.state = title.textContent;
			}
		} else if (document.URL.includes("/tv.plex.provider.news"))
			presenceData.details = getTranslation("News");
		else if (document.URL.includes("/tv.plex.provider.podcasts")) {
			presenceData.details = getTranslation("Podcasts");
			const title = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span"
			);
			if (title) {
				presenceData.details = "Viewing podcast:";
				presenceData.state = title.textContent;
			}
		} else if (document.URL.includes("/tv.plex.provider.music")) {
			presenceData.details = getTranslation("Music");
			const title = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span"
			);
			if (title) {
				presenceData.details = "Viewing album:";
				presenceData.state = title.textContent;
			}
		} else if (document.URL.includes("/search")) {
			const search = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div > div:nth-child(2) > span"
			);

			presenceData.details = getTranslation("Search");
			presenceData.state = search.textContent.split('"')[1].replace('"', "");
			presenceData.smallImageKey = Assets.Search;
		} else if (document.URL.includes("/com.plexapp.plugins.library")) {
			presenceData.details = getTranslation("Library");
			presenceData.state = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > a > div:nth-child(1)"
			).textContent;
		} else if (document.URL.includes("content.collections")) {
			presenceData.details = getTranslation("Collection");
			presenceData.state = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
			).textContent;
		} else if (
			document.URL.includes("content.playlists") &&
			document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
			)
		) {
			presenceData.details = getTranslation("Playlist");
			presenceData.state = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span"
			).textContent;
		} else if (document.URL.includes("tv.plex.provider.vod")) {
			presenceData.details = getTranslation("Vod");
			presenceData.state = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > span"
			).textContent;
		} else if (document.URL.includes("/server/")) {
			presenceData.details = getTranslation("Vod");
			presenceData.state = document.querySelector(
				"#plex > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > span"
			).textContent;
		} else if (
			document.URL === "https://app.plex.tv/" ||
			document.URL === "https://app.plex.tv/desktop" ||
			document.URL === "https://app.plex.tv/desktop#" ||
			document.URL === "https://app.plex.tv/desktop/#!/" ||
			document.location.pathname === "/web/index.html" ||
			document.location.pathname === "/web/index.html#"
		)
			presenceData.details = getTranslation("HomePage");

		if (!presenceData.details) presence.setActivity();
		else presence.setActivity(presenceData);
	}
});
