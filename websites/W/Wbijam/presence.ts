const presence = new Presence({
		clientId: "992829484564746290",
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

let iFrameVideo: boolean,
	currentTime: number,
	duration: number,
	paused: boolean;

interface IFrameData {
	iframeVideo: {
		dur: number;
		iFrameVideo: boolean;
		paused: boolean;
		currTime: number;
	};
}

presence.on("iFrameData", (data: IFrameData) => {
	if (data.iframeVideo.dur) {
		({ iFrameVideo, paused } = data.iframeVideo);
		currentTime = data.iframeVideo.currTime;
		duration = data.iframeVideo.dur;
	}
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/1DbVzt2.png",
			startTimestamp: browsingTimestamp,
		},
		{ hostname, pathname, href } = document.location,
		{ title } = document;
	function removeExtension(str: string) {
		return str.split(".")[0];
	}

	if (hostname === "wbijam.pl") {
		switch (removeExtension(pathname)) {
			case "/": {
				presenceData.details = "Przegląda stronę główną";
				break;
			}
			case "/pomoc_techniczna": {
				presenceData.details = "Przegląda pomoc techniczną";
				break;
			}
			case "/polityka_prywatnosci": {
				presenceData.details = "Przegląda politykę prywatności";
				break;
			}
			case "/kontakt": {
				presenceData.details = 'Przegląda zakładkę "kontakt"';
				break;
			}
			case "/wsparcie-wsparcie": {
				presenceData.details = 'Przegląda zakładkę "wsparcie"';
				break;
			}
			default: {
				presenceData.details = "Przegląda wiadomości o anime";
				presenceData.state = title.split(",")[0];
				break;
			}
		}
	} else if (hostname.endsWith("wbijam.pl") && hostname !== "wbijam.pl") {
		const pathWithoutExtension = removeExtension(pathname),
			animeName = title.split("-")[0];
		if (pathname === "/" || pathWithoutExtension === "/wiadomosci") {
			presenceData.details = "Przegląda subdomenę anime";
			presenceData.state = animeName;
			presenceData.buttons = [{ label: "Przejdź na stronę", url: href }];
		} else {
			switch (pathWithoutExtension) {
				case "/spoilerzone": {
					presenceData.details = "Przegląda spoilerzone";
					presenceData.state = `Anime: ${animeName}`;
					break;
				}
				case "/opowiadania_fanowskie": {
					presenceData.details = "Przegląda opowiadania fanowskie";
					presenceData.state = `Anime: ${animeName}`;
					break;
				}
				case "/imageboard": {
					presenceData.details = "Przegląda forum obrazkowe";
					presenceData.state = `Anime: ${animeName}`;

					break;
				}
				case "/pomoc_techniczna": {
					presenceData.details = "Przegląda pomoc techniczną";
					break;
				}
				case "/polityka_prywatnosci": {
					presenceData.details = "Przegląda politykę prywatności";
					break;
				}
				case "/kontakt": {
					presenceData.details = 'Przegląda zakładkę "kontakt"';
					break;
				}
				case "/wsparcie-wsparcie": {
					presenceData.details = 'Przegląda zakładkę "wsparcie"';
					break;
				}
				default: {
					if (
						document.querySelector("#tresc_lewa > table") &&
						document
							.querySelector("#tresc_lewa > div > h1")
							?.textContent.toLowerCase()
							.includes(hostname.split(".")[0].toLowerCase())
					) {
						presenceData.details = "Przegląda odcinki";
						presenceData.state = `${animeName.replace(
							" ",
							""
						)}: ${pathWithoutExtension.replace("_", " ").slice(1)}`;
						presenceData.buttons = [
							{ label: "Zobacz listę odcinków", url: href },
						];
					} else if (
						document.querySelector("#tresc_lewa > div.episode-calendar-wrapper")
					) {
						presenceData.details = "Przegląda odcinek";
						presenceData.state = document
							.querySelector("#tresc_lewa > h1")
							.textContent.match(/(?<=").+?(?=")/i)
							.toString();
						presenceData.buttons = [{ label: "Zobacz odcinek", url: href }];
					}
				}
			}
		}
		if (iFrameVideo && !isNaN(duration)) {
			presenceData.details = animeName;
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? "Pauza" : "Odtwarzanie";

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
