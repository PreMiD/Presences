var presence = new Presence({
  clientId: "699204548664885279"
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

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  var presenceData: PresenceData = {
    largeImageKey: "chess"
  };

  if (document.location.pathname == "/home") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("/messages")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing messages";
  } else if (document.location.pathname.includes("/stats")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing statistics";
  } else if (document.location.pathname.includes("/games/archive")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing games archive";
  } else if (document.location.pathname.includes("/live")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing live chess";
  } else if (document.location.pathname.indexOf("/daily/") == 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing daily chess";
    presenceData.state = document.title.substring(8);
  } else if (document.location.pathname == "/daily") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing daily chess";
  } else if (document.location.pathname.includes("/play/computer")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing against computer";
  } else if (document.location.pathname.includes("/tournaments")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing tournaments";
  } else if (document.location.pathname.includes("/4-player-chess")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing 4 player chess";
  } else if (document.location.pathname == "/variants") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through Chess Variants";
  } else if (document.location.pathname.indexOf("/variants/variant/game/") == 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Chess Variant";
    presenceData.state = document.title.substring(0, document.title.indexOf("-"));
  } else if (document.location.pathname.includes("/automate")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing Automate chess";
  } else if (document.location.pathname == "/puzzles/rated") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Solving puzzles";
  } else if (document.location.pathname == "/puzzles/rush") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing puzzles rush";
  } else if (document.location.pathname == "/puzzles/battle") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing puzzles battle";
  } else if (
    document.location.pathname.indexOf("/forum/view/daily-puzzles/") == 0
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Solving daily puzzle";
  } else if (document.location.pathname.includes("/solo-chess")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Playing solo chess";
  } else if (document.location.pathname.includes("/lessons")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing lessons";
  } else if (document.location.pathname.includes("/analysis")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Analyzing games";
  } else if (document.location.pathname.indexOf("/article/view") == 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading an article";
    presenceData.state = document.title;
  } else if (document.location.pathname == "/articles") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through articles";
  } else if (document.location.pathname == "/videos") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing videos";
  } else if (document.location.pathname.includes("/vision")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Training vision";
  } else if (document.location.pathname.includes("/openings")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing openings";
  } else if (document.location.pathname.includes("/explorer")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Using games explorer";
  } else if (document.location.pathname.includes("/forum")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through forum";
  } else if (document.location.pathname.includes("/clubs")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through clubs";
  } else if (document.location.pathname == "/blogs") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through blogs";
  } else if (document.location.pathname.indexOf("/blog/") == 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading a blog post";
    presenceData.state = document.title;
  } else if (document.location.pathname.includes("/members")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through members";
  } else if (document.location.pathname.includes("/coaches")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through coaches";
  } else if (document.location.pathname.includes("/today")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Chess today";
  } else if (document.location.pathname.indexOf("/news/view/") == 0) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading news";
    presenceData.state = document.title;
  } else if (document.location.pathname == "/news") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through news";
  } else if (document.location.pathname.includes("/tv")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing ChessTV";
  } else if (document.location.pathname == "/games") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing through master games";
  } else if (document.location.pathname.indexOf("/games/view/") == 0) {
    presenceData.startTimestamp == browsingStamp;
    presenceData.details = "Watching a master game";
    presenceData.state = document.title.substring(0, document.title.indexOf(")") + 1);
  } else if (document.location.pathname.includes("/computer-chess-championship")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watching Computer Chess Championship";
    presenceData.state = document.title.substring(0, document.title.indexOf("-"));
  } else if (document.location.pathname.indexOf("/video/player/") == 0) {
    var video: HTMLVideoElement = document.querySelector("video");

    if (video !== null && !isNaN(video.duration)) {
      var timestamps: any;
      timestamps = getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.largeImageKey = "chess";
      presenceData.details = "Watching video";
      presenceData.state = document.title;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      if (video.paused) {
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = (await strings).pause;
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      } else {
        presenceData.smallImageKey = "play";
        presenceData.smallImageText = (await strings).play;
      }
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
