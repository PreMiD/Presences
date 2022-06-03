const presence = new Presence({
		clientId: "658765364439810048"
	}),
	strings = presence.getStrings({
		view: "presence.viewing"
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/yAhhPzj.png",
		details: `Exploring`,
		startTimestamp: +new Date(),
		buttons: [
			{
				label: "View Page",
				url: location.href
			}
		]
	};

	var page = location.href.split("#")[0].split("?")[0].split("/").slice(-1);

	if (document.getElementById("itemName")) {
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.getElementById("itemImage")
		)).src;

		presenceData.details = `Viewing ${
			document.getElementById("itemName").innerHTML
		}`;

		if (document.getElementById("itemDescription")) {
			presenceData.state = `${
				document.getElementById("itemDescription").innerHTML
			}`;
		}
	} else if (page[0] && !page[0].includes("_")) {
		presenceData.details = `Exploring the ${page} page`;
	}

	if (location.href.includes("#google_vignette")) {
		presenceData.details = `Closing a pop-up ad`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
