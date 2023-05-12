const presence = new Presence({
	clientId: "1054755173198737458",
});

enum Assets {
	Logo = "https://i.imgur.com/HAvvvj7.png",
}

enum Strings {
	Play = "Смотрит",
	Pause = "На паузе",
	Home = "На главной странице",
	View = "Смотрит",
	Search = "Ищет",
	Read = "Читает",
	New = "новинки",
	Sports = "спортивные трансляции",
	NewEpisodes = "новые эпизоды",
	Bookmarks = "закладки",
	History = "историю просмотров",
	SelectionOne = "подборку",
	Awards = "награды",
	Kinoblog = "Киноблог",
	Post = "пост",
	Instructions = "инструкции",
	Settings = "В настройках",
	Notifications = "оповещения",
	OpenLink = "Открыть страницу",
	Page = "страницу",
	Serial = "сериала",
	Movie = "фильма",
	User = "пользователя",
}

let video = {
	duration: 0,
	currentTime: 0,
	paused: true,
};

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent?.trim();
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
			largeImageKey: Assets.Logo,
		},
		[privacy, time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		serieName = textContent(".jw-title-primary"),
		{ pathname, href } = document.location;

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = Strings.Home;
			break;

		case "popular":
		case "new":
		case "hot":
			presenceData.details = `${Strings.Search} ${Strings.New}`;
			presenceData.state = textContent(
				".btn.btn-outline-success.rounded.active"
			);
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = Strings.Search;
			break;

		case "movie":
		case "serial":
		case "3d":
		case "concert":
		case "documovie":
		case "docuserial":
		case "tvshow":
			presenceData.details = `${Strings.Search} ${textContent(
				".page-content h3:first-child"
			).toLowerCase()}`;
			presenceData.smallImageKey = Assets.Search;
			presenceData.smallImageText = Strings.Search;
			break;

		case "sport":
			presenceData.details = `${Strings.View} ${Strings.Sports}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "favorites":
			presenceData.details = `${Strings.View} ${Strings.Bookmarks}`;
			presenceData.state = document
				.querySelector(".page-content h3")
				?.childNodes[1]?.textContent.split(": ")[1];
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "history":
			presenceData.details = `${Strings.View} ${Strings.History}`;
			presenceData.state = textContent(".nav-link.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "watchlist":
		case "media":
			presenceData.details = `${Strings.View} ${Strings.NewEpisodes}`;
			presenceData.state = `Обновления ${
				pathname.split("/")[1] === "media" ? "сайта" : "просмотренного"
			}`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "selection":
			presenceData.details = `${Strings.View} ${textContent(
				".page-content h3:first-child"
			).toLowerCase()}`;
			presenceData.state = textContent(".nav-link.active");
			if (pathname.split("/")[2] === "view" && !privacy) {
				presenceData.details = `${Strings.View} ${Strings.SelectionOne}`;
				presenceData.state = textContent(".page-content h3:first-child");
			}
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "award":
			presenceData.details = `${Strings.View} ${Strings.Awards}`;
			presenceData.state = `${textContent(".page-content h4")} (${
				textContent(".page-content h5").split(": ")[1]
			})`;
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "kinoblog":
			presenceData.details = `${Strings.View} ${Strings.Kinoblog}`;
			presenceData.state = textContent(".nav-link.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			if (pathname.split("/")[2] === "view") {
				presenceData.details = `${Strings.Read} ${Strings.Post}`;
				presenceData.state = textContent(".text-success");
				presenceData.smallImageKey = Assets.Reading;
				presenceData.smallImageText = Strings.Read;
			}
			break;

		case "plugin":
			presenceData.details = `${Strings.Read} ${Strings.Instructions}`;
			presenceData.smallImageKey = Assets.Reading;
			presenceData.smallImageText = Strings.Read;
			break;

		case "users":
			presenceData.details = `${Strings.View} ${Strings.Page} ${
				!privacy ? textContent(".page-title span") : Strings.User
			}`;
			presenceData.state = textContent(".nav-link.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "user":
			presenceData.details = Strings.Settings;
			presenceData.state = textContent(".nav-item.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "notification":
			presenceData.details = `${Strings.View} ${Strings.Notifications}`;
			presenceData.state = textContent(".nav-link.active");
			presenceData.smallImageKey = Assets.Viewing;
			presenceData.smallImageText = Strings.View;
			break;

		case "item":
			if (pathname.split("/")[2] === "search") {
				presenceData.details = `${Strings.Search}: ${
					document.querySelector<HTMLInputElement>('input[name="query"]').value
				}`;
				presenceData.smallImageKey = Assets.Search;
				presenceData.smallImageText = Strings.Search;
			} else {
				presenceData.details = `${Strings.View} ${Strings.Page} ${
					serieName ? Strings.Serial : Strings.Movie
				}`;
				presenceData.state =
					document.querySelector(
						".page-content h3"
					)?.childNodes[0]?.textContent;
				if (!privacy && cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						".item-poster-relative"
					).src;
				}
				presenceData.smallImageKey = Assets.Viewing;
				presenceData.smallImageText = Strings.View;
				presenceData.buttons = [
					{
						label: Strings.OpenLink,
						url: href,
					},
				];

				if (!privacy && video.duration) {
					presenceData.details =
						document.querySelector(
							".page-content h3"
						)?.childNodes[0]?.textContent;
					presenceData.state = serieName;
					presenceData.smallImageKey = video.paused
						? Assets.Pause
						: Assets.Play;
					presenceData.smallImageText = video.paused
						? Strings.Pause
						: Strings.Play;

					if (video.paused || !time) {
						delete presenceData.startTimestamp;
						delete presenceData.endTimestamp;
					} else {
						[presenceData.startTimestamp, presenceData.endTimestamp] =
							presence.getTimestamps(video.currentTime, video.duration);
					}
				}
			}
			break;
	}

	if (privacy) delete presenceData.state;
	if (privacy || !buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
