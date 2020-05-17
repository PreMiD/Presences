var presence = new Presence({
  clientId: "468420510632509473"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: presenceData = {
      details: "Viewing the homepage",
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/anime.php" ||
    document.location.pathname.startsWith("/topanime") ||
    document.location.pathname.startsWith("/watch")
  ) {
    const presenceData: presenceData = {
      details: "Looking for anime",
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/manga.php" ||
    document.location.pathname.startsWith("/topmanga") ||
    document.location.pathname.startsWith("/store")
  ) {
    const presenceData: presenceData = {
      details: "Looking for manga",
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/forum")) {
    const presenceData: presenceData = {
      details: "Viewing the forums",
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/users.php")) {
    const presenceData: presenceData = {
      details: "Searching for users",
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/profile")) {
    const presenceData: presenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/animelist")) {
    const presenceData: presenceData = {
      details: "Viewing an anime list",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/mangalist")) {
    const presenceData: presenceData = {
      details: "Viewing a manga list",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/anime")) {
    // TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
    if (document.getElementsByClassName("js-anime-edit-info-button")[0]) {
      const presenceData: presenceData = {
        details: "Viewing an anime",
        state: document.getElementsByClassName("header-right")[0].parentNode
          .childNodes[1].textContent,
        largeImageKey: "lg-mal"
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: presenceData = {
        details: "Looking for anime",
        largeImageKey: "lg-mal"
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/manga")) {
    // TODO: The if loop to check if thhe user is really on the page of an anime is currently always true for some reason which results in the presence going away when the user is for example in the anime directory
    if (document.getElementsByClassName("js-manga-edit-info-button")[0]) {
      const presenceData: presenceData = {
        details: "Viewing a manga",
        state: document.getElementsByClassName("header-right")[0].parentNode
          .childNodes[1].textContent,
        largeImageKey: "lg-mal"
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: presenceData = {
        details: "Looking for manga",
        largeImageKey: "lg-mal"
      };
      presence.setActivity(presenceData);
    }
  } else {
    const presenceData: presenceData = {
      largeImageKey: "lg-mal"
    };
    presence.setActivity(presenceData);
  }
});
