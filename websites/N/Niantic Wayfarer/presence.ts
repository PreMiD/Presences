const presence = new Presence({
    clientId: "684174415415476240"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "nwbig"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.pathname.includes("/review")) {
    const title = document.querySelector(
        "#descriptionDiv > div.card__body > div > a > h1"
      ),
      description = document.querySelector(
        "#descriptionDiv > div.card__body > div > h4"
      ),
      location = document.querySelector(".flex-map-row > span:nth-child(2)");
    if (title !== null && description !== null && location !== null) {
      presenceData.largeImageKey = "wayfarer";
      presenceData.smallImageKey = "nw";
      presenceData.details = `Reviewing: ${title.textContent}`;
      presenceData.state = `Description: ${description.textContent}`;
      presenceData.smallImageText = `Address: ${location.textContent
        .split(":")[1]
        .trim()}`;
    } else {
      presenceData.details = "Getting ready to";
      presenceData.state = "review a location...";
    }
  } else if (document.location.pathname.includes("/settings"))
    presenceData.details = "Changing some settings...";
  else if (document.location.pathname.includes("/help")) {
    const article = document.querySelector(
      "#help-section-breadcrumbs > span.ng-binding"
    ).textContent;
    presenceData.smallImageKey = "reading";
    if (article !== "") {
      presenceData.details = "Reading article:";
      presenceData.state = article;
    } else presenceData.details = "Browsing the Help Center...";
  } else if (document.location.pathname.includes("/login"))
    presenceData.details = "Logging in...";
  else if (document.location.pathname.includes("/profile"))
    presenceData.details = "Viewing their own profile...";
  else if (document.location.pathname.includes("/nominations"))
    presenceData.details = "Viewing their nominations...";
  else if (document.location.pathname === "/")
    presenceData.details = "Viewing the showcased wayspots...";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
