// Создаем объект Presence с указанием clientId
const presence = new Presence({
	clientId: "1127599137374871563",
});

// Перечисление URL-адресов для использования в коде
const enum Assets {
	Logo = "https://i.imgur.com/BZtDh0g.png",
}

// Интерфейс для данных видео
interface VideoData {
	duration: number;
	currentTime: number;
	paused: boolean;
}

// Функция для получения строковых значений
async function getStrings() {
	return presence.getStrings({
		play: "general.playing",
		pause: "general.paused",
		browse: "general.browsing",
		viewPage: "general.viewPage",
		page: "general.page",
	});
}

// Асинхронно получаем строковые значения и сохраняем их в переменной
let strings: Awaited<ReturnType<typeof getStrings>>,
	// Объект для хранения данных о видео
	video: VideoData = {
		duration: 0,
		currentTime: 0,
		paused: true,
	};

// Обработчик события "iFrameData", обновляющий данные о видео
presence.on("iFrameData", (data: VideoData) => {
	video = data;
});

// Обработчик события "UpdateData", обновляющий активность Presence
presence.on("UpdateData", async () => {
	// Асинхронно получаем настройки пользователя
	const [privacy, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
		]),
		// Объект для хранения данных для Presence
		presenceData: PresenceData = {
			details: "Где-то на сайте",
			largeImageKey: Assets.Logo,
			smallImageText: "AniMi Club",
		};

	// Если строки не загружены, загружаем их
	if (!strings) strings = await getStrings();

	// Определяем тип контента

	const typeCurrent =
		document
			.querySelector("meta[property='og:url']")
			.getAttribute("content")
			.split("/")[3] === "anime"
			? "аниме"
			: "манга";

	// Определяем активность в зависимости от текущего URL
	if (document.location.pathname === "/") {
		presenceData.details = "На главной странице";
		presenceData.buttons = [
			{
				label: "Смотри аниме тут ☕",
				url: "https://animi.club",
			},
		];
	} else if (document.location.pathname.match(/\/(anime|manga)\//)) {
		const title =
			document
				.querySelector("meta[property='og:title']")
				?.getAttribute("content") ?? "Неизвестное название";

		presenceData.details = `Смотрит страницу ${typeCurrent}`;

		// Если нет приватности, добавляем состояние и кнопки
		if (!privacy) {
			presenceData.state = `«${title}»`;

			presenceData.buttons = [
				{
					label: "Смотреть страницу",
					url:
						document
							.querySelector("meta[property='og:url']")
							?.getAttribute("content") || "",
				},
			];
		}

		// Если есть данные о видео, добавляем их в PresenceData
		if (video.duration) {
			presenceData.smallImageKey = video.paused ? Assets.Play : Assets.Pause;
			presenceData.smallImageText = video.paused ? strings.play : strings.pause;

			// Если включено отображение времени, добавляем таймстампы
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

	// Устанавливаем активность Presence
	presence.setActivity(presenceData);
});
