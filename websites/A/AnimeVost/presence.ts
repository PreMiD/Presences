const presence = new Presence({
	clientId: "1096792677888053308",
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

enum Assets {
	VostLogo = "https://i.imgur.com/wStmaRE.png",
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.pngg",
	Ongoing = "https://i.imgur.com/bdSukvD.png",
	Anons = "https://i.imgur.com/8vJY6ok.png",
	"boyevyye-iskusstva" = "https://i.imgur.com/fIFC4Bn.png",
	"voyna" = "https://i.imgur.com/6wcT9gr.png",
	"drama" = "https://i.imgur.com/FGNTKQ1.png",
	"detektiv" = "https://i.imgur.com/BKwNjnY.png",
	"istoriya" = "https://i.imgur.com/JOsx01C.png",
	"komediya" = "https://i.imgur.com/rRRyu7f.png",
	"mekha" = "https://i.imgur.com/9fdLLtU.png",
	"mistika" = "https://i.imgur.com/X1eLf8t.png",
	"makho-sedze" = "https://i.imgur.com/9sY7vjV.png",
	"muzykalnyy" = "https://i.imgur.com/666pMbJ.png",
	"povsednevnost" = "https://i.imgur.com/RZZu69w.png",
	"priklyucheniya" = "https://i.imgur.com/K2wO9ee.png",
	"parodiya" = "https://i.imgur.com/mY2G4I0.png",
	"romantika" = "https://i.imgur.com/OHBxChU.png",
	"senen" = "https://i.imgur.com/MAAaPUs.png",
	"sedze" = "https://i.imgur.com/iFPQWgg.png",
	"sport" = "https://i.imgur.com/DuiA8DC.png",
	"skazka" = "https://i.imgur.com/83cdZB7.png",
	"sedze-ay" = "https://i.imgur.com/iFPQWgg.png",
	"senen-ay" = "https://i.imgur.com/MAAaPUs.png",
	"samurai" = "https://i.imgur.com/3ylfSzz.png",
	"triller" = "https://i.imgur.com/SgicPul.png",
	"uzhasy" = "https://i.imgur.com/HGQntrC.png",
	"fantastika" = "https://i.imgur.com/taH6syX.png",
	"fentezi" = "https://i.imgur.com/15VWbYX.png",
	"shkola" = "https://i.imgur.com/mk3INxH.png",
	"etti" = "https://i.imgur.com/CyjLJJj.png",
}

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
			largeImageKey: Assets.VostLogo,
			smallImageText: "🏴‍☠️ AnimeVost",
		},
		websiteloc = document.location.pathname.split("/");
	if (!strings) strings = await getStrings();
	if (!privacy) {
		if (websiteloc[1] === "") presenceData.details = "На главной странице";
		if (websiteloc[1] === "zhanr") {
			const animegenre = animegenres[websiteloc[2]];
			presenceData.details = `🔎 В поисках аниме жанра ${animegenre}`;
			presenceData.smallImageKey = Assets[websiteloc[2] as keyof typeof Assets];
			presenceData.smallImageText = `🔎 В поисках аниме жанра ${animegenre}`;
		}
		if (websiteloc[1] === "god")
			presenceData.details = `🔎 В поисках аниме ${websiteloc[2]} года`;
		if (websiteloc[1] === "ongoing") {
			presenceData.details = "🔎 В поисках онгоинга";
			presenceData.smallImageKey = Assets.Ongoing;
			presenceData.smallImageText = "🔎 В поисках Онгоинга";
		}
		if (websiteloc[1] === "preview") {
			presenceData.details = "🔎 В поисках анонса";
			presenceData.smallImageKey = Assets.Anons;
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
				presenceData.smallImageKey = Assets.VostLogo;
				presenceData.smallImageText = "🏴‍☠️ AnimeVost";
			}
		}
	} else {
		presenceData.largeImageKey = Assets.VostLogo;
		presenceData.smallImageText = "🏴‍☠️ AnimeVost";
		presenceData.details = "Где-то на сайте";
		delete presenceData.startTimestamp;
		delete presenceData.endTimestamp;
		delete presenceData.state;
	}
	if (websiteloc[1] === "tip" && websiteloc[2] !== "") {
		const animetype = animetypes[document.location.pathname.split("/")[2]],
			animename = document
				.querySelectorAll(".shortstoryHead")[0]
				.textContent.split("/")[0]
				.trim();
		presenceData.details = `В поисках ${animetype} a`;
		if (websiteloc[3] !== "") {
			if (!privacy && logo) {
				presenceData.largeImageKey =
					document.querySelector<HTMLImageElement>(".imgRadius").src;
				presenceData.smallImageKey = Assets.VostLogo;
				presenceData.smallImageText = "🏴‍☠️ AnimeVost";
			} else {
				delete presenceData.smallImageKey;
				presenceData.largeImageKey = Assets.VostLogo;
			}
			if (video.duration) {
				presenceData.details = `Смотрит ${animetype} ${
					!privacy ? animename : ""
				}`;
				presenceData.state = document.querySelector(".active").textContent;
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;
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
