const presence = new Presence({
	clientId: "658765364439810048"
});

const date = Date.now();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "Logo",
			details: "Exploring",
			startTimestamp: date,
			buttons: [
				{
					label: "View Page",
					url: document.location.href
				}
			]
		},
		page = document.location.pathname;

	if (document.querySelector("#itemName")) {
		presenceData.largeImageKey = 
			document.querySelector<HTMLImageElement>("#itemImage").src;

		presenceData.details = `Viewing ${
			document.querySelector("#itemName").textContent
		}`;

		if (document.querySelector("#itemDescription")) {
			presenceData.state = `${
				document.querySelector("#itemDescription").textContent
			}`;
		}
	} else if (page && !page.includes("_"))
		presenceData.details = `Exploring the ${page} page`;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
