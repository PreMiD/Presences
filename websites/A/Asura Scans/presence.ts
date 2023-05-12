const presence = new Presence({
		clientId: "864304063804997702",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", () => {
	const { pathname, href } = window.location,
		presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/ewDJfwk.png",
		};

	if (/^\/(page\/\d+\/?)?$/.test(pathname))
		presenceData.details = "Viewing Home Page";
	else if (/^\/manga\/?$/.test(pathname))
		presenceData.details = "Viewing Comic List";
	else if (/^\/manga\/[0-9a-z-]+\/?$/i.test(pathname)) {
		presenceData.details = "Viewing Comic Page";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>(".entry-title").textContent;
		presenceData.buttons = [
			{
				label: "Visit Comic Page",
				url: href,
			},
		];
	} else if (
		/\/[a-z-\d]+(chapter|ch|bolum)[a-z-\d]*-[0-9]+\/?$/i.test(pathname)
	) {
		const progress =
			(document.documentElement.scrollTop /
				(document.querySelector<HTMLDivElement>("#readerarea").scrollHeight -
					window.innerHeight)) *
			100;
		presenceData.details = "Reading Comic";
		presenceData.state = `${
			document.querySelector<HTMLHeadingElement>(".entry-title").textContent
		} - ${(progress > 100 ? 100 : progress).toFixed(1)}%`;
		presenceData.buttons = [
			{
				label: "Visit Comic Page",
				url: document.querySelector<HTMLAnchorElement>(".allc > a").href,
			},
			{
				label: "Visit Chapter",
				url: href,
			},
		];
	} else if (pathname.startsWith("/bookmark"))
		presenceData.details = "Viewing Bookmarks";
	else {
		presenceData.details = "Browsing Asura Scans";
		presenceData.state = document.title;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
