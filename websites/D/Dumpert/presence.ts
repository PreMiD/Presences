const presence = new Presence({
		clientId: "840126038205923369",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: Element, title2: Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		pageh = document.location.href,
		buttons = await presence.getSetting<boolean>("buttons"),
		privacy = await presence.getSetting<boolean>("privacy");

	if (page === "/" && !location.search) {
		presenceData.details = "Bekijkt:";
		presenceData.state = "De Home Pagina";
	} else if (pageh.includes("plaatjes")) {
		const element = document.querySelector('meta[property~="og:title"]');
		if (!element || privacy) {
			presenceData.details = "Bekijkt:";
			presenceData.state = "Plaatjes";
		} else {
			presenceData.details = element && element.getAttribute("content");
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Bekijk Plaatje",
						url: pageh,
					},
				];
			}
		}
	} else if (pageh.includes("filmpjes")) {
		const element = document.querySelector('meta[property~="og:title"]');
		if (!element || privacy) {
			presenceData.details = "Bekijkt:";
			presenceData.state = "Filmpjes";
		} else {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Bekijk Filmpje",
						url: pageh,
					},
				];
			}
			presenceData.details = element && element.getAttribute("content");
		}
	} else if (pageh.includes("selectedId=") || pageh.includes("/item/")) {
		if (!privacy) {
			title2 = document.querySelector("[id*='vjs_video_']");
			if (title2) {
				if (buttons) {
					presenceData.buttons = [
						{
							label: "Bekijk Video",
							url: pageh,
						},
					];
				}
				delete presenceData.startTimestamp;
				if (title2.className.includes("paused")) {
					delete presenceData.endTimestamp;
					presenceData.smallImageKey = "pause";
				} else if (title2.className.includes("playing")) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						presence.timestampFromFormat(
							document.querySelector(
								`#vjs_video_${title2.className
									.slice(40, 55)
									.replace(
										/[^0-9.]/g,
										""
									)} > div.vjs-control-bar.progress-in-menu > div.vjs-current-time.vjs-time-control.vjs-control > span.vjs-current-time-display`
							).textContent
						),
						presence.timestampFromFormat(
							document.querySelector(
								`#vjs_video_${title2.className
									.slice(40, 55)
									.replace(
										/[^0-9.]/g,
										""
									)} > div.vjs-control-bar.progress-in-menu > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display`
							).textContent
						)
					);
					presenceData.smallImageKey = "play";
				}
			} else if (buttons) {
				presenceData.buttons = [
					{
						label: "Bekijk Foto",
						url: pageh,
					},
				];
			}

			const element = document.querySelector('meta[property~="og:title"]');
			presenceData.details = element && element.getAttribute("content");
		} else {
			title2 = document.querySelector("[id*='vjs_video_']");
			if (!title2) presenceData.details = "Bekijkt een foto";
			else if (title2.className.includes("paused"))
				presenceData.details = "Bekijkt een video";
		}
	} else if (page.includes("toppers")) {
		presenceData.details = "Bekijkt:";
		presenceData.state = "De Toppers";
	} else if (page.includes("/zoek/")) {
		if (privacy) presenceData.details = "Is aan het zoeken";
		else {
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Zoek",
						url: pageh,
					},
				];
			}
			title = document.querySelector(
				"#app > div > div:nth-child(6) > div > div.grid > main > div > div > div > h1"
			);
			if (!title) {
				presenceData.details = "Zoekt Voor:";
				presenceData.state = page
					.replace("/zoek/", "")
					.replace("-", " ")
					.replaceAll("%20", " ");
			} else {
				presenceData.details = "Zoekt Voor:";
				presenceData.state = title.textContent.replace(
					"Geen resultaten voor",
					""
				);
			}
		}
	} else if (page.includes("latest")) {
		presenceData.details = "Bekijkt:";
		presenceData.state = "The Latest";
		if (!privacy && buttons) {
			presenceData.buttons = [
				{
					label: "Bekijk Latest",
					url: pageh,
				},
			];
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
