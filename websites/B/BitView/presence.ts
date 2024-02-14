const presence = new Presence({
		clientId: "899181356372860958",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://cdn.discordapp.com/app-icons/899181356372860958/5393df9f35f992394c3e6a3c4b5166a0.png",
}

// Utils functions.
const getChannelURL = () => {
	return `https://${document.location.hostname}${document.querySelector("#watch-channel-stats > a").getAttribute("href")}`;
},

getChannelAvatar = () => {
	return `https://${document.location.host}${document.querySelector("#main-channel-content > div > div > div > div > div > a > img").getAttribute("src")}`;
},

getChannelSuscribers = () => {
	return document.querySelector("#user_subscribers > div > div > a").textContent;
},

VIEW_PAGES = new Map<string, string>([
	["playlists", "Viewing the playlists"],
	["videos", "Viewing uploaded videos"],
	["subscriptions", "Viewing subscriptions videos"],
	["favorites", "Viewing favorite videos"],
	["quicklist", "Viewing the quicklist"],
	["account", "Viewing account settings"],
	["history", "Viewing the history"]
]);

presence.on("UpdateData", async () => {
	const path: string = document.location.pathname,

		  presenceData: PresenceData = {
			name: "Bitview",
			largeImageKey: Assets.Logo,
		  },

		  baseSearchPresence = () => {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			presenceData.startTimestamp = browsingTimestamp;
		  },

		  baseBrowsing = (browsingIn: string) => {
			baseSearchPresence();
			presenceData.details = `Browsing in ${browsingIn} list`;
		  };
	
	if (path === "/") { // MAIN PAGE
		presenceData.details = "Viewing home page";
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (path.includes("watch") && document.querySelector("video")) { // VIDEO
		const video = document.querySelector("video");

		presenceData.details = document.querySelector("#watch-vid-title").children[1]; // Video name
		presenceData.state = document.querySelector("#watch-channel-stats > a"); // Channel name
		presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
		presenceData.buttons = [
			{
				label: "Watch Video",
				url: document.location.href
			},
			{
				label: "View Channel",
				url: getChannelURL()
			}
		];

		if (video.paused) {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Paused";
			delete presenceData.endTimestamp;

		} else {
			const isLooping = document.querySelector("#watch-player-div")
							 .children[4]
							 .textContent
							 .includes("loop"); // video.loop doesn't work.

			presenceData.smallImageKey = isLooping
			? Assets.Repeat
			: Assets.Play;
			presenceData.smallImageText = isLooping
			? "On loop"
			: "Playing";
		}

	} else if (path.includes("user")) { // CHANNEL
		presenceData.details = "Viewing a channel";
		presenceData.state = document.querySelector("#main-channel-left > div")
							.children[1]
							.querySelector("div"); // Channel name

		presenceData.largeImageKey = getChannelAvatar();
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `${getChannelSuscribers()} Suscribers`;
		presenceData.buttons = [ { label: "View Channel", url: document.location.href} ];
		presenceData.startTimestamp = browsingTimestamp;

	} else if (path.includes("results")) { // SEARCH
		presenceData.details = "Searching for:";
		presenceData.state = Object.fromEntries(new URLSearchParams(document.location.search).entries()).search;
		baseSearchPresence();
 
	} else if (path.includes("my") || path.includes("viewing")) {
		presenceData.smallImageKey = Assets.Viewing;
		presenceData.smallImageText = "Viewing";
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.details = VIEW_PAGES.get(path.split("_")[1]) || "Viewing a page";

	} else if (path.includes("browse"))
		baseBrowsing("videos");

	else if (path.includes("groups"))
		baseBrowsing("groups");

	 else if (path.includes("channels")) 
		baseBrowsing("channels");

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
