const presence = new Presence({
		clientId: "784067980086607952",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [page, , episode] = document.location.pathname.split("/").slice(1, 4),
		[showCover] = await Promise.all([presence.getSetting<boolean>("cover")]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/b3H1vRU.png",
			startTimestamp: browsingTimestamp,
		};

	switch (page) {
		case "anime": {
			presenceData.details = "Watching an anime";
			presenceData.state = episode
				? `${document
						.querySelector("h3.titleA")
						.textContent.trim()}  - Episode ${episode}`
				: document.querySelector("h3.titleA").textContent.trim();
			if (showCover) {
				presenceData.largeImageKey = document
					.querySelector(".cover")
					.getAttribute("src");
			}
			break;
		}
		default:
			presenceData.details = "Looking for an anime to watch";
			presenceData.state = "Home";
			presenceData.smallImageKey = "https://i.imgur.com/poTatnI.png";
	}

	presence.setActivity(presenceData, true);
});
