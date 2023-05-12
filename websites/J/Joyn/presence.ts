const presence = new Presence({
	clientId: "799629862620758046",
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
	return presence.getStrings(
		{
			play: "general.playing",
			pause: "general.paused",
			browsing: "general.browsing",
			live: "general.live",
			searching: "general.search",
			viewMovie: "general.viewMovie",
			watchingMovie: "general.watchingMovie",
			watchingSeries: "general.watchingSeries",
			watchMovie: "general.buttonViewMovie",
			watchSeries: "general.buttonViewSeries",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async function () {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SrAaJDz.jpg",
		},
		newLang = await presence.getSetting<string>("lang").catch(() => "en"),
		setting = {
			timeRemaining: await presence.getSetting<boolean>("timeRemaining"),
			showButtons: await presence.getSetting<boolean>("showButtons"),
		},
		urlpath = window.location.pathname.split("/"),
		video: HTMLVideoElement = document.querySelector("div video");

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (
		document.location.hostname === "www.joyn.de" ||
		document.location.hostname === "joyn.de"
	) {
		if (document.querySelector(".lk71lm-0.htJLsh")) {
			presenceData.details = (await strings).searching;
			presenceData.state =
				document.querySelector<HTMLInputElement>(".search-input").value;
		} else if (
			(urlpath[1] === "" || document.location.pathname.includes("/#home")) &&
			urlpath[2] !== ""
		)
			presenceData.details = (await strings).browsing;
		else {
			switch (urlpath[1]) {
				case "compilation": {
					const compilation = document.querySelector(".artLogo");
					presenceData.details = "Viewing Compilation:";
					if (compilation)
						presenceData.state = (compilation as HTMLImageElement).alt;
					if (!compilation)
						presenceData.state = document.querySelector(".hXdaOG").textContent;

					if (setting.showButtons) {
						presenceData.buttons = [
							{
								label: "Watch Compilation",
								url: `https://www.joyn.de/compilation/${urlpath[2]}`,
							},
						];
					}

					break;
				}
				case "filme": {
					const film = document.querySelector(".artLogo");
					presenceData.details = (await strings).viewMovie;
					if (film) presenceData.state = (film as HTMLImageElement).alt;
					if (!film)
						presenceData.state = document.querySelector(".hXdaOG").textContent;

					if (setting.showButtons) {
						presenceData.buttons = [
							{
								label: (await strings).watchMovie,
								url: `https://www.joyn.de/filme/${urlpath[2]}`,
							},
						];
					}

					break;
				}
				case "serien": {
					const serie = document.querySelector(".artLogo");
					presenceData.details = "Viewing Series:";
					if (serie) presenceData.state = (serie as HTMLImageElement).alt;
					if (!serie)
						presenceData.state = document.querySelector(".hXdaOG").textContent;

					if (setting.showButtons) {
						presenceData.buttons = [
							{
								label: (await strings).watchSeries,
								url: `https://www.joyn.de/serien/${urlpath[2]}`,
							},
						];
					}

					break;
				}
				default:
					if (
						urlpath[1] !== "play" &&
						(document.location.pathname.includes("/serien") ||
							document.location.pathname.includes("/filme") ||
							document.location.pathname.includes("/sport"))
					)
						presenceData.details = (await strings).browsing;
					else if (urlpath[1] === "channels") {
						presenceData.details = (await strings).browsing;
						presenceData.state = document.querySelector(".bISbKZ").textContent;
					} else if (urlpath[1] === "play" && urlpath[2] === "filme") {
						const videoStartTime = Date.now();
						presenceData.details = document.title.replace(
							"streamen | Joyn",
							""
						);
						presenceData.state = "Movie";
						if (!video.paused) {
							if (setting.timeRemaining) {
								presenceData.startTimestamp = videoStartTime;
								presenceData.endTimestamp =
									Math.floor(videoStartTime / 1000) -
									video.currentTime +
									video.duration;
							}
							presenceData.smallImageKey = Assets.Play;
							presenceData.smallImageText = (await strings).play;
						} else {
							presenceData.smallImageKey = Assets.Pause;
							presenceData.smallImageText = (await strings).pause;
						}
						if (setting.showButtons) {
							presenceData.buttons = [
								{
									label: (await strings).watchMovie,
									url: `https://www.joyn.de/filme/${urlpath[3]}`,
								},
							];
						}
					} else if (urlpath[1] === "play" && urlpath[2] === "serien") {
						const videoStartTime = Date.now();

						presenceData.details = document.title.replace("streamen", "");
						presenceData.state = "Series";
						if (!video.paused) {
							if (setting.timeRemaining) {
								presenceData.startTimestamp = videoStartTime;
								presenceData.endTimestamp =
									Math.floor(videoStartTime / 1000) -
									video.currentTime +
									video.duration;
							}
							presenceData.smallImageKey = Assets.Play;
							presenceData.smallImageText = (await strings).play;
						} else {
							presenceData.smallImageKey = Assets.Pause;
							presenceData.smallImageText = (await strings).pause;
						}

						if (setting.showButtons) {
							presenceData.buttons = [
								{
									label: (await strings).watchSeries,
									url: `https://www.joyn.de/serien/${urlpath[3]}`,
								},
							];
						}
					} else if (urlpath[1] === "play" && urlpath[2] === "trailer") {
						const videoStartTime = Date.now();
						presenceData.details = document.title.replace("Trailer | Joyn", "");
						presenceData.state = "Trailer";
						if (!video.paused) {
							if (setting.timeRemaining) {
								presenceData.startTimestamp = videoStartTime;
								presenceData.endTimestamp =
									Math.floor(videoStartTime / 1000) -
									video.currentTime +
									video.duration;
							}
							presenceData.smallImageKey = Assets.Play;
							presenceData.smallImageText = (await strings).play;
						} else {
							presenceData.smallImageKey = Assets.Pause;
							presenceData.smallImageText = (await strings).pause;
						}
					} else if (urlpath[1] === "play" && urlpath[2] === "live-tv") {
						presenceData.details = document.title.replace(
							"im Livestream anschauen | Joyn",
							""
						);
						presenceData.state = "Live-TV";
						presenceData.smallImageKey = "live";
						presenceData.smallImageText = (await strings).live;

						if (setting.showButtons) {
							presenceData.buttons = [
								{
									label: "Watch show",
									url: window.location.href,
								},
							];
						}
					} else if (urlpath[1] === "play" && urlpath[2] === "compilation") {
						const videoStartTime = Date.now();
						presenceData.details = document.title.replace("| Joyn", "");
						presenceData.state = "Compilation";
						if (!video.paused) {
							if (setting.timeRemaining) {
								presenceData.startTimestamp = videoStartTime;
								presenceData.endTimestamp =
									Math.floor(videoStartTime / 1000) -
									video.currentTime +
									video.duration;
							}
							presenceData.smallImageKey = Assets.Play;
							presenceData.smallImageText = (await strings).play;
						} else {
							presenceData.smallImageKey = Assets.Pause;
							presenceData.smallImageText = (await strings).pause;
						}

						if (setting.showButtons) {
							presenceData.buttons = [
								{
									label: "Watch Compilation",
									url: `https://www.joyn.de/compilation/${urlpath[3]}`,
								},
							];
						}
					} else if (urlpath[1] === "play" && urlpath[2] === "sport") {
						presenceData.details = document.querySelector(
							".metadataWrapper .metadataTitle"
						).textContent;
						presenceData.state = "Sport";
						if (!video.paused) {
							if (setting.timeRemaining) {
								presenceData.startTimestamp = Date.now();
								presenceData.endTimestamp =
									Math.floor(Date.now() / 1000) -
									video.currentTime +
									video.duration;
							}
							presenceData.smallImageKey = Assets.Play;
							presenceData.smallImageText = (await strings).play;
						} else {
							presenceData.smallImageKey = Assets.Pause;
							presenceData.smallImageText = (await strings).pause;
						}

						if (setting.showButtons) {
							presenceData.buttons = [
								{
									label: "Watch sports show",
									url: window.location.href,
								},
							];
						}
					} else if (urlpath[1] === "collections" && urlpath[2]) {
						presenceData.details = "Viewing Collection:";
						presenceData.state = document.querySelector(
							"h1.sc-eqamei-0.cdfQp"
						)?.textContent;
					} else {
						switch (urlpath[1]) {
							case "mein-account": {
								if (urlpath[2] === "details") {
									presenceData.details = "My Account";
									presenceData.state = "Details";
								} else presenceData.details = "My Account";

								break;
							}
							case "abo": {
								if (urlpath[2] === "bezahlung") {
									presenceData.details = "My Account";
									presenceData.state = "Payment method";
								} else if (urlpath[2] === "rechnung") {
									presenceData.details = "My Account";
									presenceData.state = "Bills";
								} else {
									presenceData.details = "My Account";
									presenceData.state = "Membership";
								}

								break;
							}
							case "fsk": {
								presenceData.details = "My Account";
								presenceData.state = "FSK Settings";

								break;
							}
							case "ueber-joyn": {
								presenceData.details = "About Joyn";
								break;
							}
							case "jugendschutz": {
								presenceData.details = "Youth protection";
								break;
							}
							case "datenschutz": {
								presenceData.details = "Privacy policy";
								break;
							}
							case "agb":
								{
									presenceData.details = "Terms of service";
									// No default
								}
								break;
						}
					}
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
