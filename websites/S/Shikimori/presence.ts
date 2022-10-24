const presence = new Presence({
	clientId: "934863156356972584",
});

presence.on("UpdateData", async () => {
	const [privacy, logo, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("buttons"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/7tlc7or.png",
			details: "Где-то на сайте",
		},
		title = document
			.querySelector("meta[property='og:title']")
			.getAttribute("content"),
		{ pathname, href } = document.location,
		typeContent =
			pathname.split("/")[1] === "animes"
				? "аниме"
				: pathname.split("/")[1] === "mangas"
				? "манги"
				: "ранобэ",
		isImageExist = (tags: string) => {
			return document.querySelector<HTMLImageElement>(tags) && !privacy && logo
				? document.querySelector<HTMLImageElement>(tags)?.src
				: "https://i.imgur.com/7tlc7or.png";
		},
		textContent = (tags: string) => {
			return document.querySelector(tags)?.textContent;
		};

	presenceData.buttons = [
		{
			label: "Открыть страницу",
			url: href,
		},
	];

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = "На главной странице";
			break;
		case "animes":
		case "mangas":
		case "ranobe":
			presenceData.details = `В поиске ${typeContent}`;

			if (pathname.split("/")[2]) {
				switch (pathname.split("/")[2]) {
					case "genre":
					case "kind":
					case "status":
					case "order-by":
					case "mylist":
					case "season":
					case "score":
					case "duration":
					case "rating":
					case "studio":
						presenceData.state = textContent("header > h1");
						break;
					default:
						presenceData.details = `Смотрит страницу ${typeContent}`;
						presenceData.state = title;
						presenceData.largeImageKey = isImageExist(".c-poster img");
						break;
				}
			}

			switch (pathname.split("/")[3]) {
				case "critiques":
				case "reviews":
					presenceData.details = `Смотрит ${textContent(
						".b-breadcrumbs span:nth-last-child(1) span"
					)?.toLowerCase()} ${typeContent}`;
					presenceData.state = textContent(
						".b-breadcrumbs span:nth-last-child(2) span"
					);
					presenceData.largeImageKey = isImageExist(".b-menu_logo img");
					break;
				case "characters":
				case "chronology":
				case "clubs":
				case "collections":
				case "favoured":
				case "screenshots":
				case "similar":
				case "staff":
				case "related":
				case "videos":
					presenceData.details = `Смотрит страницу ${typeContent} (${textContent(
						".subheadline"
					)})`;
					presenceData.state = textContent(
						".b-breadcrumbs span:last-child span"
					);
					presenceData.largeImageKey = isImageExist(".b-menu_logo img");
					break;
				case "franchise":
					presenceData.details = "Смотрит франшизу";
					presenceData.state = textContent(
						".b-breadcrumbs span:last-child span"
					);
					break;
			}
			break;
		case "clubs":
		case "collections":
		case "articles":
		case "contests":
		case "users":
		case "ongoings":
		case "achievements":
		case "moderations":
		case "kakie-anime-postmotret":
			presenceData.details = `Смотрит ${title.toLowerCase()}`;
			if (pathname.split("/")[2]) {
				presenceData.details = `Смотрит
				${textContent(".b-link span:first-child")?.toLowerCase()}`;
				presenceData.state = textContent(".l-page header h1");
				presenceData.largeImageKey = isImageExist(".b-menu_logo img");
			}
			break;
		case "forum":
			presenceData.details = `Смотрит ${textContent(
				".l-page header .b-link span"
			)?.toLowerCase()}`;
			switch (pathname.split("/")[2]) {
				case "updates":
				case "reviews":
					presenceData.state = textContent(".reload");
					break;
				default:
					presenceData.state = title;
					presenceData.largeImageKey = isImageExist(".b-menu_logo img");
					break;
			}
			break;
		case title.replace(" ", "+"):
			presenceData.details = `Смотрит профиль ${
				!privacy ? title : "пользователя"
			}`;
			presenceData.largeImageKey = isImageExist(".avatar img");
			break;
		case "characters":
		case "people":
			presenceData.details = `Смотрит страницу ${textContent(
				".l-page header p"
			)?.toLowerCase()}`;
			presenceData.state = title;
			presenceData.largeImageKey = isImageExist(".c-poster img");
			if (!privacy && pathname.split("/")[3]) {
				presenceData.details = `${presenceData.details} (${title})`;
				presenceData.state = textContent(".b-breadcrumbs span:last-child span");
				presenceData.largeImageKey = isImageExist(".b-menu_logo img");
			}
			break;
	}

	switch (pathname.split("/")[2]) {
		case "achievements":
		case "clubs":
		case "comments":
		case "favorites":
		case "feed":
		case "friends":
		case "reviews":
		case "versions":
		case "topics":
			presenceData.details = `Смотрит профиль ${
				!privacy ? pathname.split("/")[1].replace("+", " ") : "пользователя"
			}`;
			presenceData.state = title;
			break;
		case "edit":
			presenceData.details = "Настраивает учётную запись";
			presenceData.state = title;
			break;
		case "dialogs":
			presenceData.details = "Смотрит почту";
			break;
		case "messages":
			presenceData.details = `Смотрит ${title.toLowerCase()}`;
			break;
		case "history":
			presenceData.details = `Смотрит профиль ${
				!privacy ? pathname.split("/")[1].replace("+", " ") : "пользователя"
			}`;
			presenceData.state = "Историю списка";
			presenceData.largeImageKey = isImageExist(".submenu-triangle img");
			break;
		case "list":
			if (pathname.split("/")[3].match(/anime|manga/)) {
				presenceData.details = `Смотрит ${textContent(
					".subheadline"
				)?.toLowerCase()} ${
					!privacy ? pathname.split("/")[1] : "пользователя"
				}`;
				presenceData.largeImageKey = isImageExist(".avatar img");
				switch (pathname.split("/")[5]) {
					case "planned":
						presenceData.state = "Запланированно";
						break;
					case "watching":
						presenceData.state = "Смотрю";
						break;
					case "rewatching":
						presenceData.state = "Пересматриваю";
						break;
					case "completed":
						presenceData.state = "Просмотрено";
						break;
					case "on_hold":
						presenceData.state = "Отложено";
						break;
					case "dropped":
						presenceData.state = "Брошено";
						break;
				}
			}
			break;
	}

	if (!buttons || privacy) delete presenceData.buttons;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
