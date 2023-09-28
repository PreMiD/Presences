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
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/W/Wbijam/assets/0.png",
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
			presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
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
