const presence = new Presence({
		clientId: "1021098794894499952",
	}),

	browsingTimestamp = Math.floor(Date.now() / 1000);

	presence.on("UpdateData", async () => {
		const presenceData: PresenceData = {
				largeImageKey: "https://i.imgur.com/8KLMTMQ.png",
				details: "Browsing..",
				startTimestamp: browsingTimestamp,
			},
			[pathname, hostname, href, URL] = document.location
		
			if (hostname === "polywork.com") {
				presenceData.details = "Home page";
				presenceData.largeImageKey = "polywork";
			if (pathname.includes("/feeds/")) {
					presenceData.details = "Read are news feeds";
					presenceData.state = document.title.split("|")[0];
					presenceData.buttons = [
						{
							label: "Feed",
							url: href,
						},
					];
				}

				else if (document.location.href.includes("/collaborate/")) {
				presenceData.details = "Looking for collaborators";
				presenceData.state = document.title.split("|")[0];
				presenceData.buttons = [
					{
						label: "Collaborate",
						url: href,
					},
				];
			}
		
			else if (document.location.href.includes("/clubs/")) {
			presenceData.details = "Looking for clubs";
			presenceData.state = document.title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Clubs",
					url: location.href,
				},
			];
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else {
		presence.setTrayTitle();
		presence.setActivity();
	}
});
