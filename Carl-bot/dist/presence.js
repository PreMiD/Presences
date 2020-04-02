var presence = new Presence({
    clientId: "653372675166568481",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "carllogo",
    startTimestamp: browsingStamp,
  };
  if (document.location.hostname == "carl.gg") {
    if (document.location.pathname.startsWith("/dashboard/")) {
      title = document.querySelector(
        "body > div.app > header > ul.navbar-nav.ml-auto.d-none.d-sm-inline-block > div > div"
      ).innerText;
      presenceData.details = "Managing the settings of:";
      presenceData.state = title;
    } else if (document.location.pathname.startsWith("/servers")) {
      presenceData.details = "Browsing through";
      presenceData.state = "servers";
    } else if (document.location.pathname.startsWith("/status")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Carl-bot Status";
    }
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
