const presence = new Presence({
    clientId: "852239305983262761"
  }),
  browsingTimestamp = ~~(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    smallImageKey: "browsing",
    startTimestamp: browsingTimestamp
  };
  if (
    document.location.pathname.includes("/a/") &&
    document.location.pathname.includes("episode")
  ) {
    const [title] = document
        .getElementsByClassName("title is-marginless is-paddingless")[0]
        .getElementsByClassName("is-size-4 is-size-5-touch is-size-6-mobile"),
      currentEpisode = document.getElementById("currentlyPlaying").textContent;
    presenceData.details = title.textContent ?? "Title not found...";
    presenceData.state = currentEpisode ?? "Episode not found...";
    presenceData.smallImageKey = "playing";
    presenceData.buttons = [
      { label: "Watch Episode", url: document.location.toString() }
    ];
    presence.setActivity(presenceData, true);
  } else if (document.location.pathname.includes("/a/")) {
    const [title] = document.getElementsByClassName(
      "title is-marginless is-paddingless"
    );
    presenceData.details = "Searching...";
    presenceData.state = title.textContent;
    presenceData.smallImageKey = "browsing";
    presenceData.buttons = [
      { label: "View Anime", url: document.location.toString() }
    ];
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/search")) {
    const params = new URL(document.location.toString()).searchParams,
      search = params.get("search");
    presenceData.details = "Searching...";
    presenceData.state = search;
    presenceData.smallImageKey = "searching";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/ongoing")) {
    presenceData.details = "Viewing On-Going Shows";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/anime-schedule")) {
    presenceData.details = "Viewing Anime Schedule";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/anime-request")) {
    presenceData.details = "Viewing Anime Requests";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/blog")) {
    presenceData.details = "Viewing Blog";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData);
  } else {
    presenceData.details = "Browsing...";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData);
  }
});
