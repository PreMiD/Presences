const presence = new Presence({
		clientId: "682593223948238849",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function getRow(row: number) {
	const metas = document.querySelectorAll("meta");
	for (const meta of metas) {
		if (meta.getAttribute("property") === `premid:row${row}`)
			return meta.getAttribute("content");
	}
	return;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/T/taiga%20Bot/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};
	presenceData.details = getRow(1);
	presenceData.state = getRow(2);

	if (!presenceData.details) delete presenceData.details;
	if (!presenceData.state) delete presenceData.state;

	presence.setActivity(presenceData);
});
