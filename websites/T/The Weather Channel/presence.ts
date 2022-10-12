const presence = new Presence({
		clientId: "1027249400738750625",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Zzh3YNq.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = window.location,
		pathSplit = pathname.split("/").filter(x => x),
		location = document.querySelector<HTMLSpanElement>(
			"[class*='--locationName--']"
		)?.textContent,
		pageTitle = document.querySelector("h1")?.textContent;

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
					presenceData.state = pageTitle;
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
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Read Article", url: href }];
						break;
					}
				}
				break;
			}
			case "health": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing health stories";
						break;
					}
					case "cold-flu": {
						if (pathSplit[2]) {
							presenceData.details = "Reading cold & flu news";
							presenceData.state = pageTitle;
						} else {
							presenceData.details = "Browsing cold & flu stories";
							break;
						}
						break;
					}
					case "video": {
						presenceData.details = "Watching a health video";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Watch Video", url: href }];
						break;
					}
				}
				break;
			}
			case "photos": {
				if (pathSplit[1] === "news") {
					presenceData.details = "Viewing a photo";
					presenceData.state = pageTitle;
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"[id*='int-image'] img"
					).src;
					presenceData.buttons = [{ label: "View Photo", url: href }];
				} else {
					presenceData.details = "Browsing photo stories";
				}
				break;
			}
			case "promos": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing promos";
						break;
					}
					case "video": {
						presenceData.details = "Watching a promo video";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Watch Video", url: href }];
						break;
					}
				}
				break;
			}
			case "login":
			case "signup": {
				presenceData.details = "Logging in";
				break;
			}
			case "maps": {
				presenceData.details = "Viewing a map";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View Map", url: href }];
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
			case "science": {
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
			case "subscribe": {
				break;
			}
			case "travel": {
				break;
			}
			case "tv": {
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
