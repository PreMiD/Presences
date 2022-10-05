const presence = new Presence({
		clientId: "1027249400738750625",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Zzh3YNq.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = window.location,
		pathSplit = pathname.split("/").filter(x => x);

	if (hostname === "weather.com") {
		switch (pathSplit[0] ?? "") {
			case "": {
				presenceData.details = "Browsing";
				presenceData.state = "Home page";
				break;
			}
			case "deals": {
				break;
			}
			case "forecast": {
				break;
			}
			case "photos": {
				break;
			}
			case "login":
			case "signup": {
				break;
			}
			case "maps": {
				break;
			}
			case "member": {
				break;
			}
			case "news": {
				break;
			}
			case "safety": {
				break;
			}
			case "slideshows": {
				break;
			}
			case "storms": {
				break;
			}
			case "weather": {
				break;
			}
			default: {
				break;
			}
		}
	} else {
	}

	presence.setActivity(presenceData);
});
