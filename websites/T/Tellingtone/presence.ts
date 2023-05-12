const presence = new Presence({ clientId: "1006201873985961984" }),
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

async function getStrings() {
	return presence.getStrings(
		{
			viewHome: "general.viewHome",
			paused: "general.paused",
			playing: "general.playing",
			episode: "general.episode",
			viewPage: "general.viewPage",
			buttonViewSeries: "general.buttonViewSeries",
			listeningTo: "general.listeningTo",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/L4eWRh1.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		pathSplit = pathname.split("/"),
		[newLang, time, showCover] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("cover"),
		]);

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
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
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("div.head > img").src;

			presenceData.buttons = [{ label: strings.buttonViewSeries, url: href }];
	}
	if (document.querySelector("div#Player")) {
		presenceData.details = strings.listeningTo
			.replace("{0}", " ")
			.replace(
				"{1}",
				document.querySelector<HTMLDivElement>(
					".reading-media > .media-infos > .media-title"
				).textContent
			);
		presenceData.state =
			document.querySelector<HTMLDivElement>("div.media-episode").textContent;
		presenceData.largeImageKey = document
			.querySelector<HTMLImageElement>("div.media-image > svg > image")
			.getAttribute("xlink:href");

		const timers: string[] = [];
		for (const element of document.querySelectorAll("div.desktop > div.timer"))
			timers.push(element.textContent);
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(
				presence.timestampFromFormat(timers[0]),
				presence.timestampFromFormat(timers[1])
			);
		delete presenceData.buttons;

		if (document.querySelector(".icon-pause")) {
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = strings.playing;
		} else {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = strings.paused;
			delete presenceData.endTimestamp;
			delete presenceData.startTimestamp;
		}
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	if (!showCover)
		presenceData.largeImageKey = "https://i.imgur.com/L4eWRh1.png";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
