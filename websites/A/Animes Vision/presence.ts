const presence = new Presence({
		clientId: "700405996677365842",
	}),
	browsingTimestamps = Math.floor(Date.now() / 1000);

enum Assets {
	Logo = "https://i.imgur.com/mzqXcKZ.png",
	Playing = "https://i.imgur.com/KNneWuF.png",
	Paused = "https://i.imgur.com/BtWUfrZ.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			playing: "general.playing",
			paused: "general.paused",
			episode: "general.episode",
			browsing: "general.browsing",
			viewHome: "general.viewHome",
			buttonViewEpisode: "general.buttonViewEpisode",
			buttonViewSeries: "general.buttonViewSeries",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const [newLang, time, showCover, showButtons] = await Promise.all([
		presence.getSetting<string>("lang").catch(() => "en"),
		presence.getSetting<boolean>("time"),
		presence.getSetting<boolean>("cover"),
		presence.getSetting<boolean>("buttons"),
	]);
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			details: strings.browsing,
			startTimestamp: browsingTimestamps,
		},
		{ pathname, href, origin } = window.location,
		pathArr = pathname.split("/"),
		pathArrEnd = pathArr[pathArr.length - 1];

	switch (pathArrEnd) {
		case "":
			presenceData.details = strings.viewHome;
			break;
		case "equipe":
			presenceData.details = "Vendo os membros da equipe";
			break;
		case "dublado":
		case "legendado": {
			const video: HTMLVideoElement = document.querySelector("video");
			presenceData.details = document
				.querySelector("h2.film-name")
				.textContent.trim();
			presenceData.state = `${strings.episode} ${
				document
					.querySelector(".active > .ssli-detail > div")
					.textContent.trim()
					.split(" ")[1]
			}`;

			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
			presenceData.smallImageKey = Assets.Playing;
			presenceData.smallImageText = strings.playing;

			presenceData.buttons = [
				{ label: strings.buttonViewEpisode, url: href },
				{
					label: strings.buttonViewSeries,
					url: `${origin}/animes/${pathArr[2]}`,
				},
			];

			if (video.paused) {
				presenceData.smallImageKey = Assets.Paused;
				presenceData.smallImageText = strings.paused;
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
			break;
		}
		default:
			if (pathArr[1] === "lista")
				presenceData.details = `Vendo a lista de ${pathArrEnd}`;
	}
	if (pathname.startsWith("/top")) presenceData.details = "Vendo o top animes";

	if (!time) {
		delete presenceData.endTimestamp;
		delete presenceData.startTimestamp;
	}
	if (!showCover) presenceData.largeImageKey = Assets.Logo;
	if (!showButtons) delete presenceData.buttons;

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
