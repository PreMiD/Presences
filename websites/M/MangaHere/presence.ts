const presence = new Presence({
    clientId: "831262912815300638"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "mangahere",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname,
    ganres = [
      "martial-arts",
      "action",
      "school-life",
      "sci-fi",
      "yoi",
      "shotacon",
      "mystery",
      "shoujo",
      "ecchi",
      "doujinshi",
      "lolicon",
      "adventure",
      "romance",
      "gender-bender",
      "harem",
      "sports",
      "webtoons",
      "comedy",
      "shounen-ai",
      "josei",
      "shoujo-ai",
      "adult",
      "fantasy",
      "supernatural",
      "psychological",
      "yuri",
      "one-shot",
      "historical",
      "drama",
      "seinen",
      "mature",
      "smut",
      "horror",
      "shounen",
      "slice-of-life",
      "tragedy",
      "mecha"
    ];

  if (pathname === "/") data.details = "Viewing the Homepage";
  else if (pathname === "/latest/") data.details = "Browsing latest manga";
  else if (pathname === "/ranking/") data.details = "Browsing by ranking";
  else if (pathname === "/spoilers/")
    data.details = "Browsing spoilers and news";
  else if (pathname === "/directory/") data.details = "Browsing all manga";
  else if (pathname === "/on_going/") data.details = "Browsing ongoing manga";
  //ganre/new/
  else if (pathname.endsWith("/new/")) {
    const url = pathname,
      splitUrl = url.split("/");
    data.details =
      splitUrl[1] === "new"
        ? "Browsing new manga"
        : `Browsing new ${splitUrl[1]} manga`;
  }
  //ganre/completed/
  else if (pathname.endsWith("/completed/")) {
    const url = pathname,
      splitUrl = url.split("/");
    data.details =
      splitUrl[1] === "completed"
        ? "Browsing completed manga"
        : `Browsing completed ${splitUrl[1]} manga`;
  }
  //ganre/on_going/
  else if (pathname.endsWith("/on_going/")) {
    const url = pathname,
      splitUrl = url.split("/");
    data.details =
      splitUrl[1] === "on_going"
        ? "Browsing ongoing manga"
        : `Browsing ongoing ${splitUrl[1]} manga`;
  }
  //Manga Viewing
  else if (pathname.startsWith("/manga") && pathname.endsWith("/")) {
    const title = document.querySelector(
        ".detail-info-right-title-font"
      ).textContent,
      link = window.location.href;
    data.details = "Viewing manga:";
    data.state = title;
    data.buttons = [{ label: "View Manga", url: link }];
    data.smallImageKey = "viewing";
  }
  //Manga Reading
  else if (pathname.startsWith("/manga") && pathname.endsWith(".html")) {
    const title = document.querySelector(".reader-header-title-1").textContent,
      chapter = document.querySelector(".reader-header-title-2").textContent,
      //setting up page progress
      current = document.querySelector(".pager-list-left span");
    if (!current) data.state = chapter;
    else {
      const len = current.children.length,
        totalPages = current.children[len - 2].textContent,
        readingPage = document.querySelector(
          ".pager-list-left > span > .active"
        ).textContent,
        progress = readingPage + "/" + totalPages;
      data.state = chapter + " page " + progress;
    }
    data.details = title;
    data.smallImageKey = "reading";
  }
  //Searching
  else if (pathname.startsWith("/search")) {
    const queryString = window.location.search,
      urlParams = new URLSearchParams(queryString),
      search = urlParams.get("title"),
      searchName =
        search === "" ? urlParams.get("name") : urlParams.get("title");
    data.details = "Searching:";
    data.state = searchName;
    data.smallImageKey = "searching";
  }
  ganres.forEach(function (ganre) {
    if (pathname.substring(1, pathname.length - 1) === ganre) {
      data.details = "Browsing:";
      data.state = ganre.replace("-", " ") + " manga";
    }
  });
  presence.setActivity(data);
});
