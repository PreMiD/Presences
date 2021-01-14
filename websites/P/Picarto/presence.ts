var presence = new Presence({
    clientId: "630771716058120192"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  var video: HTMLVideoElement = document.querySelector(
    "#picarto-player-1_html5_api"
  );
  if (video !== null && !isNaN(video.duration)) {
    var title: any, uploader: any;

    title = document.querySelector(".d-flex h4");
    uploader = document.querySelector("#userbar-name .d-flex .d-inline-block");
    presenceData.details =
      title !== null ? (title as HTMLElement).innerText : "Title not found...";
    presenceData.state =
      uploader !== null
        ? (uploader as HTMLElement).textContent
        : "Uploader not found...";
    presenceData.largeImageKey = "logo";
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = browsingStamp;

    presence.setTrayTitle(video.paused ? "" : title.innerText);

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }

    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData, !video.paused);
    }
  } else {
    var pageData: PresenceData = {
      details: "Browsing..",
      largeImageKey: "logo"
    };
    presence.setActivity(pageData);
  }
});
