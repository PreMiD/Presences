const presence = new Presence({
    clientId: "1133734950055714866",
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let urlParameters: URLSearchParams, searchQuery: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "https://i.imgur.com/XAgWtZw.png",
      startTimestamp: browsingTimestamp,
    },
    privacy = await presence.getSetting<boolean>("privacy"),
    { search, pathname, hostname } = document.location;

  switch (hostname) {
    case "www.lcpdfr.com": {
      if (pathname === "/") presenceData.details = "Patrolling the Home Page";
      else if (pathname.includes("/downloads/")) {
        const path = pathname.split("/");
        presenceData.smallImageKey = Assets.Viewing;
        if (path.includes("essential-mods"))
          presenceData.details = "Inspecting Essential Mods";
        else if (path.includes("vehiclemodels"))
          presenceData.details = "Analyzing Vehicle Models";
        else if (path.includes("vehiclestextures"))
          presenceData.details = "Examining Vehicle Textures";
        else if (path.includes("scripts"))
          presenceData.details = "Investigating Scripts & Plugins";
        else if (path.includes("character"))
          presenceData.details = "Reviewing Character Mods";
        else if (path.includes("audio"))
          presenceData.details = "Exploring Audio Mods";
        else if (path.includes("datafile"))
          presenceData.details = "Examining Data Files";
        else if (path.includes("misc"))
          presenceData.details = "Keeping an eye out for miscelaneous";
        else presenceData.details = "Inspecting the Download Page";
      } else if (pathname.includes("/forums/"))
        presenceData.details = "Engaging in Discussions";
      else if (pathname.includes("/discover/"))
        presenceData.details = "Investigating Recent Activity";
      else if (pathname.includes("/contact-us/"))
        presenceData.details = "Contacting the staff";
      else if (pathname.includes("/wiki/"))
        presenceData.details = "Studying the Wiki";
      else if (pathname.includes("/login/"))
        presenceData.details = "Going on Duty";
      else if (pathname.includes("/register/"))
        presenceData.details = "Signing Up for Duty";
      else if (pathname.includes("/search/")) {
        urlParameters = new URLSearchParams(search);
        searchQuery = urlParameters.get("q");
        presenceData.details = "Searching for:";
        presenceData.state = searchQuery;
        presenceData.smallImageKey = Assets.Search;
      } else if (pathname.includes("/profile/")) {
        presenceData.details = "Viewing Officer:";
        presenceData.state = document.querySelector(
          "h1[class='ipsType_reset ipsPageHead_barText']"
        ).textContent;
        presenceData.largeImageKey = document
          .querySelector('[class="ipsUserPhoto ipsUserPhoto_xlarge"]')
          ?.getAttribute("href");
        presenceData.smallImageKey = Assets.Viewing;
      } else if (pathname.includes("/settings/"))
        presenceData.details = "Viewing Settings";
      else if (pathname.includes("/guideline-hub/")) {
        presenceData.details = "Reading the guidelines";
        presenceData.smallImageKey = Assets.Reading;
      } else if (pathname.includes("/staff/"))
        presenceData.details = "Viewing the Staff";
      else if (pathname.includes("/gallery/")) {
        presenceData.details = "Looking through the Gallery";
        presenceData.smallImageKey = Assets.Viewing;
      } else presenceData.details = "Just browsing...";
      break;
    }
  }

  if (privacy) {
    presenceData.details = "Browsing undercover...";
    delete presenceData.state;
    delete presenceData.smallImageKey;
    if (presenceData.largeImageKey !== "https://i.imgur.com/XAgWtZw.png")
      presenceData.largeImageKey = "https://i.imgur.com/XAgWtZw.png";
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
