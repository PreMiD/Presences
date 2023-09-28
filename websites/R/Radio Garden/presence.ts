const presence = new Presence({
	clientId: "687070418804408445", //The client ID of the Application created at https://discordapp.com/developers/applications
});

let details: string, state: string, currentState: string;

presence.on("UpdateData", async () => {
	if (!document.title.includes("Explore live radio by rotating")) {
		details =
			document.querySelector("._title_165lg_36")?.textContent ??
			"Unknown Radio"; // which radio we're tuning right now
		state =
			document.querySelector("._subtitle_165lg_43")?.textContent ??
			"Unknown State/Country"; // the state where the radio serves

		const elapsed = Math.floor(Date.now() / 1000),
			presenceData: PresenceData = {
				details,
				state,
				largeImageKey:
					"https://cdn.rcd.gg/PreMiD/websites/R/Radio%20Garden/assets/logo.png",
				startTimestamp: elapsed,
			};
		currentState = document
			.querySelectorAll("._control_oyndo_11._modPlay_oyndo_53")[0]
			.getAttribute("aria-label"); // get current state of the "button", not the "player", except when loading
		if (currentState.length > 0) {
			switch (currentState) {
				case "stop": {
					// currently playing
					presenceData.smallImageKey = "statusplay";
					presenceData.smallImageText = "Playing";
					presenceData.details = details;
					presenceData.state = state;
					presenceData.startTimestamp = elapsed;

					break;
				}
				case "loading": {
					// currently loading
					presenceData.smallImageKey = "statusplay";
					presenceData.smallImageText = "Tuning";
					presenceData.details = "Tuning";
					delete presenceData.startTimestamp;
					delete presenceData.state;

					break;
				}
				case "play": {
					// currently stopped
					presenceData.smallImageKey = "statusstop";
					presenceData.smallImageText = "Stopped";
					delete presenceData.state;
					presenceData.details = "Stopped";
					delete presenceData.startTimestamp;

					break;
				}
				// No default
			}
		}
		presence.setActivity(presenceData);
	}
});
