const sxmLogo = "https://i.imgur.com/WVRaXaV.png",
	presence = new Presence({ clientId: "649825193853714453" });

let isPaused = true,
	startTimestamp: number | null = null;

const getTextContent = (selector: string): string =>
		document.querySelector(selector)?.textContent ?? "",
	getImageSrc = (selector: string): string =>
		document.querySelector(selector)?.querySelector("img")?.src ?? sxmLogo,
	pathDetailsMap: { [key: string]: string } = {
		"/player/home/for-you": "Viewing SiriusXM Home",
		"/player/home": "Viewing SiriusXM Home",
		"/player/home/music": "Viewing Music Home",
		"/player/home/sports": "Viewing Sports Home",
		"/player/home/talk-and-podcast": "Viewing Talk & Podcasts Home",
		"/player/my-library": "Viewing Their Library",
		"/player/search": "Searching SiriusXM...",
		"/player/channel-linear": "Viewing Channel:",
		"/player/show": "Viewing Show:",
		"/player/talent": "Viewing Host:",
		"/player/episode-video": "Viewing Video Episode: ",
		"/player/episode-audio": "Viewing Audio Episode: ",
		"/player/genre": "Viewing Genre:",
		"/player/event": "Viewing Event:",
		"/player/settings": "Viewing Their Settings",
		"/player/welcome": "Viewing The Welcome Page",
		"/player/login": "Logging in...",
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: sxmLogo, startTimestamp },
		title = getTextContent(
			"#root > div > div._BaseLayout_711jo_11 > main > div > div > header > div > div > div._EntityHeaderMetadata_1mpio_27 > div._EntityHeaderTexts_1mpio_32 > div._EntityHeaderTitle_1mpio_43 > h1"
		),
		subtitle = getTextContent(
			"#root > div > div._BaseLayout_711jo_11 > main > div > div > header > div > div > div._EntityHeaderMetadata_1mpio_27 > div._EntityHeaderTexts_1mpio_32 > div._EntityHeaderSubtitle_1mpio_47"
		),
		channelImage = getImageSrc(
			"#root > div > div._BaseLayout_711jo_11 > main > div > div > header > div > div > div._EntityImageContainer_1mpio_65 > span > span > span > span"
		),
		path = Object.keys(pathDetailsMap).find(p =>
			document.location.pathname.includes(p)
		);
	if (path) {
		presenceData.details = pathDetailsMap[path];
		if (path === "/player/search") {
			presenceData.state = (<HTMLInputElement>(
				document.querySelector("._SearchBarInput_k2jza_6")
			))?.value;
		} else if (
			[
				"/player/channel-linear",
				"/player/show",
				"/player/episode-video",
				"/player/episode-audio",
				"/player/genre",
				"/player/event",
			].includes(path)
		) {
			presenceData.state = `${subtitle.split("•")[1] ?? ""} • ${title}`;
			presenceData.largeImageKey = channelImage;
			presenceData.smallImageKey = sxmLogo;
		} else if (path === "/player/talent") {
			presenceData.state = title;
			presenceData.largeImageKey = channelImage;
			presenceData.smallImageKey = sxmLogo;
		}
	} else if (!document.location.pathname.includes("/player"))
		presenceData.details = "";
	else presenceData.details = "Unknown page";

	if (
		document.querySelector(
			"#root > div > div._BaseLayout_711jo_11 > footer > div > div"
		)
	) {
		const data = {
				channel: getTextContent(
					"#root > div > div._BaseLayout_711jo_11 > footer > div > div > div > div._controlsLeft_n7t3u_81 > div > div._textWrapper_n7t3u_240 > div:nth-child(2) > div > span"
				),
				track:
					getTextContent(
						"#root > div > div._BaseLayout_711jo_11 > footer > div > div > div > div._controlsLeft_n7t3u_81 > div > div._textWrapper_n7t3u_240 > div._text_n7t3u_240._title_n7t3u_263 > div > span"
					) || "Loading",
			},
			pausePlayBtn = document.querySelector(
				"#root > div > div._BaseLayout_711jo_11 > footer > div > div > div > div._controlsCenter_n7t3u_347 > div._controlButtonContainer_n7t3u_355 > button:nth-child(3)"
			),
			albumArt = getImageSrc(
				"#root > div > div._BaseLayout_711jo_11 > footer > div > div > div > div._controlsLeft_n7t3u_81 > div > div._imageContainer_n7t3u_127 > div > div:nth-child(3) > div > div > span > span > span > span"
			);

		presenceData.largeImageKey = albumArt;
		presenceData.smallImageKey = sxmLogo;
		presenceData.smallImageText = `Listening to SiriusXM Channel: ${
			data.channel.split("·")[1]
		}`;
		presenceData.state = data.channel;

		if (pausePlayBtn?.ariaLabel === "Pause") {
			if (isPaused) {
				isPaused = false;
				startTimestamp = Date.now();
			}
			presenceData.details = data.track;
		} else if (pausePlayBtn?.ariaLabel === "Play") {
			if (!isPaused) {
				isPaused = true;
				startTimestamp = null;
			}
			presenceData.details = `⏸️ ${data.track}`;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
