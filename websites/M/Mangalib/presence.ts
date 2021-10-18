const presence = new Presence({
  clientId: "684124119146692619"
});

// Timestamp
function getTimeStamp() {
  return Math.floor(Date.now() / 1000);
}

// Variables
let Routes: string[],
  Queries,
  DiscussionTitle: string,
  DiscussionAuthor: string,
  NewsTitle: string,
  PeopleName: string,
  TeamName: string,
  UserName: string,
  BookmarkType: string,
  BookmarkSize: string;

presence.on("UpdateData", async () => {
  // Presence Data
  const data: PresenceData = {
    largeImageKey: "mangalib_large"
  };

  // Setup Routes & Query
  Routes = document.location.href
    .replace(document.location.search, "")
    .split("/")
    .splice(3);
  Queries = Object.fromEntries(
    document.location.search
      .slice(1)
      .split("&")
      .map((k, _, a) => {
        const item: string[] = k.replace(/\[(.*?)\]+/g, "").split("="),
          Keys = a
            .map((i) => i.replace(/\[(.*?)\]+/g, "").split("="))
            .filter((i) => i[0] === item[0]),
          Values = Keys.map((i) => i[1]);

        if (Keys.length === 1) return item;
        else return [item[0], Values];
      })
  );

  // Website Pages
  if (Routes[0] === "") {
    // Homepage
    data.smallImageText = "reading";
    data.smallImageKey = "search";
    data.details = "Главная";
    data.startTimestamp = 0;

    // Page Section
    if (Queries.section === "my-updates") data.state = "Мои обновления";
    else data.state = "Все обновления";
  } else if (Routes[0] === "manga-list") {
    // List of mangas
    data.smallImageText = "reading";
    data.smallImageKey = "search";
    data.details = "Каталог манги";

    if (!Array.isArray(Queries.types)) Queries.types = [Queries.types];

    // Search Types
    if (Queries.types && Queries.types.length === 1) {
      // Types size === 1
      switch (Queries.types[0]) {
        case "4":
          data.state = "Ищет OEL-мангу";
          break;
        case "5":
          data.state = "Ищет Манхву";
          break;
        case "6":
          data.state = "Ищет Маньхуа";
          break;
        case "8":
          data.state = "Ищет Румангу";
          break;
        case "9":
          data.state = "Ищет Западный комикс";
          break;
        default:
          data.state = "Ищет Мангу";
          break;
      }
    } else if (Queries.types && Queries.types.length > 1) {
      // Types size > 1
      const mangas: string[] = [];

      Queries.types.sort().forEach((item: string) => {
        switch (item) {
          case "4":
            mangas.push("OEL-мангу");
            break;
          case "5":
            mangas.push("Манхву");
            break;
          case "6":
            mangas.push("Маньхуа");
            break;
          case "8":
            mangas.push("Румангу");
            break;
          case "9":
            mangas.push("Западный комикс");
            break;
          default:
            mangas.push("Мангу");
            break;
        }
      });

      data.state = `Ищет: ${mangas.join(", ")}`;
    } else data.state = "Ищет Мангу";
  } else if (Routes[0] === "forum") {
    // Forum page
    data.details = "Форум";

    // Subpages of forums
    if (Routes[1] === "") {
      // Main forum page
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";

      if (Queries.subscription) data.state = "Мои подписки";

      if (Queries.user_id) data.state = "Мои темы";

      switch (Queries.category) {
        case "all":
          data.state = "Все категории";
          break;
        case "1":
          data.state = "Баги и проблемы";
          break;
        case "2":
          data.state = "Предложения для сайта";
          break;
        case "3":
          data.state = "Поиск тайтлов";
          break;
        case "4":
          data.state = "Поиск кадров";
          break;
        case "5":
          data.state = "Обсуждение Манги";
          break;
        case "6":
          data.state = "Обсуждение Аниме";
          break;
        case "7":
          data.state = "Обсуждение Ранобэ";
          break;
        case "8":
          data.state = "Видеоигры";
          break;
        case "9":
          data.state = "Переводчикам";
          break;
        case "10":
          data.state = "Как переводить мангу";
          break;
        case "11":
          data.state = "Как рисовать мангу";
          break;
        case "12":
          data.state = "Общение";
          break;
        case "13":
          data.state = "Другое";
          break;
      }
    } else if (Routes[1] === "discussion-create") {
      // Discussion create
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";
      data.state = "Создает новую тему";
    } else if (Routes[1] === "discussion") {
      // Discussion page
      if (Routes[2] && !Routes[3]) {
        // Opened discussion
        data.smallImageText = "Читает";
        data.smallImageKey = "reading";

        const titleElement = document.querySelector(
            ".discussion .discussion__title"
          ),
          authorElement = document.querySelector(
            ".discussion .discussion-creator__username"
          );

        DiscussionTitle = titleElement && titleElement.textContent;
        DiscussionAuthor = authorElement && authorElement.textContent;

        if (DiscussionAuthor && DiscussionTitle)
          data.state = `Тема: ${DiscussionTitle}| Автор: ${DiscussionAuthor}`;
      } else if (Routes[3] && Routes[3] === "edit") {
        // Editor discussion
        data.smallImageText = "Пишет";
        data.smallImageKey = "writing";

        data.state = DiscussionTitle
          ? `Редактирует тему: ${DiscussionTitle}`
          : "Редактирует тему";
      }
    }
  } else if (Routes[0] === "faq") {
    // Faq page

    if (Routes[1] === "article") {
      // Faq Editor

      data.details = "Faq";
      data.smallImageText = "Редактирует";
      data.smallImageKey = "writing";
      data.state = `Редактирует: ${Queries.article} вопрос`;
    } else {
      // Faq Sections
      data.details = "Faq";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";

      switch (Queries.section) {
        case "1":
          data.state = "Манга";
          break;
        case "2":
          data.state = "Общие вопросы";
          break;
        case "3":
          data.state = "Профиль пользователя";
          break;
        case "4":
          data.state = "Чтение манги";
          break;
        case "5":
          data.state = "Комментарии";
          break;
        case "6":
          data.state = "Мини-чат";
          break;
        case "7":
          data.state = "Решение проблем";
          break;
        case "8":
          data.state = "Правила";
          break;
        case "9":
          data.state = "Форум";
          break;
      }
    }
  } else if (Routes[0] === "news") {
    // News page
    data.details = "Новости";
    data.smallImageText = "Читает";
    data.smallImageKey = "reading";

    if (Routes[1]) {
      // Opened News
      const titleElement = document.querySelector(".news__title");
      NewsTitle = titleElement && titleElement.textContent;

      if (NewsTitle) data.state = NewsTitle;
    } else {
      // News List
      data.details = "Новости";
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.state = "Список новостей";
    }
  } else if (Routes[0] === "notification") {
    // Notification list
    data.details = "Уведомления";
    data.smallImageText = "Читает";
    data.smallImageKey = "reading";

    switch (Queries.type) {
      case "chapter":
        data.state = "Главы";
        break;
      case "comments":
        data.state = "Комментарии";
        break;
      case "message":
        data.state = "Сообщения";
        break;
      case "friend":
        data.state = "Заявки в друзья";
        break;
      case "other":
        data.state = "Другое";
        break;
      case "all":
        data.state = "Все";
        break;
    }
  } else if (Routes[0] === "contact-us") {
    // Contact page
    data.details = "Контакты";
    data.smallImageText = "Пишет";
    data.smallImageKey = "writing";
    data.state = "info@mangalib.me";
  } else if (Routes[0] === "messages") {
    // Messages page
    data.details = "Личные сообщения";
    data.smallImageText = "Пишет";
    data.smallImageKey = "writing";
    data.startTimestamp = getTimeStamp();
  } else if (Routes[0] === "people") {
    // Authors (Moderation) page

    if (Routes[1] === "create") {
      data.details = "Добавляет автора";
      data.smallImageText = "Добавляет автора";
      data.smallImageKey = "writing";

      const name = <HTMLInputElement>document.getElementById("name");

      PeopleName = name.value;

      if (PeopleName.length > 1) data.state = PeopleName;
      else data.state = "Имя автора не задано";
    }
  } else if (Routes[0] === "team") {
    // Team page

    if (Routes[1] === "create") {
      // Create New Team
      data.details = "Добавляет команду";
      data.smallImageText = "Добавляет команду";
      data.smallImageKey = "writing";

      const name = <HTMLInputElement>document.getElementById("name");

      TeamName = name.value;

      if (TeamName.length > 1) data.state = TeamName;
      else data.state = "Имя команды не задано";
    } else {
      // Others

      if (!Routes[2]) {
        // Main Team Page
        data.details = "Команда перевода";
        data.smallImageText = "Смотрит переводчика";
        data.smallImageKey = "reading";

        const title = document.querySelector(".team-profile__name");

        TeamName = title && title.textContent.replace("редактировать", "");

        if (TeamName) data.state = TeamName;
      } else if (Routes[2] === "edit") {
        data.details = "Команда перевода";
        data.smallImageText = "Редактирует переводчика";
        data.smallImageKey = "writing";

        switch (Queries.section) {
          case "info":
            data.state = "Редактирует информацию команды";
            break;
          case "users":
            data.state = "Редактирует участников команды";
            break;
        }
      }
    }
  } else if (Routes[0] === "moderation") {
    // Moderation page

    data.details = "Модерация";
    data.smallImageText = "Управляет сайтом";
    data.smallImageKey = "reading";

    if (!Routes[1]) data.state = "Модерация глав";
    else if (Routes[1] === "manga") {
      if (Routes[2] === "rejected") data.state = "Отклоненные манги";
      else data.state = "Модерация манги";
    } else if (Routes[1] === "manga-edit") data.state = "Изменения манги";
    else if (Routes[1] === "author") data.state = "Новые Авторы";
    else if (Routes[1] === "publisher") data.state = "Новые Издательства";
    else if (Routes[1] === "comments") data.state = "Жалобы на комментарии";
    else if (Routes[1] === "forum-posts") data.state = "Жалобы на форуме";
    else if (Routes[1] === "comments-list") {
      if (Routes[2] === "all") data.state = "Список комментариев";
      else if (Routes[2] === "sticky") data.state = "Закрепленные комментарии";
    } else if (Routes[1] === "ban-list") data.state = "Баны";
    else if (Routes[1] === "other") data.state = "Другое";
  } else if (Routes[0] === "user") {
    // User page
    data.smallImageText = "Смотрит профиль пользователя";
    data.smallImageKey = "reading";

    const username = document.querySelector(".profile-user__username span");

    UserName = username && username.textContent;

    if (UserName) data.details = `Профиль:${UserName}`;

    if (Routes[1] === "content") {
      data.details = "Мои добавления";
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";
      data.startTimestamp = 0;

      if (!Routes[2]) data.state = "Добавленные тайтлы";
      else if (Routes[2] === "moderation") data.state = "Тайтлы на модерации";
      else if (Routes[2] === "rejected")
        data.state = "Тайтлы не прошедшие модерацию";
      else if (Routes[2] === "chapters") data.state = "Главы на модерации";
    } else if (Routes[1] === "edit") {
      data.details = "Мои настройки";
      data.smallImageText = "Настраивает";
      data.smallImageKey = "writing";
      data.startTimestamp = 0;

      switch (Queries.section) {
        case "info":
          data.state = "Информация";
          break;
        case "site-settings":
          data.state = "Настройки сайта";
          break;
        case "notifications":
          data.state = "Уведомления";
          break;
        case "password":
          data.state = "Безопасность";
          break;
      }
    } else {
      if (!Routes[2]) {
        // Main user page
        const size = document.querySelector(
            ".bookmark-menu .menu__item.is-active .bookmark-menu__label"
          ),
          title = document.querySelector(
            ".bookmark-menu .menu__item.is-active .bookmark-menu__name"
          );

        BookmarkSize = size && size.textContent;
        BookmarkType =
          title &&
          title.textContent.charAt(0).toUpperCase() +
            title.textContent.slice(1);

        data.details = `Закладки ${UserName}`;
        data.state = `${BookmarkType.trim()}: ${BookmarkSize}`;
        data.smallImageText = "Читает";
        data.smallImageKey = "reading";
        data.startTimestamp = 0;
      } else if (Routes[2] === "comment") {
        data.details = `Профиль: ${UserName}`;
        let commentType;

        if (Queries.commentType === "manga")
          commentType = "Комментарии к манге";
        else if (Queries.commentType === "chapter")
          commentType = "Комментарии к главам";
        else if (Queries.commentType === "post")
          commentType = "Комментарии к новостям";
        else commentType = "Все комментарии";

        data.state = commentType;
      } else if (Routes[2] === "following") {
        data.details = `Профиль: ${UserName}`;
        data.state = "Список друзей";
      } else if (Routes[2] === "mutual-friends") {
        data.details = `Профиль: ${UserName}`;
        data.state = "Общие друзья";
      } else if (Routes[2] === "ignore") {
        data.details = `Профиль: ${UserName}`;
        data.state = "Игнор-лист";
      } else if (Routes[2] === "ban") {
        data.details = "Мой профиль";
        data.state = "История банов";
      }
    }
  } else if (Routes[0] === "manga") {
    // Manga page

    if (Routes[1] === "create") {
      // create new manga
      data.details = "Добавляет мангу";
      data.smallImageText = "Пишет";
      data.smallImageKey = "writing";

      const title = <HTMLInputElement>document.getElementById("rus_name");

      if (title.value.length > 1) data.state = title.value;
      else data.state = "Имя тайтла не задано";
    } else {
      if (Routes[2] === "edit") {
        // edit
        data.smallImageText = "Редактирует";
        data.smallImageKey = "writing";

        const title = document.querySelector(".section__header .breadcrumb a");

        data.details = title.textContent;

        switch (Queries.section) {
          case "media-edit":
            data.state = "Редактирование";
            break;
          case "changes":
            data.state = "Список изменений";
            break;
          case "related-items":
            data.state = "Связанные тайтлы";
            break;
        }
      } else if (Routes[2] === "bulk-create") {
        // bulk create
        data.details = "Добавляет главы";
        data.smallImageText = "Добавляет";
        data.smallImageKey = "uploading";

        const title = document.querySelector(".section__header .breadcrumb a");

        data.state = `Манга: ${title.textContent}`;
      } else if (Routes[2] === "add-chapter") {
        // add chapter
        data.details = "Добавляет главу";
        data.smallImageText = "Добавляет";
        data.smallImageKey = "uploading";

        const title = document.querySelector(".section__header .breadcrumb a");

        data.state = `Манга: ${title.textContent}`;
      } else {
        data.details = "Редактирует главу";
        data.smallImageText = "Пишет";
        data.smallImageKey = "writing";

        const title = document.querySelector(".section__header .breadcrumb a");

        data.state = `Манга: ${title.textContent}`;
      }
    }
  } else {
    // Others
    const ReaderMode = document.querySelector(".reader");

    if (ReaderMode) {
      const titleArray: Array<string> = document.title.split(" "),
        mangaName = titleArray.slice(2, -4).join(" ");

      data.details = "Читает тайтл";
      data.state = mangaName;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
      data.startTimestamp = getTimeStamp();
    } else {
      const { title } = document,
        mangaName: string = title.split("/")[0].split(" ").slice(1).join(" ");

      data.details = "Смотрит тайтл";
      data.state = mangaName;
      data.smallImageText = "Читает";
      data.smallImageKey = "reading";
    }
  }

  presence.setActivity(data, true);
});
