const presence = new Presence({
		clientId: "899181356372860958",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/x7XnGcX.png",
}

// Utils functions and consts.
const getChannelURL = () => {
	return `https://${document.location.hostname}${document.querySelector("#watch-channel-stats > a").getAttribute("href")}`;
},

getChannelAvatar = () => {
	return `https://${document.location.host}${document.querySelector(".user-thumb-semismall > div > img").getAttribute("src")}`;
},

getChannelSuscribers = () => {
	return document.querySelector("#user_subscribers > div > div > a").textContent;
},

VIEW_PAGES = new Map<string, string>([
	["playlists", "Viewing their playlists"],
	["videos", "Viewing their uploaded videos"],
	["subscriptions", "Viewing their subscriptions videos"],
	["favorites", "Viewing their favorite videos"],
	["quicklist", "Viewing their quicklist"],
	["account", "Viewing their account settings"],
	["history", "Viewing their history"],
	["groups", "Viewing their joined groups"],
	["channel", "Viewing a channel"],
	["inbox", "Viewing their inbox"],
	["guidelines", "Viewing the community guidelines"],
	["terms", "Viewing the terms of use"],
	["privacy", "Viewing the privacy policy"]
]);

presence.on("UpdateData", async () => {
	// Functions and consts.
	const path: string = document.location.pathname,

		  presenceData: PresenceData = {
			name: "Bitview",
			largeImageKey: Assets.Logo,
		  },
		
		  baseViewingPresence = () => {
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing";
			presenceData.startTimestamp = browsingTimestamp;
		  },

		  baseSearchPresence = () => {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching";
			presenceData.startTimestamp = browsingTimestamp;
		  },

		  baseBrowsing = (browsingIn: string) => {
			baseSearchPresence();
			presenceData.details = "Browsing through";
			presenceData.state = `${browsingIn}`;
		  };
	
	if (path === "/") { // Home Page
		presenceData.details = "Viewing home page";
		presenceData.startTimestamp = browsingTimestamp;
	}

	if (path.includes("watch") && document.querySelector("video")) { //  Watching a video
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
							 .getAttribute("class")
							 .includes("loop"); // video.loop doesn't work.

			presenceData.smallImageKey = isLooping
			? Assets.Repeat
			: Assets.Play;

			presenceData.smallImageText = isLooping
			? "On loop"
			: "Playing";
		}

	} else if (path.includes("user")) { // Viewing a Channel.
		presenceData.details = VIEW_PAGES.get("channel");
		presenceData.state = document.querySelector("#main-channel-left > div")
							.children[1]
							.querySelector("div"); // Channel name

		presenceData.largeImageKey = getChannelAvatar();
		presenceData.smallImageKey = Assets.Logo;
		presenceData.smallImageText = `${getChannelSuscribers()} Suscribers`;
		presenceData.buttons = [ { label: "View Channel", url: document.location.href} ];
		presenceData.startTimestamp = browsingTimestamp;

	} else if (path.includes("results")) { // Searching.
		presenceData.details = "Searching for:";
		presenceData.state = Object.fromEntries(new URLSearchParams(document.location.search).entries()).search; // Query String "search"
		baseSearchPresence();
 
	} else if (path.includes("my") || path.includes("viewing")) { // my_videos, my_subscriptons... and viewing_historial
		baseViewingPresence();
		presenceData.details = VIEW_PAGES.get(path.split("_")[1]) || "Viewing a page";

	} else if (path.includes("inbox")) {
		baseViewingPresence();
		presenceData.details = VIEW_PAGES.get("inbox");

	} else if ( ["guidelines", "terms", "privacy"].includes(path.slice(1))) {
		baseViewingPresence();
		presenceData.details = VIEW_PAGES.get(path.slice(1));

	} else if (path.includes("browse"))
		baseBrowsing("all videos list");

	else if (path.includes("groups"))
		baseBrowsing("all groups list");

	 else if (path.includes("channels")) 
		baseBrowsing("all channels list");

	else if (path.includes("partners"))
		baseBrowsing("partners list");

	else if (path.includes("blog"))
		baseBrowsing("the blog");

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
