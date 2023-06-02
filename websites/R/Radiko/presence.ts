const presence = new Presence({
		clientId: "736620343279484959",
	}),
	_preStrings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});

// Pre-declare variable
let radioStation = "",
	startTimeStamp = Date.now();

presence.on("UpdateData", async () => {
	// code
	const preStrings = await _preStrings,
		presenceData: PresenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/Radiko/assets/logo.png",
		};

	// In Radio
	if (
		(document.querySelector("#stream-player") as HTMLElement).style.display ===
		"block"
	) {
		const [codeChannel] = document
			.querySelector("a.slick-slide:nth-child(1)")
			.getAttribute("href")
			.split("/")
			.slice(-1);
		// If play
		if (document.querySelector(".icon--play-02").classList.contains("on")) {
			// This logic make timestamp can't changed.
			if (codeChannel !== radioStation) {
				radioStation = codeChannel;
				startTimeStamp = Date.now();
			}

			presenceData.details = `Listening to ${radioStation} channel.`;
			presenceData.state = document.querySelector<HTMLElement>(
				"a.slick-slide:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
			).textContent;
			presenceData.smallImageKey = "spiriteplay";
			presenceData.smallImageText = preStrings.play;
			presenceData.startTimestamp = startTimeStamp;
		} else {
			// If pause
			if (codeChannel !== "___PAUSED___") {
				radioStation = "___PAUSED___";
				startTimeStamp = Date.now();
			}

			presenceData.details = "Paused.";
			presenceData.state = `${codeChannel} channel.`;
			presenceData.smallImageKey = "spiritepause";
			presenceData.smallImageText = preStrings.pause;
		}
	} else {
		// Idling state
		presenceData.details = "Idling";
		presenceData.smallImageKey = "spiriteidling";
		presenceData.smallImageText = preStrings.browsing;
	}

	presence.setActivity(presenceData);
});
