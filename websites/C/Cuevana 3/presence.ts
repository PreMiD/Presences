const presence = new Presence({
	clientId: "804448815942860821",
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

async function getStrings() {
	return presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});
}

let iFrameVideo: boolean,
	videoPaused: boolean,
	startTimestamp: number,
	endTimestamp: number;

presence.on(
	"iFrameData",
	(data: {
		iFrameVideo: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		({ iFrameVideo } = data);
		[startTimestamp, endTimestamp] = presence.getTimestamps(
			data.currentTime,
			data.duration
		);
		videoPaused = data.paused;
	}
);

presence.on("UpdateData", async () => {
	let strings = await getStrings();
	if (document.location.hostname === "m4.cuevana3.me") {
		const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/uu5XX85.png",
		};

		if (
			document.location.pathname.match("^/[0-9]") ||
			document.location.pathname.includes("/episodio")
		) {
			const titulo = document.querySelector("h1.Title").textContent,
				subtitulo = document.querySelector("h2.SubTitle").textContent,
				cover = document
					.querySelector("div.backdrop > article > div.Image > figure > img")
					.getAttribute("data-src");

			if (!document.location.pathname.includes("/episodio")) {
				presenceData.details = titulo;
				if (subtitulo === titulo) delete presenceData.state;
				else presenceData.state = subtitulo;
				presenceData.buttons = [
					{ label: "Ver Película", url: window.location.href },
				];
				presenceData.largeImageKey = cover;
			} else {
				presenceData.details = titulo
					.replace(document.querySelector("h1.Title > span").textContent, "")
					.replace(/\s+/g, " ")
					.trim();
				presenceData.state = `${
					document.querySelector("h1.Title > span").textContent
				} ${subtitulo}`;
				presenceData.buttons = [
					{ label: "Ver Episodio", url: window.location.href },
				];
				presenceData.largeImageKey = cover;
			}

			if (iFrameVideo) {
				strings = await getStrings();
				(presenceData.smallImageKey = videoPaused ? "pause" : "play"),
					(presenceData.smallImageText = videoPaused
						? strings.pause
						: strings.play),
					(presenceData.startTimestamp = startTimestamp),
					(presenceData.endTimestamp = endTimestamp);

				if (videoPaused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}

			presence.setActivity(presenceData, !videoPaused);
		} else if (document.location.pathname.includes("/serie/")) {
			presenceData.details = document.querySelector("h1.Title").textContent;
			presenceData.smallImageKey = "browsing";
			presenceData.smallImageText = strings.browsing;
			presenceData.largeImageKey = document
				.querySelector("div.backdrop > article > div.Image > figure > img")
				.getAttribute("data-src");
		} else {
			presenceData.details = strings.browsing;
			presenceData.smallImageKey = "browsing";
			presenceData.smallImageText = strings.browsing;
		}
	}

	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/uu5XX85.png",
	};

	if (
		document.location.pathname.includes("/pelicula") ||
		document.location.pathname.includes("/episodio")
	) {
		let titulo, cover;

		if (!document.location.pathname.includes("/episodio")) {
			titulo = document.querySelector("h1.title > span").textContent;
			presenceData.details = titulo;
			delete presenceData.state;
			presenceData.buttons = [
				{ label: "Ver Película", url: window.location.href },
			];
			cover = `https://ww3.cuevana.pro${String(
				document.querySelector("figure.poster > img").getAttribute("src")
			)}`;
			presenceData.largeImageKey = cover;
		} else {
			titulo = document.querySelector("h1.title").textContent;
			presenceData.details = titulo;
			delete presenceData.state;
			presenceData.buttons = [
				{ label: "Ver Episodio", url: window.location.href },
			];
			presenceData.largeImageKey = document
				.querySelector("figure > img")
				.getAttribute("src");
		}

		if (iFrameVideo) {
			(presenceData.smallImageKey = videoPaused ? "pause" : "play"),
				(presenceData.smallImageText = videoPaused
					? strings.pause
					: strings.play),
				(presenceData.startTimestamp = startTimestamp),
				(presenceData.endTimestamp = endTimestamp);

			if (videoPaused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}

		presence.setActivity(presenceData, !videoPaused);
	} else if (document.location.pathname.includes("/serie/")) {
		presenceData.details =
			document.querySelector("h1.title > span").textContent;
		presenceData.smallImageKey = "browsing";
		presenceData.smallImageText = strings.browsing;
		presenceData.largeImageKey = document
			.querySelector("figure > img")
			.getAttribute("src");
	} else {
		presenceData.details = strings.browsing;
		presenceData.smallImageKey = "browsing";
		presenceData.smallImageText = strings.browsing;
	}

	presence.setActivity(presenceData);
});
