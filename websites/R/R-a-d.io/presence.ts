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
	// Current path
	const path = document.location.pathname,
		presenceData: PresenceData = {
			// R/a/dio logo
			largeImageKey: "logo",
		};
	if (path.includes("/news")) {
		// On News page
		presenceData.details = "Reading news";
		const titleElement = document.querySelector(
			"#radio-container > section > div.container.main > div > div.panel.panel-default > div.panel-heading > h4 > a"
		);
		if (titleElement) presenceData.state = titleElement.textContent; // TODO: Title doesn't disappear when back to news main page
	} else if (path.includes("/irc")) {
		// On Chat page
		presenceData.details = "Chatting";
	} else if (path.includes("/search")) {
		// On Search page
		const query = path.split("/");
		// If searching for something
		if (query[2]) presenceData.details = `Searching for: ${query[2]}`;
		else presenceData.details = "Searching";
	} else if (path.includes("/last-played")) {
		// On last played page
		presenceData.details = "Looking at last played songs";
		// For page number
		presenceData.state = `On page ${
			document.querySelector(
				"#radio-container > section > div > div > ul > li.active"
			).textContent
		}`;
	} else if (path.includes("/queue")) presenceData.details = "Looking at queue";
	else if (path.includes("/faves")) {
		// On favorite page
		presenceData.details = "Looking at favorites";
		const query = path.split("/");
		if (query[2]) presenceData.details = `Looking at ${query[2]}'s favorites`;
	} else if (path.includes("/staff")) {
		// On staff page
		presenceData.details = "Looking at staff list";
	} else if (path.includes("/submit")) {
		// On submission page
		presenceData.details = "Submitting a song";
	} else if (path === "/") {
		// On root page
		// Small image text when hover
		presenceData.smallImageText = playStatus();
		// Current player status
		presenceData.details = playStatus();

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
	}

	// Update the presence with all the values from the presenceData object
	// Set second parameter to true since we provide timestamps according to PreMiD documentation
	presence.setActivity(presenceData, presenceData.details === "Playing");
});
