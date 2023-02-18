const presence = new Presence({
		clientId: "1073136952905318401",
	}),
	/**
	 * Returns current player status
	 * @returns {string} either "Stopped", "Playing", or "Connecting..."
	 */
	playStatus = (): string => {
		let status: string;
		const playButtonText: string =
			document.querySelector("#stream-play").textContent;
		if (playButtonText === "Play Stream") status = "Stopped";
		else if (playButtonText === "Stop Stream") status = "Playing";
		else status = playButtonText;
		return status;
	},
	/**
	 * Returns current song playing
	 * @returns {string} Current song, usually in "{artist} - {title}" format
	 */
	currentSong = (): string => {
		return document.querySelector("#np").textContent;
	};

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		presenceData: PresenceData = {
			// R/a/dio logo
			largeImageKey: "https://i.imgur.com/o6JjbtH.png",
		};
	if (path.includes("/news")) {
		// On News page
		presenceData.details = "Reading news";
		// Current article title if currently being open
		if (path.split("/").length === 3) {
			presenceData.state = document.querySelector(
				'[class="panel-title"] > a'
			).textContent;
		}
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
