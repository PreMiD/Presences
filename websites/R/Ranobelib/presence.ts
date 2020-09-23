var presence = new Presence({
  clientId: "743233111097081886"
});

var browsingStamp: number = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  // Presence Data
  let data: PresenceData = {
    largeImageKey: "ranobelib_large"
  };

  let route = document.location.pathname;
  let query = document.location.search;

  // Main
  if (route === "/") {
    if (query === "?section=all-updates") {
      // All Updates
      data.details = "Обновления ранобэ";
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
    data.details = "Каталог ранобэ";

    const queryType = query.split("&").find((q) => q.match("types"));
    const typeNumber = queryType ? queryType.split("=")[1] : null;

    switch (typeNumber) {
      case "10":
        data.state = `Ищу японское ранобэ`;
        break;
      case "11":
        data.state = `Ищу корейское ранобэ`;
        break;
      case "12":
        data.state = `Ищу китайское ранобэ`;
        break;
      case "13":
        data.state = `Ищу английское ранобэ`;
        break;
      case "14":
        data.state = `Ищу авторские`;
        break;
      case "9":
        data.state = `Ищу фанфики`;
        break;
      default:
        data.state = `Ищу ранобэ`;
        break;
    }
  }
  // Notififcation
  else if (route.startsWith("/notification")) {
    data.details = `Уведомления`;
    data.smallImageText = "Читает";
    data.smallImageKey = "reading";
    data.startTimestamp = 0;

    const typeList = [
      { id: 0, name: "all" },
      { id: 1, name: "chapter" },
      { id: 2, name: "comments" },
      { id: 3, name: "message" },
      { id: 4, name: "friend" },
      { id: 5, name: "other" }
    ];

    let pageQuery = query.split("&")[1];
    if (!pageQuery) {
      pageQuery = "all";
    } else {
      pageQuery = pageQuery.split("=")[1];
    }

    let type: any = typeList.find((i) => i.name === pageQuery);
    if (!type) type = 0;
    if (type) type = type.id;

    const categories = Array.from(
      document.querySelectorAll(".menu.menu_page .menu__item")
    );
    const currentCategory = <HTMLElement>(
      categories.find((item, index) => index === type)
    );

    if (currentCategory) {
      data.state = currentCategory.innerText;
    }
  }
  // Bookmarks
  else if (route.startsWith("/user/")) {
    const userPage = document.location.href.split("/").slice(4)[0];
    // Content Page
    if (userPage === "content") {
      data.details = `Мои добавления`;
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";
      data.startTimestamp = 0;

      const typeList = [
        { id: 1, name: "moderation" },
        { id: 2, name: "rejected" },
        { id: 3, name: "chapters" }
      ];

      let type: any = typeList.find(
        (i) => i.name === document.location.href.split("/").slice(5)[0]
      );
      if (!type) type = 0;
      if (type) type = type.id;

      const categories = Array.from(
        document.querySelectorAll(".menu.menu_page .menu__item .menu__text")
      );
      const currentCategory = <HTMLElement>(
        categories.find((item, index) => index === type)
      );

      if (currentCategory) {
        data.state = currentCategory.innerText;
      }
    } else if (userPage.match("edit")) {
      data.details = `Мои настройки`;
      data.smallImageText = "Настраивает";
      data.smallImageKey = "writing";
      data.startTimestamp = 0;

      let section: any = query.split("=")[1];
      const sections = [
        { id: 0, name: "info" },
        { id: 1, name: "site-settings" },
        { id: 2, name: "notifications" },
        { id: 3, name: "password" }
      ];
      section = sections.find((s) => s.name === section).id;

      const categories = Array.from(
        document.querySelectorAll(".menu.menu_page .menu__item")
      );
      const currentCategory = <HTMLElement>(
        categories.find((item, index) => index === parseInt(section))
      );

      if (currentCategory) {
        data.state = currentCategory.innerText;
      }
    } else {
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
      } else if (userRoute === "ban") {
        data.details = `Профиль`;
        data.state = "Список банов";
        data.smallImageText = "Смотрит";
        data.smallImageKey = "reading";
        data.startTimestamp = 0;
      }
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
  // People
  else if (route.startsWith("/people")) {
    let arr = route.split("/");
    const action = arr[arr.length - 1];

    if (action === "create") {
      data.details = "Добавляет автора";
      data.smallImageText = "Добавляет автора";
      data.smallImageKey = "writing";

      let title = <HTMLInputElement>document.getElementById("name");
      if (title.value.length > 1) {
        data.state = title.value;
      } else {
        data.state = "Имя команды не задано";
      }
    }
  }
  // Team
  else if (route.startsWith("/team")) {
    let arr = route.split("/");
    const action = arr[arr.length - 1];

    if (action === "create") {
      data.details = "Добавляет команду";
      data.smallImageText = "Добавляет команду";
      data.smallImageKey = "writing";

      let title = <HTMLInputElement>document.getElementById("name");
      if (title.value.length > 1) {
        data.state = title.value;
      } else {
        data.state = "Имя команды не задано";
      }
    }
  }
  // Edit Manga
  else if (route.startsWith("/manga")) {
    let arr = route.split("/");
    const action = arr[arr.length - 1];

    if (action === "edit") {
      data.details = "Редактирует ранобэ";
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
      data.details = "Добавляет ранобэ";
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";

      let title = <HTMLInputElement>document.getElementById("rus_name");
      if (title.value.length > 1) {
        data.state = title.value;
      } else {
        data.state = "Имя новеллы не задано";
      }
    } else {
      data.details = "Редактировать главу";
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";

      const title = <HTMLElement>(
        document.querySelector(".section__header .breadcrumb a")
      );
      if (title) {
        data.state = title.innerText;
      }
    }
  } else if (route.startsWith("/faq")) {
    const FaqRoute = document.location.href.split("/").slice(5)[0];

    if (FaqRoute) {
      if (FaqRoute === "article") {
        data.details = "Faq";
        data.smallImageText = "Редактирует";
        data.smallImageKey = "writing";
        data.state = "Редактирует";
      }

    } else {
      const querySection = query.split("&")[0];
      const section = querySection.slice(querySection.length - 1);
      const categories = Array.from(
        document.querySelectorAll(".faq-category-list .faq-category-item")
      );
      const currentCategory = <HTMLElement>(
        categories.find((item, index) => index === parseInt(section) - 1)
      );

      data.details = "Faq";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";

      if (currentCategory) {
        data.state = currentCategory.innerText;
      }
    }

    // News
  } else if (route.startsWith("/news")) {
    const newsRoute = document.location.href.split("/").slice(4)[0];
    if (newsRoute) {
      // Current News Page
      let newsTitle = <HTMLElement>document.querySelector(".news__title");
      data.details = "Новости";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";

      if (newsTitle) {
        data.state = newsTitle.innerText;
      }
    } else {
      // News List Page
      data.details = "Новости";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.state = "Список новостей";
    }
  }
  // Contact-US Page
  else if (route.startsWith("/contact")) {
    data.details = "Контакты";
    data.smallImageText = "Пишет";
    data.smallImageKey = "writing";
    data.state = "Свяжитесь с нами";
  } 
  // Moderation block
  else if (route.startsWith("/moderation")) {
    let arr = route.split("/");
    const parent = arr[arr.length - 2];
    const lastRoute = arr[arr.length - 1];

    data.details = "Модерация";

    if (arr.includes('manga')) {
      
      if (parent === 'manga') {
        
        if (lastRoute === 'rejected') {
          data.smallImageText = "Проверяет";
          data.smallImageKey = "reading";
          data.state = 'Отклоненные ранобэ';
        } else {
          data.smallImageText = "Проверяет";
          data.smallImageKey = "reading";
          data.state = 'Проверка ранобэ';
        }

      } else {
        data.smallImageText = "Проверяет";
        data.smallImageKey = "reading";
        data.state = 'Проверка новой ранобэ';
      }
    } else if (lastRoute === 'manga-edit ') {
      data.smallImageText = "Проверяет";
      data.smallImageKey = "reading";
      data.state = 'Проверка правок ранобэ'
    } else if (lastRoute === 'author') {
      data.smallImageText = "Проверяет";
      data.smallImageKey = "reading";
      data.state = 'Проверка авторов'
    } else if (lastRoute === 'publisher') {
      data.smallImageText = "Проверяет";
      data.smallImageKey = "reading";
      data.state = 'Проверка издателей'
    } else if (lastRoute === 'comments') {
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.state = 'Жалобы на комментарии'
    } else if (lastRoute === 'forum-posts') {
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.state = 'Жалобы на форуме'
    } else {
      data.smallImageText = "Редактирует";
      data.smallImageKey = "writing";
    }

  } else {
    let isReader = <HTMLElement>document.querySelector(".reader");

    // Reader mode
    if (isReader) {
      const titleArray: Array<string> = document.title.split(" ");
      const mangaName = titleArray.slice(2, -4).join(" ");

      data.details = "Читает новеллу";
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

      data.details = "Смотрит на новеллу";
      data.state = mangaName;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = browsingStamp;
    }
  }

  presence.setActivity(data, true);
});
