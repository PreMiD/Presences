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
		{ pathname } = document.location;

	if (pathname === "/") presenceData.details = "Смотрит главную страницу";
	else if (pathname === "/pages/catalog.php")
		presenceData.details = "Выбирает аниме";
	else if (pathname === "/pages/schedule.php")
		presenceData.details = "Смотрит расписание выхода серий";
	else if (pathname === "/pages/team.php")
		presenceData.details = "Смотрит список команды проекта";
	else if (pathname === "/pages/donate.php")
		presenceData.details = "Решил поддержать проект";
	else if (pathname === "/pages/login.php")
		presenceData.details = "Входит в личный кабинет";
	else if (pathname === "/pages/cp.php")
		presenceData.details = "В личном кабинете";
	else if (pathname === "/pages/favorites.php")
		presenceData.details = "Смотрит свой список избранного";
	else {
		presenceData.details = "Смотрит:";
		presenceData.state = document
			.getElementsByClassName("release-title")[0]
			.textContent.trim()
			.replace(regex, " / ");

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
