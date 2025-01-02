import { AnimeLib } from "./lib";
import type {
	AnimeData,
	UserData,
	CharacterData,
	PersonData,
	CollectionData,
	ReviewData,
	TeamData,
	PublisherData,
} from "./lib";

const presence = new Presence({
		clientId: "1320289587943444552",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/A/AnimeLib/assets/logo.png",
	Play = "https://cdn.rcd.gg/PreMiD/resources/play.png",
	Pause = "https://cdn.rcd.gg/PreMiD/resources/pause.png",
}

interface IFrameVideo {
	duration: number;
	currentTime: number;
	paused: boolean;
}

let iFrameVideo: IFrameVideo;

presence.on("iFrameData", (data: IFrameVideo) => {
	iFrameVideo = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			type: ActivityType.Watching,
			startTimestamp: browsingTimestamp,
		},
		isWatchingPrivately = await presence.getSetting<boolean>(
			"private-watching"
		),
		path = document.location.pathname;

	let animeData: AnimeData,
		userData: UserData,
		characterData: CharacterData,
		peopleData: PersonData,
		collectionData: CollectionData,
		reviewData: ReviewData,
		teamData: TeamData,
		publisherData: PublisherData;

	switch (`${path}/`.split("/")[2]) {
		case "":
			presenceData.details = "Главная страница";
			presenceData.state = "Так внимательно изучает...";
			break;
		case "anime":
			animeData = await AnimeLib.getAnime(
				path,
				path.split("/")[3].split("-")[0]
			).then(response => <AnimeData>response.data);

			// Show anime watching in private mode if it's enabled, or enforce it when anime is RX rated (e.g hentai)
			if (isWatchingPrivately || animeData.ageRestriction.id === 5) {
				presenceData.details = "Приватный режим";
				presenceData.state = "Явно что-то скрывает...";

				break;
			}

			if (animeData.toast) {
				const cover =
						document.querySelector<HTMLImageElement>(".cover__img")?.src,
					title = document.querySelector("h1")?.textContent,
					altTitle = document.querySelector("h2")?.textContent;

				if (cover && title && altTitle) {
					presenceData.details = "Страница лицензированного аниме";
					presenceData.state = `${title} (${altTitle})`;
					presenceData.largeImageKey = cover;
				}

				break;
			}

			if (path.endsWith("/watch")) {
				const video = document.querySelector("video"),
					dub =
						document
							.querySelector(".menu-item.is-active")
							?.querySelector(".menu-item__text").textContent ??
						document
							.querySelector(".btn.is-plain.is-outline")
							?.querySelector("strong")?.textContent;

				if (dub) {
					presenceData.details = animeData.rus_name;
					presenceData.state = `${
						document.querySelector("[id^='episode'][class*=' ']")
							?.textContent ??
						document
							.querySelectorAll(".btn.is-outline")[6]
							?.querySelector("span")?.textContent ??
						"Фильм"
					} | ${dub}`;
					presenceData.largeImageKey = animeData.cover.default;

					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "На паузе";
				}

				if (video || iFrameVideo) {
					if (video) {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(video);
						presenceData.smallImageKey = video.paused
							? Assets.Pause
							: Assets.Play;
						presenceData.smallImageText = video.paused
							? "На паузе"
							: "Воспроизводится";

						iFrameVideo = null;
					} else {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(
								iFrameVideo.currentTime,
								iFrameVideo.duration
							);
						presenceData.smallImageKey = iFrameVideo.paused
							? Assets.Pause
							: Assets.Play;
						presenceData.smallImageText = iFrameVideo.paused
							? "На паузе"
							: "Воспроизводится";
					}

					if (video?.paused || iFrameVideo?.paused) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					}
				}
			} else {
				presenceData.details = "Страница аниме";
				presenceData.state = `${animeData.rus_name} (${
					animeData.eng_name ?? animeData.name
				})`;
				presenceData.largeImageKey = animeData.cover.default;
			}
			break;
		case "characters":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "new") {
					presenceData.details = "Добавляет персонажа";
					presenceData.state = "Очередной аниме персонаж...";
				} else {
					characterData = await AnimeLib.getCharacter(
						path,
						path.split("/")[3].split("-")[0]
					).then(response => <CharacterData>response.data);

					presenceData.details = "Страница персонажа";
					presenceData.state = `${characterData.rus_name} (${characterData.name})`;
					presenceData.largeImageKey = characterData.cover.default;
				}
			} else {
				presenceData.details = "Страница персонажей";
				presenceData.state = "Ищет нового фаворита?";
			}
			break;
		case "people":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "create") {
					presenceData.details = "Добавляет человека";
					presenceData.state = "Какая-то известная личность?";
				} else {
					peopleData = await AnimeLib.getPerson(
						path,
						path.split("/")[3].split("-")[0]
					).then(response => <PersonData>response.data);

					presenceData.details = "Страница человека";
					presenceData.state = `${
						peopleData.rus_name !== ""
							? peopleData.rus_name
							: peopleData.alt_name !== ""
							? peopleData.alt_name
							: peopleData.name
					} (${peopleData.name})`;
					presenceData.largeImageKey = peopleData.cover.default;
				}
			} else {
				presenceData.details = "Страница людей";
				presenceData.state = "Ищет нового фаворита?";
			}
			break;
		case "catalog":
			presenceData.details = "В каталоге";
			presenceData.state = "Что ждёт нас сегодня?";
			break;
		case "user":
			if (path.split("/")[3]) {
				userData = await AnimeLib.getUser(path.split("/")[3]).then(
					response => <UserData>response.data
				);

				presenceData.details = "В профиле";
				presenceData.state = userData.username;
				presenceData.largeImageKey = userData.avatar.url;
			} else {
				presenceData.details = "Страница пользователей";
				presenceData.state = "Столько интересных личностей!";
			}
			break;
		case "top-views":
			presenceData.details = "В топе по просмотрам";
			presenceData.state = "Любуется популярными аниме";
			break;
		case "collections":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "new") {
					presenceData.details = "Создаёт коллекцию";
					presenceData.state = "В ней будет много интересного!";
				} else {
					collectionData = await AnimeLib.getCollection(
						path.split("/")[3]
					).then(response => <CollectionData>response.data);

					presenceData.details = "Страница коллекции";
					presenceData.state = `${collectionData.name} от ${collectionData.user.username}`;
					presenceData.largeImageKey = collectionData.user.avatar.url;
				}
			} else {
				presenceData.details = "Страница коллекций";
				presenceData.state = "Их так много...";
			}
			break;
		case "reviews":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "new") {
					presenceData.details = "Пишет отзыв";
					presenceData.state = "Излагает свои мысли...";
				} else {
					reviewData = await AnimeLib.getReview(path.split("/")[3]).then(
						response => <ReviewData>response.data
					);

					presenceData.details = `Страница отзыва на ${reviewData.related.rus_name}`;
					presenceData.state = `${reviewData.title} от ${reviewData.user.username}`;
					presenceData.largeImageKey = reviewData.related.cover.default;
					presenceData.smallImageKey = reviewData.user.avatar.url;
					presenceData.smallImageText = reviewData.user.username;
				}
			} else {
				presenceData.details = "Страница отзывов";
				presenceData.state = "Столько разных мнений!";
			}
			break;
		case "team":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "create") {
					presenceData.details = "Создаёт свою команду";
					presenceData.state = "Она обязательно будет успешной!";
				} else {
					teamData = await AnimeLib.getTeam(
						path,
						path.split("/")[3].split("-")[0]
					).then(response => <TeamData>response.data);

					presenceData.details = "Страница команды";
					presenceData.state = `${teamData.name} (${
						teamData.alt_name ?? teamData.name
					})`;
					presenceData.largeImageKey = teamData.cover.default;
				}
			} else {
				presenceData.details = "Страница команд";
				presenceData.state = "Они все такие разные!";
			}
			break;
		case "franchise":
			if (path.split("/")[3]) {
				const name = document.querySelector("h1"),
					altName = document.querySelector("h2");

				if (name && altName) {
					presenceData.details = "Страница франшизы";
					presenceData.state = `${name.textContent} (${
						altName.textContent.split("/")[0]
					})`;
				} else {
					presenceData.details = "Страница франшиз";
					presenceData.state = "Их так много...";
				}
			}
			break;
		case "publisher":
			if (path.split("/")[3]) {
				if (path.split("/")[3] === "new") {
					presenceData.details = "Добавляет издательство";
					presenceData.state = "Да что они там издают?";
				} else {
					publisherData = await AnimeLib.getPublisher(
						path,
						path.split("/")[3].split("-")[0]
					).then(response => <PublisherData>response.data);

					presenceData.details = "Страница издателя";
					presenceData.state = `${
						publisherData.rus_name ?? publisherData.name
					} (${publisherData.name})`;
					presenceData.largeImageKey = publisherData.cover.default;
				}
			} else {
				presenceData.details = "Страница издетелей";
				presenceData.state = "Их так много...";
			}
			break;
		case "media":
			if (path.split("/")[3] === "create") {
				presenceData.details = "Добавляет тайтл";
				presenceData.state = "Он будет самым интересным!";
			}
			break;
		case "news":
			if (path.split("/")[3]) {
				const avatar = document
						.querySelector(".user-inline")
						?.querySelector<HTMLImageElement>(".avatar.is-rounded")?.src,
					username = document.querySelector(
						".user-inline__username"
					)?.textContent,
					title = document.querySelector("h1")?.textContent;

				if (avatar && username && title) {
					presenceData.details = "Читает новость";
					presenceData.state = `${title} от ${username}`;
					presenceData.largeImageKey = avatar;
				}
			} else {
				presenceData.details = "На странице новостей";
				presenceData.state = "Ищет, чего бы почитать";
			}
			break;
		default:
			presenceData.details = "Где-то...";
			presenceData.state = "Не пытайтесь найти!";
	}

	presence.setActivity(presenceData);
});
