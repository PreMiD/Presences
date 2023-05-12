const presence = new Presence({
		clientId: "973710731549745152",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LzdNPBJ.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = window.location;
	switch (true) {
		case pathname.includes("/resources/"): {
			presenceData.smallImageKey = "wiki";
			presenceData.smallImageText = "Wiki";
			presenceData.details = "Reading a wiki page";
			presenceData.state = document.title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Read Page",
					url: location.href,
				},
			];

			break;
		}
		case pathname.includes("/blog"): {
			presenceData.smallImageKey = "blog";
			presenceData.smallImageText = "Blog";
			if (document.title === "Blog | Discord Resources")
				presenceData.details = "Viewing the main page";
			else if (pathname.includes("/tags/")) {
				const pSplit = pathname.split("/");
				presenceData.details = "Looking for posts tagged with:";
				presenceData.state = `"${pSplit[pSplit.length - 1]}"`;
			} else {
				presenceData.details = "Reading a Post";
				presenceData.state = document.title.split("|")[0];
				presenceData.buttons = [
					{
						label: "Read Post",
						url: location.href,
					},
				];
			}
			break;
		}
		case pathname === "/search": {
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = "Searching...";
			if (search) {
				presenceData.details = "Searching for:";
				presenceData.state = document
					.querySelector<HTMLHeadElement>(
						"#__docusaurus > div.main-wrapper > div > h1"
					)
					.textContent.split("Search results for ")[1];
			} else presenceData.details = "Searching for something...";
			break;
		}
		default: {
			presenceData.smallImageKey = "unsupported";
			presenceData.smallImageText = "Unknown";
			presenceData.details = "Viewing an unsupported page";
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
