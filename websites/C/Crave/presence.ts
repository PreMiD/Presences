const presence = new Presence({
		clientId: "1001288215388495953",
	}),
	browsingStamp = Date.now();

function $(selector: string): HTMLElement {
	return document.querySelector(selector);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "crave_logo" };

	if ($(".jw-video") !== null) {
		// if contains video
		if ($(".jw-icon-playback").ariaLabel !== "Play") {
			// video is playing

			const elapsed = presence.timestampFromFormat(
					$(".jw-text-elapsed").innerHTML
				),
				duration = presence.timestampFromFormat(
					$(".jw-text-duration").innerHTML
				);

			presenceData.startTimestamp = presence.getTimestamps(
				elapsed,
				duration
			)[0];
			presenceData.endTimestamp = presence.getTimestamps(elapsed, duration)[1];

			presenceData.smallImageKey = "play";
			presenceData.smallImageText = "Playing";
		} else {
			presenceData.smallImageKey = "pause";
			presenceData.smallImageText = "Paused";
		}

		presenceData.buttons = [
			{
				label: "Watch",
				url: document.location.href,
			},
		];

		if ($(".bm-icon-episode-list") !== null) {
			// if the video is an episode
			const details = $(".jw-title-primary").innerHTML || "",
				// split episode details to achieve {showName, episodeNumber, episodeName}
				// regex finds the season + episode number then split the entire title with said regex
				epDetails = details.split(/(S([0-9]+):E([0-9]+))/g.exec(details)[0]);

			presenceData.state = `${
				/(S([0-9]+):E([0-9]+))/g.exec(details)[0]
			} - ${epDetails[1].trim()}`; // {episodeNumber} - {episodeName}
			presenceData.details = epDetails[0].trim(); // {showName}
		} else {
			// video is a movie
			presenceData.details = $(".jw-title-primary").innerHTML; // movie title
		}
	} else {
		// default to browsing
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = browsingStamp;
	}

	presence.setActivity(presenceData);
});
