const presence = new Presence({ clientId: "906057236927893576" });

presence.on("UpdateData", async () => {
  let [imageL, imageS, details, state, label1, url1, label2, url2] = [
    "logo",
    "",
    "",
    "",
    "Go to Page",
    `${document.location}`,
    "",
    ""
  ];
  const path = document.location.pathname,
    presenceData: PresenceData = {
      largeImageKey: `${imageL}`,
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (path.startsWith("/manga/")) {
    imageL = `https://cover.nep.li/cover/${path.split("/manga/")[1]}.jpg`;
    imageS = "logo-png";
    details = "Viewing a Manga";
    state = document.title.split(" | MangaLife")[0];
    label1 = state.length >= 30 ? "View Manga" : state;
  } else if (path.startsWith("/read-online/")) {
    imageL = `https://cover.nep.li/cover/${
      path.split("/read-online/")[1].split("-chapter-")[0]
    }.jpg`;
    imageS = "reading";
    details = document.querySelector(".col-12 > a").textContent.trim();
    state = path.includes("-page-")
      ? `Chapter ${path.split("-chapter-")[1].split("-page-")[0]} | Page ${
          path.split("-page-")[1].split(".html")[0]
        }`
      : `Chapter ${path.split("-chapter-")[1].split(".html")[0]}`;
    label1 = details.length >= 30 ? "View Manga" : details;
    url1 = `${origin}/manga/${
      path.split("/read-online/")[1].split("-chapter-")[0]
    }`;
    label2 = "View Chapter";
    url2 = `${document.location}`;
  } else if (path.startsWith("/hot.php")) {
    imageS = "hot";
    details = "Browsing...";
    state = "at Hot Manga Updates";
    label1 = "Hot Manga Updates";
    url1 = `${document.location}`;
  } else if (path.startsWith("/search")) {
    imageS = "search";
    details = "Searching...";
    // todo show search results
  } else if (path.startsWith("/discussion")) {
    imageS = "discussions";
    details = "Browsing...";
    state = "at Discussions";
  } else if (path.endsWith("settings.php")) {
    imageS = "settings";
    details = "Editing Settings...";
  } else if (path.endsWith("bookmark.php")) {
    imageS = "bookmark";
    details = "Viewing Bookmarks...";
  } else if (path.endsWith("subscription.php")) {
    imageS = "subscriptions";
    details = "Browsing...";
    state = "at Subscriptions";
  } else if (path.startsWith("/feed.php")) {
    imageS = "subscriptions";
    details = "Browsing...";
    state = "at Subscriptions Feed";
  } else if (path.startsWith("/contact")) {
    imageS = "contact";
    details = "Browsing...";
    state = "at Contact Us Page";
  } else if (path.startsWith("/privacy")) {
    imageS = "privacy";
    details = "Browsing...";
    state = "at Privacy Policy Page";
  } else {
    imageS = "home";
    details = "Browsing...";
    state = "at Home Page";
  }

  presenceData.largeImageKey = `${imageL}`;
  presenceData.smallImageKey = `${imageS}`;
  presenceData.details = `${details}`;
  presenceData.state = `${state}`;
  presenceData.buttons = [{ label: `${label1}`, url: `${url1}` }];
  if (label2 !== "" && url2 !== "")
    presenceData.buttons.push({ label: `${label2}`, url: `${url2}` });

  presence.setActivity(presenceData);
});
