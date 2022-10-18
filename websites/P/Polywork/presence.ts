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
		{ pathname, hostname, href } = document.location,
		{ title } = document;

	if (hostname === "polywork.com") {
		presenceData.details = "Home page";
		presenceData.largeImageKey = "polywork";
		if (pathname.includes("/feeds/")) {
			presenceData.details = "Read are news feeds";
			presenceData.state = title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Feed",
					url: href,
				},
			];
		} else if (href.includes("/collaborate/")) {
			presenceData.details = "Looking for collaborators";
			presenceData.state = title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Collaborate",
					url: href,
				},
			];
		} else if (href.includes("/clubs/")) {
			presenceData.details = "Looking for clubs";
			presenceData.state = title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Clubs",
					url: href,
				},
			];
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
