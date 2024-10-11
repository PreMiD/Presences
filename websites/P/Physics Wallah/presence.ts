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
		{ pathname, href, search } = document.location,
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
		} else if (pathname.includes("batch-overview")) {
			presenceData.details = "Studying...";
			presenceData.state = `Viewing ${
				document.querySelector(".bold.text-white").textContent
			}`;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = "Studying";
			presenceData.buttons = [{ label: "View Batch", url: href }];
		} else if (pathname.includes("batch-video-player")) {
			const deta = localStorage.getItem("dpp_subject");
			let detal = ` | ${deta}`;
			if (deta === null) detal = "";
			if (!privacyMode) {
				presenceData.details = `Watching Lecture${detal}`;

				presenceData.state = `${
					JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
				}`;
				presenceData.buttons = [{ label: "Watch Lecture", url: href }];
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
		} else if (pathname.includes("subject-topics")) {
			const urlParams = new URLSearchParams(search);

			if (urlParams.has("chapterId")) {
				presenceData.details = urlParams.get("subject");
				presenceData.state = urlParams.get("topic");
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Browsing Resources";
			} else if (!urlParams.has("chapterId")) {
				presenceData.details = urlParams.get("subject");
				presenceData.state = "Browsing Resources...";
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = "Browsing Resources";
			}
		} else if (pathname.includes("open-pdf")) {
			if (localStorage.getItem("dpp_subject")) {
				presenceData.details = "Solving DPP (PDF)";
				if (!privacyMode)
					presenceData.state = localStorage.getItem("dpp_subject");
				else presenceData.state = "Improving skills";

				presenceData.startTimestamp = browsingTimestamp;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = "Viewing DPP";
			}
		} else if (pathname.includes("q-bank-exercise")) {
			presenceData.details = "Solving DPP (MCQ)";
			if (!privacyMode)
				presenceData.state = localStorage.getItem("dpp_subject");
			else presenceData.state = "Improving skills";

			presenceData.startTimestamp = browsingTimestamp;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = "Viewing DPP";
		}
	} else if (pathname.startsWith("/watch")) {
		const deta = localStorage.getItem("dpp_subject");
		let detal = ` | ${deta}`;
		if (deta === null) detal = "";
		if (!privacyMode) {
			presenceData.details = `Watching Lecture${detal}`;

			presenceData.state = `${
				JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
			}`;

			presenceData.buttons = [{ label: "Watch Lecture", url: href }];
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
