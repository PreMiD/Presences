const presence = new Presence({
		clientId: "1004856375475712062",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/LdUPH9K.png",
			startTimestamp: browsingTimestamp,
		},
		[showCover, time] = await Promise.all([
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("time"),
		]),
		imgPlaceholder =
			"https://simplyaweeb.to/wp-content/themes/simplyaweeb/images/placeholder.jpg";

	switch (document.location.pathname.split("/")[1]) {
		case "":
			presenceData.details = "Browsing anime videos";
			if (
				!["", "none"].includes(
					document.querySelector<HTMLElement>("#youtubelightbox").style.display
				)
			) {
				presenceData.details = document
					.querySelector<HTMLSpanElement>(".title-info")
					.textContent.trim();
				presenceData.state = `From ${document
					.querySelector<HTMLSpanElement>(".anime-name")
					.textContent.trim()}`;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.current, video.duration);

				if (showCover) {
					presenceData.largeImageKey =
						document.querySelector<HTMLImageElement>("div.col-left > img").src;
				}
				presenceData.smallImageKey = "play";
				presenceData.smallImageText = "Playing";

				if (video.paused) {
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = "Paused";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
			break;
		case "music":
			presenceData.details = "Browsing anime musics";
			if (
				!["", "none"].includes(
					document.querySelector<HTMLElement>("#youtubelightbox").style.display
				)
			) {
				presenceData.details = document
					.querySelector<HTMLSpanElement>(".title-info")
					.textContent.trim();
				presenceData.state = `From ${document
					.querySelector<HTMLSpanElement>(".anime-name")
					.textContent.trim()} (${document
					.querySelector<HTMLSpanElement>(".season-anime")
					.textContent.trim()})`;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(
						presence.timestampFromFormat(
							document
								.querySelector<HTMLSpanElement>(".current-time")
								.textContent.trim()
						),
						presence.timestampFromFormat(
							document
								.querySelector<HTMLSpanElement>(".duration")
								.textContent.trim()
						)
					);

				if (showCover) {
					presenceData.largeImageKey = document
						.querySelector<HTMLImageElement>("div.col-left > img")
						.src.replace("&w=100", "");
				}

				presenceData.smallImageKey = "play";
				presenceData.smallImageText = "Playing";
				if (
					!document
						.querySelector<HTMLDivElement>(".maudio")
						.classList.contains("playing")
				) {
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = "Paused";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			}
			break;
		case "memes":
			presenceData.details = "Browsing anime memes";
			if (document.querySelector("div.lg")) {
				presenceData.details = "Reading a meme";
				presenceData.state =
					document.querySelector<HTMLDivElement>("div.lg-sub-html").textContent;
				presenceData.smallImageKey = "reading";
				presenceData.smallImageText = "Reading";
			}
			break;
		case "anime":
			presenceData.details = "Browsing animes";
			if (
				!["", "none"].includes(
					document.querySelector<HTMLElement>("#youtubelightbox").style.display
				)
			) {
				presenceData.details = document
					.querySelector<HTMLSpanElement>(".title-info")
					.textContent.trim();
				presenceData.state = `Episode ${document
					.querySelector<HTMLSpanElement>(".anime-episode")
					.textContent.trim()}`;

				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.current, video.duration);

				const imgLink =
					document.querySelector<HTMLImageElement>("div.col-left > img").src;
				if (showCover && imgLink !== imgPlaceholder)
					presenceData.largeImageKey = imgLink;

				presenceData.smallImageKey = "play";
				presenceData.smallImageText = "Playing";

				if (video.paused) {
					presenceData.smallImageKey = "pause";
					presenceData.smallImageText = "Paused";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
				presenceData.buttons = [
					{ label: "View Episode", url: document.location.href },
				];
			}
			break;
		case "manga":
			presenceData.details = "Browsing mangas";
			if (
				!["", "none"].includes(
					document.querySelector<HTMLElement>("#youtubelightbox").style.display
				)
			) {
				presenceData.details = document
					.querySelector<HTMLDivElement>(".name")
					.textContent.trim();
				presenceData.state = document
					.querySelector<HTMLDivElement>(".episode-number")
					.textContent.trim();

				const imgLink =
					document.querySelector<HTMLImageElement>("div.col-left > img").src;
				if (showCover && imgLink !== imgPlaceholder)
					presenceData.largeImageKey = imgLink;
				presenceData.smallImageKey = "reading";
				presenceData.smallImageText = "Reading";

				presenceData.buttons = [
					{ label: "Read Chapter", url: document.location.href },
				];
			}
			break;
	}
	// Since radio can be played on video or music part, this if statement is placed here to overwrote the actual presenceData if the radio is played
	const radioElement: HTMLElement = document.querySelector("i.pause");
	if (!["", "none"].includes(radioElement?.style.display) && radioElement) {
		presenceData.details = "Currently listening to";
		presenceData.state = document
			.querySelector(".song-title")
			.textContent.split(":")[1]
			.trim();
	}

	if (!time) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
