const presence = new Presence({
		clientId: "1031601950539661363",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/lu1BuFT.png",
			startTimestamp: browsingTimestamp,
		},
		pathSplit = window.location.pathname.split("/").slice(1),
		showImages = await presence.getSetting("showImages");

	switch (pathSplit[0] ?? "") {
		case "": {
			presenceData.details = "Browsing homepage";
			break;
		}
		case "archive": {
			presenceData.details = "Browsing archived tweets";
			break;
		}
		case "maker": {
			presenceData.details = "Creating a GIF";
			if (pathSplit[1]) {
				const outputImage =
					document.querySelector<HTMLImageElement>("#output img");
				if (outputImage && showImages)
					presenceData.largeImageKey = outputImage.src;
			}
			break;
		}
	}

	presence.setActivity(presenceData);
});
