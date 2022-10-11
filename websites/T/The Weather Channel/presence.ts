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
		pathSplit = pathname.split("/").filter(x => x),
		location = document.querySelector<HTMLSpanElement>(
			"[class*='--locationName--']"
		)?.textContent;

	if (hostname === "weather.com") {
		switch (pathSplit[0] ?? "") {
			case "": {
				presenceData.details = "Browsing";
				presenceData.state = "Home page";
				break;
			}
			case "deals": {
				if (pathSplit[2] === "news") {
					presenceData.details = "Reading about a deal";
					presenceData.state = document.querySelector("h1").textContent;
				} else {
					presenceData.details = "Browsing deals";
				}
				break;
			}
			case "forecast": {
				switch (pathSplit[1]) {
					case "air-quality": {
						presenceData.details = "Viewing air quality forecast";
						presenceData.state = location;
						break;
					}
					case "allergy": {
						presenceData.details = "Viewing allergy forecast";
						presenceData.state = `${
							document.querySelector("h2").textContent
						} for ${location}`;
						break;
					}
					case "cold-flu": {
						presenceData.details = "Viewing cold & flu forecasts";
						break;
					}
					case "news": {
						presenceData.details = "Reading forecast news";
						presenceData.state = document.querySelector("h1").textContent;
						break;
					}
				}
				break;
			}
			case "health": {
				break;
			}
			case "photos": {
				break;
			}
			case "promos": {
				break;
			}
			case "login":
			case "signup": {
				presenceData.details = "Logging in";
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
			case "sports-recreation": {
				break;
			}
			case "slideshows": {
				break;
			}
			case "storms": {
				break;
			}
			case "travel": {
				break;
			}
			case "weather": {
				break;
			}
			default: {
				break;
			}
		}
	} else if (hostname === "features.weather.com") {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
