const presence = new Presence({
	clientId: "1096792677888053308",
});

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

const animetypes: { [key: string]: string } = {
		tv: "ТВ-сериал",
		"tv-speshl": "ТВ-спешл",
		ova: "OVA",
		ona: "ONA",
		"polnometrazhnyy-film": "Фильм",
		"korotkometrazhnyy-film": "Фильм",
		dunkhua: "Дунху",
	},
	animegenres: { [key: string]: string } = {
		"boyevyye-iskusstva": "Боевые искусства",
		voyna: "Война",
		drama: "Драма",
		detektiv: "Детектив",
		istoriya: "История",
		komediya: "Комедия",
		mekha: "Меха",
		mistika: "Мистика",
		"makho-sedze": "Махо-сёдзё",
		muzykalnyy: "Музыкальный",
		povsednevnost: "Повседневность",
		priklyucheniya: "Приключения",
		parodiya: "Пародия",
		romantika: "Романтика",
		senen: "Сёнен",
		sedze: "Сёдзё",
		sport: "Спорт",
		skazka: "Сказка",
		"sedze-ay": "Сёдзё-ай",
		"senen-ay": "Сёнен-ай",
		samurai: "Самураи",
		triller: "Триллер",
		uzhasy: "Ужасы",
		fantastika: "Фантастика",
		fentezi: "Фентези",
		shkola: "Школа",
		etti: "Эччи",
	};
let strtstamp = Math.floor(Date.now() / 1000),
	pausestamp = false;

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
			largeImageKey: "https://i.imgur.com/9KbVqtj.png",
			smallImageText: "🏴‍☠️ AnimeVost",
		},
		websiteloc = document.location.pathname.split("/");
	if (!strings) strings = await getStrings();
	if (!privacy) {
		if (websiteloc[1] === "") presenceData.details = "На главной странице";
		if (websiteloc[1] === "zhanr") {
			const animegenre = animegenres[websiteloc[2]];
			presenceData.details = `🔎 В поисках аниме жанра ${animegenre}`;
			presenceData.smallImageKey = websiteloc[2];
			presenceData.smallImageText = `🔎 В поисках аниме жанра ${animegenre}`;
		}
		if (websiteloc[1] === "god")
			presenceData.details = `🔎 В поисках аниме ${websiteloc[2]}года`;
		if (websiteloc[1] === "ongoing") {
			presenceData.details = "🔎 В поисках онгоинга";
			presenceData.smallImageKey = "ongoing";
			presenceData.smallImageText = "🔎 В поисках Онгоинга";
		}
		if (websiteloc[1] === "preview") {
			presenceData.details = "🔎 В поисках анонса";
			presenceData.smallImageKey = "anons";
			presenceData.smallImageText = "🔎 В поисках Анонса";
		}
		if (websiteloc[1] === "user") {
			presenceData.details = `На странице пользователя ${decodeURIComponent(
				websiteloc[2]
			)}`;
			if (logo) {
				presenceData.largeImageKey = document
					.querySelector(".userinfoCenterAva")
					.querySelector("img").src;
				presenceData.smallImageKey = "https://i.imgur.com/9KbVqtj.png";
				presenceData.smallImageText = "🏴‍☠️ AnimeVost";
			}
		}
	} else {
		presenceData.largeImageKey = "https://i.imgur.com/9KbVqtj.png";
		presenceData.smallImageText = "🏴‍☠️ AnimeVost";
		presenceData.details = "Где-то на сайте";
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
		delete presenceData.state;
	}
	if (websiteloc[1] === "tip" && websiteloc[2] !== "") {
		const animetype = animetypes[document.location.pathname.split("/")[2]],
			animename = document
				.getElementsByClassName("shortstoryHead")[0]
				.textContent.split("/")[0]
				.trim();
		presenceData.details = "В поисках " + animetype + "a";
		if (websiteloc[3] !== "") {
			const animeposter = (<HTMLImageElement>(
				document.querySelector(".imgRadius")
			)).src;
			if (!privacy && logo) {
				presenceData.largeImageKey = animeposter;
				presenceData.smallImageKey = "https://i.imgur.com/9KbVqtj.png";
				presenceData.smallImageText = "🏴‍☠️ AnimeVost";
			} else {
				delete presenceData.smallImageKey;
				presenceData.largeImageKey = "https://i.imgur.com/9KbVqtj.png";
			}
			if (video.duration) {
				const episode = document.querySelector(".active").textContent;
				presenceData.details = `Смотрит ${animetype} ${
					!privacy ? animename : ""
				}`;
				presenceData.state = episode;
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? strings.play
					: strings.pause;
				if (video.currentTime && time) {
					if (video.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
						if (!pausestamp) {
							strtstamp = Math.floor(Date.now() / 1000);
							pausestamp = true;
						}
					} else {
						pausestamp = false;
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(video.currentTime, video.duration);
					}
				}
			} else {
				presenceData.details = `На странице ${animetype}a ${
					!privacy ? animename : ""
				}`;
			}
		}
	}
	if (buttons && !privacy) {
		presenceData.buttons = [
			{
				label: "Открыть страницу",
				url: document.location.href,
			},
		];
	} else delete presenceData.buttons;
	if (time) presenceData.startTimestamp = strtstamp;
	presence.setActivity(presenceData);
});
