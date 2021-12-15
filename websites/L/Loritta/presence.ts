const presence = new Presence({
    clientId: "720139757363003455"
  }),
  presenceData: PresenceData = {
    largeImageKey: "loritta",
    startTimestamp: new Date().getTime()
  };

presence.on("UpdateData", () => {
  const path = document.location.pathname,
    host = document.location.hostname;
  if (host === "loritta.website") {
    if (path === "/br" || path === "/us" || path === "/br/" || path === "/us/")
      presenceData.details = "Home";
    else if (path.includes("dashboard")) {
      const category = document.querySelector(".server-name").textContent,
        item = document.querySelector(".selected-item").textContent;
      presenceData.details = category;
      presenceData.state = item;
    } else if (path.endsWith("/guidelines"))
      presenceData.details = "Guidelines";
    else if (path.endsWith("/support")) presenceData.details = "Support";
    else if (path.includes("fanarts")) {
      const artist = document.querySelector(".name");
      if (artist) {
        presenceData.details = "FanArts";
        presenceData.state = artist.textContent;
      } else presenceData.details = "FanArts";
    } else if (path.endsWith("/donate")) presenceData.details = "Donate";
    else if (path.includes("extras")) {
      const category = document.querySelector(".server-name").textContent,
        item = document.querySelector(".selected-item").textContent;
      presenceData.details = category;
      presenceData.state = item;
    } else if (path.includes("blog")) {
      const title = document.querySelector("h1");
      if (title) {
        presenceData.details = "Blog";
        presenceData.state = title.textContent;
      } else presenceData.details = "Blog";
    } else if (path.endsWith("/daily")) presenceData.details = "Daily";
  }
  if (host.includes("cluster")) {
    if (path.includes("dashboard") || path.includes("guild")) {
      const category = document.querySelector(".server-name").textContent,
        item = document.querySelector(".selected-item").textContent;
      presenceData.details = category;
      presenceData.state = item;
    } else if (path.endsWith("/guidelines"))
      presenceData.details = "Guidelines";
    else if (path.endsWith("/daily")) presenceData.state = "Daily";
    else if (path.endsWith("/support")) presenceData.details = "Support";
    else if (path.includes("fanarts")) {
      const artist = document.querySelector(".name");
      if (artist) {
        presenceData.details = "FanArts";
        presenceData.state = artist.textContent;
      } else presenceData.details = "FanArts";
    } else if (path.endsWith("/donate")) presenceData.details = "Donate";
    else if (path.includes("extras")) {
      const category = document.querySelector(".server-name").textContent,
        item = document.querySelector(".selected-item").textContent;
      presenceData.details = category;
      presenceData.state = item;
    } else if (path.includes("blog")) {
      const title = document.querySelector("h1");
      if (title) {
        presenceData.details = "Blog";
        presenceData.state = title.textContent;
      } else presenceData.details = "Blog";
    }
  }
  presence.setActivity(presenceData);
});
