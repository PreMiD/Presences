const presence = new Presence({
		clientId: "1067711765770682388",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/mwpEkf3.png",
		startTimestamp: browsingTimestamp,
	};
	switch (document.location.hostname) {
		case "kemono.party": {
			switch (document.location.pathname) {
				case "/": {
					presenceData.details = "Viewing home page";
					break;
				}
				case "/importer": {
					presenceData.details = "Importing from Paysite";
					break;
				}
				case "/importer/tutorial": {
					presenceData.details = "Reading FAQ";
					break;
				}
				case "/account/": {
					presenceData.details = "Checking out their account";
					break;
				}
				case "/account/keys": {
					presenceData.details = "Checking out their keys";
					break;
				}
				case "/posts": {
					presenceData.details = "Browsing through posts";
					break;
				}
				case "/favorites": {
					presenceData.details = "Checking out their favorites";
					break;
				}
				case "/dmca": {
					presenceData.details = "Reading DMCA notice";
					break;
				}
				case "/artists": {
					presenceData.details = "Browsing through artists";
					break;
				}
				case "/artists/updated": {
					presenceData.details = "Browsing through updated artists";
					break;
				}
				default:
					if (location.pathname.includes("/user/")) {
						if (location.pathname.includes("/post/")) {
							presenceData.details = `${
								document.querySelector(
									"#page > header > div.post__info > h1 > span:nth-child(1)"
								).textContent
							}`;
							presenceData.state = `${document
								.querySelector("a[class='post__user-name']")
								.textContent.replace(/\s+/g, "")}`;
						} else {
							presenceData.details = "Checking out:";
							presenceData.state = `${
								document.querySelector(
									"#user-header__info-top > a > span:nth-child(2)"
								).textContent
							}`;
							presenceData.largeImageKey = `${
								(<HTMLImageElement>(
									document.querySelector(
										"#main > section > header > a > picture > img"
									)
								)).src
							}`;
						}
					}
			}
			break;
		}
		case "status.kemono.party": {
			presenceData.details = "Checking server status";
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
