const presence = new Presence({
		//The client ID of the Application created at https://discordapp.com/developers/applications
		clientId: "1073136952905318401",
	}),
	playStatus = (): string => {
		let status: string;
		const playButtonText: string =
			document.querySelector("#stream-play").textContent;
		if (playButtonText === "Play Stream") status = "Stopped";
		else if (playButtonText === "Stop Stream") status = "Playing";
		else status = playButtonText;
		return status;
	},
	currentSong = (): string => {
		return document.querySelector("#np").textContent;
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		//The large image on the presence. This can be a key of an image uploaded on the Discord Developer Portal - Rich Presence - Art Assets, or a URL to an image
		largeImageKey: "logo",
		//The text which is displayed when hovering over the small image
		smallImageText: playStatus(),
		//The upper section of the presence text
		details: playStatus(),
		//The unix epoch timestamp for when to start counting from
		// startTimestamp: 3133657200000,
		//If you want to show Time Left instead of Elapsed, this is the unix epoch timestamp at which the timer ends
		// endTimestamp: 3133700400000,
		//Optionally you can set a largeImageKey here and change the rest as variable subproperties, for example presenceData.type = "blahblah"; type examples: details, state, etc.
	};
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

	//Update the presence with all the values from the presenceData object
	if (presenceData.details) presence.setActivity(presenceData);
	//Update the presence with no data, therefore clearing it and making the large image the Discord Application icon, and the text the Discord Application name
	else presence.setActivity();
});
