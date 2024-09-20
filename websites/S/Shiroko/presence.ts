import { getEpisode, getId, getImage, getTitle } from "./utils";

const presence = new Presence({
	clientId: "1286500193881161804"
}),

 DOMAIN = "https://shiroko.co";

let lastPlaybackState = false,
	playback = false,
	startTimestamp = Math.floor(Date.now() / 1e3),

 lastHref : string,
 lastUpdate = 0;
presence.on("UpdateData", async () => {
		const presenceData: PresenceData = {
		buttons: [ { label: "Visit Shiroko", url: "https://shiroko.co" } ],
		startTimestamp
	},
	
	 video = document.body.querySelectorAll("video")[0];
	if (video) {
		presenceData.type = ActivityType.Watching;
		playback = !video.paused && !video.ended;

		if (lastPlaybackState !== playback) 
			startTimestamp = Math.floor(Date.now() / 1000);
		

		presenceData.smallImageKey = playback ? Assets.Play : Assets.Pause;
		presenceData.smallImageText = playback ? "Playing" : "Paused";
	} else {
		lastPlaybackState = false;
		playback = false;
	}

	if (video && lastPlaybackState === playback) return;
	lastPlaybackState = playback;

	presenceData.endTimestamp = null;

	const { pathname, href } = location;
	
	if (pathname.startsWith("/en/schedule")) presenceData.details = "Viewing Schedule...", presenceData.buttons.unshift({ label: "View Schedule", url: `${DOMAIN}/en/schedule` });
	if (pathname.includes("/search/manga")) presenceData.details = "Searching Manga...";
	if (pathname.includes("/search/anime")) presenceData.details = "Searching Anime...";
	if (href.includes("/search/anime?season=")) presenceData.details = "Viewing Season...";
	if (pathname.startsWith("/en/anime/") && !pathname.startsWith("/en/anime/watch")) {
		

		presenceData.details = `${getTitle()}`;
		presenceData.state = "Viewing Anime...";

		presenceData.buttons.unshift({ label: "View Anime", url: `${DOMAIN}/en/anime/${getId()}` });
	} else
	if (pathname.startsWith("/en/manga/")) {
		

		presenceData.details = `${getTitle()}`;
		presenceData.state = "Viewing Manga...";

		presenceData.buttons.unshift({ label: "View Manga", url: `${DOMAIN}/en/manga/${getId()}` });
	} else
	if (typeof presenceData.details !== "string") presenceData.details = "Viewing Home...";

	if (pathname.startsWith("/en/anime/watch")) {
		
		const episode = getEpisode();
		
		presenceData.details = `${getTitle()}`;
		presenceData.state = !isNaN(episode) ? `Episode ${episode}` : "Unable to retrieve episode";
		presenceData.type = ActivityType.Watching;
		
		presenceData.buttons.unshift({ label: "Watch Anime", url: `${DOMAIN}/en/anime/watch?id=${getId()}&n=${episode}` });
	}

	if (pathname.startsWith("/en/profile/")) {
		const split = pathname.split("/").slice(1);
		if (split.length === 3) {
			const username = split.pop();

			presenceData.details = `Viewing ${username}'s Profile`;
			presenceData.buttons.unshift({ label: "View Profile", url: `${DOMAIN}/en/profile/${username}` });
		}
	}


	const now = Date.now();
	if (lastHref !== href || (now - lastUpdate) / 1e3 >= 1) {
		lastHref = href;
		lastUpdate = now;
	} else return;

	presenceData.largeImageKey = getImage();

	presence.setActivity(presenceData);
});