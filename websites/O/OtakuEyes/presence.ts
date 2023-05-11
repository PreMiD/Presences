const presence = new Presence({
		clientId: "784067980086607952",
	}),
	startTimestamp: number = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/b3H1vRU.png",
		startTimestamp,
	};

	const [page, , episode] = document.location.pathname.split("/").slice(1, 4),
		[showCover] = await Promise.all([presence.getSetting<boolean>("cover")]);

	switch (page) {
		case "anime": {
			presenceData.details = "Watching an anime";
			presenceData.state = document
				.querySelector("h3.titleA")
				.textContent.trim();
			if (showCover) {
				presenceData.largeImageKey = document
					.querySelector(".cover")
					.getAttribute("src");
			}
			if (episode) presenceData.state += ` - Episode ${episode}`;
			break;
		}
		default:
			presenceData.details = "Looking for an anime to watch";
			presenceData.state = "Home";
	}

	presence.setActivity(presenceData, true);
});
