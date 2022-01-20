const presence = new Presence({
		clientId: "933437156796551219"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	// Regex for inserting a separator between the name of anime in Russian and Romaji
	regex = /((?<=[А-я0-9.…])(?=[A-Za-z0-9]))/gm;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		path = document.location.pathname;

	if (path === "/") presenceData.details = "Смотрит главную страницу";
	else if (path === "/pages/catalog.php")
		presenceData.details = "Выбирает аниме";
	else if (path === "/pages/schedule.php")
		presenceData.details = "Смотрит расписание выхода серий";
	else if (path === "/pages/team.php")
		presenceData.details = "Смотрит список команды проекта";
	else if (path === "/pages/donate.php")
		presenceData.details = "Решил поддержать проект";
	else {
		const name = document
			.getElementsByClassName("release-title")[0]
			.textContent.trim()
			.replace(regex, " / ");

		presenceData.details = "Смотрит:";
		presenceData.state = name;

		presenceData.buttons = [
			{
				label: "Смотреть аниме",
				url: document.location.toString()
			}
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
