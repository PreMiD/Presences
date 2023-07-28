const presence = new Presence({
	clientId: "1134044987277975616",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "phy",
		},
		Path = document.location.pathname;

	presenceData.buttons = [
		{ label: "Open Website", url: document.location.href },
	];

	if (Path === "/") {
		presenceData.details = "Home";
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Browsing Home Page";
	}

	if (Path.startsWith("/study")) {
		presenceData.details = "Browsing...";
		presenceData.state = "In website";
		presenceData.smallImageKey = "scroll";
		presenceData.smallImageText = "Browsing the website";

		if (Path.endsWith("/my-batches")) {
			presenceData.details = "Studying...";
			presenceData.state = "My Batches";
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Studying";
		}

		if (Path.includes("batch-overview")) {
			presenceData.details = "Studying...";

			presenceData.state = `Viewing ${
				document.querySelector(".bold.text-white").innerHTML
			}`;
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Studying";
			presenceData.buttons = [
				{ label: "View Batch", url: document.location.href },
			];
		}

		if (Path.includes("batch-video-player")) {
			presenceData.details =
				"Watching Lecture " + `| ${localStorage.getItem("dpp_subject")}`;

			presenceData.state = `${
				JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
			}`;
			presenceData.smallImageKey = "watching";
			presenceData.smallImageText = "Watching a lecture";
			presenceData.buttons = [
				{ label: "Watch Lecture", url: document.location.href },
			];
		}
	}

	if (Path.startsWith("/watch")) {
		presenceData.details =
			"Watching Lecture " + `| ${localStorage.getItem("dpp_subject")}`;

		presenceData.state = `${
			JSON.parse(localStorage.getItem("VIDEO_DETAILS")).topic
		}`;
		presenceData.smallImageKey = "watching";
		presenceData.smallImageText = "Watching a lecture";
		presenceData.buttons = [
			{ label: "Watch Lecture", url: document.location.href },
		];
	}

	if (Path.includes("subject-topics")) {
		const urlParams = new URLSearchParams(window.location.search);

		if (urlParams.has("chapterId") === true) {
			presenceData.details = urlParams.get("subject");
			presenceData.state = urlParams.get("topic");
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Browsing Resources";
		} else if (urlParams.has("chapterId") === false) {
			presenceData.details = urlParams.get("subject");
			presenceData.state = "Browsing Resources...";
			presenceData.smallImageKey = "studying";
			presenceData.smallImageText = "Browsing Resources";
		}
	}
	presence.setActivity(presenceData);
});
