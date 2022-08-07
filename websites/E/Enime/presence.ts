const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "1005706063586279445",
	}),
	presenceData: PresenceData = {
		//The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		largeImageKey: "unknown",
		//The text which is displayed when hovering over the small image
		smallImageText: "enime.moe",
		//The upper section of the presence text
		details: "Browsing recently released",
		//The lower section of the presence text
		state: "Watching...",
		//The unix epoch timestamp for when to start counting from
		startTimestamp: Date.now(),
	},
	getElementByXpath = (path: string) =>
		document.evaluate(
			path,
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue;

presence.on("UpdateData", () => {
	/*UpdateData is always firing, and therefore should be used as your refresh cycle, or `tick`. This is called several times a second where possible.
  
      It is recommended to set up another function outside of this event function which will change variable values and do the heavy lifting if you call data from an API.*/

	const currentPath = document.location.pathname;

	switch (currentPath) {
		case "/":
			presenceData.details = "Browsing...";
			presenceData.state = "Browsing recently released";
			presenceData.largeImageKey = "unknown";
			presenceData.smallImageKey = "search";
			presenceData.smallImageText = "Browsing";
			presenceData.endTimestamp = null;
			break;
		default:
			if (currentPath.includes("/watch/")) {
				const animeTitle = getElementByXpath(
						'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div[2]/p[1]'
					).textContent,
					videoInfo: HTMLVideoElement =
						document.querySelector("video.art-video"),
					episodeTitle = getElementByXpath(
						'//*[@id="__nuxt"]/div/div[2]/div[2]/div[1]/div[2]/p[2]'
					).textContent;

				presenceData.details = "Watching...";
				presenceData.state = `${animeTitle} - ${episodeTitle}`;
				presenceData.largeImageKey = "unknown";
				presenceData.smallImageText = "Playing";
				presenceData.smallImageKey = "play";
				presenceData.startTimestamp = Date.now();
				presenceData.buttons = [
					{
						label: "Watch on Enime",
						url: document.location.href,
					},
				];
				if (videoInfo && !isNaN(videoInfo.duration)) {
					const duration =
						Date.now() +
						videoInfo.duration * 1000 -
						videoInfo.currentTime * 1000;

					if (videoInfo.paused) {
						presenceData.smallImageKey = "pause";
						presenceData.smallImageText = "Paused";
						presenceData.endTimestamp = duration;
					} else {
						presenceData.smallImageKey = "play";
						presenceData.smallImageText = "Playing";
						presenceData.endTimestamp = duration;
					}
				}
			}
	}

	presence.setActivity(presenceData);
});
