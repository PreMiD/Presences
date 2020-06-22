var presence = new Presence({
  clientId: "663821800014348300"
});
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  var re = new RegExp("https://animex.tech/anime/(.*)/(.*)", "g");

  playback = re.exec((<any>window).location.href) !== null ? true : false;

  var presenceData: PresenceData = {
    largeImageKey: "animex"
  };

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.state;
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData, true);
  } else {
    var videoTitle: any;
    var episode: any;
    var state =
      document.querySelector("#animeme").classList[2] === "jw-state-playing"
        ? "Playing"
        : "Paused";
    videoTitle = document.evaluate("//body//h1[1]", document).iterateNext();
    episode = videoTitle.innerText.split(" - Episode ");

    presenceData.smallImageKey = state.toLowerCase();
    presenceData.smallImageText = state;

    presence.setTrayTitle(videoTitle.innerText);

    presenceData.details =
      episode[0] !== null ? episode[0] : "Title not found...";
    presenceData.state =
      episode[1] !== null
        ? "Episode " +
          episode[1] +
          " - " +
          (<any>(
            document
              .evaluate(
                "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-elapsed']",
                document
              )
              .iterateNext()
          )).textContent +
          "/" +
          (<any>(
            document
              .evaluate(
                "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-duration']",
                document
              )
              .iterateNext()
          )).textContent
        : "Episode not found...";
    if (true) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (videoTitle !== null) {
      presence.setActivity(presenceData, true);
    }
  }
});
