const presence = new Presence({
		clientId: "840126038205923369",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/uAjw09t.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = window.location,
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		metaElement = document.querySelector<HTMLMetaElement>(
			'meta[property~="og:title"]'
		);

	if (privacy) presenceData.details = "Aan het browsen";
	else if (pathname === "/" && !location.search) {
		presenceData.details = "Bekijkt";
		presenceData.state = "De Home Pagina";
	} else if (pathname.includes("plaatjes")) {
		presenceData.details = metaElement?.content ?? "Onbekende titel";
		presenceData.buttons = [
			{
				label: "Bekijk Plaatje",
				url: href,
			},
		];
	} else if (pathname.includes("filmpjes")) {
		presenceData.buttons = [
			{
				label: "Bekijk Filmpje",
				url: href,
			},
		];
		presenceData.details = metaElement?.content ?? "Onbekende titel";
	} else if (href.includes("selectedId=") || href.includes("/item/")) {
		const video =
			document.querySelector<HTMLMediaElement>('[class="vjs-tech"]');
		if (video) {
			presenceData.largeImageKey =
				document.querySelector<HTMLMetaElement>('[property="og:image" ]')
					?.content ?? "https://i.imgur.com/uAjw09t.png";
			presenceData.buttons = [
				{
					label: "Bekijk Video",
					url: href,
				},
			];
			delete presenceData.startTimestamp;
			if (video.paused) {
				delete presenceData.endTimestamp;
				presenceData.smallImageKey = "pause";
			} else if (!video.paused) {
				[, presenceData.endTimestamp] = presence.getTimestampsfromMedia(video);
				presenceData.smallImageKey = "play";
			}
		} else {
			presenceData.largeImageKey =
				document.querySelectorAll("img")[1]?.getAttribute("src") ??
				"https://i.imgur.com/uAjw09t.png";
			presenceData.buttons = [
				{
					label: "Bekijk Foto",
					url: href,
				},
			];
		}

		presenceData.details = metaElement?.content ?? "Onbekende titel";
	} else if (pathname.includes("toppers"))
		presenceData.details = "Bekijkt de toppers";
	else if (pathname.includes("/zoek/")) {
		title = document.querySelector(
			"#app > div > div:nth-child(6) > div > div.grid > main > div > div > div > h1"
		);
		if (!title) {
			presenceData.details = "Zoekt naar";
			presenceData.state = document
				.querySelector('[class*="list_title_holder"]')
				.textContent.split("'")[1];
		} else {
			presenceData.details = "Zoekt naar";
			presenceData.state = title.textContent.replace(
				"Geen resultaten voor",
				""
			);
		}
	} else if (pathname.includes("latest")) {
		presenceData.details = "Bekijkt";
		presenceData.state = "The latest";
		presenceData.buttons = [
			{
				label: "Bekijk Latest",
				url: href,
			},
		];
	}

	if (!buttons || privacy) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = "https://i.imgur.com/uAjw09t.png";
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
