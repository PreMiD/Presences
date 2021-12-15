const presence = new Presence({
    clientId: "619455837198483459"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let username: string;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangadex-logo",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") data.details = "Viewing the Homepage";
  else if (document.location.pathname.endsWith("/settings"))
    data.details = "Viewing the Settings Page";
  else if (document.location.pathname.endsWith("/about"))
    data.details = "Viewing About Page";
  else if (document.location.pathname.endsWith("/rules"))
    data.details = "Viewing Rules";
  else if (document.location.pathname.startsWith("/title")) {
    if (document.location.pathname.startsWith("/titles")) {
      if (document.location.pathname.endsWith("/latest"))
        data.details = "Browsing Latest Manga";
      else if (document.location.pathname.endsWith("/feed"))
        data.details = "Viewing Feed";
      else if (document.location.pathname.endsWith("/follows"))
        data.details = "Viewing Library";
      else data.details = "Browsing Manga";
    } else {
      const manga = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
      if (document.location.pathname.endsWith("/random"))
        data.details = "Viewing a Random Manga:";
      else data.details = "Viewing a Manga:";
      data.state = manga;
    }
  } else if (document.location.pathname.startsWith("/chapter")) {
    const title = document.querySelector(".text-primary").textContent.trim(),
      chapter = document
        .querySelector("head > title")
        .textContent.replace(` - ${title} - MangaDex`, "");
    data.details = `Reading ${title}`;
    data.state = `Page ${chapter}`;
  } else if (document.location.pathname.startsWith("/tag")) {
    const tag = document
      .querySelector("head > title")
      .textContent.replace(" - MangaDex", "");
    data.details = "Viewing a Tag";
    data.state = tag;
  } else if (document.location.pathname.endsWith("/history"))
    data.details = "Viewing History";
  else if (document.location.pathname.endsWith("/lists"))
    data.details = "Viewing Lists";
  else if (document.location.pathname.startsWith("/list"))
    data.details = "Viewing an MDList";
  else if (document.location.pathname.startsWith("/user")) {
    if (document.location.pathname.endsWith("/users"))
      data.details = "Viewing Users";
    else {
      username = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
      data.details = "Viewing User Profile";
      data.state = username;
    }
  } else if (document.location.pathname.startsWith("/group")) {
    if (document.location.pathname.endsWith("/groups"))
      data.details = "Viewing Groups";
    else {
      username = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
      data.details = "Viewing a Group";
      data.state = username;
    }
  } else if (document.location.pathname.startsWith("/my/groups"))
    data.details = "Viewing Followed Groups";

  presence.setActivity(data);
});
