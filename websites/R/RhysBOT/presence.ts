const presence = new Presence({
		clientId: "658765364439810048"
	}),
	date = Date.now();

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo",
		details: "Exploring",
		startTimestamp: date,
		buttons: [
			{
				label: "View Website",
				url: document.location.href
			}
		]
	};

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

		presenceData.buttons[0].label = `View ${
			document.querySelector("#itemName").textContent
		}`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
