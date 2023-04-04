const browsingTimestamp = Math.floor(Date.now() / 1000),
	presence = new Presence({
		clientId: "785958064192749600",
	});
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/oOfAfMP.png",
		startTimestamp: browsingTimestamp,
	};
	if (document.location.hostname === "pxls.space") {
		presenceData.state = `Canvas: ${
			document.querySelector("#current-pixel-count").textContent
		}`;
		presenceData.details = `All time: ${
			document.querySelector("#alltime-pixel-count").textContent
		}`;
		presence.setActivity(presenceData);
	}
});
