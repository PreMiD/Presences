const presence = new Presence({
    clientId: "839455068855861248"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    pathname = document.location.pathname;
  if (pathname === "/") data.details = "Viewing the Homepage";
  else if (pathname === "/popular-manga") {
    data.details = "Looking at";
    data.state = "Popular Manga";
  } else if (pathname === "/manga-list") {
    data.details = "Viewing:";
    data.state = "All Manga";
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/completed")
  ) {
    data.details = "Looking at";
    data.state = "Completed Manga on " + pathname.split("/")[2].toUpperCase();
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/ongoing")
  ) {
    data.details = "Looking at";
    data.state = "Ongoing Manga on " + pathname.split("/")[2].toUpperCase();
  } else if (pathname.startsWith("/manga-list")) {
    data.details = "Viewing:";
    data.state = "Manga on " + pathname.split("/")[2].toUpperCase();
  } else if (pathname === "/manga-list/hash/ongoing") {
    data.details = "Looking at";
    data.state = "Ongoing Manga List";
  } else if (pathname === "/manga-list/hash/completed") {
    data.details = "Looking at";
    data.state = "Completed Manga List";
  } else if (pathname === "/latest-releases") {
    data.details = "Viewing:";
    data.state = "Latest releases";
  } else if (pathname === "/collections") {
    data.details = "Viewing:";
    data.state = "Collections";
  } else if (pathname.startsWith("/collection")) {
    const collection_name = document.querySelector(".page-title").textContent;
    data.details = "Viewing collection:";
    data.state = collection_name;
  } else if (pathname === "/advanced-search") {
    const query = (<HTMLInputElement>(
      document.querySelector('[name="manga-name"]')
    )).value;
    data.details = "Searching for:";
    data.state = query;
    data.smallImageKey = "search";
  } else if (pathname.startsWith("/category")) {
    data.details = "Browsing category:";
    data.state = pathname.split("/")[2].replace("-", " ");
  } else if (pathname.endsWith("/all-pages")) {
    const title = document.querySelector(".page-title > a").textContent,
      chapter = document.querySelector(".page-title > span").textContent;
    data.details = title;
    data.state = chapter;
    data.smallImageKey = "read";
    data.buttons = [{ label: "Read manga", url: document.location.href }];
  } else if (pathname.startsWith("/manga")) {
    const title = document.querySelector(".page-title").textContent;
    data.details = "Reading:";
    data.state = title;
    data.smallImageKey = "view";
    data.buttons = [{ label: "View manga", url: document.location.href }];
  } else if (pathname.startsWith("/user-panel")) {
    data.details = "Viewing their:";
    data.state = document.querySelector("a.active").textContent;
    data.smallImageKey = "settings";
  }
  presence.setActivity(data);
});
