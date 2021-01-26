const presence = new Presence({
  clientId: "803140803173154818"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const presenceData: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.endsWith ("/fsLelush")) {
    const presenceData: PresenceData = {
      details: "Viewing a profile:",
      state: "fsLelush",
      largeImageKey: "author",
      smallImageKey: "logo",
      smallImageText: "Ahoy"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/animes"&& document.location.search.startsWith("?search=")) {
    let search = document.location.search;
      search = search.replace("?search=", "");
      search = search.replace(/\+/g, " ");
    const presenceData: PresenceData = {
      details: "Searching for anime:",
      state: search,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/mangas"&& document.location.search.startsWith("?search=")) {
    let search = document.location.search;
        search = search.replace("?search=", "");
        search = search.replace(/\+/g, " ");
    const presenceData: PresenceData = {
      details: "Searching for manga:",
      state: search,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/ranobe"&& document.location.search.startsWith("?search=")) {
    let search = document.location.search;
        search = search.replace("?search=", "");
        search = search.replace(/\+/g, " ");
    const presenceData: PresenceData = {
      details: "Searching for ranobe:",
      state: search,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/characters"&& document.location.search.startsWith("?search=")) {
    let search = document.location.search;
        search = search.replace("?search=", "");
        search = search.replace(/\+/g, " ");
    const presenceData: PresenceData = {
      details: "Searching for character:",
      state: search,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/people"&& document.location.search.startsWith("?search=")) {
    let search = document.location.search;
        search = search.replace("?search=", "");
        search = search.replace(/\+/g, " ");
    const presenceData: PresenceData = {
      details: "Searching for people:",
      state: search,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/animes") {
    const presenceData: PresenceData = {
      details: "Looking for anime",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/mangas") {
    const presenceData: PresenceData = {
      details: "Looking for manga",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/ranobe") {
    const presenceData: PresenceData = {
      details: "Looking for ranobe",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/forum") {
    const presenceData: PresenceData = {
      details: "Viewing forum",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/clubs") {
    const presenceData: PresenceData = {
      details: "Viewing clubs",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/collections") {
    const presenceData: PresenceData = {
      details: "Viewing collections",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("forum/reviews/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Reads a review:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("forum/reviews")) {
    const presenceData: PresenceData = {
      details: "Viewing reviews",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/articles") {
    const presenceData: PresenceData = {
      details: "Viewing articles",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/users") {
    const presenceData: PresenceData = {
      details: "Viewing users",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/contests") {
    const presenceData: PresenceData = {
      details: "Viewing contests",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/ongoings") {
    const presenceData: PresenceData = {
      details: "Viewing the ongoing calendar",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname == "/achievements") {
    const presenceData: PresenceData = {
      details: "Viewing achievements",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/achievements/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Views Achievements:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/common/")) {
    const title = document.title.split("/")[0];;
    const presenceData: PresenceData = {
      details: "Views Achievements:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/genre/")) {
    const title = document.title.split("/")[0];;
    const presenceData: PresenceData = {
      details: "Views Achievements:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/franchise/")) {
    const title = document.title.split("/")[0];;
    const presenceData: PresenceData = {
      details: "Views Achievements:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith("/author/")) {
    const title = document.title.split("/")[0];;
    const presenceData: PresenceData = {
      details: "Views Achievements:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if(
    document.querySelector("#profiles_show")) {
    const name = document.location.pathname.replace("/", "");
    const presenceData: PresenceData = {
      details: "Viewing a profile:",
      state: name,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/achievements")) {
    const name =  document.location.pathname.split("/")[1];
    const presenceData: PresenceData = {
      details: "Viewing achievements",
      state: name,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/animes/achievement/")) {
      const presenceData: PresenceData = {
      details: "List anime for achievement:",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/animes/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an anime:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/mangas/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an manga:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/ranobe/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an ranobe:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/characters/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an character:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/people/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an people:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("forum/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Reads a discussion:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/clubs/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an club:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/collections/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an collection:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/articles/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an article:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/rounds/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Participates in voting:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/contests/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing an contest:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.startsWith ("/dialogs/")) {
    const title = document.title.split("/")[0];
    const presenceData: PresenceData = {
      details: "Viewing with:",
      state: title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("messages/news")) {
    const presenceData: PresenceData = {
      details: "Viewing news",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("messages/notifications")) {
    const presenceData: PresenceData = {
      details: "Views notifications",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/list/anime")) {
    const name =  document.location.pathname.split("/")[1];
    const presenceData: PresenceData = {
      details: "Viewing an anime list",
      state: name,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (
    document.location.pathname.includes("/list/manga")) {
    const name =  document.location.pathname.split("/")[1];
    const presenceData: PresenceData = {
        details: "Viewing an manga list",
        state: name,
        largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/history")) {
    const name =  document.location.pathname.split("/")[1];
    const presenceData: PresenceData = {
        details: "Viewing an history",
        state: name,
        largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
}
);
