const presence = new Presence({
    clientId: "839455068855861248"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    { pathname } = document.location;
  if (pathname === "/") presenceData.details = "Viewing the Homepage";
  else if (pathname === "/popular-manga") {
    presenceData.details = "Looking at";
    presenceData.state = "Popular Manga";
  } else if (pathname === "/manga-list") {
    presenceData.details = "Viewing:";
    presenceData.state = "All Manga";
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/completed")
  ) {
    presenceData.details = "Looking at";
    presenceData.state = `Completed Manga on ${pathname
      .split("/")[2]
      .toUpperCase()}`;
  } else if (
    pathname.startsWith("/manga-list") &&
    pathname.endsWith("/ongoing")
  ) {
    presenceData.details = "Looking at";
    presenceData.state = `Ongoing Manga on ${pathname
      .split("/")[2]
      .toUpperCase()}`;
  } else if (pathname.startsWith("/manga-list")) {
    presenceData.details = "Viewing:";
    presenceData.state = `Manga on ${pathname.split("/")[2].toUpperCase()}`;
  } else if (pathname === "/manga-list/hash/ongoing") {
    presenceData.details = "Looking at";
    presenceData.state = "Ongoing Manga List";
  } else if (pathname === "/manga-list/hash/completed") {
    presenceData.details = "Looking at";
    presenceData.state = "Completed Manga List";
  } else if (pathname === "/latest-releases") {
    presenceData.details = "Viewing:";
    presenceData.state = "Latest releases";
  } else if (pathname === "/collections") {
    presenceData.details = "Viewing:";
    presenceData.state = "Collections";
  } else if (pathname.startsWith("/collection")) {
    presenceData.details = "Viewing collection:";
    presenceData.state = document.querySelector(".page-title").textContent;
  } else if (pathname === "/advanced-search") {
    presenceData.details = "Searching for:";
    presenceData.state = document.querySelector<HTMLInputElement>(
      '[name="manga-name"]'
    ).value;
    presenceData.smallImageKey = "search";
  } else if (pathname.startsWith("/category")) {
    presenceData.details = "Browsing category:";
    presenceData.state = pathname.split("/")[2].replace("-", " ");
  } else if (pathname.endsWith("/all-pages")) {
    presenceData.details =
      document.querySelector(".page-title > a").textContent;
    presenceData.state =
      document.querySelector(".page-title > span").textContent;
    presenceData.smallImageKey = "read";
    presenceData.buttons = [
      { label: "Read manga", url: document.location.href }
    ];
  } else if (pathname.startsWith("/manga")) {
    presenceData.details = "Reading:";
    presenceData.state = document.querySelector(".page-title").textContent;
    presenceData.smallImageKey = "view";
    presenceData.buttons = [
      { label: "View manga", url: document.location.href }
    ];
  } else if (pathname.startsWith("/user-panel")) {
    presenceData.details = "Viewing their:";
    presenceData.state = document.querySelector("a.active").textContent;
    presenceData.smallImageKey = "settings";
  }
  presence.setActivity(presenceData);
});
