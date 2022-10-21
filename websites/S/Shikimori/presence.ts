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
		{ pathname } = document.location;

	function isImageExist(tags: string) {
		return document.querySelector<HTMLImageElement>(tags) && !privacy && logo
			? document.querySelector<HTMLImageElement>(tags)?.src
			: "https://i.imgur.com/7tlc7or.png";
	}

	function textContent(tags: string) {
		return document.querySelector(tags)?.textContent;
	}

	if (buttons && !privacy) {
		presenceData.buttons = [
			{
				label: "Открыть страницу",
				url: document
					.querySelector("meta[property='og:url']")
					?.getAttribute("content"),
			},
		];
	}

	switch (pathname.split("/")[1]) {
		case "":
			presenceData.details = "На главной странице";
			break;
		case "animes":
		case "mangas":
		case "ranobe":
			presenceData.details = `В поисках ${
				pathname.split("/")[1] === "animes"
					? "аниме"
					: pathname.split("/")[1] === "mangas"
					? "манги"
					: "ранобэ"
			}`;
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
						if (!privacy) presenceData.state = textContent("header > h1");
						break;
					default:
						presenceData.details = `Смотрит страницу 
							${
								pathname.split("/")[1] === "mangas"
									? "манги"
									: textContent(".submenu-triangle > span").toLowerCase()
							}`;
						if (!privacy) presenceData.state = title;
						presenceData.largeImageKey = isImageExist(".c-poster img");
						break;
				}
			}
			switch (pathname.split("/")[3]) {
				case "critiques":
				case "reviews":
					presenceData.details = `Смотрит ${document
						.querySelector(".b-breadcrumbs")
						?.lastChild.textContent.toLowerCase()} к ${
						pathname.split("/")[1] === "mangas"
							? "манге"
							: textContent(".b-breadcrumbs span span").toLowerCase()
					}`;
					if (!privacy) {
						presenceData.state =
							document.querySelector(
								".b-breadcrumbs"
							)?.lastChild.previousSibling.textContent;
					}
					presenceData.largeImageKey = isImageExist(".b-menu_logo img");
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
			presenceData.details = title;
			if (pathname.split("/")[2]) {
				presenceData.details = `Смотрит 
				${textContent(".b-link span").toLowerCase()}`;
				if (!privacy) presenceData.state = textContent(".l-page header h1");
				presenceData.largeImageKey = isImageExist(".b-menu_logo img");
			}
			break;
		case "forum":
			presenceData.details = `Смотрит ${textContent(
				".l-page header .b-link span"
			).toLowerCase()}`;
			if (!privacy) {
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
			}
			break;
		case title.replace(" ", "+"):
			presenceData.details = `В профиле ${!privacy ? title : "пользователя"}`;
			presenceData.largeImageKey = isImageExist(".avatar img");
			break;
		case "characters":
		case "people":
			presenceData.details = textContent(".l-page header p");
			if (!privacy) presenceData.state = title;
			presenceData.largeImageKey = isImageExist(".c-poster img");
			break;
	}
	switch (pathname.split("/")[2]) {
		case "edit":
			presenceData.details = "Настраивает учётную запись";
			if (!privacy) presenceData.state = title;
			break;
		case "friends":
			presenceData.details = "Смотрит список друзей";
			break;
		case "dialogs":
			presenceData.details = "Смотрит почту";
			break;
		case "messages":
			presenceData.details = `Смотрит ${title.toLowerCase()}`;
			break;
		case "history":
			presenceData.details = "Смотрит историю списка пользователя";
			if (!privacy)
				presenceData.state = pathname.split("/")[1].replace("+", " ");
			presenceData.largeImageKey = isImageExist(".submenu-triangle img");
			break;
		case "list":
			if (pathname.split("/")[3].match(/anime|manga/)) {
				presenceData.details = `Смотрит ${textContent(
					".submenu-triangle > span"
				).toLowerCase()} ${!privacy ? pathname.split("/")[1] : "пользователя"}`;
				presenceData.largeImageKey = isImageExist(".avatar img");
				if (!privacy) {
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
			}
			break;
	}

	presence.setActivity(presenceData);
});
