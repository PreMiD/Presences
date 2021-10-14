const presence = new Presence({
    clientId: "619455837198483459"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let username: string;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangadex-logo"
  };

  if (document.location.pathname == "/") {
    data.details = "Viewing the Homepage";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/settings")) {
    data.details = "Viewing the Settings Page";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/about")) {
    data.details = "Viewing About Page";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/rules")) {
    data.details = "Viewing Rules";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/title")) {
    if (document.location.pathname.startsWith("/titles")) {
      if (document.location.pathname.endsWith("/latest")) {
        data.details = "Browsing Latest Manga";
        data.startTimestamp = browsingStamp;
      } else if (document.location.pathname.endsWith("/feed")) {
        data.details = "Viewing Feed";
        data.startTimestamp = browsingStamp;
      } else if (document.location.pathname.endsWith("/follows")) {
        data.details = "Viewing Library";
        data.startTimestamp = browsingStamp;
      } else {
        data.details = "Browsing Manga";
        data.startTimestamp = browsingStamp;
      }
    } else {
    const manga = document.querySelector("head > title").textContent
      .replace(" - MangaDex", "");
    if (document.location.pathname.endsWith("/random")) {
      data.details = "Viewing a Random Manga:";
    } else {
      data.details = "Viewing a Manga:";
    }
    data.state = manga;
    data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/chapter")) {
    const title = document.querySelector(".text-primary").textContent.trim(),
      chapter = document.querySelector("head > title").textContent
        .replace(" - " + title + " - MangaDex", "")
    data.details = "Reading " + title;
    data.state = "Page " + chapter;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/tag")) {
    const tag = document.querySelector("head > title").textContent
      .replace(" - MangaDex", "");
    data.details = "Viewing a Tag";
    data.state = tag;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/history")) {
    data.details = "Viewing History";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/lists")) {
    data.details = "Viewing Lists";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/list")) {
    data.details = "Viewing an MDList";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/user")) {
    if (document.location.pathname.startsWith("/users")) {
      data.details = "Viewing Users";
      data.startTimestamp = browsingStamp;
    } else {
      username = document.querySelector("head > title").textContent
        .replace(" - MangaDex", "");
      data.details = "Viewing User Profile";
      data.state = username;
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/group")) {
    if (document.location.pathname.startsWith("/groups")) {
      data.details = "Viewing Groups";
      data.startTimestamp = browsingStamp;
    } else {
      username = document.querySelector("head > title").textContent
        .replace(" - MangaDex", "");
      data.details = "Viewing a Group";
      data.state = username;
      data.startTimestamp = browsingStamp;
    }
  }
  presence.setActivity(data);
});
