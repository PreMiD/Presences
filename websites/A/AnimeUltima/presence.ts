const presence = new Presence({
  clientId: "852239305983262761"
}),
browsingTimestamp = Date.now(),
presenceData: PresenceData = {
  largeImageKey: "logo",
  smallImageKey: "browsing"
};

function clearPresenceData() {
  delete presenceData.smallImageKey;
  delete presenceData.state;
  delete presenceData.details;
  delete presenceData.startTimestamp;
}

presence.on("UpdateData", () => {
  clearPresenceData();
  presenceData.startTimestamp = browsingTimestamp;
  if(document.location.pathname.includes("/a/") && document.location.pathname.includes("episode")) {
    const [title] = (document.getElementsByClassName("title is-marginless is-paddingless")[0]).getElementsByClassName("is-size-4 is-size-5-touch is-size-6-mobile"),
      currentEpisode = document.getElementById("currentlyPlaying").textContent;
    presenceData.details = title.textContent ?? "Title not found...";
    presenceData.state = currentEpisode ?? "Episode not found...";
    presenceData.smallImageKey = "playing";
    presenceData.buttons = [ { label: "Watch Episode", url: document.location.toString() } ];
    presence.setActivity(presenceData, true);
  } else if(document.location.pathname.includes("/a/")) {
    const [title] = document.getElementsByClassName("title is-marginless is-paddingless");
    presenceData.details = "Searching...";
    presenceData.state = title.textContent;
    presenceData.smallImageKey = "browsing";
    presenceData.buttons = [ { label: "Watch Anime", url: document.location.toString() } ];
    presence.setActivity(presenceData, true);
  } else if(document.location.pathname.includes("/search")) {
    const params = (new URL(document.location.toString())).searchParams,
      search = params.get("search");
    presenceData.details = "Searching...";
    presenceData.state = search;
    presenceData.smallImageKey = "searching";
    presence.setActivity(presenceData, true);
  } else {
    presenceData.details = "Browsing...";
    presenceData.smallImageKey = "browsing";
    presence.setActivity(presenceData, true);
  }
});