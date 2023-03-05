const presence = new Presence({
		clientId: "1003750528242692096",
	}),
	browsingUnix = Math.floor((Date.now() / 1000) | 0);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/2dILrRV.png",
	};
	let title: HTMLElement, logo: HTMLElement, dashboardInfo: HTMLElement;

	if (document.location.hostname === "ticketerbot.com") {
		presenceData.startTimestamp = browsingUnix;
		switch (document.URL) {
			case "https://ticketerbot.com/commands": {
				presenceData.details = "Viewing the commands-page";
				break;
			}
			case "https://ticketerbot.com/changelog": {
				presenceData.details = "Viewing the changelog-page";
				break;
			}
			case "https://ticketerbot.com/contribute": {
				presenceData.details = "Viewing the contribution-page";
				break;
			}
			case "https://ticketerbot.com/dashboard": {
				presenceData.details = "Visiting the dashboard";
				break;
			}
			case `https://ticketerbot.com/dashboard/${document.URL.slice(34)}`: {
				if (document.querySelector(".server-info > h3")) {
					title = document.querySelector(".server-info > h3");
					logo = document.querySelector(".server-info > img");
					dashboardInfo = document.querySelector(".informations-nav > h2");

					presenceData.details = "Server Settings - Editing:";
					presenceData.state = title.textContent;
					presenceData.smallImageKey = logo.getAttribute("src");
				}
				switch (dashboardInfo.textContent) {
					case "Stats": {
						presenceData.details = "Server Stats - Viewing:";
						break;
					}
					case "Tickets": {
						presenceData.details = "Ticket History - Viewing:";
						break;
					}
					case "Staff": {
						presenceData.details = "Staff Actvity - Viewing:";
						break;
					}
				}
				break;
			}
			default: {
				presenceData.details = "Viewing the homepage";
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
