var presence = new Presence({
    clientId: "640292045117980713"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

var browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
var playing: boolean;
var paused: boolean;
var progress: any;
var lastState: any;
var oldTitle: any;

var currentTime: any, duration: any;
var video: HTMLVideoElement, timestamps: any;

lastState = null;
oldTitle = null;

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "plutotv"
  };

  if (document.location.hostname == "pluto.tv") {
    if (document.location.pathname.includes("/live-tv/")) {
      progress = document.querySelector(
        "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.VideoControls__videoControls-irCOHX.frYEBe > div.VideoControls__bottomPanel-gpACgQ.jiJGDj > div > div > div > div"
      ); //Catches the progress bar
      progress = progress.style.cssText
        .replace("width: ", "")
        .replace("%;", ""); //Replace everything so only "x.xxxx" is left (x standing for numbers)

      //console.log("progress:" + progress); //Previews the progress in console
      //console.log("lastState:" + lastState); //Previews the lastState in console

      if (lastState == progress && progress !== "0" && progress !== "100") {
        //If the player doesnt equal to 0 or 100 but does equal to the latest request make paused true
        playing = true;
        paused = true;
      } else if (progress == "0" || progress == "100") {
        //If the player equals to 0 or 100 so that site information can be displayed because there is nothing playing
        playing = false;
        paused = true;
      } else {
        //Sets the last progress to the latest progress and playing true and paused false
        lastState = progress;
        playing = true;
        paused = false;
      }

      progress = Number(progress); //make progress from string to numbers
      progress = Math.round(progress); //Remove everything after "."

      //console.log("playing:" + playing);  //previews playing in console
      //console.log("paused:" + paused); //previews paused in console
    }

    if (playing == true && paused == false) {
      title = document.querySelector(
        "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI"
      );
      presenceData.details = title.innerText;
      presenceData.state = progress + "% progressed";
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";
    } else if (playing == true && paused == true) {
      title = document.querySelector(
        "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.NnGyI"
      );
      presenceData.details = title.innerText;
      presenceData.state = progress + "% progressed";
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";
    } else {
      //If there is no song playing display site information
      if (document.location.pathname.includes("/on-demand/movies/")) {
        video = document.querySelector(
          "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.Player__VideoWrapper-iChBud.eNibdw > div > div:nth-child(1) > div > div.container.chromeless.pointer-enabled > video"
        );
        currentTime = video.currentTime;
        duration = video.duration;
        paused = video.paused;
        timestamps = getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );
        if (!isNaN(duration)) {
          presenceData.smallImageKey = paused ? "pause" : "play";
          presenceData.smallImageText = paused
            ? (await strings).pause
            : (await strings).play;
          presenceData.startTimestamp = timestamps[0];
          presenceData.endTimestamp = timestamps[1];

          title = document.querySelector(
            "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
          );
          if (title == null) {
            title = document.querySelector(
              "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
            );
          }

          if (title == null && oldTitle !== null) {
            presenceData.details = oldTitle;
          } else {
            presenceData.details = title.textContent;
            oldTitle = title.textContent;
          }

          if (paused) {
            delete presenceData.startTimestamp;
            delete presenceData.endTimestamp;
          }
        } else if (isNaN(duration)) {
          presenceData.startTimestamp = browsingStamp;
          presenceData.details = "Looking at: ";
          title = document.querySelector(
            "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.ktRSHs > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
          );
          if (title == null) {
            title = document.querySelector(
              "#root > div.jss1.withHeader.withGuide > div.Player__Wrapper-kxPlPT.cCxNsj > div > div > div > div.PlayerOverlay__Wrapper-kMDJbl.dZAJEx > div > div > div.Overlay__copyWrapper-cCOfPR.dWHpCz > div.Overlay__title-kcjStc.krcxuL"
            );
          }
          if (title == null && oldTitle !== null) {
            presenceData.details = oldTitle;
          } else {
            presenceData.details = title.textContent;
            oldTitle = title.textContent;
          }

          presenceData.smallImageKey = "reading";
        }
      } else if (document.location.pathname.includes("/trending")) {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing what's trending";
      } else if (document.location.pathname.includes("/on-demand")) {
        presenceData.details = "Browsing on";
        presenceData.state = "demand shows...";
        presenceData.startTimestamp = browsingStamp;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
