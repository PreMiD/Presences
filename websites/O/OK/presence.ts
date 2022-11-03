const presence = new Presence({
	clientId: "1036732879725658213",
});

enum Assets {
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
	});
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>,
	startedAt;

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent;
}

function typeContent(string: string) {
	return Assets[string as keyof typeof Assets];
}

function getMillisecondsFromString(timeString: string): number {
	const parsedText = timeString.split(":");
	return (Number(parsedText[0]) * 60 + Number(parsedText[1])) * 1000;
}

presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Где-то на сайте",
			largeImageKey: "https://i.imgur.com/Jky2SvM.png",
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
		presenceData.details = textContent(".mini-player_name");
		presenceData.state = textContent(".mini-player_artist");
		if (logo) {
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".mini-player_cover-img"
			)?.src;
		}
		presenceData.smallImageKey = playMusic ? "play" : "pause";
		presenceData.smallImageText = playMusic ? strings.playMusic : strings.pause;

		if (
			document.querySelector("wm-player-duration .track .tooltip") &&
			playMusic
		) {
			startedAt =
				Date.now() -
				getMillisecondsFromString(
					document
						.querySelector<HTMLElement>("wm-player-duration .track .tooltip")
						?.lastChild?.textContent?.split(" / ")[0]
				);
			presenceData.startTimestamp = startedAt;
			presenceData.endTimestamp =
				startedAt +
				getMillisecondsFromString(
					document
						.querySelector<HTMLElement>("wm-player-duration .track .tooltip")
						?.lastChild?.textContent?.split(" / ")[1]
				);
		}
	}

	if (!strings) strings = await getStrings();

	if (!musicMode) {
		switch (pathname.split("/")[1]) {
			case "music":
				presenceData.details = "Слушает музыку";
				if (!privacy) showMusic();
				break;
			case "video":
				presenceData.details = "Смотрит видео";
				if (document.querySelector(".vp-layer")) {
					presenceData.state = textContent(".vp-layer-info_h");
					presenceData.smallImageKey = video.paused ? "pause" : "play";
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
			case "feed":
			case "guests":
			case "marks":
			case "messages":
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
				break;
			case "notifications":
				presenceData.details = "Смотрит оповещения";
				presenceData.state = document.querySelector(
					".nav-side.__navigation:not(.__user-main) .nav-side_i.__ac .tico"
				)?.lastChild?.textContent;
				break;
			case "game":
				presenceData.details = "Играет в игру";
				break;
			case "bookmarks":
				presenceData.details = "Смотрит закладки";
				presenceData.state = textContent(".nav-side_i.__ac div");
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
