const presence = new Presence({
		clientId: "969208766807547917",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let	title: string;

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
		active = document.querySelector(
			"[class='ng-binding ng-scope selected']"
		)?.textContent;

	switch (hostname) {
		case "app.strem.io": {			
			const video = document.querySelector<HTMLMediaElement>("#videoPlayer");

			if (privacy) {
				presenceData.details = !video ? "Browsing..." : "Watching...";
				break;
			}

			switch (hash.replace("#/", "").split("/").shift()) {
				case "":
					presenceData.details = "Board";
					break;
				case "detail":
					title = document.querySelector(
						"#detail > div:nth-child(3) > div > div.sidebar-info-container > div > div.logo > div"
					)?.textContent;
					presenceData.details = title;
					presenceData.state = "Viewing Metadata";
					presenceData.buttons = [
						{
							label: "View Metadata",
							url: href,
						},
					];

					if (thumbnails) {
						presenceData.largeImageKey =
							document
								.querySelector(
									"#detail > div.details-less-info > div.details-top > div:nth-child(1)"
								)
								?.firstElementChild.getAttribute("src") ?? "logo";
					}

					break;
				case "addons":
					title = document.querySelector(
						"[class='ng-scope selected']"
						)?.textContent;
						
					presenceData.state = active ?? "All";
					presenceData.buttons = [
						{
							label: "Browse Addons",
							url: href,
						},
					];
					presenceData.details = `Browsing ${title}`;
					break;
				case "settings":
					// eslint-disable-next-line no-case-declarations, no-one-time-vars/no-one-time-vars
					const section = document.querySelector("[class='ng-scope ng-binding active']")?.textContent ?? "General";
					presenceData.details = `${section} settings`;
					break;
				case "discover":
					if (active) {
						presenceData.buttons = [
							{
								label: "Browse",
								url: href,
							},
						];
					}
					presenceData.details = `Browsing ${active ?? "Content"}`;
					break;
				case "library":
					presenceData.details = "Library";
					if (active) presenceData.details = `${active} ${presenceData.details}`;
					presenceData.buttons = [
						{
							label: "View Library",
							url: href,
						},
					];
					break;
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
					} else if (document.querySelector("#controlbar-top")) {
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
					}

					delete presenceData.startTimestamp;

					if (
						!pauseCheck &&
						!document.querySelector("#loading-logo").className.includes("flashing")
					) {
						presenceData.endTimestamp = timestamp[1];
						presenceData.smallImageKey = Assets.Play;
					} else {
						delete presenceData.endTimestamp;
						presenceData.smallImageKey = Assets.Pause;
					}

					title = document
						.querySelector("head > title")
						?.textContent.replace("Stremio -", "");

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
		case "www.stremio.com":
		case "stremio.com":
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
