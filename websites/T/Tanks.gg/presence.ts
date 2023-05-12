const presence = new Presence({
		clientId: "1003195428642238464",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/jjvJi16.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = window.location;

	if (pathname === "/") presenceData.details = "Browsing the home page";
	else if (document.location.pathname.startsWith("/tank/")) {
		presenceData.details = "Viewing a tank";
		presenceData.state = `${
			document.querySelector(".header-tank > h1").firstChild.textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Tank",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/list/stats")) {
		presenceData.details = "Browsing tanks by stats";
		presenceData.state = `Sorting by: ${
			document.querySelector(
				"#content > div > div.container-fluid.main-container > div > div.filter > div.dropdown.stat > button"
			).textContent
		}`;
		presenceData.buttons = [
			{
				label: "View Page",
				url: href,
			},
		];
	} else if (document.location.pathname.startsWith("/techtree/")) {
		presenceData.details = "Viewing the tech tree";
		presenceData.state = document.querySelector(".current").textContent;
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
	} else if (document.querySelector('[class="player-stats"]')) {
		presenceData.details = `Viewing profile (${
			document.querySelector('[class="dropdown-item active"]').textContent
		})`;
		presenceData.state = `${
			document.querySelector(
				"#content > div > div.container-fluid.main-container > div > div.top-container > div.main-col > h2"
			).firstChild.textContent
		}`;
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
