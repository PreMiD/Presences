const presence = new Presence({
  clientId: "760186894477819914",
  injectOnComplete: true
}),
strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});

let music: string;
let uploader: string;
let date: Date;
let startTime: number;
let endTime: number;
let musicLen: string;

date = new Date();
startTime = date.getTime();

const slider = document.getElementsByClassName('slider-play')[0] as HTMLInputElement;

slider.addEventListener("change", () => {
  date = new Date();
  startTime = date.getTime();
  endTime = date.getTime() + ((parseInt(musicLen) - parseInt(slider.value)) * 1000);
});

document.getElementsByClassName('slider-play')[0].setAttribute('onchange', 'console.log(this.value)')

function myOutsideHeavyLiftingFunction(){
  uploader = document.getElementsByClassName('text-xs')[0].innerHTML;
  music = document.getElementsByClassName('title-custom')[0].innerHTML;

  musicLen = document.getElementsByClassName('slider-play')[0].getAttribute('max');

  if(music == '' && uploader == '') {
    music = "Viewing Home Page";
    uploader = "";
  } else {
    uploader = "Uploaded By " + uploader;
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
