const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "1073136952905318401",
	}),
	// Get current player status
	playStatus = (): string => {
		let status: string;
		const playButtonText: string =
			document.querySelector("#stream-play").textContent;
		if (playButtonText === "Play Stream") status = "Stopped";
		else if (playButtonText === "Stop Stream") status = "Playing";
		else status = playButtonText;
		return status;
	},
	// Get current song playing
	currentSong = (): string => {
		return document.querySelector("#np").textContent;
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		// R/a/dio logo
		largeImageKey: "logo",
		// Small image text when hover
		smallImageText: playStatus(),
		// Current player status
		details: playStatus(),
	};

	// Only add bottom row status and timestamp if playing
	if (presenceData.details === "Playing") {
		presenceData.state = currentSong();

		const timestamps = presence.getTimestamps(
			presence.timestampFromFormat(
				document.querySelector("#progress-current").textContent
			),
			presence.timestampFromFormat(
				document.querySelector("#progress-length").textContent
			)
		);
		presenceData.startTimestamp = timestamps[0];
		presenceData.endTimestamp = timestamps[1];
	}

	// Update the presence with all the values from the presenceData object
	// Set second parameter to true since we provide timestamps according to PreMiD documentation
	if (presenceData.details) presence.setActivity(presenceData, presenceData.details === "Playing");
	// Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
