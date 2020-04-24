var presence = new Presence({
    clientId: "662715886662057994"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo"
  };
  if (document.location.hostname == "enthix.net") {
    presenceData.details = "Viewing Home Page";
    presenceData.state =
      document.querySelector(
        "body > div.container > div.playercount > p > span.sip"
      ).textContent + " Players Online";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
