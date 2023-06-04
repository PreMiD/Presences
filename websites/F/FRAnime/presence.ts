// Init the client
const presence = new Presence({
		clientId: "1102272266278027296",
	}),
	// Define playerAssets
	playerAssets = {
		logo: "https://i.imgur.com/Fe6SuHW.png",
		logoBg: "https://i.imgur.com/byFtXWd.png",
		pause: "https://i.imgur.com/0A75vqT.png",
		play: "https://i.imgur.com/Dj5dekr.png",
		search: "https://i.imgur.com/C3CetGw.png",
	},
	// Define the player selector, that will be used to detect the correct player
	Selectors = {
		watching:
			'div[class="aspect-video border-[1.5px] border-gray-700 rounded-lg flex w-full justify-center align-items-center"]',
		players: {
			vk: "#video_player > div > div.videoplayer_media > video",
			sibnetSendvid: "#video_html5_wrapper_html5_api",
			myvi: "#player > video.player-video",
			FRAnime: 'video[class="art-video"]',
		},
	},
	// Define the strings that will be used
	presenceStrings = {
		browsing: "🗺️ Parcours le catalogue",
		branding: "🍜 Animes gratuit & sans pub",
		websiteName: "FRAnime.fr",
		onPage: "📺 Sur la page",
		watchOn: "🔗 Regarder sur FRAnime.fr",
	},
	// Define the animeBrowsingTimestamp that will be used for the elapsed time
	animeBrowsingTimestamp = Math.floor(Date.now() / 1000);

// Main function
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},
		{ href } = window.location;

	// Home screen presence
	presenceData.details = presenceStrings.browsing;
	presenceData.state = presenceStrings.branding;
	presenceData.smallImageText = presenceStrings.websiteName;
	presenceData.largeImageKey = playerAssets.logoBg;
	presenceData.smallImageKey = playerAssets.search;
	presenceData.startTimestamp = animeBrowsingTimestamp;
	presenceData.buttons = [
		{
			label: `🔗 ${presenceStrings.websiteName}`,
			url: "https://franime.fr",
		},
	];

	// Detect if the client is on an anime page
	if (href.split("/").includes("anime")) {
		// Get the scriptElement that contains the episode info
		const jsonLD = JSON.parse(
			(
				document.querySelector(
					'script[type="application/ld+json"]'
				) as HTMLScriptElement
			).textContent!
		);

		// Set the anime page presence
		presenceData.details = `${presenceStrings.onPage} ${jsonLD.name}`;
		presenceData.state = presenceStrings.branding;
		presenceData.smallImageText = presenceStrings.websiteName;
		presenceData.largeImageKey = jsonLD.thumbnailUrl;
		presenceData.smallImageKey = playerAssets.search;
		presenceData.startTimestamp = animeBrowsingTimestamp;
		presenceData.buttons = [
			{
				label: presenceStrings.watchOn,
				url: href,
			},
		];

		// Detect if the client is on the watching page
		if (document.querySelector(Selectors.watching)) {
			// Set the episode info as presence
			presenceData.details = `📺 ${jsonLD.name} - S${
				href.split("=")[1].split("&")[0]
			}, EP${href.split("=")[2].split("&")[0]}`;
			presenceData.state = presenceStrings.branding;
			presenceData.smallImageText = presenceStrings.websiteName;
			presenceData.largeImageKey = jsonLD.thumbnailUrl;
			presenceData.smallImageKey = playerAssets.pause;
			presenceData.buttons = [
				{
					label: presenceStrings.watchOn,
					url: href,
				},
			];

			// The anime is loading, so we delete the timestamp
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;

			// Detect if a player is loaded
		} else if (document.querySelectorAll("video")) {
			const video = document.querySelector("video");

			// Set the playing presence
			presenceData.details = `📺 ${jsonLD.name} - S${
				href.split("=")[1].split("&")[0]
			}, EP${href.split("=")[2].split("&")[0]}`;
			presenceData.state = presenceStrings.branding;
			presenceData.smallImageText = presenceStrings.websiteName;
			presenceData.largeImageKey = jsonLD.thumbnailUrl;

			// Get the timestamp
			presenceData.startTimestamp = presence.getTimestampsfromMedia(video)[0];

			// Get the remaining timestamp
			presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			presenceData.buttons = [
				{
					label: presenceStrings.watchOn,
					url: href,
				},
			];

			// If the video is playing, display the "Play" small Image. Else, display the pause one and delete the timestamp
			if (!video.paused) presenceData.smallImageKey = playerAssets.play;
			else {
				presenceData.smallImageKey = playerAssets.pause;
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}
	// Update the presence
	presence.setActivity(presenceData);
});
