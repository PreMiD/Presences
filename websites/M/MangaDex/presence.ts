const presence = new Presence({
    clientId: "619455837198483459"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let username: string;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "mangadex-logo",
    startTimestamp: browsingTimestamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the Homepage";
  else if (document.location.pathname.endsWith("/settings"))
    presenceData.details = "Viewing the Settings Page";
  else if (document.location.pathname.endsWith("/about"))
    presenceData.details = "Viewing About Page";
  else if (document.location.pathname.endsWith("/rules"))
    presenceData.details = "Viewing Rules";
  else if (document.location.pathname.startsWith("/title")) {
    if (document.location.pathname.startsWith("/titles")) {
      if (document.location.pathname.endsWith("/latest"))
        presenceData.details = "Browsing Latest Manga";
      else if (document.location.pathname.endsWith("/feed"))
        presenceData.details = "Viewing Feed";
      else if (document.location.pathname.endsWith("/follows"))
        presenceData.details = "Viewing Library";
      else presenceData.details = "Browsing Manga";
    } else {
      if (document.location.pathname.endsWith("/random"))
        presenceData.details = "Viewing a Random Manga:";
      else presenceData.details = "Viewing a Manga:";
      data.state = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
    }
  } else if (document.location.pathname.startsWith("/chapter")) {
    const title = document.querySelector(".text-primary").textContent.trim();
    presenceData.details = `Reading ${title}`;
    data.state = `Page ${document
      .querySelector("head > title")
      .textContent.replace(` - ${title} - MangaDex`, "")}`;
  } else if (document.location.pathname.startsWith("/tag")) {
    presenceData.details = "Viewing a Tag";
    data.state = document
      .querySelector("head > title")
      .textContent.replace(" - MangaDex", "");
  } else if (document.location.pathname.endsWith("/history"))
    presenceData.details = "Viewing History";
  else if (document.location.pathname.endsWith("/lists"))
    presenceData.details = "Viewing Lists";
  else if (document.location.pathname.startsWith("/list"))
    presenceData.details = "Viewing an MDList";
  else if (document.location.pathname.startsWith("/user")) {
    if (document.location.pathname.endsWith("/users"))
      presenceData.details = "Viewing Users";
    else {
      username = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
      presenceData.details = "Viewing User Profile";
      data.state = username;
    }
  } else if (document.location.pathname.startsWith("/group")) {
    if (document.location.pathname.endsWith("/groups"))
      presenceData.details = "Viewing Groups";
    else {
      username = document
        .querySelector("head > title")
        .textContent.replace(" - MangaDex", "");
      presenceData.details = "Viewing a Group";
      data.state = username;
    }
  } else if (document.location.pathname.startsWith("/my/groups"))
    presenceData.details = "Viewing Followed Groups";

  presence.setActivity(data);
});
