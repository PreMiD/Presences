const presence = new Presence({
	clientId: "1094931941616267344",
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

enum Icons {
	Logo = "https://i.imgur.com/h8N7txd.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Pause = "https://i.imgur.com/aO2ZCME.png",
	Play = "https://i.imgur.com/q57RJjs.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Icons.Logo,
			smallImageKey: Icons.Search,
			smallImageText: "Browsing",
		},
		{ pathname } = document.location;

	if (pathname.includes("/detail/")) {
		const filmItems = document.querySelectorAll(".fd-item"),
			coverElement = document.querySelector<HTMLElement>(".detail-film-cover");

		let name = document.querySelector(".film-name").textContent;

		if (
			filmItems.length >= 3 &&
			!Number.isNaN(parseInt(filmItems[2].textContent))
		)
			name += ` (${filmItems[2].textContent})`;

		if (
			coverElement.style.backgroundImage.startsWith('url("') &&
			coverElement.style.backgroundImage.endsWith('")')
		) {
			presenceData.largeImageKey = coverElement.style.backgroundImage.slice(
				5,
				coverElement.style.backgroundImage.length - 2
			);
		}

		presenceData.details = `Viewing ${
			!document.querySelector("#season-list") ? "a Movie" : "a TV Show"
		}`;
		presenceData.state = name;
	} else if (pathname.includes("/watch/")) {
		const video = document.querySelector<HTMLVideoElement>("#player"),
			[startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);

		if (document.querySelector("#menu-eps")) {
			presenceData.details = `${
				document.querySelector(".film-name").textContent
			} - ${
				document.querySelector(".cmecb-seasons ul li.active a").textContent
			}`;
			presenceData.state = `E${
				Array.from(
					document.querySelector(".cmecb-epslist ul").children
				).findIndex(e => e.classList.contains("active")) + 1
			}: ${document
				.querySelector(".cmecb-epslist ul li.active a")
				.getAttribute("title")}`;
		} else {
			presenceData.details = document.querySelector("span.large").textContent;
			presenceData.state = "Movie";
		}

		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			".mbu-bg.blur-small img"
		).src;
		presenceData.smallImageKey = video.paused ? Icons.Pause : Icons.Play;
		presenceData.smallImageText = video.paused ? "Paused" : "Playing";

		if (!video.paused) {
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;
		}
	} else if (pathname === "/movies") presenceData.details = "Browsing Movies";
	else if (pathname === "/tv-shows") presenceData.details = "Browsing TV Shows";
	else presenceData.details = "Browsing";

	presence.setActivity(presenceData);
});
