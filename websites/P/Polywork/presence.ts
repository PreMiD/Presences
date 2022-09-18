const presence = new Presence({
		clientId: "1021098794894499952",
	}),

	browsingTimestamp = Math.floor(Date.now() / 1000);

	presence.on("UpdateData", async () => {
		const presenceData: PresenceData = {
				largeImageKey: "polywork",
				details: "Browsing..",
				startTimestamp: browsingTimestamp,
			}
		
			if (document.location.hostname == "polywork.com") {
				presenceData.details = "Home page";
				presenceData.largeImageKey = "polywork";
			if (document.location.pathname.includes("/feeds/")) {
					presenceData.details = "Read are news feeds";
					presenceData.state = document.title.split("|")[0];
					presenceData.buttons = [
						{
							label: "Feed",
							url: location.href,
						},
					];
				}

				else if (document.location.pathname.includes("/collaborate/")) {
				presenceData.details = "Looking for collaborators";
				presenceData.state = document.title.split("|")[0];
				presenceData.buttons = [
					{
						label: "Collaborate",
						url: location.href,
					},
				];
			}
		
			else if (document.location.pathname.includes("/clubs/")) {
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

	if (presenceData.details == null) {
		presence.setTrayTitle();
		presence.setActivity();
	  } else {
		presence.setActivity(presenceData);
	  }
});