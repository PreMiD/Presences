const presence = new Presence({
    clientId: "917868456232230932"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    path = document.location.pathname;

  if (path === "/") presenceData.details = "На главной странице";
  else if (path === "/view") {
    const articleTitle = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = "Читает статью";
    presenceData.state = articleTitle;
    presenceData.buttons = [
      {
        label: "Перейти к статье",
        url: document.URL
      }
    ];
  } else if (path === "/category") {
    const categoryName = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = "Смотрит категорию";
    presenceData.state = categoryName;
    presenceData.buttons = [
      {
        label: "Перейти в категорию",
        url: document.URL
      }
    ];
  } else if (path === "/search") presenceData.details = "В поисках статьи";
  else if (path === "/create") presenceData.details = "Создаёт статью";
  else if (path === "/edit") {
    const pageTitle = document.querySelector("title").textContent,
      articleTitle = pageTitle.slice(2, pageTitle.length - 12);
    presenceData.details = "Редактирует статью";
    presenceData.state = articleTitle;
  } else if (path === "/history") {
    const pageTitle = document.querySelector("title").textContent,
      articleTitle = pageTitle.slice(2, pageTitle.length - 12);
    presenceData.details = "Смотрит историю статьи";
    presenceData.state = articleTitle;
  } else if (path === "/portal") {
    const portalName = document.querySelector("p.text-5xl.font-bold.text-black.place-self-center.ml-8").textContent;
    presenceData.details = "В портале";
    presenceData.state = portalName;
    presenceData.buttons = [
      {
        label: "Войти в портал",
        url: document.URL
      }
    ];
  } else if (path === "/books") presenceData.details = "В поисках книги";
  else if (path === "/book") {
    const bookName = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = "Читает книгу";
    presenceData.state = bookName;
    presenceData.buttons = [
      {
        label: "Перейти к книге",
        url: document.URL
      }
    ];
  } else if (path === "/book-create") presenceData.details = "Создаёт книгу";
  else if (path === "/user") {
    const nickname = document.querySelector("p.text-2xl.text-black.font-medium.ml-4.place-self-center").firstChild.textContent,
      name = document.querySelector("p.text-lg.text-gray-600.ml-4.place-self-center").textContent;
    presenceData.details = "Смотрит профиль";
    presenceData.state = `${nickname} (${name})`;
    presenceData.buttons = [
      {
        label: "Перейти к пользователю",
        url: document.URL
      }
    ];
  } else if (path === "/privacypolicy") {
    presenceData.details = "Читает политику";
    presenceData.state = "конфиденциальности";
  } else if (path === "/termsofuse") {
    presenceData.details = "Читает условия";
    presenceData.state = "использования";
  } else if (path === "/ad") {
    presenceData.details = "Читает условия";
    presenceData.state = "размещения рекламы";
  } else if (path === "/account") presenceData.details = "Редактирует свой аккаунт";
  else if (path === "/sub") presenceData.details = "Собирается купить подписку";
  else if (path === "/upload") presenceData.details = "Загружает изображение";
  else if (path === "/api.php") presenceData.details = "Читает документацию API";
  else presenceData.details = "Что-то делает на Фугапедии";

  presence.setActivity(presenceData);
});
