const presence = new Presence({
    clientId: "917868456232230932"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const privacyMode = await presence.getSetting("privacyMode"),
    showTime = await presence.getSetting("showTime"),
    showButtons = await presence.getSetting("showButtons"),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: showTime ? browsingTimestamp : null
    },
    path = document.location.pathname;

  if (path === "/") presenceData.details = "На главной странице";
  else if (path === "/view") {
    presenceData.details = "Читает статью";
    if (!privacyMode) {
      const articleTitle = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
      presenceData.state = articleTitle;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Перейти к статье",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/view_c") {
    presenceData.details = "Смотрит правку";
    if (!privacyMode) {
      const editTitle = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
      presenceData.state = editTitle;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Перейти к правке",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/category") {
    presenceData.details = "Смотрит категорию";
    if (!privacyMode) {
      const categoryName = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
      presenceData.state = categoryName;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Перейти в категорию",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/search") presenceData.details = "В поисках статьи";
  else if (path === "/create") presenceData.details = "Создаёт статью";
  else if (path === "/edit") {
    presenceData.details = "Редактирует статью";
    if (!privacyMode) {
      const pageTitle = document.querySelector("title").textContent,
        articleTitle = pageTitle.slice(2, pageTitle.length - 12);
      presenceData.state = articleTitle;
    }
  } else if (path === "/edits") {
    presenceData.details = "Смотрит список правок";
    presenceData.state = "на всей вики";
  } else if (path === "/history") {
    presenceData.details = "Смотрит историю статьи";
    if (!privacyMode) {
      const pageTitle = document.querySelector("title").textContent,
        articleTitle = pageTitle.slice(2, pageTitle.length - 12);
      presenceData.state = articleTitle;
    }
  } else if (path === "/portal") {
    presenceData.details = "В портале";
    if (!privacyMode) {
      const portalName = document.querySelector("p.text-4xl.font-semibold.text-white").textContent;
      presenceData.state = portalName;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Войти в портал",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/books") presenceData.details = "В поисках книги";
  else if (path === "/book") {
    presenceData.details = "Читает книгу";
    if (!privacyMode) {
      const bookName = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
      presenceData.state = bookName;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Перейти к книге",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/book-create") presenceData.details = "Создаёт книгу";
  else if (path === "/user") {
    presenceData.details = "Смотрит профиль";
    if (!privacyMode) {
      const nickname = document.querySelector("p.text-2xl.text-black.font-medium.ml-4.place-self-center").firstChild.textContent,
        name = document.querySelector("p.text-lg.text-gray-600.ml-4.place-self-center").textContent;
      presenceData.state = `${nickname} (${name})`;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "Перейти к пользователю",
            url: document.URL
          }
        ];
      }
    }
  } else if (path === "/privacypolicy") {
    presenceData.details = "Читает политику";
    presenceData.state = "конфиденциальности";
  } else if (path === "/termsofuse") {
    presenceData.details = "Читает условия";
    presenceData.state = "использования";
  } else if (path === "/ad") {
    presenceData.details = "Читает условия";
    presenceData.state = "размещения рекламы";
  } else if (path === "/account") {
    if (document.querySelector("#admintools")) presenceData.details = "Что-то делает в админ-панели";
    else presenceData.details = "Редактирует свой аккаунт";
  } else if (path === "/sub") presenceData.details = "Собирается купить подписку";
  else if (path === "/upload") presenceData.details = "Загружает изображение";
  else if (path === "/api.php") presenceData.details = "Читает документацию API";
  else presenceData.details = "Что-то делает на Фугапедии";

  presence.setActivity(presenceData);
});
