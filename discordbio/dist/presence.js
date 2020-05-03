var presence = new Presence({
    clientId: "642728621596999690"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  let presenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing in mainpage...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/profiles") {
    presenceData.details = "Browsing through";
    presenceData.state = "top upvoted profiles...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/plans") {
    presenceData.details = "Browsing through";
    presenceData.state = "Premium plans";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/customise") {
    presenceData.details = "Edit profile";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/p/")) {
    nameofprofile = document.location.pathname.split("/");
    presenceData.details = "Viewing profile";
    presenceData.state = "dsc.bio/" + nameofprofile[2];
    presence.setActivity(presenceData);
  }
  presence.setActivity(presenceData);
});

function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
