const presence = new Presence({
		clientId: "804448815942860821",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.activity.browsing",
	});

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
	const presenceData: PresenceData = {
		largeImageKey: "logo",
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
			(presenceData.smallImageKey = videoPaused ? "pause" : "play"),
				(presenceData.smallImageText = videoPaused
					? (await strings).pause
					: (await strings).play),
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
		presenceData.smallImageText = (await strings).browsing;
		presenceData.largeImageKey = document
			.querySelector("div.backdrop > article > div.Image > figure > img")
			.getAttribute("data-src");
	} else {
		presenceData.details = (await strings).browsing;
		presenceData.smallImageKey = "browsing";
		presenceData.smallImageText = (await strings).browsing;
	}
	presence.setActivity(presenceData);
});
