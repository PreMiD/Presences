const presence = new Presence({
  clientId: "857504938443407360"
});

function getQuery() {
  const search = location.search.substring(1);
  return JSON.parse(
    `{"${decodeURI(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "geneie"
  },
    { location } = window;
  // If player
  if (location.pathname === "/player/fPlayer") {
    const trackInfo = document.querySelector("div.track-info"),
      title = trackInfo.querySelector("strong#SongTitleArea").textContent,
      artist = trackInfo.querySelector("span#ArtistNameArea").textContent,
      playBar = document.querySelector("div.fp-ui"),
      playButton = playBar.querySelector("a.fp-playbtn").textContent,
      currentTime = playBar.querySelector("span.fp-elapsed").textContent,
      allTime = playBar.querySelector("span.fp-duration").textContent,
      currentDate = presence.timestampFromFormat(currentTime),
      allDate = presence.timestampFromFormat(allTime);

    [, presenceData.endTimestamp] = presence.getTimestamps(
      currentDate,
      allDate
    );
    presenceData.details = `${title} - ${artist}`;
    if (playButton === "재생") {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "일시 정지";
    } else if (playButton === "일시정지") {
      presenceData.smallImageKey = "playing";
      presenceData.smallImageText = "재생";
    }
  } else if (location.pathname === "/") presenceData.details = "메인";
  presence.setActivity(presenceData);
});
