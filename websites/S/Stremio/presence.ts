const presence = new Presence({
		clientId: "969208766807547917",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let	title: string;

enum AppVersion {
	Website = -1,
	V4 = 4,
	V5 = 5,
}

function getApVersion(hostname: string) {
	switch (hostname) {
		case "web.strem.io":
		case "web.stremio.com":
			return AppVersion.V5;
		case "app.strem.io":
			return AppVersion.V4;
		default:
			return AppVersion.Website;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/S/Stremio/assets/logo.png",
			startTimestamp: browsingTimestamp,
		},
		{ hash, hostname, pathname, href } = document.location,
		[privacy, thumbnails, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("thumbnails"),
			presence.getSetting<boolean>("buttons"),
		]),
		appVersion = getApVersion(hostname);

	switch (appVersion) {
		case AppVersion.V4:
		case AppVersion.V5:{
			const video = document.querySelector<HTMLMediaElement>("video");

			if (privacy) {
				presenceData.details = "Privacy Mode";
				presenceData.state = !video ? "Browsing" : "Watching";
				break;
			}

			switch (hash.replace("#/", "").split("/").shift().split("?").shift()) {
				case "":
					presenceData.details = "Board";
					break;
				case "detail": {
					if (appVersion === AppVersion.V4) {
						title = document.querySelector("#detail > div:nth-child(3) > div > div.sidebar-info-container > div > div.logo > div")?.textContent;
						presenceData.details = title;
						if (thumbnails) {
							presenceData.largeImageKey =
								document
									.querySelector(
										"#detail > div.details-less-info > div.details-top > div:nth-child(1)"
									)
									?.firstElementChild.getAttribute("src") ?? "logo";
						}
					} else {
						const imgElement = document.querySelector<HTMLImageElement>("div[class|='meta-info-container'] > img[class|='logo']");
						title = imgElement?.title;
						presenceData.details = title;
						if (thumbnails) presenceData.largeImageKey = imgElement?.src ?? "logo";
					}

					presenceData.state = "Viewing Metadata";
					presenceData.buttons = [
						{
							label: "View Metadata",
							url: href,
						},
					];

					break;
				}
				case "addons": {
					title = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-scope selected']" : "div[class|='selectable-inputs-container'] > div:nth-child(2) > div"
					)?.textContent;

					const type = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-binding ng-scope selected']" : "div[class|='selectable-inputs-container'] > div:nth-child(3) > div"
					)?.textContent;
						
					presenceData.state = type ?? "All";
					presenceData.buttons = [
						{
							label: "Browse Addons",
							url: href,
						},
					];
					presenceData.details = `Browsing ${title}`;
					break;
				}
				case "settings": {
					const section = document.querySelector(appVersion === AppVersion.V4 ? "[class='ng-scope ng-binding active']" : "div[class|='settings-content'] div[class*='selected']")?.textContent ?? "General";
					presenceData.details = `${section} Settings`;
					break;
				}
				case "discover": {
					const type = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-binding ng-scope selected']" : "div[class|='selectable-inputs-container'] > div > div"
					)?.textContent,
					 category = document.querySelector(appVersion === AppVersion.V4 ? "ul.sort > li.selected" : "div[class|='selectable-inputs-container'] > div:nth-child(2) > div")?.textContent;

					presenceData.buttons = [
						{
							label: "Browse",
							url: href,
						},
					];
					presenceData.details = `Discovering ${type ?? "Content"}`;
					presenceData.state = category ?? "All";

					break;
				}
				case "library": {
					const type = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-binding ng-scope selected']" : "div[class|='selectable-inputs-container'] > div > div"
					)?.textContent;

					presenceData.details = "Library";
					presenceData.state = type ?? "All";
					presenceData.buttons = [
						{
							label: "View Library",
							url: href,
						},
					];
					break;
				}
				case "calendar":
					presenceData.buttons = [
						{
							label: "View Calendar",
							url: href,
						},
					];
					presenceData.details = "Calendar";
					break;
				case "player": {
					let timestamp: [number, number],
					 pauseCheck: boolean;

					if (video?.duration) {
						timestamp = presence.getTimestampsfromMedia(video);
						pauseCheck = video.paused ?? true;
					} else if (appVersion === AppVersion.V4 && document.querySelector("#controlbar-top")) {
							let split = document
								.querySelector("#play-progress-text")
								?.textContent.split("/");
							if (split?.[0]) {
								split = split.map(s => s.trim());
								timestamp = presence.getTimestamps(
									presence.timestampFromFormat(split[0]),
									presence.timestampFromFormat(split[1])
								);
							}
		
							pauseCheck = !document
								.querySelector("#controlbar-top")
								?.firstElementChild.className.includes("pause");
					} else if (appVersion === AppVersion.V5) {
						const start = document.querySelector("div[class|='seek-bar'] > div:first-child")?.textContent,
							end = document.querySelector("div[class|='seek-bar'] > div:last-child")?.textContent;
						
						if (start && end) {
							timestamp = presence.getTimestamps(
								presence.timestampFromFormat(start),
								presence.timestampFromFormat(end)
							);
						}

						pauseCheck = !!document.querySelector("svg[icon='ic_play']");
					}

					delete presenceData.startTimestamp;

					if (
						!pauseCheck &&
						!(appVersion === AppVersion.V4 ? document.querySelector("#loading-logo").className.includes("flashing") : !!document.querySelector("div[class*='buffering-loader-container']"))
					) {
						presenceData.endTimestamp = timestamp[1];
						presenceData.smallImageKey = Assets.Play;
					} else {
						delete presenceData.endTimestamp;
						presenceData.smallImageKey = Assets.Pause;
					}

					title = appVersion === AppVersion.V4 ? document
						.querySelector("head > title")
						?.textContent.replace("Stremio -", "") : document.querySelector("[class|='title']").textContent ;

					presenceData.details = title;
					presenceData.state = pauseCheck ? "Paused" : "Watching";
					presenceData.buttons = [
						{
							label: "Watch",
							url: href,
						},
					];
					break;
				}
			}
			break;
		}
		case AppVersion.Website:
			presenceData.details = "Visiting stremio.com";

			switch (pathname) {
				case "/addon-sdk":
					presenceData.state = "Addon SDK";
					break;
				
				case "/contribute":
					presenceData.state = "Contribute";
					break;
			
				case "/community":
					presenceData.state = " Community";
					break;

				case "/technology":
					presenceData.state = "Technology";
					break;
			
				case "/competition":
					presenceData.state = "Competition";
					break;

				case "/careers":
					presenceData.state = "Careers";
					break;

				default: 
					// eslint-disable-next-line no-case-declarations
					const activeTab = document.querySelector("[class='active']");
					if (activeTab === null || activeTab.parentElement?.className === "langs") break;
					presenceData.state = activeTab.textContent;
			}
			
			break;
	}

	if (!buttons) delete presenceData.buttons;
	
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
