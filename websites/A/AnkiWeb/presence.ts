const presence = new Presence({
		clientId: "1050466196220289104",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/zg32aGw.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
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
					case "share": {
						presenceData.details = "Sharing a deck";
						break;
					}
				}
			} else if (pathList[0] === "search") {
				presenceData.details = "Searching for cards";
				presenceData.state = document.querySelector("small").textContent;
			} else if (pathList[0] === "shared") {
				switch (pathList[1]) {
					case "decks": {
						if (pathList[2]) {
							presenceData.details = "Viewing shared decks by term";
							presenceData.state = document.querySelector("h1").textContent;
						}
						break;
					}
					case "info": {
						presenceData.details = "Viewing a shared deck";
						presenceData.state = document.querySelector("h1").textContent;
						presenceData.buttons = [{ label: "View Deck", url: href }];
						break;
					}
					case "mine": {
						presenceData.details = "Viewing their shared decks";
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
