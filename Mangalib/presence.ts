var presence = new Presence({
  clientId: "684124119146692619",
  mediaKeys: false,
});

var browsingStamp: number = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  // Presence Data
  let data: presenceData = {
    largeImageKey: "mangalib_large",
  };

  let route = document.location.pathname;
  let query = document.location.search;

  // Main
  if (route === "/") {
    if (query === "?section=all-updates") {
      // All Updates
      data.details = "Обновления манги";
      data.startTimestamp = 0;
    } else {
      // Main
      data.details = "Главная страница";
      data.startTimestamp = 0;
    }
  }
  // Manga list
  else if (route === "/manga-list") {
    data.smallImageText = "Ищет";
    data.smallImageKey = "search";
    data.startTimestamp = 0;
    data.details = "Каталог";

    const queryType = query.split("&").find((q) => q.match("types"));
    const typeNumber = queryType ? queryType.split("=")[1] : null;

    switch (typeNumber) {
      case "1":
        data.state = `Ищу мангу`;
        break;
      case "4":
        data.state = `Ищу OEL-мангу`;
        break;
      case "5":
        data.state = `Ищу манхву`;
        break;
      case "6":
        data.state = `Ищу маньхуа`;
        break;
      case "8":
        data.state = `Ищу румангу`;
        break;
      case "9":
        data.state = `Ищу западный комикс`;
        break;
      default:
        data.state = `Ищу мангу`;
        break;
    }
  }
  // Bookmarks
  else if (route.startsWith("/user/")) {
    const userRoute = document.location.href.split("/").slice(5)[0];
    let username = <HTMLElement>(
      document.querySelector(".profile-user .profile-user__username span")
    );

    // User Bookmarks
    if (!userRoute) {
      let bookmarkSize = <HTMLElement>(
        document.querySelector(
          ".bookmark-sidebar .menu.bookmark-menu .menu__item .bookmark-menu__label"
        )
      );

      data.details = `Закладки ${username.innerText}`;
      data.state = `Всего: ${bookmarkSize.innerText.trim()}`;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = 0;
    }
    // User Comments
    else if (userRoute === "comment") {
      data.details = `Профиль ${username.innerText}`;
      data.state = "Комментарии";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = 0;
    }
    // User Friends
    else if (userRoute === "following") {
      data.details = `Профиль ${username.innerText}`;
      data.state = "Cписок друзей";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = 0;
    }
  }
  // Forum
  else if (route.startsWith("/forum")) {
    const queryCategory = query.split("&").find((q) => q.match("category"));
    let categoryValue = queryCategory ? queryCategory.split("=")[1] : null;
    if (categoryValue === "all") categoryValue = "0";

    data.details = "Форум";
    data.smallImageText = "Читает";
    data.smallImageKey = "reading";

    const categories = Array.from(
      document.querySelectorAll(".f-categories__items .f-category")
    ).splice(2);
    const currentCategory = <HTMLElement>(
      categories.find((item, index) => index === parseInt(categoryValue))
    );
    if (currentCategory) {
      data.state = currentCategory.innerText;
    }

    const forumRoute = document.location.href.split("/").slice(4)[0];
    // Discussion
    if (forumRoute === "discussion") {
      const title = <HTMLElement>(
        document.querySelector(".discussion .discussion__title")
      );
      data.state = title.innerText;
    }
  }
  // Private Messages
  else if (route.startsWith("/messages")) {
    data.details = "Сообщения";
    data.smallImageText = "Пишет";
    data.smallImageKey = "writing";
  }
  // Edit Manga
  else if (route.startsWith("/manga")) {
    let arr = route.split("/");
    const action = arr[arr.length - 1];

    if (action === "edit") {
      data.details = "Редактирует мангу";
      data.smallImageText = "Редактирует";
      data.smallImageKey = "writing";
    } else if (action === "bulk-create") {
      data.details = "Добавляет главы";
      data.smallImageText = "Добавляет";
      data.smallImageKey = "uploading";
    } else if (action === "add-chapter") {
      data.details = "Добавляет главу";
      data.smallImageText = "Добавляет";
      data.smallImageKey = "uploading";
    } else if (action === "create") {
      data.details = "Добавляет мангу";
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";
    }
  } else {
    let isReader = <HTMLElement>document.querySelector(".reader");

    // Reader mode
    if (isReader) {
      const titleArray: Array<string> = document.title.split(" ");
      const mangaName = titleArray.slice(2, -4).join(" ");
      //const chapter = titleArray.reverse().splice(2, 1)[0]
      //const page = parseInt(titleArray.shift())

      data.details = "Читает тайтл";
      data.state = mangaName;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = browsingStamp;
    } else {
      const title: string = document.title;
      const mangaName: string = title
        .split("/")[0]
        .split(" ")
        .slice(1)
        .join(" ");

      data.details = "Смотрит на тайтл";
      data.state = mangaName;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = browsingStamp;
    }
  }

  presence.setActivity(data, true);
});
