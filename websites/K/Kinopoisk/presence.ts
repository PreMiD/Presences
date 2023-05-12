const presence = new Presence({
	clientId: "1034799018980679680",
});

async function getStrings() {
	return presence.getStrings(
		{
			play: "general.watchingVid",
			pause: "general.paused",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let video = {
		duration: 0,
		currentTime: 0,
		paused: true,
	},
	strings: Awaited<ReturnType<typeof getStrings>>;

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
}

function pageTitle(string: string) {
	return document
		.querySelector<HTMLTitleElement>("title")
		.textContent.split(string);
}

enum Assets {
	Library = "https://i.imgur.com/FzNE1zD.png",
	Movies = "https://i.imgur.com/EzwByrT.png",
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
			smallImageText: "Kinopoisk",
		},
		[privacy, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]),
		{ hostname, pathname } = document.location;

	if (!strings) strings = await getStrings();

	switch (hostname) {
		case "www.kinopoisk.ru":
			presenceData.largeImageKey = Assets.Library;
			switch (pathname.split("/")[1]) {
				case "":
					presenceData.details = "На главной странице";
					break;
				case "lists":
					switch (pathname.split("/")[2]) {
						case "categories":
							presenceData.details = "Смотрит списки";
							presenceData.state = textContent(".styles_activeCategory__mDu7i");
							break;
						case "movies":
							presenceData.details = "Смотрит список";
							presenceData.state = textContent(".styles_title__jB8AZ");
							break;
					}
					break;
				case "film":
					presenceData.details = "Смотрит страницу фильма";
					if (!pathname.split("/")[3])
						presenceData.state = textContent(".styles_title__65Zwx");
					else {
						presenceData.state = `${textContent(
							".breadcrumbs li:last-child a"
						)} – ${textContent(".breadcrumbs li:first-child")}`;
					}
					break;
				case "series":
					presenceData.details = "Смотрит страницу сериала";
					if (!pathname.split("/")[3])
						presenceData.state = textContent(".styles_title___itJ6 span");
					else {
						presenceData.state = `${textContent(
							".breadcrumbs li:last-child a"
						)} – ${textContent(".breadcrumbs li:first-child")}`;
					}
					break;
				case "name":
					presenceData.details = "Смотрит страницу человека";
					if (!pathname.split("/")[3]) presenceData.state = pageTitle(" — ")[0];
					else {
						presenceData.state = `${pageTitle(" — ")[0]} – ${
							pageTitle(" — ")[1]
						}`;
					}
					break;
				case "media":
					if (!pathname.split("/")[3]) {
						presenceData.details = `Смотрит ${textContent(
							".media-list-page-title"
						)?.toLowerCase()}`;
						presenceData.state = textContent(
							".media-main-page-navigation-menu__item.active"
						);
					} else {
						presenceData.state = textContent(
							".media-post-title span:last-child"
						);
						switch (pathname.split("/")[2]) {
							case "article":
								presenceData.details = "Смотрит статьи";
								break;
							case "game":
								presenceData.details = "Смотрит тесты";
								break;
							case "news":
								presenceData.details = "Смотрит новости";
								break;
							case "podcast":
								presenceData.details = "Смотрит подкасты";
								break;
							case "rubric":
								presenceData.details = "Смотрит рубрики";
								presenceData.state = textContent(".media-list-page-title");
								break;
							case "special":
								presenceData.details = "Смотрит спецпроекты";
								break;
							case "video":
								presenceData.details = "Смотрит видео";
								break;
						}
					}
					break;
				case "afisha":
					if (!privacy) {
						presenceData.details = "Ищет билеты в кино";
						presenceData.smallImageKey = Assets.Search;
					}
					break;
				case "chance":
					presenceData.details = "Ищет случайный фильм";
					presenceData.state = textContent(".filmName a");
					break;
				case "premiere":
					presenceData.details = `Смотрит график премьер ${textContent(
						".act"
					)}`;
					presenceData.state = textContent(".main_title_prem");
					break;
				case "s":
					presenceData.details = "Ищет фильмы";
					presenceData.smallImageKey = Assets.Search;
					break;
				case "special":
					presenceData.details = "Смотрит спецпроект";
					presenceData.state = textContent(".festival-welcome__text-title");
					break;
				case "top":
					presenceData.details = "Ищет фильм через навигатор";
					presenceData.smallImageKey = Assets.Search;
					break;
				case "user":
					presenceData.details = "Смотрит профиль";
					presenceData.state = pageTitle(":")[1];
					break;
				case "mykp":
					presenceData.details = "Смотрит свой профиль";
					presenceData.state = pageTitle(":")[1];
					break;
			}
			break;

		case "hd.kinopoisk.ru":
			presenceData.details = "В онлайн-кинотеатре";
			presenceData.largeImageKey = Assets.Movies;

			if (document.querySelector(".FilmContent_wrapper__EicQU")) {
				presenceData.details = `Смотрит информацию ${textContent(
					".FilmContent_wrapper__EicQU .TabList_root__Kwcez button"
				)?.toLowerCase()}`;
				presenceData.state = document.querySelector<HTMLImageElement>(
					".FilmContent_wrapper__EicQU img"
				)?.alt;
			}

			if (document.querySelector(".CrispySlideDown_fade_active__StELV")) {
				presenceData.details = `Смотрит информацию ${textContent(
					".CrispySlideDown_fade_active__StELV .TabList_root__Kwcez button"
				)?.toLowerCase()}`;
				presenceData.state = document.querySelector<HTMLImageElement>(
					".CrispySlideDown_fade_active__StELV img"
				)?.alt;
			}

			if (document.querySelector(".PlayerManager_body__rOEVd")) {
				presenceData.details = `Смотрит ${
					!privacy
						? pageTitle(" — ")[0]
						: textContent(".Meta_subtitle__jnooi")
						? "сериал"
						: "фильм"
				}`;
				presenceData.state = textContent(".Meta_subtitle__jnooi");
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? strings.pause
					: strings.play;

				if (video.paused || !time) {
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				} else {
					[presenceData.startTimestamp, presenceData.endTimestamp] =
						presence.getTimestamps(video.currentTime, video.duration);
				}
			}
			break;
	}

	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
