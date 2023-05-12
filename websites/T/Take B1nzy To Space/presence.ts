const presence = new Presence({
		clientId: "735314055861895288",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/ej5mly9.png",
		startTimestamp: browsingTimestamp,
	};

	presenceData.details = `Playing ${
		document.querySelector("#song").textContent
	}`;
	presenceData.state = `Ratelimited for ${
		document.querySelector("#ratelimited-time").textContent
	}s`;
	presence.setActivity(presenceData);
});
