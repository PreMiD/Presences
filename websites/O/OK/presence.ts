const presence = new Presence({
	clientId: "1036732879725658213",
});

enum Assets {
	Play = "https://i.imgur.com/C30VYuh.png",
	Pause = "https://i.imgur.com/yjIdXJ3.png",
	Reading = "https://i.imgur.com/YJBDFSZ.png",
	Viewing = "https://i.imgur.com/jw8hU7y.png",
}

enum Content {
	friends = "Друзья",
	friendRequests = "Друзья",
	pymk = "Друзья",
	outgoingFriendRequests = "Друзья",
	photos = "Фото",
	statuses = "Заметки",
	groups = "Группы",
	market = "Товары",
	music = "Музыка",
	games = "Игры",
	video = "Видео",
	giftsFriend = "Подарки",
	about = "О себе",
	feed = "новости",
	guests = "гостей",
	marks = "события",
	messages = "сообщения",
	vitrine = "игры",
	gifts = "подарки",
	discovery = "рекомендации",
	topphoto = "фото-конкурс",
	marathons = "марафоны",
	services = "приложения",
	mall = "товары",
	payments = "платежи и подписки",
	online = "людей на сайте",
}

async function getStrings() {
	return presence.getStrings({
		playVideo: "general.watchingVid",
		playMusic: "general.playing",
		pause: "general.paused",
		viewing: "general.viewing",
		reading: "general.reading",
	});
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>;

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent;
}

function typeContent(string: string) {
	return Content[string as keyof typeof Content];
}

function getMillisecondsFromString(timeString: string): number {
	return (
		(Number(timeString?.split(":")[0]) * 60 +
			Number(timeString?.split(":")[1])) *
		1000
	);
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	if (!strings) strings = await getStrings();
	const presenceData: PresenceData = {
			details: "Где-то на сайте",
			largeImageKey: "https://i.imgur.com/CTUW5vP.png",
		},
		[musicMode, privacy, time, logo] = await Promise.all([
			presence.getSetting<boolean>("musicMode"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("logo"),
		]),
		{ pathname } = document.location,
		playMusic = document
			.querySelector("music-mini-player")
			?.hasAttribute("playing");

	function showMusic() {
		const timeMusic = document
			.querySelector<HTMLElement>("wm-player-duration .track .tooltip")
			?.lastChild?.textContent?.split(" / ");

		presenceData.details = textContent(".mini-player_name");
		presenceData.state = textContent(".mini-player_artist");
		presenceData.smallImageKey = playMusic ? Assets.Play : Assets.Pause;
		presenceData.smallImageText = playMusic ? strings.playMusic : strings.pause;

		if (logo) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".mini-player_cover-img"
			)?.src;
		}

		if (timeMusic && playMusic) {
			const startedAt = Date.now() - getMillisecondsFromString(timeMusic[0]);
			presenceData.startTimestamp = startedAt;
			presenceData.endTimestamp =
				startedAt + getMillisecondsFromString(timeMusic[1]);
		}
	}

	if (!musicMode) {
		switch (pathname.split("/")[1]) {
			case "music":
				presenceData.details = "Слушает музыку";
				if (!privacy) showMusic();
				break;

			case "video":
				presenceData.details = "Смотрит видео";
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = strings.viewing;

				if (document.querySelector(".vp-layer")) {
					presenceData.state = textContent(".vp-layer-info_h");
					presenceData.smallImageKey = video.paused
						? Assets.Pause
						: Assets.Play;
					presenceData.smallImageText = video.paused
						? strings.pause
						: strings.playVideo;

					if (!video.paused) {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(video.currentTime, video.duration);
					}
				}
				break;

			case "profile":
				presenceData.details = `Смотрит профиль ${textContent(
					".__user-profile-name-decorator"
				)}`;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = strings.viewing;

				if (pathname.split("/")[3]) {
					if (document.querySelector(".compact-profile")) {
						presenceData.details = `Смотрит профиль ${
							document.querySelector<HTMLLinkElement>(".compact-profile_a")
								?.textContent
						}`;
					} else {
						presenceData.details = `Смотрит профиль ${
							document.querySelector(".nav-side_i-w")?.lastChild?.textContent
						}`;
					}
					presenceData.state = typeContent(pathname.split("/")[3]);
				}

				if (privacy) presenceData.details = "Смотрит профиль пользователя";
				break;

			case "guests":
			case "marks":
			case "vitrine":
			case "gifts":
			case "discovery":
			case "topphoto":
			case "marathons":
			case "services":
			case "mall":
			case "payments":
			case "online":
				presenceData.details = `Смотрит ${typeContent(pathname.split("/")[1])}`;
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = strings.viewing;
				break;

			case "feed":
			case "messages":
				presenceData.details = `Читает ${typeContent(pathname.split("/")[1])}`;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = strings.reading;
				break;

			case "notifications":
				presenceData.details = "Читает оповещения";
				presenceData.state = document.querySelector(
					".toolbar-layer_menu .nav-side_i.__ac .tico"
				)?.lastChild?.textContent;
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = strings.reading;
				break;

			case "game":
				presenceData.details = "Играет в игру";
				break;

			case "bookmarks":
				presenceData.details = "Смотрит закладки";
				presenceData.state = textContent(".nav-side_i.__ac div");
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = strings.viewing;
				break;

			case "settings":
				presenceData.details = "Настраивает аккаунт";
				presenceData.state = textContent(".nav-side_i.__ac .tico");
				break;
		}
	}

	if (privacy) delete presenceData.state;
	if (musicMode && document.querySelector("music-mini-player")) showMusic();
	if ((!playMusic && video.paused) || !time || privacy) {
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
	}
	presence.setActivity(presenceData);
});
