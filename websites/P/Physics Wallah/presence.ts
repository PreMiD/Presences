const presence = new Presence({
		clientId: "1134044987277975616",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},Path = document.location.pathname;

	presenceData.largeImageKey = "pw";

	if (Path === "/") {
		console.log("working");
		presenceData.details="Home";
		presenceData.state="Browsing...";
		presenceData.smallImageKey="home";
		presenceData.smallImageText="Browsing Home Page";
	};

	if (Path.startsWith("/study")) {
		console.log("working-study");

		if (Path.endsWith("/my-batches")) {
			console.log("working");
			presenceData.details = "Studying...";
			presenceData.state = "Viewing Batches";
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Studying";
		};

		if (Path.includes("batch-overview")) {
			console.log("working");
			presenceData.details = "Studying...";
			const batchname = document.querySelector(".bold.text-white").innerHTML;
			presenceData.state = "Viewing "+batchname;
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Studying";
		};

		if (Path.includes("batch-video-player")) {
			console.log("working");
			presenceData.details = "Studying...";
			const subjects = Path.split("/")[5];
			let subjective = subjects.split("-");
			let subject = "";

			if (subjective.length > 2) {
				const subjectives = subjective.slice(0, -1);
				for (var i = 0; i < subjectives.length; i++) {
					subject+=subjectives[i]+" ";
			};
		};

			if (subjective.length <= 2) {
				subject = subjective[0];
			};

			presenceData.state = "Watching "+subject;
			presenceData.smallImageKey = "watching";
			presenceData.smallImageText = "Watching a lecture";
		};
	};

	if (Path.startsWith("/watch")) {
		console.log("working-watch");
		presenceData.details = "Studying...";
		const subjects  = Path.split("subjectSlug=")[1];
		let subjective = subjects.split("-");
		let subject = "";

		if (subjective.length > 2) {
			const subjectives = subjective.slice(0, -1);
			for (var i = 0; i < subjectives.length; i++) {
				subject+=subjectives[i]+" ";
		};
	};

		if (subjective.length <= 2) {
			subject = subjective[0];
		};
		presenceData.state="Watching "+subject+" lecture";
		presenceData.smallImageKey = "watching";
		presenceData.smallImageText = "Watching a lecture";
	};

	if (Path.includes("subject-topics")) {
		presenceData.details = "Studying...";
		presenceData.state = "Browing Lectures";
		presenceData.smallImageKey = "studying";
		presenceData.smallImageText = "Browing Lectures";
	};


	presence.setActivity(presenceData);
});
