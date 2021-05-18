const presence = new Presence({
    clientId: "836962986451140609"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const logo = await presence.getSetting("logo"),
    buttons = await presence.getSetting("buttons"),
    data: PresenceData = {
      largeImageKey: !logo ? "logo" : "logo-v2",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname;

  if (pathname === "/" && window.location.search.substr(0, 2) == "?s") {
    const urlParams = new URLSearchParams(window.location.search),
      nsfw = urlParams.get("adult"),
      search =
        nsfw === "1" ? "nsfw" : nsfw === "0" ? "non nsfw" : urlParams.get("s"),
      results = document
        .querySelector(".c-blog__heading > .h4")
        .textContent.split(" ")[1];
    data.details = "Searching:";
    data.state = search + " 🔸 " + results + " results";
    data.smallImageKey = "search";
  } else if (pathname === "/") data.details = "Viewing the homepage";
  else if (pathname.endsWith("/webtoons/")) {
    const results = document.querySelector(
      ".c-blog__heading > .h4"
    ).textContent;
    data.details = "Browsing all webtoons";
    data.state = results;
  } else if (pathname.startsWith("/webtoon-genre/")) {
    const genre = document.querySelector(".item-title").textContent,
      results = document.querySelector(".c-blog__heading > .h4").textContent;
    data.details = "Browsing " + genre + " webtoons";
    data.state = "📋 " + results;
    data.smallImageKey = "search";
  } else if (pathname === "/completed-webtoons/") {
    data.details = "Browsing:";
    data.state = "Completed webtoons";
    data.smallImageKey = "search";
  } else if (pathname.startsWith("/read") && pathname.indexOf("/chapter") > 0) {
    const title = document
        .querySelector("#chapter-heading")
        .textContent.split("-")[0],
      chapter = document
        .querySelector("#chapter-heading")
        .textContent.split("-")[1];
    let progress =
      (document.documentElement.scrollTop /
        (document.querySelector(".reading-content").scrollHeight -
          window.innerHeight)) *
      100;
    progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);
    data.details = title;
    data.state = "📖 " + chapter + " 🔸 " + progress + "%";
    data.largeImageKey = title.includes("Solo Leveling")
      ? "solo"
      : logo == 0
      ? "logo"
      : "logo-v2";
    data.smallImageKey = "read";
    if (buttons)
      data.buttons = [{ label: "Read Webtoon", url: window.location.href }];
  } else if (pathname.startsWith("/read")) {
    const title = document.querySelector(".post-title").textContent;
    data.details = "Viewing:";
    data.state = title;
    data.smallImageKey = "view";
    data.largeImageKey = title.includes("Solo Leveling")
      ? "solo"
      : logo == 0
      ? "logo"
      : "logo-v2";
    if (buttons)
      data.buttons = [{ label: "View Webtoon", url: window.location.href }];
  } else if (pathname === "/user-settings/") {
    data.smallImageKey = "settings";
    switch (window.location.search) {
      case "?tab=history":
        data.details = "User settings:";
        data.state = "History";
        break;
      case "?tab=bookmark":
        data.details = "User settings:";
        data.state = "Bookmarks";
        break;
      case "?tab=account-settings":
        data.details = "User settings:";
        data.state = "Account settings";
        break;
      default:
        data.details = "User settings:";
        data.state = "Bookmarks";
    }
  }
  presence.setActivity(data);
});
