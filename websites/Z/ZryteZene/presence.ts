const presence = new Presence({
  clientId: "760186894477819914",
  injectOnComplete: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

console.log("Test"); 

let music: string;
let uploader: string;
let date: Date;
let startTime: number;
let endTime: number;
let musicLen: string;

date = new Date();
startTime = date.getTime();

function myOutsideHeavyLiftingFunction(){
  uploader = document.getElementsByClassName('text-xs')[0].innerHTML;
  music = document.getElementsByClassName('title-custom')[0].innerHTML;

  musicLen = document.getElementsByClassName('slider-play')[0].getAttribute('max');

  if(music == '' && uploader == '') {
    music = "Viewing Home Page";
    uploader = "";
  } else {
    uploader = "Uploaded By " + uploader;
    if(parseInt(document.getElementsByClassName('slider-play')[0].getAttribute('value')) == 0) startTime = date.getTime();
    endTime = date.getTime() + (parseInt(musicLen) * 1000);
    console.log(endTime)
  }
}

setInterval(myOutsideHeavyLiftingFunction, 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "music",
    smallImageKey: "icon",
    smallImageText: "ZryteZene",
    details: music,
    state: uploader,
    startTimestamp: startTime,
    endTimestamp: endTime
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity(); 
  } else {
    presence.setActivity(presenceData);
  }
});

console.log("Test2"); 