const presence = new Presence({
		clientId: "1026169442478084187",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/HBcKcfS.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location,
		pathSplit = pathname.split("/").filter(x => x);

	switch (pathSplit[0] ?? "") {
		case "": {
			presenceData.details = "Browsing";
			presenceData.state = "Home page";
			break;
		}
		case "classes.html": {
			presenceData.details = "Browsing classes";
			presenceData.state = document.querySelector<HTMLTableCellElement>(
				".cls-tbl__disp-name"
			).textContent;
			break;
		}
		case "backgrounds.html":
		case "feats.html":
		case "items.html":
		case "optionalfeatures.html":
		// TODO: fix this
		case "rces.html":
		case "spells.html": {
			const type =
				document.querySelector<HTMLHeadingElement>(".page__title").textContent;
			presenceData.details = `Browsing ${type}`;
			presenceData.state =
				document.querySelector<HTMLHeadingElement>(".stats-name").textContent;
			presenceData.buttons = [
				{
					label: `View ${type.substring(0, type.length - 1)}`,
					url: href,
				},
			];
			break;
		}
	}

	presence.setActivity(presenceData);
});
