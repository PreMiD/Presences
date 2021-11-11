const presence = new Presence({
    clientId: "836534947170353173"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;
  if (pathname === "/genshin/") presenceData.details = "Viewing the Homepage";
  else if (pathname.endsWith("/home/1")) {
    switch (document.location?.search?.substr(6)) {
      case "create":
        presenceData.details = "Viewing tavern page";
        data.state = "New";
        break;
      case "reply":
        presenceData.details = "Viewing tavern page";
        data.state = "New replies";
        break;
      case "2":
        presenceData.details = "Viewing tavern page";
        data.state = "Featured";
        break;
      default:
        presenceData.details = "Viewing tavern page";
        data.state = "Hot";
    }
  } else if (pathname.endsWith("/home/3")) {
    switch (document.location?.search?.substr(6)) {
      case "1":
        presenceData.details = "Viewing official page";
        data.state = "Notices";
        break;
      case "3":
        presenceData.details = "Viewing official page";
        data.state = "Info";
        break;
      case "contribution":
        presenceData.details = "Viewing official page";
        data.state = "Submission events";
        break;
      default:
        presenceData.details = "Viewing official page";
        data.state = "Events";
    }
  } else if (pathname.endsWith("/home/2")) {
    switch (document.location?.search?.substr(6)) {
      case "create":
        presenceData.details = "Viewing billboards page";
        data.state = "New";
        break;
      case "reply":
        presenceData.details = "Viewing billboards page";
        data.state = "New replies";
        break;
      case "2":
        presenceData.details = "Viewing billboards page";
        data.state = "Featured";
        break;
      default:
        presenceData.details = "Viewing billboards page";
        data.state = "Hot";
    }
  } else if (pathname.startsWith("/genshin/article/")) {
    presenceData.details = document.querySelector(
      ".mhy-article-page__title > h1"
    ).textContent;
    data.state = `by: ${
      document.querySelector(
        ".mhy-article-page-author > .mhy-user-card__info > a > span"
      ).innerHTML
    }`;
    data.buttons = [{ label: "Visit Article", url: window.location.href }];
  } else if (pathname.endsWith("/topic"))
    presenceData.details = "Browsing topics";
  else if (pathname.startsWith("/genshin/topicDetail/")) {
    presenceData.details = "Browsing topic:";
    data.state = document.querySelector(".mhy-topic-card__name").textContent;
  } else if (pathname.startsWith("/genshin/search")) {
    presenceData.details = "Searching:";
    data.state = new URLSearchParams(window.location.search).get("keyword");
    data.smallImageKey = "search";
  }
  presence.setActivity(data);
});
