const presence = new Presence({
		clientId: "1080079619367108729",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

var timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	var projectName = document.title.replace(" - Construct 3", "");
	const element = document.querySelector("#propid2");
	var value = "";
	if (element instanceof HTMLInputElement) {
		value = element.value;
	}
	var projectVersion = value;
	if (projectVersion != "" && projectVersion != undefined) {
		projectVersion = " | v:" + projectVersion;
	}
	const presenceData: PresenceData = {
		largeImageKey: "editor",
		startTimestamp: timestamp,
		details:
			projectName == "Game Making Software"
				? "No Project"
				: "Editing a Project",
		state:
			projectName == "Game Making Software"
				? "Idle"
				: projectName + projectVersion,
	};

	presence.setActivity(presenceData);
});
