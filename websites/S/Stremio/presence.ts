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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _eval(js: string): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			const eventName = "PreMiD_Stremio",
			 script = document.createElement("script");
	
			window.addEventListener(eventName, (data: CustomEvent) => {
				script.remove();
				resolve(data.detail);
			}, {once: true});
			script.id = eventName;
			script.appendChild(
				document.createTextNode(`
			 var core = window.services.core;
			 var pmdEvent = new CustomEvent("${eventName}", {detail: ${js}});
			 window.dispatchEvent(pmdEvent);
			 `)
			);
	
			document.head.appendChild(
				script
			);

		} catch (err) {
			reject(err);
		}
	});
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
				presenceData.details = "Privacy mode";
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

					presenceData.state = "Viewing metadata";
					presenceData.buttons = [
						{
							label: "View metadata",
							url: href,
						},
					];

					break;
				}
				case "addons": {
					title = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-scope selected']" : "div[class|='addons-content'] > div[class|='selectable-inputs-container'] > div:nth-child(2) > div"
					)?.textContent;

					const type = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-binding ng-scope selected']" : "div[class|='addons-content'] > div[class|='selectable-inputs-container'] > div:nth-child(3) > div"
					)?.textContent;
						
					presenceData.state = type ?? "All";
					presenceData.buttons = [
						{
							label: "Browse addons",
							url: href,
						},
					];
					presenceData.details = `Browsing ${title?.toLowerCase()?.replace(" addons", "")} addons`;
					break;
				}
				case "settings": {
					const section = document.querySelector(appVersion === AppVersion.V4 ? "[class='ng-scope ng-binding active']" : "div[class|='settings-content'] div[class*='selected']")?.textContent ?? "General";
					presenceData.details = `${section} settings`;
					break;
				}
				case "discover": {
					const type = document.querySelector(
						appVersion === AppVersion.V4 ? "[class='ng-binding ng-scope selected']" : "div[class|='selectable-inputs-container'] > div > div"
					)?.textContent?.toLowerCase(),
					 category = document.querySelector(appVersion === AppVersion.V4 ? "ul.sort > li.selected" : "div[class|='selectable-inputs-container'] > div:nth-child(2) > div")?.textContent;

					presenceData.buttons = [
						{
							label: "Browse",
							url: href,
						},
					];
					presenceData.details = `Discovering ${type ?? "content"}${type === "series" ? "" : "s"}`;
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
							label: "View library",
							url: href,
						},
					];
					break;
				}
				case "calendar":
					presenceData.buttons = [
						{
							label: "View calendar",
							url: href,
						},
					];
					presenceData.details = "Calendar";
					break;
				case "search":
					presenceData.details = "Search";
					break;
				case "player": {
					let endTimestamp: number,
					 isPaused = true;

					if (!isNaN(video?.duration)) {
						// eslint-disable-next-line no-one-time-vars/no-one-time-vars
						const [, ts] = presence.getTimestampsfromMedia(video);
						endTimestamp = ts;
						isPaused = video.paused;
					}
					
					delete presenceData.startTimestamp;
					if (endTimestamp) 
						presenceData.endTimestamp = endTimestamp;
					else
						delete presenceData.endTimestamp;

					if (
						(isPaused || (appVersion === AppVersion.V4 ? document.querySelector("#loading-logo").className.includes("flashing") : !!document.querySelector("div[class*='buffering-loader-container']")))
					) 
						presenceData.smallImageKey = Assets.Pause;
					 else 
						presenceData.smallImageKey = Assets.Play;
					
					let metaUrl: string;

					if (appVersion === AppVersion.V4) {
						title = document.querySelector("head > title")?.textContent?.replace("Stremio -", "")?.trim();
						metaUrl = href.substring(0, href.lastIndexOf("/")).replace("player", "detail");
						if (thumbnails) presenceData.largeImageKey = document.querySelector("#loading-logo")?.getAttribute("data-image") ?? "logo";
					} else {
						const playerState = await _eval("core.transport.getState('player')");
						if (playerState.metaItem.type.toLowerCase() === "ready") {
							// eslint-disable-next-line prefer-destructuring
							const content = playerState.metaItem.content;
							// eslint-disable-next-line prefer-destructuring
							title = playerState.title;
							metaUrl = `${window.location.origin}/#/detail/${content.type}/${content.id}`;
							if (content.type === "series")
								metaUrl += `/${content.id}:${playerState.seriesInfo.season}:${playerState.seriesInfo.episode}`;
							if (thumbnails) presenceData.largeImageKey = content?.logo ?? "logo";
						}
					}
					
					presenceData.details = (title as string) ?? "Player";
					presenceData.state = isPaused ? "Paused" : "Watching";
					if (metaUrl) {
						presenceData.buttons = [
							{
								label: "Watch",
								url: metaUrl,
							},
						];
					}
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
