const presence = new Presence({
		clientId: "640292045117980713",
	}),
	strings = presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement,
	playing: boolean,
	paused: boolean,
	progress: string | HTMLStyleElement | number,
	lastState: string | null,
	oldTitle: string | null,
	currentTime: number,
	duration: number,
	video: HTMLVideoElement;

lastState = null;
oldTitle = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/P/PlutoTV/assets/logo.png",
	};

	if (document.location.hostname === "pluto.tv") {
		if (document.location.pathname.includes("/live-tv/")) {
			progress = document.querySelector<HTMLStyleElement>(
				"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.VideoControls__videoControls-irCOHX.frYEBe > div.VideoControls__bottomPanel-gpACgQ.jiJGDj > div > div > div > div"
			);
			progress = progress.style.cssText
				.replace("width: ", "")
				.replace("%;", "");

			if (lastState === progress && progress !== "0" && progress !== "100") {
				playing = true;
				paused = true;
			} else if (progress === "0" || progress === "100") {
				playing = false;
				paused = true;
			} else {
				lastState = progress;
				playing = true;
				paused = false;
			}
			progress = Number(progress);
			progress = Math.round(progress);
		}

		if (playing === true && paused === false) {
			title = document.querySelector(
				"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI"
			);
			presenceData.details = title.textContent;
			presenceData.state = `${progress}% progressed`;
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Playing";
		} else if (playing === true && paused === true) {
			title = document.querySelector(
				"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI"
			);
			presenceData.details = title.textContent;
			presenceData.state = `${progress}% progressed`;
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Playing";
		} else if (document.location.pathname.includes("/on-demand/movies/")) {
			video = document.querySelector(
				"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.Player__VideoWrapper-iChBud.eNibdw > div > div:nth-child(1) > div > div.container.chromeless.pointer-enabled > video"
			);
			({ currentTime, duration, paused } = video);

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(Math.floor(currentTime), Math.floor(duration));
			if (!isNaN(duration)) {
				presenceData.smallImageKey = paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = paused
					? (await strings).pause
					: (await strings).play;

				title = document.querySelector(
					"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
				);
				title ??= document.querySelector(
					"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
				);

				if (!title && oldTitle) presenceData.details = oldTitle;
				else {
					presenceData.details = title.textContent;
					oldTitle = title.textContent;
				}

				if (paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else if (isNaN(duration)) {
				presenceData.startTimestamp = browsingTimestamp;
				presenceData.details = "Looking at: ";
				title = document.querySelector(
					"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
				);
				title ??= document.querySelector(
					"#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
				);
				if (!title && oldTitle) presenceData.details = oldTitle;
				else {
					presenceData.details = title.textContent;
					oldTitle = title.textContent;
				}

				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (document.location.pathname.includes("/trending")) {
			presenceData.startTimestamp = browsingTimestamp;
			presenceData.details = "Viewing what's trending";
		} else if (document.location.pathname.includes("/on-demand")) {
			presenceData.details = "Browsing on";
			presenceData.state = "demand shows...";
			presenceData.startTimestamp = browsingTimestamp;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
