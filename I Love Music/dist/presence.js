var presence = new Presence({
    clientId: "477919120789078026"
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
  var presenceData = {
    largeImageKey: "logo"
  };

  var playing = document.querySelector("#playstop").innerText;
  if (playing > 0) {
    station = document.getElementsByClassName("channelname")[0].innerText;
    presenceData.details = "Spielt gerade";
    presenceData.state = station;
    presenceData.smallImageKey = "live";
    presence.setActivity(presenceData);
  } else {
    try {
      channelstation = document.querySelector("#content > h1").innerText;
      presenceData.details = "Stöbert durch";
      presenceData.state = channelstation;
      presence.setActivity(presenceData);
    } catch (e) {
      //nothing
    }

    if (document.location.pathname == "/") {
      presenceData.details = "Stöbert durch";
      presenceData.state = "die Startseite";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/voting/") {
      presenceData.details = "Votet für";
      presenceData.state = "neue Songs";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/the-battle/") {
      presenceData.details = "Votet für";
      presenceData.state = "The Battle";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/charts/") {
      presenceData.details = "Sucht in Charts...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/dance/") {
      presenceData.details = "Sucht in Dance & DJ's...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/hiphop/") {
      presenceData.details = "Sucht in Hip Hop...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/channels/") {
      presenceData.details = "Sucht in Channelliste...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/streams/") {
      presenceData.details = "Sucht in Streamlinks...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/datenschutz/") {
      presenceData.details = "Liest den Datenschutz...";
      presence.setActivity(presenceData);
    } else if (document.location.pathname == "/impressum/") {
      presenceData.details = "Liest Impressum durch...";
      presence.setActivity(presenceData);
    }
    presence.setActivity(presenceData);
  }
});
function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
  refresh.refresh;
}
