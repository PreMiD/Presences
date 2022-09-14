const presence = new Presence({
	clientId: "1019291803322679456",
});

function pathHas(pathName: string): boolean {
	return document.location.pathname.toLowerCase().includes(pathName);
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "f1024",
	};

	switch (true) {
		case pathHas("groups"):
			presenceData.details = "Просматривает урок";
			break;
		case pathHas("conspects"):
			presenceData.details = "Просматривает конспект";
			break;
		case pathHas("account"):
			presenceData.details = "Настраивает профиль";
			break;
		case pathHas("externship"):
			presenceData.details = "Просматривает программу обучения";
			break;
		case pathHas("courses"):
			presenceData.state = document.querySelector(
				".Header_title__G-XGe",
			).textContent;
			presenceData.details = "Просматривает курс";
			break;
		case pathHas("calendar"):
			presenceData.details = "Смотрит календарь занятий";
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
		case pathHas("daily-plan"):
			presenceData.details = "Смотрит план занятий";
			break;
		case pathHas("objectives"):
			presenceData.details = "Просматривает задания";
			break;
		case pathHas("progress"):
			presenceData.details = "Просматривает успеваемость";
			break;
		case pathHas("dashboard"):
			presenceData.details = "Просматривает курсы";
			break;
		default:
			presenceData.details = "Просматривает разделы сайта";
			break;
	}

	if (presenceData.details) {
		presence.setActivity(presenceData);
	} else {
		presence.setActivity();
	}
});
