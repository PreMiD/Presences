const presence = new Presence({
	clientId: "1019291803322679456",
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

function pathHas(pathName: string): boolean {
	return document.location.pathname.toLowerCase().includes(pathName);
}

const routes = {
	conspects: "Просматривает конспект",
	account: "Настраивает профиль",
	externship: "Просматривает программу обучения",
	calendar: "Смотрит календарь занятий",
	"daily-plan": "Смотрит план занятий",
	objectives: "Просматривает задания",
	progress: "Просматривает успеваемость",
	dashboard: "Просматривает курсы",
} as const;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/41WDw6H.jpg",
	};

	switch (true) {
		case location.pathname.split("/").pop() in routes:
			presenceData.details =
				routes[
					location.pathname.split("/").pop() as unknown as keyof typeof routes
				];
			break;
		case pathHas("groups"):
			presenceData.details = "Просматривает урок";
			break;
		case pathHas("courses"):
			presenceData.state = document.querySelector(
				".Header_title__G-XGe"
			).textContent;
			presenceData.details = "Просматривает курс";
			break;
		case pathHas("users"):
			presenceData.details = "Просматривает профиль";
			presenceData.buttons = [
				{
					label: "Перейти",
					url: document.location.href,
				},
			];
			break;
		case pathHas("tasks"):
			presenceData.details = "Решает задачи";
			presenceData.buttons = [
				{
					label: "Перейти",
					url: document.location.href,
				},
			];
			break;
		default:
			presenceData.details = "Просматривает разделы сайта";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
