const presence = new Presence({
    clientId: "917868456232230932"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  }

  const path = document.location.pathname;
  if (path === "/") {
    presenceData.details = "На главной странице"
  }
  else if (path === "/view") {
    const articleTitle = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = "Читает статью";
    presenceData.state = articleTitle;
    presenceData.buttons = [
      {
        label: "Перейти к статье",
        url: document.URL
      }
    ]
  }
  else if (path === "/search") {
    presenceData.details = "В поисках статьи";
  }
  else if (path === "/create") {
    presenceData.details = "Создаёт статью";
  }
  else if (path === "/edit") {
    const pageTitle = document.querySelector("title").textContent;
    const articleTitle = pageTitle.slice(2, pageTitle.length - 12);
    presenceData.details = `Редактирует статью`;
    presenceData.state = articleTitle;
  }
  else if (path === "/portal") {
    const portalName = document.querySelector("p.text-5xl.font-bold.text-black.place-self-center.ml-8").textContent;
    presenceData.details = "В портале";
    presenceData.state = portalName;
    presenceData.buttons = [
      {
        label: "Войти в портал",
        url: document.URL
      }
    ]
  }
  else if (path === "/books") {
    presenceData.details = "В поисках книги";
  }
  else if (path === "/book") {
    const bookName = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = "Читает книгу";
    presenceData.state = bookName;
    presenceData.buttons = [
      {
        label: "Перейти к книге",
        url: document.URL
      }
    ]
  }
  else if (path === "/user") {
    const nickname = document.querySelector("p.text-2xl.text-black.font-medium.ml-4.place-self-center").firstChild.textContent;
    const name = document.querySelector("p.text-lg.text-gray-600.ml-4.place-self-center").textContent;
    presenceData.details = "Смотрит профиль";
    presenceData.state = `${nickname} (${name})`;
    presenceData.buttons = [
      {
        label: "Перейти к пользователю",
        url: document.URL
      }
    ]
  }
  else {
    presenceData.details = "Что-то делает на Фугапедии";
  }

  presence.setActivity(presenceData);
})
