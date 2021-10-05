const presence = new Presence({
    clientId: "863949633009090580"
  }),
  pages: { [k: string]: string } = {
    "/anime": "Watching an anime",
    "/genre": "Searching by genre",
    "/search": "Searching anime by name",
    "/faq": "Reading the FAQ",
    "/contact": "Reading the contacts",
    "/user/settings": "Changing the settings",
    "/user/watchlist": "Looking at their watchlist",
    "/user/import": "Importing their MAL list to Animesuge!"
  },
  pagesSearching: { [k: string]: string } = {
    "/": "At the homepage",
    "/newest": "Searching for the newest animes",
    "/updated": "Searching for recently updated animes",
    "/ongoing": "Searching for ongoing animes",
    "/added": "Searching recently added animes",
    "/tv": "Searching for TV animes",
    "/movie": "Searching movie animes",
    "/ova": "Searching for OVA animes",
    "/ona": "Searching for ONA animes",
    "/special": "Searching for special anime episodes",
    "/az-list": "Seaching all animes",
    "/most-watched": "Searching most watched animes",
    "/upcoming": "Searching upcoming animes"
  };

let timeEnd: number, currentTime: number, paused: boolean;

presence.on(
  "iFrameData",
  async (data: { currentTime: number; timeEnd: number; paused: boolean }) => {
    ({ currentTime, timeEnd, paused } = data);
  }
);

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    epNumber = page.slice(page.length - 5).replace(/^\D+/g, ""),
    animeName = document.querySelector(
      "#body > div > div > div > div > section > div > h1"
    ) as HTMLElement,
    data: PresenceData = {
      largeImageKey: "animesuge",
      startTimestamp: Math.floor(Date.now() / 1000)
    },
    search: URLSearchParams = new URLSearchParams(
      document.location.search.substring(1)
    ),
    timestamps = presence.getTimestamps(currentTime, timeEnd);
  if (page in pagesSearching) {
    data.details = pages[page];
    data.state = "Searching animes";
  } else if (page.includes("/anime")) {
    data.details = `Watching ${animeName.textContent}`;

    if (epNumber === "") data.state = "Full episode";
    else data.state = `Episode ${epNumber}`;

    if (!paused) {
      data.smallImageKey = "play";
      [data.startTimestamp, data.endTimestamp] = timestamps;
    } else {
      data.smallImageKey = "pause";
      data.smallImageText = "Paused";
      delete data.startTimestamp;
      delete data.endTimestamp;
    }
    data.buttons = [
      {
        label: "Watch Episode",
        url: `http://animesuge.io${page}`
      }
    ];
  } else if (page.includes("/genre")) {
    const genre = page.slice("/genre/".length);
    data.details = pages["/genre"];
    data.state = `Searching for ${
      genre.charAt(0).toUpperCase() + genre.slice(1)
    } Animes`;
  } else if (page.includes("/search")) {
    data.details = pages[page];
    data.state = `Searching: "${search.get("keyword")}"`;
    data.smallImageKey = "search";
    data.smallImageText = "Searching";
  } else if (page === "/faq") {
    data.details = pages[page];
    data.state = "Reading";
  } else if (page === "/contact") {
    data.details = pages[page];
    data.state = "Reading";
  } else if (page === "/user/settings") {
    data.details = pages[page];
    data.state = "Changing";
  } else if (page === "/user/watchlist") {
    const list = search.get("folder");
    data.details = pages[page];
    data.state = `At folder: ${list}`;
    if (list === null) data.state = "Looking at all animes in the watch list";
  } else if (page === "/user/import") {
    data.details = pages[page];
    data.state = "Importing!";
  } else {
    data.details = "Looking at an unknown page";
    data.state = "Unknown";
  }
  if (data.details && data.state) presence.setActivity(data);
});
