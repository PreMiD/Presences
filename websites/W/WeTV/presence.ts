const enum WeTvAssets {
	Play = "https://cdn.rcd.gg/PreMiD/websites/W/WeTV/assets/0.png",
	Pause = "https://cdn.rcd.gg/PreMiD/websites/W/WeTV/assets/1.png",
	Search = "https://cdn.rcd.gg/PreMiD/websites/W/WeTV/assets/2.png",
}

let parsedData: {
	props?: {
		pageProps: {
			data: string;
		};
	};
	coverInfo?: {
		posterVt: string;
	};
};

const presence = new Presence({
	clientId: "840271335183351902",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Browsing...",
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/W/WeTV/assets/logo.png",
		type: ActivityType.Watching,
		smallImageKey: WeTvAssets.Search,
	};

	if (document.location.pathname.includes("/play/")) {
		const video = document.querySelector("video"),
			nextdata = document.querySelector("#__NEXT_DATA__");

		if (nextdata && !parsedData) {
			parsedData = JSON.parse(nextdata.textContent);
			parsedData = JSON.parse(parsedData.props.pageProps.data);
		}

		if (video) {
			const episodeNumber = document.querySelector(
					"li.play-video__item.play-video__item--selected"
				),
				episodeTitle = document.querySelector(
					"li.play-relevant__item.play-relevant__item--selected"
				);

			presenceData.details = document.querySelector(
				"div.play-sidebar__title"
			).textContent;

			presenceData.state = episodeNumber
				? `Episode ${parseInt(episodeNumber.textContent)}`
				: episodeTitle
				? episodeTitle.textContent
				: "Unknown";

			if (parsedData && presence.getSetting<boolean>("showCover"))
				presenceData.largeImageKey = parsedData.coverInfo.posterVt;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestampsfromMedia(video);

			presenceData.smallImageKey = video.paused
				? WeTvAssets.Pause
				: WeTvAssets.Play;
			presenceData.smallImageText = video.paused ? "Paused" : "Playing";

			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	presence.setActivity(presenceData);
});
