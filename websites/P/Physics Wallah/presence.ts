const presence = new Presence({
		clientId: "1134044987277975616",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let mediaTimestamps: [number, number];

const enum Assets {
	Paused = "https://i.imgur.com/nR0HSqz.png",
	HomePage = "https://i.imgur.com/pIrO5z2.png",
	Studying = "https://i.imgur.com/2ZFNWje.png",
	Playing = "https://i.imgur.com/7tDTtPC.png",
	Scrolling = "https://i.imgur.com/klh7wd3.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/OxQKsGm.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location;

	if (Path === "/") {
		presenceData.details = "Home";
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = Assets.HomePage;
		presenceData.smallImageText = "Browsing Home Page";
	}

	if (Path.startsWith("/study")) {
		presenceData.details = "Browsing...";
		presenceData.state = "In website";
		presenceData.smallImageKey = Assets.Scrolling;
		presenceData.smallImageText = "Browsing the website";

		if (Path.endsWith("/my-batches")) {
			presenceData.details = "Studying...";
			presenceData.state = "My Batches";
			presenceData.smallImageKey = Assets.Studying;
			presenceData.smallImageText = "Studying";
		}

		if (Path.includes("batch-overview")) {
			presenceData.details = "Studying...";
			presenceData.state = `Viewing ${
				document.querySelector(".bold.text-white").innerHTML
			}`;
			presenceData.smallImageKey = Assets.Studying;
			presenceData.smallImageText = "Studying";
			presenceData.buttons = [
				{ label: "View Batch", url: document.location.href },
			];
		}

		if (Path.includes("batch-video-player")) {
			const deta = localStorage.getItem("dpp_subject");
			let detal = ` | ${deta}`;

			if (deta === null) detal = "";

			presenceData.details = `Watching Lecture${detal}`;

			presenceData.state = `${
				JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
			}`;
			presenceData.buttons = [
				{ label: "Watch Lecture", url: document.location.href },
			];

			updateVideoTimestamps();
			presenceData.startTimestamp = mediaTimestamps[0];
			presenceData.endTimestamp = mediaTimestamps[1];

			if (document.querySelectorAll(".vjs-paused")) {
				presenceData.smallImageKey = Assets.Paused;
				presenceData.smallImageText = "Paused";
			} else {
				presenceData.smallImageKey = Assets.Playing;
				presenceData.smallImageKey = "Watching a lecture";
			}
		}
	}

	if (Path.startsWith("/watch")) {
		const deta = localStorage.getItem("dpp_subject");
		let detal = ` | ${deta}`;

		if (deta === null) detal = "";

		presenceData.details = `Watching Lecture${detal}`;

		presenceData.state = `${
			JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
		}`;

		presenceData.buttons = [
			{ label: "Watch Lecture", url: document.location.href },
		];

		updateVideoTimestamps();
		presenceData.startTimestamp = mediaTimestamps[0];
		presenceData.endTimestamp = mediaTimestamps[1];

		const video = document.querySelectorAll(".vjs-paused");

		if (video.length > 0) {
			presenceData.smallImageKey = Assets.Paused;
			presenceData.smallImageText = "Paused";
		}

		if (video.length === 0) {
			presenceData.smallImageKey = Assets.Playing;
			presenceData.smallImageKey = "Watching a lecture";
		}
	}

	if (Path.includes("subject-topics")) {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("chapterId") === true) {
			presenceData.details = urlParams.get("subject");
			presenceData.state = urlParams.get("topic");
			presenceData.smallImageKey = Assets.Studying;
			presenceData.smallImageText = "Browsing Resources";
		} else if (urlParams.has("chapterId") === false) {
			presenceData.details = urlParams.get("subject");
			presenceData.state = "Browsing Resources...";
			presenceData.smallImageKey = Assets.Studying;
			presenceData.smallImageText = "Browsing Resources";
		}
	}
	presence.setActivity(presenceData);
});

function updateVideoTimestamps() {
	mediaTimestamps = presence.getTimestamps(
		presence.timestampFromFormat(
			document.querySelector(".vjs-current-time-display").innerHTML
		),
		presence.timestampFromFormat(
			document.querySelector(".vjs-duration-display").innerHTML
		)
	);
}
