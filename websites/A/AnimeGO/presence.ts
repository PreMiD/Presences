const presence = new Presence({
	clientId: "935597176426491924"
});

async function getStrings() {
	return presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused"
	});
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	video = {
		duration: 0,
		currentTime: 0,
		paused: true
	};

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Где-то на сайте",
		largeImageKey: "animego_logo",
		smallImageText: "AnimeGO"
	};
	if (!strings) strings = await getStrings();

	const typeContent = document
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

	if (document.location.pathname === "/")
		presenceData.details = "На главной странице";
	else if (document.location.pathname.includes("/profile")) {
		presenceData.details = `Смотрит свой профиль (${
			document.querySelector(".nav.navbar-nav.login li:nth-child(1) span")
				.textContent
		})`;
	} else if (document.location.pathname.includes("/user/")) {
		presenceData.details = `Смотрит профиль ${
			document
				.querySelector("meta[property='og:url']")
				.getAttribute("content")
				.split("/")[4]
		}`;
		if (
			document.location.pathname.includes("/anime") ||
			document.location.pathname.includes("/manga")
		)
			presenceData.state = document.querySelector("main h1").textContent;
	} else if (
		document.location.pathname === "/anime" ||
		document.location.pathname.includes("/anime/season/") ||
		document.location.pathname.includes("/anime/genre/") ||
		document.location.pathname.includes("/anime/type/") ||
		document.location.pathname.includes("/anime/status/") ||
		document.location.pathname.includes("/anime/filter/") ||
		document.location.pathname.includes("/anime/studio/") ||
		document.location.pathname === "/manga" ||
		document.location.pathname.includes("/manga/season/") ||
		document.location.pathname.includes("/manga/genre/") ||
		document.location.pathname.includes("/manga/type/") ||
		document.location.pathname.includes("/manga/status/") ||
		document.location.pathname.includes("/manga/filter/") ||
		document.location.pathname === "/characters"
	) {
		presenceData.details = `В поиске ${typeCurrent}`;
		presenceData.state = `${
			document.querySelector(".entity-title#anime-list-title h1").textContent
		}`;
	} else if (
		document.location.pathname.includes("/anime/") ||
		document.location.pathname.includes("/manga/") ||
		document.location.pathname.includes("/character/") ||
		document.location.pathname.includes("/person/")
	) {
		const titleContent = document.querySelector(
				`.${typeContent === "person" ? "people" : typeContent}-title h1`
			).textContent,
			image =
				document.querySelector<HTMLImageElement>(
					`.${
						typeContent === "person" ? "people" : typeContent
					}-poster div:nth-child(2) img`
				).srcset.split(" ")[0];
		presenceData.details = `Смотрит страницу ${typeCurrent}`;
		presenceData.state = titleContent;
		presenceData.largeImageKey = image;
		presenceData.smallImageKey = "animego_logo";
		presenceData.buttons = [
			{
				label: "Открыть страницу",
				url: document
					.querySelector("meta[property='og:url']")
					.getAttribute("content")
			}
		];

		if (video.duration !== 0) {
			const selected = document.querySelector<HTMLSelectElement>(
					"select[name='series']"
				),
				serie = `${selected.options[selected.selectedIndex].text} - ${
					document.querySelector(
						".episode-info-item:nth-child(2) span:nth-child(2)"
					).textContent
				}`;
			presenceData.details = `Смотрит ${titleContent}`;
			presenceData.state = serie;
			presenceData.smallImageKey = video.paused ? "pause" : "play";
			presenceData.smallImageText = video.paused ? strings.pause : strings.play;
			if (video.paused) {
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			} else {
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						Math.floor(video.currentTime),
						Math.floor(video.duration)
					);
			}
		}
	}

	presence.setActivity(presenceData);
});
