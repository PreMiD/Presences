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
			largeImageKey: "shikimori_logo",
			details: "Где-то на сайте",
		},
		title = document
			.querySelector("meta[property='og:title']")
			.getAttribute("content");

	function isImageExist(tags: string) {
		return document?.querySelector<HTMLImageElement>(tags) && !privacy && logo
			? document?.querySelector<HTMLImageElement>(tags)?.src
			: "shikimori_logo";
	}

	if (buttons && !privacy) {
		presenceData.buttons = [
			{
				label: "Открыть страницу",
				url: document
					.querySelector("meta[property='og:url']")
					.getAttribute("content"),
			},
		];
	}

	switch (document.location.pathname.split("/")[1]) {
		case "":
			presenceData.details = "На главной странице";
			break;
		case "animes":
		case "mangas":
		case "ranobe":
			presenceData.details = `В поисках ${
				document.location.pathname.split("/")[1] === "animes"
					? "аниме"
					: document.location.pathname.split("/")[1] === "mangas"
					? "манги"
					: "ранобэ"
			}`;
			if (document.location.pathname.split("/")[2]) {
				switch (document.location.pathname.split("/")[2]) {
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
						if (!privacy) {
							presenceData.state =
								document?.querySelector("header > h1")?.textContent;
						}
						break;
					default:
						presenceData.details = `Смотрит страницу 
							${
								document.location.pathname.split("/")[1] === "mangas"
									? "манги"
									: document
											?.querySelector(".submenu-triangle > span")
											?.textContent.toLowerCase()
							}`;
						if (!privacy) presenceData.state = title;
						presenceData.largeImageKey = isImageExist(".c-poster img");
						break;
				}
			}
			switch (document.location.pathname.split("/")[3]) {
				case "critiques":
				case "reviews":
					presenceData.details = `Смотрит ${document
						?.querySelector(".b-breadcrumbs")
						?.lastChild.textContent.toLowerCase()} к ${
						document.location.pathname.split("/")[1] === "mangas"
							? "манге"
							: document
									.querySelector(".b-breadcrumbs span span")
									.textContent.toLowerCase()
					}`;
					if (!privacy) {
						presenceData.state =
							document?.querySelector(
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
			if (document.location.pathname.split("/")[2]) {
				presenceData.details = `Смотрит 
				${document?.querySelector(".b-link span")?.textContent.toLowerCase()}`;
				if (!privacy) presenceData.state = title;
				presenceData.largeImageKey = isImageExist(".b-menu_logo img");
			}
			break;
		case "forum":
			presenceData.details = `Смотрит ${document
				?.querySelector(".l-page header .b-link span")
				?.textContent.toLowerCase()}`;
			if (!privacy) {
				switch (document.location.pathname.split("/")[2]) {
					case "updates":
					case "reviews":
						presenceData.state = document?.querySelector(".reload").textContent;
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
			presenceData.details =
				document?.querySelector(".l-page header p")?.textContent;
			if (!privacy) presenceData.state = title;
			presenceData.largeImageKey = isImageExist(".c-poster img");
			break;
	}
	switch (document.location.pathname.split("/")[2]) {
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
			if (!privacy) {
				presenceData.state = document.location.pathname
					.split("/")[1]
					.replace("+", " ");
			}
			presenceData.largeImageKey = isImageExist(".submenu-triangle img");
			break;
		case "list":
			if (document.location.pathname.split("/")[3].match(/anime|manga/)) {
				presenceData.details = `Смотрит ${document
					.querySelector(".submenu-triangle > span")
					.textContent.toLowerCase()} ${
					!privacy ? document.location.pathname.split("/")[1] : "пользователя"
				}`;
				presenceData.largeImageKey = isImageExist(".avatar img");
				if (!privacy) {
					switch (document.location.pathname.split("/")[5]) {
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
