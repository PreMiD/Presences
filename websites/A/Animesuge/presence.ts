const presence = new Presence({
    clientId: "863949633009090580"
  }),
  pages: {[k: string]: string} = {
    "/anime": "Watching an anime",
    "/genre": "Searching by genre",
    "/newest": "Searching for the newest animes",
    "/updated": "Searching for recently updated animes",
    "/ongoing": "Searching for ongoing animes",
    "/added": "Searching recently added animes",
    "/tv": "Searching for TV animes",
    "/movie": "Searching movie animes",
    "/ova": "Searching for OVA animes",
    "/ona": "Searching for ONA animes",
    "/special": "Searching for special anime episodes",
    "/search": "Searching anime by name",
    "/az-list": "Seaching all animes",
    "/most-watched": "Searching most watched animes",
    "/upcoming": "Searching upcoming animes",
    "/faq": "Reading the FAQ",
    "/contact": "Reading the contacts",
    "/user/settings": "Changing the settings",
    "/user/watchlist": "Looking at their watchlist",
    "/user/import": "Importing their MAL list to Animesuge!"
  };

let endTime: number,
  currentTime: number;

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  const startTime = Date.now(),
    endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("iFrameData", async (data: {endTime: number; currentTime: number;}) => {
  ({endTime, currentTime} = data);
});

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    animeName = document.querySelector(
      "#body > div > div > div > div > section > div > h1"
    ) as HTMLElement,
    data: PresenceData = {
      largeImageKey: "animesuge"
    },
    search: URLSearchParams = new URLSearchParams(document.location.search.substring(1));
  if (page === "/") {
    data.details = "At the home page";
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page.includes("/anime")) {
    data.details = pages["/anime"];
    data.state = `Watching ${animeName.textContent}`;
    [data.startTimestamp, data.endTimestamp] = getTimestamps(currentTime, endTime);
    data.buttons = [
      {
        label: "Watch it too!",
        url: `http://animesuge.io${page}`
      }
    ];
  } else if (page.includes("/genre")) {
    const genre = page.slice("/genre/".length);
    data.details = pages["/genre"];
    data.state = `Searching for ${genre.charAt(0).toUpperCase() + genre.slice(1)} Animes`;
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/newest") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/updated") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/ongoing") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/added") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/tv") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/movie") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/ova") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/ona") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/special") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page.includes("/search")) {
    data.details = pages[page];
    data.state = `Searching: "${search.get("keyword")}"`;
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/az-list") {
    data.details = pages[page];
    data.state = "Seaching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/most-watched") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/upcoming") {
    data.details = pages[page];
    data.state = "Searching animes";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/faq") {
    data.details = pages[page];
    data.state = "Reading";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/contact") {
    data.details = pages[page];
    data.state = "Reading";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (page === "/user/settings") {
    data.details = pages[page];
    data.state = "Changing";
  } else if (page === "/user/watchlist") {
    const list = search.get("folder");
    data.details = pages[page];
    data.state = `At folder: ${list}`;
    data.startTimestamp = Math.floor(Date.now() / 1000);
    if (list === null)
      data.state = "Looking at all animes in the watch list";
  } else if (page === "/user/import") {
    data.details = pages[page];
    data.state = "Importing!";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  } else {
    data.details = "Looking at an unknown page";
    data.state = "Unknown";
    data.startTimestamp = Math.floor(Date.now() / 1000);
  }
  if (data.details !== null && data.state !== null)
    presence.setActivity(data);
});