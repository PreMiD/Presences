const presence = new Presence({
	clientId: "1126923786600583339",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/mhD2eIr.png",
	};

	// Determine player state
	let playerState;
	// Check if audio-title has any content
	if (document.querySelector(".audio-title").textContent) {
		if (document.querySelectorAll(".react-jinke-music-player-pause-icon")[0])
			playerState = "playing";
		else playerState = "paused";
	} else playerState = "notInitialized";

	// Check if music-player-panel initialized || Check if any music is playing/paused
	if (playerState === "playing" || playerState === "paused") {
		// Grab song information

		const timestamps = presence.getTimestamps(
			presence.timestampFromFormat(
				document.querySelector(".current-time").innerHTML
			),
			presence.timestampFromFormat(
				document.querySelector(".duration").innerHTML
			)
		);
		// Set gathered data
		presenceData.details = document.querySelectorAll(".songTitle")[0].innerHTML;
		presenceData.state = document.querySelectorAll(".songArtist")[0].innerHTML;
		// Set timestamp if playing
		if (playerState === "playing")
			[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;
	} else if (playerState === "notInitialized") {
		presenceData.details = "Browsing...";
		presenceData.startTimestamp = Math.floor(Date.now() / 1000);
	}
	presence.setActivity(presenceData);
});
