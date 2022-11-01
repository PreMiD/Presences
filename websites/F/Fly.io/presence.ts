const presence = new Presence({
		clientId: "1036066765735727144",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1rey7rc.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, hostname } = window.location,
		pathSplit = pathname.split("/").slice(1);

	switch (hostname) {
		case "fly.io":
		case "www.fly.io": {
			switch (pathSplit[0]) {
				case "": {
					presenceData.details = "Browsing the homepage";
					break;
				}
				case "blog": {
					break;
				}
				case "docs": {
					break;
				}
				default: {
					presenceData.details = "Browsing";
					presenceData.state = document.title.match(/^(.*)( · .*?)?$/)[1];
					break;
				}
			}
			break;
		}
		case "community.fly.io": {
			break;
		}
	}

	presence.setActivity(presenceData);
});
