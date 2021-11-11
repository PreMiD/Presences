const presence = new Presence({
    clientId: "836962986451140609"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const logo = await presence.getSetting("logo"),
    buttons = await presence.getSetting("buttons"),
    data: PresenceData = {
      largeImageKey: !logo ? "logo" : "logo-v2",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;

  if (pathname === "/" && window.location.search.substr(0, 2) === "?s") {
    const urlParams = new URLSearchParams(window.location.search),
      nsfw = urlParams.get("adult"),
      search =
        nsfw === "1" ? "nsfw" : nsfw === "0" ? "non nsfw" : urlParams.get("s"),
      [results] = document
        .querySelector(".c-blog__heading > .h4")
        .textContent.split(" ");
    presenceData.details = "Searching:";
    data.state = `${search} 🔸 ${results} results`;
    data.smallImageKey = "search";
  } else if (pathname === "/") presenceData.details = "Viewing the homepage";
  else if (pathname.endsWith("/webtoons/")) {
    presenceData.details = "Browsing all webtoons";
    data.state = document.querySelector(".c-blog__heading > .h4").textContent;
  } else if (pathname.startsWith("/webtoon-genre/")) {
    presenceData.details = `Browsing ${
      document.querySelector(".item-title").textContent
    } webtoons`;
    data.state = `📋 ${
      document.querySelector(".c-blog__heading > .h4").textContent
    }`;
    data.smallImageKey = "search";
  } else if (pathname === "/completed-webtoons/") {
    presenceData.details = "Browsing:";
    data.state = "Completed webtoons";
    data.smallImageKey = "search";
  } else if (pathname.startsWith("/read") && pathname.indexOf("/chapter") > 0) {
    const [title, chapter] = document
      .querySelector("#chapter-heading")
      .textContent.split("-");
    let progress =
      (document.documentElement.scrollTop /
        (document.querySelector(".reading-content").scrollHeight -
          window.innerHeight)) *
      100;
    progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);
    presenceData.details = title;
    data.state = `📖 ${chapter} 🔸 ${progress}%`;
    data.largeImageKey = title.includes("Solo Leveling")
      ? "solo"
      : logo === 0
      ? "logo"
      : "logo-v2";
    data.smallImageKey = "read";
    if (buttons)
      data.buttons = [{ label: "Read Webtoon", url: window.location.href }];
  } else if (pathname.startsWith("/read")) {
    const title = document.querySelector(".post-title").textContent;
    presenceData.details = "Viewing:";
    data.state = title;
    data.smallImageKey = "view";
    data.largeImageKey = title.includes("Solo Leveling")
      ? "solo"
      : logo === 0
      ? "logo"
      : "logo-v2";
    if (buttons)
      data.buttons = [{ label: "View Webtoon", url: window.location.href }];
  } else if (pathname === "/user-settings/") {
    data.smallImageKey = "settings";
    switch (window.location.search) {
      case "?tab=history":
        presenceData.details = "User settings:";
        data.state = "History";
        break;
      case "?tab=bookmark":
        presenceData.details = "User settings:";
        data.state = "Bookmarks";
        break;
      case "?tab=account-settings":
        presenceData.details = "User settings:";
        data.state = "Account settings";
        break;
      default:
        presenceData.details = "User settings:";
        data.state = "Bookmarks";
    }
  }
  presence.setActivity(data);
});
