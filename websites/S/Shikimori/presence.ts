const presence = new Presence({
	clientId: "934863156356972584",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Где-то на сайте",
			largeImageKey: "shikimori_logo",
		},
		title = document
			.querySelector("meta[property='og:title']")
			.getAttribute("content");

	if (document.location.pathname === "/")
		presenceData.details = "На главной странице";
	else if (document.location.pathname.includes("/edit/")) {
		presenceData.details = "В настройках";
		presenceData.state = title;
	} else if (document.location.pathname.includes("/forum")) {
		presenceData.details = "Смотрит форум";
		if (
			document.location.pathname.includes("/animanga/") ||
			document.location.pathname.includes("/news/") ||
			document.location.pathname.includes("/critiques/")
		) {
			presenceData.state = title;
			presenceData.largeImageKey = (<HTMLImageElement>(
				document.querySelector(".b-menu_logo center a img")
			)).src;
		} else if (
			document.location.pathname.includes("/animanga") ||
			document.location.pathname.includes("/site") ||
			document.location.pathname.includes("/offtopic") ||
			document.location.pathname.includes("/vn") ||
			document.location.pathname.includes("/games") ||
			document.location.pathname.includes("/news") ||
			document.location.pathname.includes("/critiques") ||
			document.location.pathname.includes("/contests") ||
			document.location.pathname.includes("/collections") ||
			document.location.pathname.includes("/articles") ||
			document.location.pathname.includes("/my_clubs") ||
			document.location.pathname.includes("/clubs")
		)
			presenceData.state = title;
	} else if (document.location.pathname.includes("/clubs")) {
		presenceData.details = `Смотрит ${title.toLowerCase()}`;
		if (document.location.pathname.includes("/clubs/")) {
			presenceData.details = "Смотрит клуб";
			presenceData.state = title;
			presenceData.largeImageKey = (<HTMLImageElement>(
				document.querySelector(".b-menu_logo center a img")
			)).src;
		}
	} else if (document.location.pathname.includes("/collections")) {
		presenceData.details = `Смотрит ${title.toLowerCase()}`;
		if (document.location.pathname.includes("/collections/")) {
			presenceData.details = "Смотрит коллекцию";
			presenceData.state = title;
		}
	} else if (document.location.pathname.includes("/articles")) {
		presenceData.details = `Смотрит ${title.toLowerCase()}`;
		if (document.location.pathname.includes("/articles/")) {
			presenceData.details = "Смотрит статью";
			presenceData.state = title;
		}
	} else if (document.location.pathname.includes("/contests")) {
		presenceData.details = `Смотрит ${title.toLowerCase()}`;
		if (document.location.pathname.includes("/contests/")) {
			presenceData.details = "Смотрит турнир";
			presenceData.state = document.querySelector(".head.misc h1").textContent;
		}
	} else if (
		document.location.pathname.includes("/users") ||
		document.location.pathname.includes("/ongoings") ||
		document.location.pathname.includes("/achievements")
	)
		presenceData.details = `Смотрит ${title.toLowerCase()}`;
	else if (
		document.location.pathname === "/animes" ||
		document.location.pathname === "/mangas" ||
		document.location.pathname === "/ranobe"
	)
		presenceData.details = `Ищет ${title.toLowerCase()}`;
	else if (document.location.pathname.includes("/history")) {
		presenceData.details = "Смотрит историю списка";
		presenceData.state = document.location.pathname.split("/")[1];
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".submenu-triangle > img")
		)).src;
	} else if (
		document.location.pathname.includes("/animes/") ||
		document.location.pathname.includes("/mangas/") ||
		document.location.pathname.includes("/ranobe/")
	) {
		presenceData.details = `Смотрит страницу ${document
			.querySelector(".submenu-triangle > span")
			.textContent.toLowerCase()}`;
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".c-poster > center > img")
		)).src;
		presenceData.state = title;
	} else if (
		document.location.pathname.includes("/list/anime/mylist") ||
		document.location.pathname.includes("/list/manga/mylist")
	) {
		if (document.location.pathname.includes("/planned"))
			presenceData.state = "Запланированно";
		else if (document.location.pathname.includes("/watching"))
			presenceData.state = "Смотрю";
		else if (document.location.pathname.includes("/rewatching"))
			presenceData.state = "Пересматриваю";
		else if (document.location.pathname.includes("/completed"))
			presenceData.state = "Просмотрено";
		else if (document.location.pathname.includes("/on_hold"))
			presenceData.state = "Отложено";
		else if (document.location.pathname.includes("/dropped"))
			presenceData.state = "Брошено";

		presenceData.details = `Смотрит ${document
			.querySelector(".submenu-triangle > span")
			.textContent.toLowerCase()} ${document.location.pathname.split("/")[1]}`;
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".block.avatar center a img")
		)).src;
	} else if (document.location.pathname === `/${title}`) {
		presenceData.details = `В профиле ${title}`;
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".avatar img")
		)).src;
	} else if (
		document.location.pathname.includes("/list/anime/") ||
		document.location.pathname.includes("/list/manga/")
	) {
		presenceData.details = `Смотрит ${document
			.querySelector(".submenu-triangle > span")
			.textContent.toLowerCase()} ${document.location.pathname.split("/")[1]}`;
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".block.avatar center a img")
		)).src;
	} else if (
		document.location.pathname.includes("/characters/") ||
		document.location.pathname.includes("/people/")
	) {
		let type;
		if (document.location.pathname.includes("/characters/")) type = "персонажа";
		else if (document.location.pathname.includes("/people/")) type = "человека";
		presenceData.largeImageKey = (<HTMLImageElement>(
			document.querySelector(".c-poster center img")
		)).src;
		presenceData.details = `Смотрит страницу ${type}`;
		presenceData.state = title;
	}

	presence.setActivity(presenceData);
});
