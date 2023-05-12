const presence = new Presence({
		clientId: "869131200948756500",
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
			largeImageKey: "https://i.imgur.com/mydYezY.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = location,
		buttons = await presence.getSetting<boolean>("buttons");

	if (pathname.startsWith("/index")) {
		const sample = document.querySelector("li.noMargin");
		presenceData.details = "At homepage";
		if (sample && sample.classList.contains("sm2_playing")) {
			const current = document.querySelector<HTMLSpanElement>(".sm2_position"),
				total = document.querySelector<HTMLSpanElement>(".sm2_total");
			presenceData.state = "Listening to audio sample";
			if (current && total) {
				const [currTS, durTS] = [current, total].map(e =>
					presence.timestampFromFormat(e.textContent)
				);

				[, presenceData.endTimestamp] = presence.getTimestamps(currTS, durTS);
			}
		}
	} else if (
		pathname === "/bibles/index.htm" ||
		pathname === "/bibles/resources/links/index.htm"
	)
		presenceData.details = "Choosing Language";
	else if (pathname === "/bibles/audio/index.htm")
		presenceData.details = "Looking for Audio Bibles";
	else if (/\/bibles\/audio\/.+\/index\.htm/.test(pathname)) {
		const title = document.querySelector<HTMLHeadingElement>("h1.audi"),
			sub = document.querySelector<HTMLSpanElement>("span.dimmed");

		if (title) presenceData.details = title.textContent;
		if (sub) presenceData.state = sub.textContent;
	} else if (/\/bibles\/verses\/.*index\.htm/.test(pathname)) {
		const title =
			document.querySelector<HTMLHeadingElement>("h1.vers") ||
			document.querySelector<HTMLHeadingElement>("h1.idx");
		if (title) presenceData.details = title.textContent;
	} else if (
		pathname.startsWith("/bibles/audio") ||
		pathname.startsWith("/bibles/verses")
	) {
		const chapter = document.querySelector<HTMLLIElement>(
				"div.sm2-playlist > div > ul > li"
			),
			player = document.querySelector<HTMLDivElement>(".sm2-bar-ui");
		if (chapter) {
			presenceData.details = "Listening to";
			presenceData.state = chapter.textContent;

			if (player && player.classList.contains("playing")) {
				const time = document.querySelector<HTMLDivElement>(".sm2-inline-time"),
					duration = document.querySelector<HTMLDivElement>(
						".sm2-inline-duration"
					);

				if (time && duration) {
					const [timeTS, durTS] = [time, duration].map(e =>
						presence.timestampFromFormat(e.textContent)
					);
					[, presenceData.endTimestamp] = presence.getTimestamps(timeTS, durTS);
				}
			}
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Listen",
						url: href,
					},
				];
			}
		}
	} else if (pathname.startsWith("/bibles/parallel"))
		presenceData.details = "Looking at multiple Bibles parallely";
	else if (/\/bibles\/\w+\/index\.htm/.test(pathname)) {
		const title = document.querySelector<HTMLHeadingElement>("h1.idx"),
			sub = document.querySelector<HTMLSpanElement>("span.faded4");

		if (title) {
			presenceData.details = title.textContent;
			if (sub) presenceData.state = sub.textContent;
		} else presenceData.details = document.title;
	} else if (/\/bibles\/\w+\/[0-9]+\/[0-9]+\.htm/.test(pathname)) {
		const player = document.querySelector<HTMLDivElement>(".sm2-bar-ui");

		presenceData.details = "Listening to";
		presenceData.state = `${
			document.querySelector<HTMLDivElement>(".sm2-bar-ui").textContent
		}: ${document.querySelector<HTMLHeadingElement>("h3").textContent}`;
		if (player && player.classList.contains("playing")) {
			const time = document.querySelector<HTMLDivElement>(".sm2-inline-time"),
				duration = document.querySelector<HTMLDivElement>(
					".sm2-inline-duration"
				);

			if (time && duration) {
				const [timeTS, durTS] = [time, duration].map(e =>
					presence.timestampFromFormat(e.textContent)
				);
				[, presenceData.endTimestamp] = presence.getTimestamps(timeTS, durTS);
			}
		}
		if (buttons) {
			presenceData.buttons = [
				{
					label: "Listen",
					url: href,
				},
			];
		}
	} else presenceData.details = document.title; // for resources in languages other than English

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
