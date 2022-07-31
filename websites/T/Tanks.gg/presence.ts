const presence = new Presence({
		clientId: "1003195428642238464",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/PjDWjpk.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location;

	if (pathname === "/") presenceData.details = "Browsing the home page";
	else if (document.location.pathname.startsWith("/tank/")) {
		presenceData.details = "Viewing a tank";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" - World of Tanks - tanks.gg", "")}`;
		presenceData.buttons = [
			{
				label: "View Tank",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/techtree/")) {
		presenceData.details = "Viewing the tech tree";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" - Tech Tree - World of Tanks - tanks.gg", "")}`;
		presenceData.buttons = [
			{
				label: "View Tech Tree",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/compare/")) {
		presenceData.details = "Comparing tanks";
		presenceData.buttons = [
			{
				label: "View Comparison",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/na/")) {
		presenceData.details = "Viewing profile (NA)";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" - World of Tanks - tanks.gg", "")
			.replace("World of Tanks - tanks.gg", "")}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/eu/")) {
		presenceData.details = "Viewing profile (EU)";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" - World of Tanks - tanks.gg", "")
			.replace("World of Tanks - tanks.gg", "")}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/asia/")) {
		presenceData.details = "Viewing profile (Asia)";
		presenceData.state = `${document
			.querySelector("head > title")
			.textContent.replace(" - World of Tanks - tanks.gg", "")
			.replace("World of Tanks - tanks.gg", "")}`;
		presenceData.buttons = [
			{
				label: "View Profile",
				url: href,
			},
		];
	} else {
		switch (pathname) {
			case "/list": {
				presenceData.details = "Browsing tanks";
				break;
			}
			case "/list/stats": {
				presenceData.details = "Browsing tanks by stats";
				break;
			}
			case "/compare": {
				presenceData.details = "Comparing tanks";
				break;
			}
			case "/about": {
				presenceData.details = "Viewing the about page";
				break;
			}
			case "/privacy": {
				presenceData.details = "Viewing the privacy policy";
				break;
			}
		}
	}
	presence.setActivity(presenceData);
});
