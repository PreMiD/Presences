const presence = new Presence({
		clientId: "926386695354609684",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	shortenedURLs: Record<string, string> = {};

async function shortenURL(url: string, fallback?: string): Promise<string> {
	if (!url || url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		return (shortenedURLs[url] = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text());
	} catch (err) {
		presence.error(err);
		return fallback;
	}
}
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
			largeImageKey: "https://i.imgur.com/HnhrAbV.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname,
		[title, showPageIcon] = await Promise.all([
			presence.getSetting<boolean>("title"),
			presence.getSetting<boolean>("icon"),
		]),
		overlayTitle = document.querySelector<HTMLDivElement>(
			"div.notion-overlay-container.notion-default-overlay-container div[class='notranslate'][contenteditable='true']"
		),
		pageIcon = document.querySelector<HTMLImageElement>(
			":is(.notion-frame, .notion-overlay-container.notion-default-overlay-container) .notion-record-icon div > div > img:not(.notion-emoji)"
		);
	if (path.startsWith("/product")) {
		if (path === "/product") presenceData.details = "Viewing Home page";
		else presenceData.details = "Viewing Products page";
	} else if (path.startsWith("/templates"))
		presenceData.details = "Browsing templates";
	else if (path.startsWith("/customers"))
		presenceData.details = "Viewing customers";
	else if (
		path.startsWith("/desktop") ||
		path.startsWith("/mobile") ||
		path.startsWith("/web-clipper")
	)
		presenceData.details = "Viewing Downloads page";
	else if (path.startsWith("/blog")) presenceData.details = "Reading blogs";
	else if (path.startsWith("/guides"))
		presenceData.details = "Reading Guides & Tutorials";
	// Clearly not the best solution but it works(?)
	else if (
		overlayTitle ||
		document.querySelector<HTMLDivElement>(
			"div.notion-cursor-listener div.notion-frame > div:nth-child(2) > div > div"
		)
	) {
		presenceData.details = "Editing a page";
		if (title) {
			if (!overlayTitle) presenceData.state = document.title;
			else {
				presenceData.state =
					overlayTitle.textContent || overlayTitle.getAttribute("placeholder");
			}
		}

		if (title && showPageIcon) {
			presenceData.smallImageKey = pageIcon
				? pageIcon.alt
					? `https://twemoji.maxcdn.com/v/latest/72x72/${pageIcon.alt
							.codePointAt(0)
							.toString(16)}.png`
					: await shortenURL(pageIcon.src, "edit")
				: "edit";
		} else presenceData.smallImageKey = "edit";
		presenceData.smallImageText = "Editing";
	} else if (
		document.querySelector<HTMLDivElement>(
			"div.notion-topbar div.notion-focusable > div[class='notranslate']"
		)
	) {
		presenceData.details = "Reading a page";
		if (title) presenceData.state = document.title;
		if (title && showPageIcon) {
			presenceData.smallImageKey = pageIcon
				? pageIcon.alt
					? `https://twemoji.maxcdn.com/v/latest/72x72/${pageIcon.alt
							.codePointAt(0)
							.toString(16)}.png`
					: await shortenURL(pageIcon.src, "read")
				: "read";
		} else presenceData.smallImageKey = Assets.Reading;
		presenceData.smallImageText = "Reading";
	}
	presence.setActivity(presenceData);
});
