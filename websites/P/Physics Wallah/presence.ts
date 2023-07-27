const presence = new Presence({
	clientId: "1134044987277975616",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "phy",
		},
		Path = document.location.pathname;

	if (Path === "/") {
		presenceData.details = "Home";
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = "home";
		presenceData.smallImageText = "Browsing Home Page";
	}

	if (Path.startsWith("/study")) {
		if (Path.endsWith("/my-batches")) {
			presenceData.details = "Studying...";
			presenceData.state = "Viewing Batches";
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
		}

		if (Path.includes("batch-video-player")) {
			presenceData.details = "Studying...";

			const subjective = Path.split("/")[5].split("-");
			let subject = "";

			if (subjective.length > 2) {
				const subjectives = subjective.slice(0, -1);
				for (let i = 0; i < subjectives.length; i++)
					subject += `${subjectives[i]} `;
			}

			if (subjective.length <= 2) subject = subjective[0];
			presenceData.state = `Watching ${subject}`;
			presenceData.smallImageKey = "watching";
			presenceData.smallImageText = "Watching a lecture";
		}
	}

	if (Path.startsWith("/watch")) {
		presenceData.details = "Studying...";

		const subjective = Path.split("subjectSlug=")[1].split("-");
		let subject = "";

		if (subjective.length > 2) {
			const subjectives = subjective.slice(0, -1);
			for (let i = 0; i < subjectives.length; i++)
				subject += `${subjectives[i]} `;
		}

		if (subjective.length <= 2) subject = subjective[0];
		presenceData.state = `Watching ${subject} lecture`;
		presenceData.smallImageKey = "watching";
		presenceData.smallImageText = "Watching a lecture";
	}

	if (Path.includes("subject-topics")) {
		presenceData.details = "Studying...";
		presenceData.state = "Browing Lectures";
		presenceData.smallImageKey = "studying";
		presenceData.smallImageText = "Browing Lectures";
	}

	presence.setActivity(presenceData);
});
