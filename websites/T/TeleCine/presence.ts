const presence = new Presence({
		clientId: "842620457655730207",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
		browsing: "presence.playback.browsing",
	});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = { largeImageKey: "logo" },
		video: HTMLVideoElement = document.querySelector(
			"body > div > div > div > div > div > video"
		);
	function getName() {
		if (
			document.location.pathname.startsWith("/filmes/") &&
			!document.location.pathname.endsWith("documentarios")
		) {
			return document
				.querySelector("body > div > div > div > section > div > section > h1")
				.textContent?.match(/\s[A-Za-záàâãéèêíïóôõöúçÁÀÂÃÉÈÍÏÓÔÕÖÚÇ-]{3,}/);
		}
	}

	switch (true) {
		// LISTA
		case document.location.pathname.endsWith("/mylist"):
			presenceData.details = "Visualizando lista...";
			break;
		// FRANQUIAS
		case document.location.pathname.includes("/franquias"):
			presenceData.details = "Visualizando franquias...";
			break;
		case document.location.pathname.includes("/franquia/"): {
			presenceData.details = document.querySelector(
				"body > div > div > div > section > div > h1"
			).textContent;
			presenceData.state = "Visualizando a franquia...";
			break;
		}
		// CINELISTS
		case document.location.pathname.includes("/cinelists"):
			presenceData.details = "Visualizando cinelists...";
			break;

		case document.location.pathname.includes("/cinelist/") ||
			document.location.pathname.includes("/dc"): {
			presenceData.details = document.querySelector(
				"body > div > div > div > section > div > h1"
			).textContent;
			presenceData.state = "Visualizando cinelist...";
			break;
		}
		// DOCUMENTÁRIOS
		case document.location.pathname.endsWith("documentarios"):
			presenceData.details = "Vendo documentários...";
			break;
		// FILMES
		case document.location.pathname.startsWith("/filmes/") &&
			!document.location.pathname.endsWith("documentarios"):
			presenceData.details = `Vendo filmes por gênero:${getName()}`;
			break;

		case document.location.pathname.includes("/filmes"):
			presenceData.details = "Vendo filmes por gênero...";
			break;

		case document.location.pathname.startsWith("/filme/"): {
			presenceData.details = document.querySelector(
				"body > div > div > div > div > section > div > div > h1"
			).textContent;
			presenceData.state = "Visualizando página do filme...";
			presenceData.smallImageKey = "reading";
			if (video) {
				presenceData.details = document.querySelector(
					"body > div > div > div > div > section > div > div > h1"
				).textContent;
				presenceData.state = "Assistindo filme...";
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? (await strings).pause
					: (await strings).play;
				if (!video.paused) {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestampsfromMedia(video);
				}
			}
			break;
		}
		// CONTA
		case document.location.pathname.includes("/account"):
			presenceData.details = "Visualizando informações da conta...";
			break;
		// PROGRAMAÇÃO
		case document.location.pathname.includes("/programacao"):
			presenceData.details = "Visualizando programação...";
			break;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
