const presence = new Presence({
		clientId: "1314062632419852309",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://1anime.co/android-chrome-512x512.png",
}

//state
let playing = false;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "1anime.one": {
			if (document.location.pathname === "/")
				(presenceData.details = "Checking out 1anime's homepage!");
			else if (document.location.pathname.includes("/anime/watch/")) {
				//player state ig
				playing = !document.querySelector("video").paused;

				//anime info ig
				//title is in "Anime Title - Episode x" format
				const title = document.querySelector(
						"div#details h3.font-Archivo"
					).textContent,
					splitIndex = title.lastIndexOf(" - ");

				//not needed for now
				// const episodeName : string = document
				// 	.querySelector("div#details div.flex.font-Archivo.font-bold")
				// 	.textContent;

				presenceData.details = `Watching ${title.slice(0, splitIndex).trim() || "something.."}.`;
				presenceData.state = `Currently on ${title.slice(splitIndex + 3).trim() || "an episode.."}.`;
				presenceData.smallImageKey = playing ? Assets.Play : Assets.Pause;
				presenceData.smallImageText = playing
					? (await strings).play
					: (await strings).pause;
			}
			break;
		}
	}
	presence.setActivity(presenceData);
});
