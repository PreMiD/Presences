const presence = new Presence({
		clientId: "934018090688204830"
	}),
	time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		smallImageText: "ZNotes",
		startTimestamp: time
	};

	let path = document.location.pathname;
	if (path.endsWith("/")) path = path.substring(0, path.length - 1);

	if (path.startsWith("/")) path = path.substring(1);

	const title = document.title.split(" | ");
	if (path.split("/").length === 5) {
		presenceData.details = `Studying ${title[1]}`;
		const progress = document.getElementsByClassName(
			"notes-viewer-progressbar"
		)[0];

		if (progress && !isNaN(Number(progress.getAttribute("aria-valuenow")))) {
			presenceData.state = `${progress.getAttribute("aria-valuenow")}% | ${
				title[0]
			}`;
		} else presenceData.state = `${title[0]}`;

		const logo = document.getElementsByClassName("subject-logo")[0];
		if (logo) {
			presenceData.largeImageKey = logo
				.getAttribute("src")
				.split("/")
				.pop()
				.split(".")[0]
				.toLowerCase();
		}

		presenceData.smallImageKey = "logo";
	} else {
		presenceData.details = "Browsing the website";
		presenceData.state = `Viewing ${title.join(" | ")}`;
		presenceData.largeImageKey = "logo";
		presenceData.smallImageKey = "";
	}
	presence.setActivity(presenceData);
});
