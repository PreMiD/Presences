const presence = new Presence({
		clientId: "992829484564746290",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
		domain = document.location.host,
		path = document.location.pathname,
		{ title } = document,
		removeExtension = (str: string) => str.split(".")[0];

	if (domain === "wbijam.pl") {
		if (path === "/") presenceData.details = "Przegląda stronę główną";
		switch (removeExtension(path)) {
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
	} else if (domain.endsWith("wbijam.pl") && domain !== "wbijam.pl") {
		const pathWithoutExtension = removeExtension(path),
			animeName = title.split("-")[0];
		if (path === "/" || pathWithoutExtension === "/wiadomosci") {
			presenceData.details = "Przegląda subdomenę anime";
			presenceData.state = animeName;
			presenceData.buttons = [
				{ label: "Przejdź na stronę", url: document.location.href },
			];
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
							.includes(domain.split(".")[0].toLowerCase())
					) {
						presenceData.details = "Przegląda odcinki";
						presenceData.state = `${animeName.replace(
							" ",
							""
						)}: ${pathWithoutExtension.replace("_", " ").slice(1)}`;
						presenceData.buttons = [
							{ label: "Zobacz listę odcinków", url: document.location.href },
						];
					} else if (
						document.querySelector("#tresc_lewa > div.episode-calendar-wrapper")
					) {
						presenceData.details = "Przegląda odcinek";
						presenceData.state = document
							.querySelector("#tresc_lewa > h1")
							.textContent.match(/(?<=").+?(?=")/i)
							.toString();
						presenceData.buttons = [
							{ label: "Zobacz odcinek", url: document.location.href },
						];
					}
				}
			}
		}
		if (iFrameVideo === true && !isNaN(duration)) {
			presenceData.details = animeName;
			const [startTimestamp, endTimestamp] = presence.getTimestamps(
				Math.floor(currentTime),
				Math.floor(duration)
			);
			presenceData.smallImageKey = paused ? "pause" : "play";
			presenceData.smallImageText = paused ? "Pauza" : "Odtwarzanie";
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

			if (paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
