const presence = new Presence({
	clientId: "658765364439810048"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/yAhhPzj.png",
			details: "Exploring",
			startTimestamp: Date.now(),
			buttons: [
				{
					label: "View Page",
					url: location.href
				}
			]
		},
		page = location.href.split("#")[0].split("?")[0].split("/").slice(-1);

	if (document.querySelector("#itemName")) {
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector("#itemImage")
		)).src;

		presenceData.details = `Viewing ${
			document.querySelector("#itemName").innerHTML
		}`;

		if (document.querySelector("#itemDescription")) {
			presenceData.state = `${
				document.querySelector("#itemDescription").innerHTML
			}`;
		}
	} else if (page[0] && !page[0].includes("_"))
		presenceData.details = `Exploring the ${page} page`;

	if (location.href.includes("#google_vignette"))
		presenceData.details = "Closing a pop-up ad";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
