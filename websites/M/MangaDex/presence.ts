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
  } else if (document.location.pathname.endsWith("/affiliates")) {
    data.details = "Viewing Affiliates Page";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/changelog")) {
    data.details = "Viewing Changelog";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/about")) {
    data.details = "Viewing About Page";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/rules")) {
    data.details = "Viewing Rules";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/stats")) {
    if (document.location.pathname.endsWith("/trending")) {
      data.details = "Viewing Trending Chapters";
      data.startTimestamp = browsingStamp;
    } else {
      data.details = "Viewing Top Chapters";
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.endsWith("/updates")) {
    data.details = "Browsing Latest Manga";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/featured")) {
    data.details = "Browsing Featured Manga";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/manga")) {
    const randomManga = document.querySelector(".card-header span.mx-1")
      .textContent;
    data.details = "Viewing a Random Manga";
    data.state = randomManga;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/manga_new")) {
    data.details = "Adding a New Manga";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/follows")) {
    data.details = "Viewing Follows";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/title")) {
    if (document.location.pathname.endsWith("/titles")) {
      data.details = "Browsing Manga";
      data.startTimestamp = browsingStamp;
    } else {
      const manga = document.querySelector(".card-header span.mx-1")
        .textContent;
      data.details = "Viewing a Manga:";
      data.state = manga;
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/chapter")) {
    const title = document.querySelector(".manga-link").textContent,
      chapter = (document.querySelector(
        "head > title"
      ) as HTMLElement).innerText
        .replace(title + " -", "")
        .replace(" - MangaDex", "");
    data.details = title;
    data.state = chapter;
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/genre")) {
    const genre = document.querySelector(".card-header").textContent.trim();
    data.details = "Viewing Genre (" + genre + ")";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/history")) {
    data.details = "Viewing History";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/list")) {
    data.details = "Viewing an MDList";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/social")) {
    if (document.location.pathname.endsWith("/blocked")) {
      data.details = "Viewing Blocked Users";
      data.startTimestamp = browsingStamp;
    } else {
      data.details = "Viewing Friends";
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/support")) {
    data.details = "Viewing Support Page";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/shop")) {
    data.details = "Viewing the Shop";
    data.startTimestamp = browsingStamp;
  } else if (document.location.pathname.includes("/messages")) {
    if (document.location.pathname.endsWith("/notifications")) {
      data.details = "Viewing Notifications";
      data.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/send")) {
      data.details = "Sending a Message";
      data.startTimestamp = browsingStamp;
    } else if (document.location.pathname.endsWith("/bin")) {
      data.details = "Viewing Trash Bin";
      data.startTimestamp = browsingStamp;
    } else {
      data.details = "Viewing Inbox";
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/user")) {
    if (document.location.pathname.startsWith("/users")) {
      data.details = "Viewing Users";
      data.startTimestamp = browsingStamp;
    } else {
      username = document.querySelector(".card-header span.mx-1").textContent;
      data.details = "Viewing User Profile";
      data.state = username;
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/group")) {
    if (document.location.pathname.startsWith("/groups")) {
      data.details = "Viewing Groups";
      data.startTimestamp = browsingStamp;
    } else {
      username = document.querySelector(".card-header span.mx-1").textContent;
      data.details = "Viewing a Group";
      data.state = username;
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/forum")) {
    if (document.location.pathname.includes("/forum/")) {
      const forum = document.querySelector(".breadcrumb-item:last-child")
        .textContent;
      data.details = "Viewing a Forum";
      data.state = forum;
      data.startTimestamp = browsingStamp;
    } else {
      data.details = "Viewing the Forums";
      data.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/thread")) {
    const thread = document.querySelector(".breadcrumb-item:last-child")
      .textContent;
    data.details = "Viewing a thread";
    data.state = thread;
    data.startTimestamp = browsingStamp;
  }
  presence.setActivity(data);
});
