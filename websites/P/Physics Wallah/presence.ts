const presence = new Presence({
		clientId: "1134044987277975616",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	HomePage = "https://cdn.rcd.gg/PreMiD/websites/P/Physics%20Wallah/assets/0.png",
	Scrolling = "https://cdn.rcd.gg/PreMiD/websites/P/Physics%20Wallah/assets/1.png",
	Logo = "https://cdn.rcd.gg/PreMiD/websites/P/Physics%20Wallah/assets/logo.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			type: ActivityType.Watching,
		},
		{ pathname, href } = document.location,
		fullurl = href,
		privacyMode = await presence.getSetting<boolean>("privacy");

	if (pathname === "/") {
		presenceData.details = "Home";
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = Assets.HomePage;
		presenceData.smallImageText = "Browsing Home Page";
	} else if (pathname.startsWith("/study")) {
		presenceData.details = "Browsing...";
		presenceData.state = "In website";
		presenceData.smallImageKey = Assets.Scrolling;
		presenceData.smallImageText = "Browsing the website";

		if (pathname.endsWith("/my-batches")) {
			presenceData.details = "Studying...";
			presenceData.state = "My Batches";
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Studying";
		}
		if (fullurl.includes("batch-overview")) {
			presenceData.details = "Studying...";
			presenceData.state = `Viewing ${
				JSON.parse(localStorage.getItem("BATCH_DETAILS")).name
			}`;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Studying";
			presenceData.buttons = [{ label: "View Batch", url: fullurl }];
		} else if (fullurl.includes("batch-video-player")) {
			const deta = localStorage.getItem("dpp_subject");
			let detal = ` | ${deta}`;
			if (deta === null) detal = "";
			if (!privacyMode) {
				presenceData.details = `Watching Lecture${detal}`;

				presenceData.state = `${
					JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
				}`;
				presenceData.buttons = [{ label: "Watch Lecture", url: fullurl }];
			} else presenceData.details = `Watching a lecture${detal}`;

			if (document.querySelectorAll(".vjs-paused").length < 1) {
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Watching a lecture";
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					updateVideoTimestamps();
			} else {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "Paused";
			}
		} else if (fullurl.includes("subject-topics")) {
			const details = JSON.parse(localStorage.getItem("SCHEDULE_DETAILS"));
			if (fullurl.includes("chapterId")) {
				presenceData.details = details.tags[0];
				presenceData.state = details.subject.name;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Browsing Resources";
			} else if (!fullurl.includes("chapterId")) {
				presenceData.details = details.subject.name;
				presenceData.state = "Browsing Resources...";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Browsing Resources";
			}
		} else if (fullurl.includes("open-pdf")) {
			const dpp_subject = localStorage.getItem("dpp_subject");
			if (dpp_subject) {
				presenceData.details = "Solving DPP (PDF)";
				if (!privacyMode)
					presenceData.state = dpp_subject;
				else presenceData.state = "Improving skills";

				presenceData.startTimestamp = browsingTimestamp;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Viewing DPP";
			}
		} else if (fullurl.includes("q-bank-exercise")) {
			presenceData.details = "Solving DPP (MCQ)";
			if (!privacyMode)
				presenceData.state = localStorage.getItem("dpp_subject");
			else presenceData.state = "Improving skills";

			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing DPP";
		}
	} else if (pathname.startsWith("/watch")) {
		const deta = JSON.parse(localStorage.getItem("SCHEDULE_DETAILS"));
		let detal = ` | ${deta.subject}`;
		if (deta.subject === null) detal = "";
		if (!privacyMode) {
			presenceData.details = `Watching Lecture${detal}`;

			presenceData.state = `${
				deta.topic
			}`;

			presenceData.buttons = [{ label: "Watch Lecture", url: fullurl }];
		} else {
			presenceData.details = "Watching a lecture";
			presenceData.state = `Subject: ${deta}`;
		}
		if (document.querySelectorAll(".vjs-paused").length < 1) {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Watching a lecture";
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				updateVideoTimestamps();
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Paused";
		}
	}
	presence.setActivity(presenceData);
});

function updateVideoTimestamps() {
	return presence.getTimestamps(
		presence.timestampFromFormat(
			document.querySelector(".vjs-current-time-display").textContent
		),
		presence.timestampFromFormat(
			document.querySelector(".vjs-duration-display").textContent
		)
	);
}
