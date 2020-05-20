const presence = new Presence({
  clientId: "708981544487878738"
});

const browsingStamp = Math.floor(Date.now() / 1000);

let title: string;
let author: string;
let playbackStatus: string;

function getStatus():string{
  const playPauseBtn = document.querySelector("#play-button");
  if(playPauseBtn.className === "fas fa-play"){
    return "Paused";
  }
  if(playPauseBtn.className === "fas fa-pause"){
    return "Playing";
  }
  return "Playing"; // If it could not get the class name, then automatically return it as playing
}

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "musiccast"
  };

  if (document.location.hostname === "www.musiccast.marinosite.xyz" || document.location.hostname === "musiccast.marinosite.xyz"){
      presenceData.startTimestamp = browsingStamp;
      title = document.querySelector("#title");
      author = document.querySelector("#artist");
      playbackStatus = getStatus();
      if(playbackStatus === "Paused"){
        presenceData.smallImageKey = "no-cast";
      }
      if(playbackStatus === "Playing"){
        presenceData.smallImageKey = "transparent";
      }
      presenceData.state = title.innerText;
      presenceData.details = author.innerText;
      presenceData.smallImageText = playbackStatus;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
