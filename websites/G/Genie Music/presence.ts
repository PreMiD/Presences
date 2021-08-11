const presence = new Presence({
  clientId: "857504938443407360"
});

function getQuery() {
  const search = location.search.substring(1);
  return JSON.parse(
    `{"${decodeURI(decodeURIComponent(search))
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')}"}`
  );
}

function getGenre(code: string) {
  const firstCode = code.substr(0, 1),
    endCode = code.substr(1);
  if (firstCode === "E") return "EDM";
  else if (firstCode === "L" && endCode === "0107") return "트롯";
  else {
    if (endCode.startsWith("01")) return "가요";
    else if (
      endCode.startsWith("02") &&
      endCode !== "0207" &&
      endCode !== "0208"
    )
      return "POP";
    else if (endCode.startsWith("03")) return "OST";
    else if (endCode.startsWith("04")) return "JPOP";
    else if (endCode.startsWith("05")) return "JAZZ";
    else if (endCode.startsWith("06")) return "클래식";
    else if (endCode.startsWith("08")) return "CCM";
    else return "그 외 장르";
  }
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
      video: HTMLVideoElement = document
        .querySelector("div.fp-player")
        .querySelector("video.fp-engine"),
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
    } else if (video.ended) {
      presenceData.smallImageKey = "stop";
      presenceData.smallImageText = "정지";
    } else {
      presenceData.smallImageKey = "playing";
      presenceData.smallImageText = "재생";
    }
  } else if (location.pathname === "/") presenceData.details = "메인";
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
  } else if (location.pathname.startsWith("/chart")) {
    presenceData.smallImageKey = "chart";
    presenceData.details = "지니차트";
    if (location.pathname === "/chart/top200")
      presenceData.details += "(TOP 200)";
    else if (location.pathname === "/chart/genre")
      presenceData.details += "(장르별 차트)";
    else if (location.pathname === "/chart/musicHistory")
      presenceData.details += "(시대별 차트)";
    else if (location.pathname === "/chart/musicVideo")
      presenceData.details += "(뮤직 비디오)";
  } else if (location.pathname.startsWith("/newest")) {
    presenceData.smallImageKey = "music";
    presenceData.details = "최신음악";
    if (location.pathname === "/newest/song") presenceData.details += "(곡)";
    else if (location.pathname === "/newest/album")
      presenceData.details += "(앨범)";
  } else if (location.pathname.startsWith("/genre")) {
    const code = location.pathname.replace("/genre/", "");
    presenceData.smallImageKey = "music";
    presenceData.details = "장르음악";
    presenceData.details += `(${getGenre(code)})`;
  } else if (location.pathname.startsWith("/genietv")) {
    presenceData.smallImageKey = "tv";
    presenceData.details = "지니TV";
    if (location.pathname === "/genietv/broadcast") {
      presenceData.details += "(Mnet 방송)";
      presenceData.smallImageKey = "mnet";
    } else if (location.pathname === "/genietv/newMV")
      presenceData.details += "(뮤직비디오)";
    else if (location.pathname === "/genietv/musicianSpecial")
      presenceData.details += "(뮤지션)";
    else if (location.pathname.startsWith("/genietv/noveltyMovie"))
      presenceData.details += "(이색영상)";
  } else if (location.pathname.startsWith("/playlist")) {
    presenceData.smallImageKey = "playlist";
    presenceData.details = "추천";
    if (location.pathname === "/playlist/popular")
      presenceData.details += "(인기)";
    else if (location.pathname === "/playlist/tags")
      presenceData.details += "(태그)";
    else if (location.pathname === "/playlist/history")
      presenceData.details += "(히스토리)";
  } else if (location.pathname.startsWith("/magazine")) {
    presenceData.smallImageKey = "playlist";
    presenceData.details = "매거진";
  } else if (location.pathname.startsWith("/edm")) {
    presenceData.smallImageKey = "music";
    presenceData.details = "EDM";
    if (location.pathname === "/edm/album") presenceData.details += "(최신)";
    else if (location.pathname === "/edm/chart")
      presenceData.details += "(차트)";
  } else if (location.pathname.startsWith("/buy"))
    presenceData.details = "이용권 구매";
  else if (location.pathname.startsWith("/event"))
    presenceData.details = "이벤트";
  else if (location.pathname.startsWith("/guide"))
    presenceData.details = "이용 안내";
  else if (location.pathname.startsWith("/member/product"))
    presenceData.details = "이용권 내역";
  else if (location.pathname.startsWith("/support/service")) {
    presenceData.details = "고객센터";
    if (location.pathname === "/support/service/helpList")
      presenceData.details += "(도움말)";
    else if (location.pathname === "/support/service/notice")
      presenceData.details += "(공지사항)";
    else if (location.pathname === "/support/service/pds")
      presenceData.details += "(자료실)";
    else if (location.pathname === "/support/service/errorRegist")
      presenceData.details += "(음원 관련 문의)";
    else if (location.pathname === "/support/service/contact")
      presenceData.details += "(서비스 문의)";
    else if (location.pathname === "/support/service/myContactList")
      presenceData.details += "(문의 내역)";
  } else if (location.pathname.startsWith("/myMusic")) {
    presenceData.smallImageKey = "profile";
    presenceData.details = "마이 뮤직";
    if (location.pathname.startsWith("/myMusic/profile"))
      presenceData.details += "(프로필)";
    else if (
      location.pathname.startsWith("/myMusic/purchase") ||
      location.pathname === "/myMusic/oneClickDownload"
    )
      presenceData.details += "(보관함)";
    else if (
      location.pathname.startsWith("/myMusic/gift") ||
      location.pathname === "/myMusic/coupleList"
    )
      presenceData.details += "(선물함)";
    else if (location.pathname === "/myMusic/shareList")
      presenceData.details += "(음악 나누기)";
    else if (location.pathname.startsWith("/myMusic/like"))
      presenceData.details += "(좋아요)";
    else if (location.pathname === "/myMusic/myStreamVideoList")
      presenceData.details += "(최근 감상 영상)";
    else if (location.pathname === "/myMusic/myMusicPlayList")
      presenceData.details += "(플레이리스트)";
    else if (location.pathname === "/myMusic/syncPlaylist")
      presenceData.details += "(동기화 재생목록)";
    else if (location.pathname === "/myMusic/myPlaylist") {
      const query = getQuery(),
        { category } = query;
      if (category === "A") presenceData.details += "(많이 들은 아티스트)";
      else if (category === "M") presenceData.details += "(많이 들은 곡)";
      else if (category === "R") presenceData.details += "(최근 감상 곡)";
    }
  }
  presence.setActivity(presenceData);
});
