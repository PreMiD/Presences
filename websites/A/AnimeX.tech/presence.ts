const presence = new Presence({
  clientId: "663821800014348300"
});

let lastPlaybackState = null;
let playback;
let browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  const re = new RegExp("https://animex.tech/anime/(.*)/(.*)", "g");

  playback = re.exec(window.location.href) !== null ? true : false;
  const state =
    document.querySelector("#animeme").classList[2] === "jw-state-playing"
      ? "Playing"
      : "Paused";
  const presenceData: PresenceData = {
    largeImageKey: "animex"
  };

  if (!playback) {
    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;
    delete presenceData.state;
    delete presenceData.smallImageKey;
    presence.setActivity(presenceData, true);
  } else {
    const videoTitle: Node = document
      .evaluate("//body//h1[1]", document)
      .iterateNext();
    const episode: Array<string> = videoTitle.textContent.split(" - Episode ");

    presenceData.smallImageKey = state.toLowerCase();
    presenceData.smallImageText = state;
    presence.setTrayTitle(videoTitle.textContent);
    presenceData.details =
      episode[0] !== null ? episode[0] : "Title not found...";
    presenceData.state =
      episode[1] !== null
        ? "Episode " +
          episode[1] +
          " - " +
          document
            .evaluate(
              "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-elapsed']",
              document
            )
            .iterateNext().textContent +
          "/" +
          document
            .evaluate(
              "//div[@class='jw-icon jw-icon-inline jw-text jw-reset jw-text-duration']",
              document
            )
            .iterateNext().textContent
        : "Episode not found...";

    presence.setActivity(presenceData, true);
  }
});
