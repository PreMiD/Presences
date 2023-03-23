const presence = new Presence({
		clientId: "1050466196220289104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zg32aGw.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname.split("/").filter(x => x);

	switch (hostname) {
		case "ankiweb.net": {
			if (pathList[0] === "account") {
				switch (pathList[1]) {
					case "login":
					case "register": {
						presenceData.details = "Logging in";
						break;
					}
					case "terms": {
						presenceData.details = "Reading the terms of service";
						break;
					}
					case "privacy": {
						presenceData.details = "Reading the privacy policy";
						break;
					}
					default: {
						presenceData.details = "Managing account settings";
					}
				}
			} else if (pathList[0] === "decks") {
				switch (pathList[1] ?? "") {
					case "": {
						presenceData.details = "Browsing decks";
						const [dueItems, newItems] = [
							...document.querySelectorAll(".deckDueNumber"),
						].reduce(
							(current, item, index) => {
								if (index % 2) {
									current[0] += +item.textContent;
								} else {
									current[1] += +item.textContent;
								}
								return current;
							},
							[0, 0]
						);
						presenceData.state = `${dueItems} due, ${newItems} new`;
						break;
					}
				}
			}
			break;
		}
		case "ankiuser.net": {
			break;
		}
		case "apps.ankiweb.net": {
			presenceData.details = "Downloading Anki";
			break;
		}
		case "changes.ankiweb.net": {
			break;
		}
		case "docs.ankiweb.net": {
			presenceData.details = "Reading the docs";
			presenceData.state =
				document.querySelector<HTMLAnchorElement>(".header").textContent;
			break;
		}
		case "faqs.ankiweb.net": {
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
