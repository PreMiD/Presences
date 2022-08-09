const presence = new Presence({ clientId: "1006201873985961984" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			paused: "general.paused",
			playing: "general.playing",
			episode: "general.episode",
			viewPage: "general.viewPage",
			buttonViewSeries: "general.buttonViewSeries",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null,
	currentListening: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathSplit = pathname.split("/"),
		[newLang, time, cover] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		currentListening =
			newLang === "fr" ? "Écoute actuellement " : "Currently listening to ";
		strings = await getStrings();
	}

	switch (pathSplit[1]) {
		case "":
			presenceData.details = strings.viewHome;
			break;
		case "shop":
		case "blog":
			presenceData.details = `Viewing ${pathSplit[1]}`;
			break;
		case "series":
			presenceData.details = strings.viewPage;
			presenceData.state =
				document.querySelector<HTMLHeadingElement>("div.head > h1").textContent;
			if (cover) {
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>("div.head > img").src;
			}
			presenceData.buttons = [{ label: strings.buttonViewSeries, url: href }];
	}
	if (document.querySelector("div#Player")) {
		presenceData.details =
			currentListening +
			document.querySelector<HTMLDivElement>("div.media-title").textContent;
		presenceData.state =
			document.querySelector<HTMLDivElement>("div.media-episode").textContent;
		if (cover) {
			presenceData.largeImageKey = document
				.querySelector<HTMLImageElement>("div.media-image > svg > image")
				.getAttribute("xlink:href");
		}

		const timers: string[] = [];
		for (const element of document.querySelectorAll("div.desktop > div.timer"))
			timers.push(element.textContent);
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				presence.timestampFromFormat(timers[0]),
				presence.timestampFromFormat(timers[1])
			);
		delete presenceData.buttons;
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
