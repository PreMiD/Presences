const presence = new Presence({
	clientId: "1021848171946704906",
});

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
			largeImageKey: "https://i.imgur.com/pFfJvOZ.png",
		},
		{ pathname } = location;
	if (pathname === "/") presenceData.details = "Viewing the homepage";
	if (pathname === "/my-library")
		presenceData.details = "Viewing their library";
	if (pathname.startsWith("/collection/")) {
		presenceData.details = "Viewing a collection";
		presenceData.state =
			document.querySelector(".collection-title")?.textContent;
	}
	if (pathname === "/shared-with-me")
		presenceData.details = "Viewing shared scores";
	if (pathname === "/trash")
		presenceData.details = "Viewing recently deleted scores";
	if (pathname.startsWith("/help/")) {
		if (pathname.includes("/support"))
			presenceData.details = "Contacting support";
		else {
			const title = document.querySelector(".page-title > h1")?.textContent;
			presenceData.details = "Viewing help";
			if (title)
				presenceData.state = title.replace(/^((Flat|Platform) -|Help:) /, "");
			if (presenceData.state === "Online Music Notation Software")
				presenceData.state = "About Flat";
		}
	}
	if (pathname.startsWith("/settings"))
		presenceData.details = "Viewing settings";
	if (pathname.startsWith("/updates")) presenceData.details = "Viewing updates";
	if (pathname === "/settings/upgrade")
		presenceData.details = "Viewing upgrade options";
	if (pathname.startsWith("/community")) {
		if (pathname.match(/^\/community\/popular(\/.+)?\/?$/)) {
			presenceData.details = "Viewing community scores";
			presenceData.state = `Since: ${
				document.querySelector('[data-cy="community-date-filter-btn"]')
					?.textContent
			}`;
		}
		if (pathname.includes("/challenges/"))
			presenceData.details = "Viewing a challenge";
	}
	if (pathname.startsWith("/score/")) {
		if (pathname.includes("/edit")) {
			presenceData.details = "Editing a score";
			presenceData.state = document.querySelector(".title")?.textContent;
		} else {
			presenceData.details = "Viewing a score";
			presenceData.state =
				document.querySelector(".sv-title > h1")?.textContent;
			presenceData.smallImageKey =
				document.querySelector<HTMLImageElement>(".user-pp img").src;
			presenceData.smallImageText = document.querySelector(".by")?.textContent;
			if (document.querySelector(".sc-pause"))
				presenceData.details = "Listening to a score";
		}
	}
	if (pathname.startsWith("/@")) {
		const name = document.querySelector(
			'[data-cy="printable-name"]'
		)?.textContent;
		presenceData.details = "Viewing a user";
		presenceData.state = name
			? `${name} (@${pathname.split("/")[1].slice(1)})`
			: "Unknown user";
		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			'[data-cy="user-info"] img'
		)?.src;
		presenceData.smallImageText = name;
		if (pathname.includes("/likes"))
			presenceData.details = "Viewing a user's liked scores";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
