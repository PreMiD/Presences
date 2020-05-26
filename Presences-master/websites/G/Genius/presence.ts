var presence = new Presence({
    clientId: "630480419598499840"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var elapsed = Math.floor(Date.now() / 1000);
var artist;

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "genius-logo"
  };

  var lyricCheck = document.querySelector(".song_body-lyrics") ? true : false;
  var profileCheck = document.querySelector(
    ".profile_identity-name_iq_and_role_icon"
  )
    ? true
    : false;
  var path = document.location.pathname;
  if (path == "/") {
    data.details = "Viewing Homepage";
    data.startTimestamp = elapsed;
  } else if (path.startsWith("/a/")) {
    var article = document.querySelector("h1.article_title").textContent;
    if (article.length > 128) {
      article = article.substring(0, 125) + "...";
    }
    data.details = "Viewing an Article";
    data.state = article;
    data.startTimestamp = elapsed;
  } else if (path.startsWith("/artists/")) {
    artist = document
      .querySelector("h1.profile_identity-name_iq_and_role_icon")
      .innerHTML.split("<")[0];
    data.details = "Viewing Artist Profile";
    data.state = artist;
    data.startTimestamp = elapsed;
  } else if (path.startsWith("/albums/")) {
    var album = document.querySelector(
      "h1.header_with_cover_art-primary_info-title"
    ).textContent;
    data.details = "Viewing an Album";
    data.state = album;
    data.startTimestamp = elapsed;
  } else if (lyricCheck) {
    var song = document.querySelector(
      "h1.header_with_cover_art-primary_info-title"
    ).textContent;
    artist = document.querySelector(
      "a.header_with_cover_art-primary_info-primary_artist"
    ).textContent;
    data.details = "Viewing Lyrics";
    data.state = artist + " - " + song;
    data.startTimestamp = elapsed;
  } else if (profileCheck) {
    var user = document
      .querySelector("h1.profile_identity-name_iq_and_role_icon")
      .innerHTML.split("<")[0];
    data.details = "Viewing a Profile";
    data.state = user;
    data.startTimestamp = elapsed;
  } else if (path.startsWith("/videos/")) {
    var video: HTMLVideoElement = document.querySelector("video.vjs-tech");
    var title = document.querySelector("h1.article_title").textContent;
    if (title.length > 128) {
      title = title.substring(0, 125) + "...";
    }
    data.details = "Playing a Video";
    data.state = title;
    if (video && !isNaN(video.duration)) {
      var timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );

      data.smallImageKey = video.paused ? "pause" : "play";
      data.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      (data.startTimestamp = timestamps[0]),
        (data.endTimestamp = timestamps[1]);

      if (video.paused) {
        delete data.startTimestamp;
        delete data.endTimestamp;
      }
    }
  } else if (path.startsWith("/search")) {
    var search = document.querySelector("h2.search_results_page-header")
      .textContent;
    data.details = "Searching for:";
    data.state = search;
    data.smallImageKey = "search";
    data.smallImageText = "Searching";
    data.startTimestamp = elapsed;
  } else {
    data.details = "Somewhere on-site";
    data.startTimestamp = elapsed;
  }
  presence.setActivity(data);
});
