var presence = new Presence({
    clientId: "702935358395908168"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "runo",
    startTimestamp: browsingStamp
  };
  if (document.location.hostname == "runo.pw") {
	  
    if (document.location.pathname.startsWith("/index")) {
      presenceData.details = "Giriş sayfasına bakıyor...";
      presenceData.state = "İndex Sayfası";
    } else if (document.location.pathname.startsWith("/me")) {
      presenceData.details = "Me sayfasına bakıyor....";
      presenceData.state = "Me Sayfası";
    } else if (document.location.pathname.startsWith("/client")) {
      presenceData.details = "Şuanda client sayfasında!";
      presenceData.state = "www.Runo.Pw";
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

console.log("Presence Runo loaded!");
