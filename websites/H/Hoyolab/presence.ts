const presence = new Presence({
    clientId: "836534947170353173"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname;
  if (pathname === "/genshin/") data.details = "Viewing the Homepage";
  else if (pathname.endsWith("/home/1")) {
    switch (document.location?.search?.substr(6)) {
      case "create":
        data.details = "Viewing tavern page";
        data.state = "New";
        break;
      case "reply":
        data.details = "Viewing tavern page";
        data.state = "New replies";
        break;
      case "2":
        data.details = "Viewing tavern page";
        data.state = "Featured";
        break;
      default:
        data.details = "Viewing tavern page";
        data.state = "Hot";
    }
  } else if (pathname.endsWith("/home/3")) {
    switch (document.location?.search?.substr(6)) {
      case "1":
        data.details = "Viewing official page";
        data.state = "Notices";
        break;
      case "3":
        data.details = "Viewing official page";
        data.state = "Info";
        break;
      case "contribution":
        data.details = "Viewing official page";
        data.state = "Submission events";
        break;
      default:
        data.details = "Viewing official page";
        data.state = "Events";
    }
  } else if (pathname.endsWith("/home/2")) {
    switch (document.location?.search?.substr(6)) {
      case "create":
        data.details = "Viewing billboards page";
        data.state = "New";
        break;
      case "reply":
        data.details = "Viewing billboards page";
        data.state = "New replies";
        break;
      case "2":
        data.details = "Viewing billboards page";
        data.state = "Featured";
        break;
      default:
        data.details = "Viewing billboards page";
        data.state = "Hot";
    }
  } else if (pathname.startsWith("/genshin/article/")) {
    const title = document.querySelector(
        ".mhy-article-page__title > h1"
      ).textContent,
      author = document.querySelector(
        ".mhy-article-page-author > .mhy-user-card__info > a > span"
      ).innerHTML,
      link = window.location.href;

    data.details = title;
    data.state = "by: " + author;
    data.buttons = [{ label: "Visit Article", url: link }];
  } else if (pathname.endsWith("/topic")) {
    data.details = "Browsing topics";
  } else if (pathname.startsWith("/genshin/topicDetail/")) {
    const title = document.querySelector(".mhy-topic-card__name").textContent;

    data.details = "Browsing topic:";
    data.state = title;
  } else if (pathname.startsWith("/genshin/search")) {
    const queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      search = urlParams.get("keyword");

    data.details = "Searching:";
    data.state = search;
    data.smallImageKey = "search";
  }
  presence.setActivity(data);
});
