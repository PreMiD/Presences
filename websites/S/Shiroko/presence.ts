/* eslint-disable */
import { get_episode, get_id, get_image, get_title } from './utils';

const presence = new Presence({
	clientId: "1286500193881161804"
});

const DOMAIN = "https://shiroko.co";

let lastPlaybackState = false,
	playback = false,
	startTimestamp = Math.floor(Date.now() / 1e3);

var last_href : string = undefined;
var last_update : number = 0;
presence.on("UpdateData", async () => {
	var { props: data } = eval(`const a = ${document.getElementById("__NEXT_DATA__").innerText};a;`);
	data = data.pageProps;
	if ("data" in data) data = data.data;

	
	const presenceData: PresenceData = {
		buttons: [ { label: "Visit Shiroko", url: "https://shiroko.co" } ],
		startTimestamp
	};
	
	const video = document.body.getElementsByTagName("video")[0];
	if (video) {
		presenceData.type = ActivityType.Watching;
		playback = !video.paused && !video.ended;

		if (lastPlaybackState !== playback) {
			startTimestamp = Math.floor(Date.now() / 1000);
		}

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
	if (pathname.startsWith("/en/anime/") && !pathname.startsWith("/en/anime/watch"))
	{
		const id = get_id();

		presenceData.details = `${get_title()}`;
		presenceData.state = "Viewing Anime...";

		presenceData.buttons.unshift({ label: "View Anime", url: `${DOMAIN}/en/anime/${id}` });
	}

	else
	if (pathname.startsWith("/en/manga/"))
	{
		const id = get_id();

		presenceData.details = `${get_title()}`;
		presenceData.state = "Viewing Manga...";

		presenceData.buttons.unshift({ label: "View Manga", url: `${DOMAIN}/en/manga/${id}` });
	}

	else
	if (presenceData.details === undefined) presenceData.details = "Viewing Home...";

	if (pathname.startsWith("/en/anime/watch"))
	{
		const id = get_id();
		const episode = get_episode();
		
		// presenceData.state
		presenceData.details = `${get_title()}`;
		presenceData.state = !isNaN(episode) ? `Episode ${episode}` : 'Unable to retrieve episode';
		presenceData.type = ActivityType.Watching;
		
		presenceData.buttons.unshift({ label: "Watch Anime", url: `${DOMAIN}/en/anime/watch?id=${id}&n=${episode}` });
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
	if (last_href !== href || (now - last_update) / 1e3 >= 1)
	{
		last_href = href;
		last_update = now;
	}
	else return;

	presenceData.largeImageKey = get_image();

	console.log(`Updated at ${Date.now()}`);
	presence.setActivity(presenceData);
});