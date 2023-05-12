const presence = new Presence({
	clientId: "935597176426491924",
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
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

async function getStrings() {
	return presence.getStrings({
		play: "general.watchingVid",
		pause: "general.paused",
	});
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>;

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [privacy, time, logo, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("buttons"),
		]),
		presenceData: PresenceData = {
			details: "Где-то на сайте",
			largeImageKey: "https://i.imgur.com/B32aOhi.jpg",
			smallImageText: "AnimeGO",
		},
		typeContent = document
			.querySelector("meta[property='og:url']")
			.getAttribute("content")
			.split("/")[3],
		typeCurrent =
			typeContent === "anime"
				? "аниме"
				: typeContent === "manga"
				? "манги"
				: typeContent === "character" || typeContent === "characters"
				? "персонажа"
				: "человека";

	if (!strings) strings = await getStrings();

	if (document.location.pathname === "/")
		presenceData.details = "На главной странице";
	else if (
		document.location.pathname === "/anime" ||
		document.location.pathname === "/manga" ||
		document.location.pathname === "/characters" ||
		document.location.pathname.match(
			/(\/(anime|manga|characters)\/(season|genre|type|status|filter|studio|dubbing)\/)/
		)
	) {
		presenceData.details = `В поиске ${typeCurrent}`;
		if (!privacy) {
			presenceData.state = document.querySelector(
				".entity-title#anime-list-title h1"
			).textContent;
		}
	} else if (
		document.location.pathname.match(/\/(anime|manga|character|person)\//)
	) {
		const elementContent = typeContent === "person" ? "people" : typeContent,
			titleContent = document.querySelector(
				`.${elementContent}-title h1`
			).textContent,
			image = document
				.querySelector<HTMLImageElement>(
					`.${elementContent}-poster div:nth-child(2) img`
				)
				.srcset.split(" ")[0];
		presenceData.details = `Смотрит страницу ${typeCurrent}`;
		if (!privacy) {
			presenceData.state = titleContent;
			if (logo) {
				presenceData.largeImageKey = image;
				presenceData.smallImageKey = "animego_logo";
			}
			if (buttons) {
				presenceData.buttons = [
					{
						label: "Открыть страницу",
						url: document
							.querySelector("meta[property='og:url']")
							.getAttribute("content"),
					},
				];
			}
		}

		if (video.duration) {
			const selected = document.querySelector<HTMLSelectElement>(
					"select[name='series']"
				),
				serie = `${selected.options[selected.selectedIndex].text} - ${
					document.querySelector(
						".episode-info-item:nth-child(2) span:nth-child(2)"
					).textContent
				}`;
			presenceData.details = `Смотрит ${privacy ? typeCurrent : titleContent}`;
			presenceData.state = privacy ? "" : serie;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused ? strings.pause : strings.play;
			if (time) {
				if (video.paused) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				} else {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(video.currentTime, video.duration);
				}
			}
		}
	}

	presence.setActivity(presenceData);
});
