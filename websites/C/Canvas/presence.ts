const presence = new Presence({
		clientId: "1023383174027415572",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/DRlJvzX.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = window.location,
		pathSplit = pathname.split("/").filter(val => val);

	if (hostname === "www.canvas.net") {
		switch (pathSplit[0] ?? "") {
			case "": {
				presenceData.details = "Browsing catalog";
				break;
			}
			case "browse": {
				presenceData.details = "Browsing course details";
				presenceData.state =
					document.querySelector<HTMLHeadingElement>(".h1").textContent;
				break;
			}
			case "courses": {
				presenceData.details = "Enrolling in a course";
				presenceData.state =
					document.querySelector<HTMLSpanElement>(
						"h2 > span"
					).lastChild.textContent;
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing their dashboard";
				break;
			}
			case "order_items": {
				presenceData.details = "Viewing their purchase history";
				break;
			}
		}
	} else {
		switch (pathSplit[0]) {
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
