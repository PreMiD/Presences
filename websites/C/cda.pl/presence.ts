const presence = new Presence({
		clientId: "783068812635013180",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	getTimestamps = (videoTime: number, videoDuration: number): number[] => {
		return [
			Math.floor(Date.now() / 1000),
			Math.floor(Date.now() / 1000) - videoTime + videoDuration,
		];
	};

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp,
		},
		pathname: string = document.location.pathname.toLowerCase();

	if (pathname === "/") {
		presenceData.details = "Przegląda:";
		presenceData.state = "Stronę Główną";
		presenceData.smallImageKey = "browsing";
	} else if (
		pathname.includes("/video") &&
		document.querySelector("#naglowek > span > span > h1")
	) {
		const title = document.querySelector(
			"#naglowek > span > span > h1"
		).textContent;
		presenceData.details = title;
		presenceData.state = `Przesłał: ${
			document.querySelector(
				"#leftCol > div:nth-child(2) > div.DescrVID > div.DescrVID-left > div > div > div > div:nth-child(1) > a > span > span"
			).textContent
		}`;
		if (
			window
				.getComputedStyle(
					document.querySelector(
						"#player > div > div > div > div > div > div > span.pb-video-player-wrap > span.pb-video-ad-container"
					),
					null
				)
				.getPropertyValue("display") === "block"
		) {
			presenceData.details = `(Reklama) ${title}`;
			delete presenceData.startTimestamp;
		} else {
			const video: HTMLVideoElement = document.querySelector("video");
			[presenceData.startTimestamp, presenceData.endTimestamp] = getTimestamps(
				Math.floor(video.currentTime),
				Math.floor(video.duration)
			);
			presenceData.smallImageKey = video.paused ? "paused" : "play";
			presenceData.smallImageText = video.paused ? "Pauza" : "Odtwarzanie";
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	} else if (pathname === "/video") {
		presenceData.details = "Przegląda:";
		presenceData.state = "Filmy";
		presenceData.smallImageKey = "reading";
	} else if (pathname.includes("/gry-online")) {
		presenceData.details = "Przegląda:";
		presenceData.state = "Gry";
		presenceData.smallImageKey = "reading";
	} else if (pathname.includes("/info")) {
		presenceData.details = "Szuka:";
		presenceData.state = pathname.split("/")[2];
		presenceData.smallImageKey = "search";
	} else if (pathname === "/premium") {
		presenceData.details = "Przegląda:";
		presenceData.state = "Filmy premium";
		presenceData.smallImageKey = "reading";
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
