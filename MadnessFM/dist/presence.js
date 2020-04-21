let presence = new Presence({
  clientId: "701922288488022046"
});

function getTimestamps(videoTime, videoDuration) {
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

let browsingStamp = Math.floor(Date.now() / 1000);
let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);
let lastDetails;
let lastDetailsTimeStart = Math.floor(Date.now() / 1000);
var play, pause, songTitle, songArtist, dj;
presence.on("UpdateData", async() => {
  let presenceData = {
    largeImageKey: "mad"
  };

  if(document.location.pathname == "/" || document.location.pathname == "/home.php"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Choosing station";
  }
  else if(document.location.pathname == "/team"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Team";
  }
  else if(document.location.pathname == "/schedule"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Schedule";
  }
  else if(document.location.pathname == "/community"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Community";
  }
  else if(document.location.pathname == "/community"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the Community";
  }
  else if(document.location.pathname == "/getinvolved"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing how to get involved";
  }
  else if(document.location.pathname == "/contactus"){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Contact MadnessFM";
  }
  else if(document.location.pathname == "/popoutplayer.php"){
    presenceData.startTimestamp = browsingStamp;
    play = document.querySelector("#stream1 > div > div > div.ppBtn.play-btn");
    pause = document.querySelector("#stream1 > div > div > div.ppBtn.playing.stop-btn");
    songTitle = document.querySelector("#stream1 > div > div > div.player-ctr > div.track-info.animated > div.track-title.animated").textContent;
    songArtist = document.querySelector("#stream1 > div > div > div.player-ctr > div.track-info.animated > div.artist-name.animated").textContent;
    dj = document.querySelector("body > div.container > div > div.card-header.col-md-12.centertext.bg-danger > h5 > small").textContent;
    presenceData.details = "Viewing:" + songTitle + songArtist;
    presenceData.state = "DJ: " + dj;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});