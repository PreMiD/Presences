const presence = new Presence({ clientId: "739908991274057870" }),
  browsingStamp = Math.floor(Date.now() / 1000);
const locales: Record<string, Record<string, string>> = {
  "ru": {
    "leaderboard":"Смотрит на таблицу лидеров сервера:",
    "dashone": "В панели управления",
    "dashtwo":"Сервер:",
    "donate":"Читает информацию об пожертвовании",
    "mainpage":"Главная страница",
    "servers":"Выбирает сервер",
    "cmds":"Смотрит список команд",
    "stats":"Смотрит статистику бота",
    "rank":"Меняет каточку рейтинга",
    "fbackread":"Читает"
  },
  "en": {
    "leaderboard":"Looks at the server's leaderboard:",
    "dashone":"In dashboard",
    "dashtwo":"Guild:",
    "donate":"Reads information about the donation",
    "mainpage":"Main page",
    "servers":"Selects the server",
    "cmds":"Looks at the list of commands",
    "stats":"Looks at the bot's statistics",
    "rank":"Changes the rank card",
    "fbackread":"Reading"
  }
};
let lang = ''
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = { largeImageKey: "logo" };
  let userLang = navigator.language;
  if (userLang === "ru") {
    lang = 'ru'
  } else {
    lang = 'en'
  }
  if (document.location.hostname == "juniper.bot") {
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname.includes("/ranking")) {
        presenceData.details = locales[userLang].leaderboard;
        presenceData.state = document.querySelector(
          ".guild--info h1.font-weight-thin.display-2"
        ).innerHTML;
        presenceData.smallImageKey = "list";
        presenceData.smallImageText = 'juniper.bot'
      } else if (document.location.pathname.includes("/dashboard/")) {
        presenceData.details = locales[lang].dashone;
        presenceData.state = `${locales[lang].dashtwo} ${
          document.querySelector(".guild--info h1.font-weight-thin.display-2")
            .innerHTML
        }`;
      } else if (document.location.pathname.includes("/donate")) {
        presenceData.details = locales[lang].donate;
        presenceData.smallImageKey = "donate";
        presenceData.smallImageText = 'juniper.bot'
      } else if (document.location.pathname == "/") {
        presenceData.details = locales[lang].mainpage;
      } else if (document.location.pathname == "/servers") {
        presenceData.details = locales[lang].servers;
        presenceData.smallImageKey = "list";
        presenceData.smallImageText = 'juniper.bot'
      } else if (document.location.pathname == "/commands") {
        presenceData.details = locales[lang].cmds;
        presenceData.smallImageKey = "list";
        presenceData.smallImageText = 'juniper.bot'
      } else if (document.location.pathname == "/status") {
        presenceData.details = locales[lang].stats;
        presenceData.smallImageKey = "stats";
        presenceData.smallImageText = 'juniper.bot'
      } else if (document.location.pathname == "/user/card") {
        presenceData.details = locales[lang].rank;
      }
    }
    if (document.location.hostname == "docs.juniper.bot") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = document.title;
      presenceData.state = "docs.juniper.bot";
      presenceData.smallImageKey = "list";
      presenceData.smallImageText = 'juniper.bot'
    }
    if (document.location.hostname == "feedback.juniper.bot") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = "feedback.juniper.bot";
      if (document.location.pathname == "/") {
        presenceData.details = locales[lang].mainpage;
      } else if (document.location.pathname.includes("/posts")) {
        presenceData.details = `${locales[lang].fbackread}: ${
          document.querySelector(".post-header h1").innerHTML
        }`;
      }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
