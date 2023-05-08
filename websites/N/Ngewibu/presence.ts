const presence = new Presence({
		clientId: "1104875968134397963",
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/UihLFSx.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

presence.on("UpdateData", async () => {
	if (document.location.pathname.startsWith("/play")) {
		presenceData.details = "Watching anime";
		presenceData.state = document
			.querySelector("title")
			.textContent.replace("Nonton ", "")
			.replace(/- NgewibuTV/gi, "");
		presenceData.buttons = [
			{ label: "View Anime", url: document.location.href },
		];
	} else {
		presenceData.details = "Viewing index";
		presenceData.buttons = [
			{ label: "Visit NgewibuTV", url: document.location.href },
		];
	}
	presence.setActivity(presenceData);
});
