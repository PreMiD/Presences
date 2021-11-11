const presence = new Presence({
    clientId: "839455068855861248"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;
  if (pathname === "/") presenceData.details = "Viewing the Homepage";
  else if (pathname === "/popular-manga") {
    presenceData.details = "Looking at";
    data.state = "Popular Manga";
  } else if (pathname === "/manga-list") {
    presenceData.details = "Viewing:";
    data.state = "All Manga";
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/completed")
  ) {
    presenceData.details = "Looking at";
    data.state = `Completed Manga on ${pathname.split("/")[2].toUpperCase()}`;
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/ongoing")
  ) {
    presenceData.details = "Looking at";
    data.state = `Ongoing Manga on ${pathname.split("/")[2].toUpperCase()}`;
  } else if (pathname.startsWith("/manga-list")) {
    presenceData.details = "Viewing:";
    data.state = `Manga on ${pathname.split("/")[2].toUpperCase()}`;
  } else if (pathname === "/manga-list/hash/ongoing") {
    presenceData.details = "Looking at";
    data.state = "Ongoing Manga List";
  } else if (pathname === "/manga-list/hash/completed") {
    presenceData.details = "Looking at";
    data.state = "Completed Manga List";
  } else if (pathname === "/latest-releases") {
    presenceData.details = "Viewing:";
    data.state = "Latest releases";
  } else if (pathname === "/collections") {
    presenceData.details = "Viewing:";
    data.state = "Collections";
  } else if (pathname.startsWith("/collection")) {
    data.state = document.querySelector(".page-title").textContent;
    presenceData.details = "Viewing collection:";
  } else if (pathname === "/advanced-search") {
    data.state = (<HTMLInputElement>(
      document.querySelector('[name="manga-name"]')
    )).value;
    presenceData.details = "Searching for:";
    data.smallImageKey = "search";
  } else if (pathname.startsWith("/category")) {
    presenceData.details = "Browsing category:";
    data.state = pathname.split("/")[2].replace("-", " ");
  } else if (pathname.endsWith("/all-pages")) {
    data.state = document.querySelector(".page-title > a").textContent;
    data.state = document.querySelector(".page-title > span").textContent;
    data.smallImageKey = "read";
    data.buttons = [{ label: "Read manga", url: document.location.href }];
  } else if (pathname.startsWith("/manga")) {
    data.state = document.querySelector(".page-title").textContent;
    presenceData.details = "Reading:";
    data.smallImageKey = "view";
    data.buttons = [{ label: "View manga", url: document.location.href }];
  } else if (pathname.startsWith("/user-panel")) {
    presenceData.details = "Viewing their:";
    data.state = document.querySelector("a.active").textContent;
    data.smallImageKey = "settings";
  }
  presence.setActivity(data);
});
