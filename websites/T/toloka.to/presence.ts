var presence = new Presence({
  clientId: "798502531847421962"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any;
var search: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "toloka"
  },
  showUseramePM: boolean = await presence.getSetting("name"),
  showSearchQuery: boolean = await presence.getSetting("search");

  if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю головну";
    presenceData.state = "сторінку";
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "Головна";
  }
  else if (document.location.pathname.includes("/%D0%BD%D0%BE%D0%B2%D0%B8%D0%BD%D0%B8.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Загальне";
    presenceData.smallImageKey = "home";
    presenceData.smallImageText = "Загальне";
  }
  else if (document.location.pathname.includes("/%D0%B2%D1%96%D0%B4%D0%B5%D0%BE-%D0%B3%D1%83%D1%80%D1%82%D0%BE%D0%BC.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Проект Відео Гуртом";
    presenceData.smallImageKey = "video";
    presenceData.smallImageText = "Відео Гуртом";
  }
  else if (document.location.pathname.includes("/%D1%84%D1%96%D0%BB%D1%8C%D0%BC%D0%B8-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%8E.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Фільми українською";
    presenceData.smallImageKey = "film";
    presenceData.smallImageText = "Фільми";
  }
  else if (document.location.pathname.includes("/%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-%D0%BC%D1%83%D0%B7%D0%B8%D0%BA%D0%B0.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Українська музика";
    presenceData.smallImageKey = "music";
    presenceData.smallImageText = "Музика";
  }
  else if (document.location.pathname.includes("/%D0%BB%D1%96%D1%82%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%8E.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Література українською";
    presenceData.smallImageKey = "book";
    presenceData.smallImageText = "Література";
  }
  else if (document.location.pathname.includes("/%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B8-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%8E.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Програми українською";
    presenceData.smallImageKey = "desktop";
    presenceData.smallImageText = "Програми";
  }
  else if (document.location.pathname.includes("/%D1%96%D0%B3%D1%80%D0%B8-%D1%83%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%BE%D1%8E.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Ігри українською";
    presenceData.smallImageKey = "gamepad";
    presenceData.smallImageText = "Ігри";
  }
  else if (document.location.pathname.includes("/%D0%B0%D1%80%D1%85%D1%96%D0%B2.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю розділ:";
    presenceData.state = "Архів та смітник";
    presenceData.smallImageKey = "archive";
    presenceData.smallImageText = "Архів";
  }
  else if (RegExp("\\/f\\d+", "g").test(document.location.pathname)) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > table > tbody > tr > td > h1 > a.maintitle"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю категорію:";
    presenceData.state = title.innerText;
  }
  else if (RegExp("\\/u\\d+", "g").test(document.location.pathname)) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > table.forumline > tbody > tr > td.row1 > table > tbody > tr > td > span.genmed > a.genmed > b"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю профіль:";
    presenceData.state = title.innerText;
    presenceData.smallImageKey = "user";
    presenceData.smallImageText = "Профіль";
  }
  else if (RegExp("\\/t\\d+", "g").test(document.location.pathname)) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > table > tbody > tr > td > h1 > a.maintitle"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю тему:";
    presenceData.state = title.innerText;
  }
  else if (document.location.pathname.includes("/rightholders.php")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю сторінку";
    presenceData.state = "Для правовласників";
  }
  else if (document.location.pathname.includes("/faq.php")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Читаю FAQ";
    presenceData.smallImageKey = "question";
    presenceData.smallImageText = "FAQ";
  }
  else if (document.location.pathname.includes("/tracker.php")) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form#form > table.forumline > tbody > tr > td.row4 > table > tbody > tr > td.row4 > div > fieldset.fieldset > div > input.post"
    );
    presenceData.startTimestamp = browsingStamp;
    if (title.value == "" || !showSearchQuery) {
      presenceData.details = "Щось шукаю";
    } else {
      presenceData.details = "Шукаю:";
      presenceData.state = title.value;
    }
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Пошук";
  }
  else if (document.location.pathname.includes("/featured")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю авторські";
    presenceData.state = "релізи";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=inbox&mode=read")) {
    title = document.querySelectorAll(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed"
    )[1];
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Читаю ПП від:";
      presenceData.state = title.innerText;
    } else {
      presenceData.details = "Читаю ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=sentbox&mode=read")) {
    title = document.querySelectorAll(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed"
    )[3];
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Читаю ПП для:";
      presenceData.state = title.innerText;
    } else {
      presenceData.details = "Читаю ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=outbox&mode=read")) {
    title = document.querySelectorAll(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed"
    )[3];
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Читаю ПП для:";
      presenceData.state = title.innerText;
    } else {
      presenceData.details = "Читаю ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=savebox&mode=read")) {
    title = document.querySelectorAll(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed"
    )[3];
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Читаю збережене ПП";
      presenceData.state = "від:" + title.innerText;
    } else {
      presenceData.details = "Читаю ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=inbox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю";
    presenceData.state = "вхідні ПП";
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=sentbox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю";
    presenceData.state = "відіслані ПП";
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=outbox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю";
    presenceData.state = "вихідні ПП";
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?folder=savebox")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю";
    presenceData.state = "збережені ПП";
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?mode=reply")) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed > input.post"
    );
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Відповідаю на ПП від:";
      presenceData.state = title.innerText;
    } else {
      presenceData.details = "Відповідаю на ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?mode=quote")) {
    title = document.querySelector(
      "body > div.maxwidth > table > tbody > tr > td.bodyline > form > table.forumline > tbody > tr > td.row2 > span.genmed > input.post"
    );
    presenceData.startTimestamp = browsingStamp;
    if (showUseramePM) {
      presenceData.details = "Цитую ПП від:";
      presenceData.state = title.innerText;
    } else {
      presenceData.details = "Цитую ПП";
    }
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/privmsg.php") && document.location.search.includes("?mode=post")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Пишу нове ПП";
    presenceData.smallImageKey = "sms";
    presenceData.smallImageText = "ПП";
  }
  else if (document.location.pathname.includes("/search.php") && document.location.search.includes("?mode=searchuser")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Шукаю співрозмовника";
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = "Пошук";
  }
  else if (document.location.pathname.includes("/search.php") && document.location.search.includes("?search_id=newposts")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю нові";
    presenceData.state = "повідомлення";
  }
  else if (document.location.pathname.includes("/search.php") && document.location.search.includes("?search_id=egosearch")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю свої";
    presenceData.state = "повідомлення";
  }
  else if (document.location.pathname.includes("/watched_topics.php")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю";
    presenceData.state = "відстежуввні теми";
  }
  else if (document.location.pathname.includes("/search.php") && document.location.search.includes("?search_id=unanswered")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю теми";
    presenceData.state = "без відповідей";
  }
  else if (document.location.pathname.includes("/search.php") && document.location.search.includes("?search_id=unanswered")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Переглядаю теми";
    presenceData.state = "без відповідей";
  }
  else if (document.location.pathname.includes("/posting.php") && document.location.search.includes("?mode=newtopic")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Створюю нову";
    presenceData.state = "тему";
  }
  else if (document.location.pathname.includes("/posting.php") && document.location.search.includes("?mode=reply")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Відповідаю на тему";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});