const presence = new Presence({
  clientId: "468420510632509473"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    presence.setActivity({
      details: "Viewing the homepage",
      largeImageKey: "lg-mal"
    });
  } else if (
    document.location.pathname === "/anime.php" ||
    document.location.pathname.startsWith("/topanime") ||
    document.location.pathname.startsWith("/watch")
  ) {
    presence.setActivity({
      details: "Looking for anime",
      largeImageKey: "lg-mal"
    });
  } else if (
    document.location.pathname === "/manga.php" ||
    document.location.pathname.startsWith("/topmanga") ||
    document.location.pathname.startsWith("/store")
  ) {
    presence.setActivity({
      details: "Looking for manga",
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/forum")) {
    presence.setActivity({
      details: "Viewing the forums",
      state: document
        .querySelector("meta[property='og:title']")
        .getAttribute("content"),
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/clubs.php")) {
    if (document.getElementsByClassName("normal_header")[1]) {
      presence.setActivity({
        details: "Viewing an club",
        state: document.getElementsByClassName("h1")[0].innerHTML,
        largeImageKey: "lg-mal"
      });
    } else if (
      document.getElementsByClassName("h1-title")[0].innerHTML === "Invitations"
    ) {
      presence.setActivity({
        details: "Viewing club Invitations",
        largeImageKey: "lg-mal"
      });
    } else if (
      document.getElementsByClassName("h1-title")[0].innerHTML === "My Clubs"
    ) {
      presence.setActivity({
        details: "Viewing my clubs",
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Looking for clubs",
        largeImageKey: "lg-mal"
      });
    }
  } else if (document.location.pathname.startsWith("/blog.php")) {
    presence.setActivity({
      details: "Viewing the blogs",
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/users.php")) {
    presence.setActivity({
      details: "Searching for users",
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/news")) {
    presence.setActivity({
      details: "Viewing the news",
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/featured")) {
    if (
      document
        .querySelector("meta[property='og:title']")
        .getAttribute("content")
        .includes("Featured Articles")
    ) {
      presence.setActivity({
        details: "Viewing featured articles",
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Viewing an article",
        state: document.getElementsByClassName("title")[0].innerHTML,
        largeImageKey: "lg-mal"
      });
    }
  } else if (document.location.pathname.startsWith("/people")) {
    if (document.getElementsByClassName("h1")[0].innerHTML === "People") {
      presence.setActivity({
        details: "Viewing peoples",
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Viewing a person",
        state: document
          .getElementsByClassName("title-name")[0]
          .innerHTML.replace(/(<([^>]+)>)/gi, ""),
        largeImageKey: "lg-mal"
      });
    }
  } else if (document.location.pathname.startsWith("/character")) {
    if (document.getElementsByClassName("h1")[0].innerHTML === "Characters") {
      presence.setActivity({
        details: "Looking for characters",
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Viewing an character",
        state: document
          .getElementsByClassName("normal_header")[2]
          .innerHTML.replace(/(<([^>]+)>)/gi, ""),
        largeImageKey: "lg-mal"
      });
    }
  } else if (document.location.pathname.startsWith("/profile")) {
    presence.setActivity({
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/animelist")) {
    presence.setActivity({
      details: "Viewing an anime list",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/mangalist")) {
    presence.setActivity({
      details: "Viewing a manga list",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    });
  } else if (document.location.pathname.startsWith("/anime")) {
    // TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
    if (document.getElementsByClassName("js-anime-edit-info-button")[0]) {
      presence.setActivity({
        details: "Viewing an anime",
        state:
          document.getElementsByClassName("header-right")[0].parentNode
            .childNodes[1].textContent,
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Looking for anime",
        largeImageKey: "lg-mal"
      });
    }
  } else if (document.location.pathname.startsWith("/manga")) {
    // TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
    if (document.getElementsByClassName("js-manga-edit-info-button")[0]) {
      presence.setActivity({
        details: "Viewing a manga",
        state:
          document.getElementsByClassName("header-right")[0].parentNode
            .childNodes[1].textContent,
        largeImageKey: "lg-mal"
      });
    } else {
      presence.setActivity({
        details: "Looking for manga",
        largeImageKey: "lg-mal"
      });
    }
  } else {
    presence.setActivity({
      largeImageKey: "lg-mal"
    });
  }
});
