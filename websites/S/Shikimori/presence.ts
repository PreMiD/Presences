const presence = new Presence({
	clientId: "934863156356972584"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Где-то на сайте",
		largeImageKey: "https://i.imgur.com/7tlc7or.png"
	};

  let title = document.querySelector("meta[property='og:title']").getAttribute("content");

	if (document.location.pathname === "/") 
    presenceData.details = title;
  else if (document.location.pathname.includes("/edit/")) {
		presenceData.details = "Настройки";
    presenceData.state = title;
  }
  else if (document.location.pathname.includes("/forum")) {
    presenceData.details = title;
    if (document.location.pathname.includes("/animanga")) {
      presenceData.details = "Форум аниме и манги";
      presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".b-menu_logo center a img")).src;
    } else if (document.location.pathname.includes("/news")) {
      presenceData.details = "Форум новости";
      presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".b-menu_logo center a img")).src;
    } else if (document.location.pathname.includes("/offtopic")) {
      presenceData.details = "Форум оффтоп";
    } else if (document.location.pathname.includes("/critiques/")) {
      presenceData.details = "Рецензии";
      presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".b-menu_logo center a img")).src;
    }
    presenceData.state = title;
  }
  else if (document.location.pathname.includes("/clubs")) {
    presenceData.details = title;
    if (document.location.pathname.includes("/clubs/")) {
      presenceData.details = "Клубы";
      presenceData.state = title;
      presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".b-menu_logo center a img")).src;
    }
  }
  else if (document.location.pathname.includes("/collections")) {
    presenceData.details = title;
    if (document.location.pathname.includes("/collections/")) {
      presenceData.details = "Коллекции";
      presenceData.state = title;
    }
  }
  else if (document.location.pathname.includes("/articles")) {
    presenceData.details = title;
    if (document.location.pathname.includes("/articles/")) {
      presenceData.details = "Статьи";
      presenceData.state = title;
    }
  }
  else if (document.location.pathname.includes("/users"))
    presenceData.details = title;
  else if (document.location.pathname.includes("/contests"))
    presenceData.details = title;
  else if (document.location.pathname.includes("/ongoings"))
    presenceData.details = title;
  else if (document.location.pathname.includes("/dialogs"))
    presenceData.details = title;
  else if (document.location.pathname.includes("/achievements"))
    presenceData.details = title;
	else if (document.location.pathname === "/animes" || document.location.pathname === "/mangas" || document.location.pathname === "/ranobe") 
    presenceData.details = "Ищет " + title.toLowerCase();
	else if (document.location.pathname.includes("/history")) {
    let profile_image = (<HTMLImageElement>document.querySelector(".submenu-triangle img")).src;
    presenceData.details = "Смотрит историю списка";
    presenceData.state = document.location.pathname.split("/")[1];
    presenceData.largeImageKey = profile_image;
	} else if (document.location.pathname.includes("/animes/") || document.location.pathname.includes("/mangas/") || document.location.pathname.includes("/ranobe/")) {
    if (document.location.pathname.includes("/animes/"))
      presenceData.details = "Смотрит страницу аниме";
    if (document.location.pathname.includes("/mangas/"))
      presenceData.details = "Смотрит страницу манги";
    if (document.location.pathname.includes("/ranobe/"))
      presenceData.details = "Смотрит страницу ранобэ";

    presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".c-poster center img")).src;
    presenceData.state = title;
    presenceData.buttons = [
      {
        label: "Открыть страницу",
				url: document.location.href
			}
    ];
	} else if (document.location.pathname.includes("/list/anime/mylist") || document.location.pathname.includes("/list/manga/mylist")) {
    let section;
    if (document.location.pathname.includes("/anime/")) 
      section = "аниме";
    else 
      section = "манги";

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

    presenceData.details = "Список " + section + " " + document.location.pathname.split("/")[1];
    presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".block.avatar center a img")).src;
  } else if (document.location.pathname === "/" + title) {
		presenceData.details = "В профиле " + title;
    presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".avatar img")).src;
	} else if (document.location.pathname.includes("/list/anime/") || document.location.pathname.includes("/list/manga/")) {
		if (document.location.pathname.includes("/anime/")) 
      presenceData.details = "В списке аниме " + document.location.pathname.split("/")[1]; 
    else 
      presenceData.details = "В списке манги " + document.location.pathname.split("/")[1];
    presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".block.avatar center a img")).src;
	} else if (document.location.pathname.includes("/characters/") || document.location.pathname.includes("/people/")) {
    let type;
    if (document.location.pathname.includes("/characters/"))
      type = "персонажа";
    else if (document.location.pathname.includes("/people/"))
      type = "человека"
    presenceData.largeImageKey = (<HTMLImageElement>document.querySelector(".c-poster center img")).src;
    presenceData.details = "Страница " + type;
    presenceData.state = title;
  }

  presence.setActivity(presenceData);
});