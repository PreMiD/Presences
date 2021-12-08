const presence = new Presence({
    clientId: "917868456232230932"
  }),
  startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp
  }

  const path = document.location.pathname;
  if (path === "/view") {
    const articleTitle = document.querySelector("p.text-4xl.font-bold.font-3").textContent;
    presenceData.details = `Читает статью: ${articleTitle}`,
    presenceData.buttons = [
      {
        label: "Перейти к статье",
        url: document.URL
      }
    ]
  }
  else if (path === "/user") {
    const username = document.querySelector("p.text-2xl.text-black.font-medium.ml-4.place-self-center").firstChild.textContent;
    presenceData.details = `Смотрит профиль: ${username}`,
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
