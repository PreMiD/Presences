const presence = new Presence({
		clientId: "1134044987277975616",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},Path = document.location.pathname;

	if (Path === "/") {
		presenceData.details="Home";
		presenceData.state="Browsing...";
		presenceData.smallImageKey="Home";
		presenceData.smallImageText="Browsing Home Page";
	}

	if (Path.startsWith("/study")) {
		if (Path.endsWith("/my-batches")) {
			presenceData.details = "Studying...";
			presenceData.state = "Viewing Batches";
			presenceData.smallImageKey = "Studying";
			presenceData.smallImageText = "Studying";
		};

		if (Path.includes("batch-overview")) {
			presenceData.details = "Studying...";
			const batchname = document.querySelectorAll(".bold.text-white");
			presenceData.state = "Viewing "+batchname;
			presenceData.smallImageKey = "Studying";
			presenceData.smallImageText = "Studying";
		};

		if (Path.includes("batch-view-player")) {
			presenceData.details = "Studying...";
			const subjects = Path.split("/")[5];
			const subject = subjects.split("-")[0];
			presenceData.state = "Watching "+subject+" lecture";
			presenceData.smallImageKey = "Watching";
			presenceData.smallImageText = "Watching a lecture";
		};
	};

	if (Path.startsWith("/watch")) {
		presenceData.details = "Studying...";
		const subjects  = Path.split("subjectSlug=")[1];
		const subject = subjects.split("-")[0];
		presenceData.state="Watching "+subject+" lecture";
		presenceData.smallImageKey = "Watching";
		presenceData.smallImageText = "Watching a lecture";
	};


	presence.setActivity(presenceData);
});
