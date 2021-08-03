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
  } else if (location.pathname === "/detail/mediaInfo") {
    const title = document.querySelector("h2.videoTitle").textContent,
      video: HTMLVideoElement = document.querySelector("div.fp-player").querySelector("video.fp-engine"),
      currentDate = video.currentTime,
      allDate = video.duration;

    [, presenceData.endTimestamp] = presence.getTimestamps(
      currentDate,
      allDate
    );
    presenceData.details = `${title}`;
    if (video.paused) {
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = "일시 정지";
    } else {
      presenceData.smallImageKey = "playing";
      presenceData.smallImageText = "재생";
    }
  } else if (location.pathname === "/")
    presenceData.details = "메인";
  else if (location.pathname.indexOf("/search") === 0) {
    const keyword = getQuery();

    presenceData.smallImageKey = "search";
    presenceData.details = "검색";
    presenceData.state = keyword.query;
    if (location.pathname === "/search/searchMain")
      presenceData.details += "(통합검색)";
    else if (location.pathname === "/search/searchArtist")
      presenceData.details += "(아티스트)";
    else if (location.pathname === "/search/searchSong")
      presenceData.details += "(곡)";
    else if (location.pathname === "/search/searchAlbum")
      presenceData.details += "(앨범)";
    else if (location.pathname === "/search/searchPlaylist")
      presenceData.details += "(플레이리스트)";
    else if (location.pathname === "/search/searchMv")
      presenceData.details += "(동영상)";
    else if (location.pathname === "/search/searchMagazine")
      presenceData.details += "(매거진)";
    else if (location.pathname === "/search/searchLyrics")
      presenceData.details += "(가사)";
  }
  presence.setActivity(presenceData);
});
