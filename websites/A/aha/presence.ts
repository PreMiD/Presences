const presence = new Presence({
		clientId: "1130920550915657860",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/h4dMiyw.png",
}
const getVideoStatus = (
		presenceData: PresenceData,
		video: HTMLVideoElement
	) => {
		if (video.paused) {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "paused";
			delete presenceData.startTimestamp;
		} else {
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "playing";
		}
		return presenceData;
	},
	setPresenceStatus = (presenceData: PresenceData) => {
		const currentPresenceData = getVideoStatus(
			presenceData,
			document.querySelector<HTMLVideoElement>("video")
		);
		currentPresenceData.details = "Watching";
		currentPresenceData.state = document.querySelector(
			"div.player-title > span.player-label-title"
		).textContent;
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location;

	switch (true) {
		case pathname === "/": {
			presenceData.details = "Viewing home page";
			break;
		}
		case pathname === "/movies": {
			presenceData.details = "Browsing movies";
			break;
		}
		case pathname === "/shows": {
			presenceData.details = "Browsing shows";
			break;
		}
		case pathname === "/my-aha": {
			presenceData.details = "Viewing watch list";
			break;
		}
		case pathname.startsWith("/movie"): {
			presenceData.details = `Viewing ${
				document.querySelector("h1.title").textContent
			}`;
			break;
		}
		case pathname.startsWith("/player/movie"):
			setPresenceStatus(presenceData);
			break;
		case pathname.startsWith("/webepisode") ||
			pathname.startsWith("/webseries"): {
			presenceData.details = `Viewing ${
				document.querySelector("h1.title").textContent
			}`;
			break;
		}
		case pathname.startsWith("/player/webepisode") ||
			pathname.startsWith("/player/webseries"): {
			const currentPresenceData = getVideoStatus(
					presenceData,
					document.querySelector<HTMLVideoElement>("video")
				),
				title = document.querySelector(
					"div.player-title > span.player-label-title"
				).textContent,
				subtitle = document.querySelector(
					"div.player-title > span.player-label-title__subtitle"
				).textContent;
			currentPresenceData.details = "Watching";

			currentPresenceData.state = subtitle ? `${title} | ${subtitle}` : title;
			break;
		}
		case pathname.includes("/account"):
			presenceData.details = "Viewing account details";
			break;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
