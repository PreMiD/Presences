const presence = new Presence({
	clientId: "804448815942860821",
});

async function getStrings() {
	return presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browsing: "general.browsing",
	});
}

enum Assets {
	Logo = "https://i.imgur.com/uu5XX85.png",
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
			largeImageKey: Assets.Logo,
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
				presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = videoPaused
					? strings.pause
					: strings.play;
				presenceData.startTimestamp = startTimestamp;
				presenceData.endTimestamp = endTimestamp;

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
			presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;
			presenceData.smallImageText = videoPaused ? strings.pause : strings.play;
			presenceData.startTimestamp = startTimestamp;
			presenceData.endTimestamp = endTimestamp;

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
