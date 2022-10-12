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
		locationName = document.querySelector<HTMLSpanElement>(
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
						presenceData.state = locationName;
						break;
					}
					case "allergy": {
						presenceData.details = "Viewing allergy forecast";
						presenceData.state = `${
							document.querySelector("h2").textContent
						} for ${locationName}`;
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
			case "slideshows":
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
				presenceData.details = "Managing account";
				break;
			}
			case "news": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing news";
						break;
					}
					case "news": {
						presenceData.details = "Reading a news article";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Read Article", url: href }];
						break;
					}
					default: {
						if (pathname.includes("/video")) {
							presenceData.details = "Watching a news video";
							presenceData.state = pageTitle;
							presenceData.buttons = [{ label: "Watch Video", url: href }];
						}
					}
				}
				break;
			}
			case "safety": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing safety stories";
						break;
					}
					case "video": {
						presenceData.details = "Watching a safety video";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Watch Video", url: href }];
						break;
					}
					case "news": {
						presenceData.details = "Reading a safety article";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Read Article", url: href }];
						break;
					}
				}
				break;
			}
			case "science": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing science stories";
						break;
					}
					case "video": {
						presenceData.details = "Watching a science video";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Watch Video", url: href }];
						break;
					}
					case "news": {
						presenceData.details = "Reading a science article";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Read Article", url: href }];
						break;
					}
				}
				break;
			}
			case "sports-recreation": {
				switch (pathSplit[1] ?? "") {
					case "": {
						presenceData.details = "Browsing sports & recreation stories";
						break;
					}
					case "video": {
						presenceData.details = "Watching a sports & recreation video";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Watch Video", url: href }];
						break;
					}
					case "news": {
						presenceData.details = "Reading a sports & recreation article";
						presenceData.state = pageTitle;
						presenceData.buttons = [{ label: "Read Article", url: href }];
						break;
					}
					case "fishing": {
						if (pathSplit[2] === "video") {
							presenceData.details = "Watching a fishing video";
							presenceData.state = pageTitle;
							presenceData.buttons = [{ label: "Watch Video", url: href }];
						} else {
							presenceData.details = "Browsing fishing stories";
						}
					}
				}
				break;
			}
			case "storms": {
				switch (pathSplit[1]) {
					case "tornado": {
						switch (pathSplit[2] ?? "") {
							case "": {
								presenceData.details = "Browsing tornado stories";
								break;
							}
							case "video": {
								presenceData.details = "Watching a tornado video";
								presenceData.state = pageTitle;
								presenceData.buttons = [{ label: "Watch Video", url: href }];
								break;
							}
							case "news": {
								presenceData.details = "Reading a tornado article";
								presenceData.state = pageTitle;
								presenceData.buttons = [{ label: "Read Article", url: href }];
								break;
							}
						}
						break;
					}
					case "hurricane": {
						switch (pathSplit[2] ?? "") {
							case "": {
								presenceData.details = "Browsing hurricane stories";
								break;
							}
							case "video": {
								presenceData.details = "Watching a hurricane video";
								presenceData.state = pageTitle;
								presenceData.buttons = [{ label: "Watch Video", url: href }];
								break;
							}
							case "news": {
								presenceData.details = "Reading a hurricane article";
								presenceData.state = pageTitle;
								presenceData.buttons = [{ label: "Read Article", url: href }];
								break;
							}
						}
						break;
					}
				}
				break;
			}
			case "subscribe": {
				presenceData.details = "Subscribing";
				break;
			}
			case "travel": {
				break;
			}
			case "weather": {
				switch (pathSplit[1]) {
					case "today": {
						presenceData.details = "Browsing today's weather forecast";
						presenceData.state = locationName;
						break;
					}
					case "hourbyhour": {
						presenceData.details = "Browsing hourly weather forecast";
						presenceData.state = locationName;
						break;
					}
					case "tenday": {
						presenceData.details = "Browsing 10-day weather forecast";
						presenceData.state = locationName;
						break;
					}
					case "weekend": {
						presenceData.details = "Browsing weekend weather forecast";
						presenceData.state = locationName;
						break;
					}
					case "monthly": {
						presenceData.details = "Browsing monthly weather forecast";
						presenceData.state = locationName;
						break;
					}
					case "radar": {
						presenceData.details = "Viewing weather radar";
						presenceData.state = locationName;
						break;
					}
				}
				break;
			}
			default: {
				presenceData.details = "Browsing";
				presenceData.state = document.title.match(/^(.*?)( \| The Weather Channel)?$/)[1];
				break;
			}
		}
	} else if (hostname === "features.weather.com") {
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
