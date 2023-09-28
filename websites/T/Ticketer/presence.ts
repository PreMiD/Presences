const presence = new Presence({
		clientId: "1003750528242692096",
	}),
	browsingUnix = Math.floor((Date.now() / 1000) | 0);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/T/Ticketer/assets/logo.png",
		},
		{ pathname } = document.location;
	let title: HTMLElement, logo: HTMLElement, dashboardInfo: HTMLElement;
	presenceData.startTimestamp = browsingUnix;
	switch (pathname) {
		case "/commands": {
			presenceData.details = "Viewing the commands page";
			break;
		}
		case "/changelog": {
			presenceData.details = "Viewing the changelog page";
			break;
		}
		case "/contribute": {
			presenceData.details = "Viewing the contribution page";
			break;
		}
		case "/dashboard": {
			presenceData.details = "Browsing the dashboard";
			break;
		}
		case `/dashboard/${document.URL.slice(34)}`: {
			if (document.querySelector(".server-info > h3")) {
				title = document.querySelector(".server-info > h3");
				logo = document.querySelector(".server-info > img");
				dashboardInfo = document.querySelector(".informations-nav > h2");

				presenceData.details = "Server Settings - Editing:";
				presenceData.state = title.textContent;
				presenceData.smallImageKey = logo.getAttribute("src");
			}
			if (!dashboardInfo?.textContent) return;
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
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
