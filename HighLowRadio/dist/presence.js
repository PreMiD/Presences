let presence = new Presence({
  clientId: "689131326779031563",
});

setInterval(newStats, 1000);
newStats();

function newStats() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      strack = data.now_playing.song.title;
      sartist = data.now_playing.song.artist;
      slisteners = data.listeners.total;
      slive = data.live.is_live;
      sDJ = data.live.streamer_name;
      sduration = data.now_playing.duration;
      selapsed = data.now_playing.elapsed;
    }
  };
  xhttp.open("GET", "https://live.highlowradio.co.uk/api/nowplaying/1", true);
  xhttp.withCredentials = true;
  xhttp.send();
}

let browsingStamp = Math.floor(Date.now() / 1000);
let lastTitle;
let lastTimeStart = Math.floor(Date.now() / 1000);
let lastDetails;
let lastDetailsTimeStart = Math.floor(Date.now() / 1000);

presence.on("UpdateData", function () {
  let presenceData = {
    largeImageKey: "hlr",
  };

  if (document.location.host == "blog.highlowradio.co.uk") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    if (document.location.pathname.includes("/read")) {
      presenceData.details = "Reading article:";
      presenceData.state = document.querySelector(".blogt").textContent;
    } else {
      presenceData.details = "Viewing the recent";
      presenceData.state = "blog posts";
    }
  } else if (document.location.host == "status.highlowradio.co.uk") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Viewing HighLowRadio's";
    presenceData.state = "Server status";
  } else {
    if (
      document.querySelector("#pause") !== null &&
      document.querySelector("#pause").style.cssText == "display: none;"
    ) {
      presenceData.smallImageKey = "reading";

      if (
        document.querySelector(
          "#content > div > div:nth-child(1) > div > p"
        ) !== null
      ) {
        switch (
          document.querySelector("#content > div > div:nth-child(1) > div > p")
            .textContent
        ) {
          case "Team":
            presenceData.details = "Viewing the staff team";
            break;
          case "Timetable":
            presenceData.details = "Viewing the timetable";
            break;
          case "About us!":
            presenceData.details = "Reading about HighLowRadio";
            break;
          case "Partners of HighLow Radio.":
            presenceData.details = "Viewing HighLowRadio's partners";
            break;
          default:
            presenceData.details = "Viewing HighLowRadio's licensing";
            break;
        }
      } else if (
        document.querySelector(".btn.btn-primary.btn-block") !== null
      ) {
        switch (document.querySelector(".btn.btn-primary.btn-block").value) {
          case "Send Suggestion!":
            presenceData.details = "Writing a suggestion...";
            presenceData.smallImageKey = "writing";
            break;
          case "Send Message!":
            presenceData.details = "Contacting HighLowRadio...";
            presenceData.smallImageKey = "writing";
            break;
          case "Submit Application!":
            let job;
            switch (
              document.querySelector(
                "#content > div > div > div > form > p:nth-child(3)"
              ).textContent
            ) {
              case "Streaming Platform:":
                job = "Official Streamer";
                break;
              case "Your E-Mail:":
                job = "Blogging and Research team";
                break;
              default:
                job = "DJ/Presenter";
                break;
            }
            presenceData.details = "Applying for " + job;
            presenceData.smallImageKey = "writing";
            break;
        }
      } else {
        presenceData.details = "Viewing homepage";
      }

      if (lastDetails != presenceData.details) {
        lastDetails = presence.details;
        lastDetailsTimeStart = Math.floor(Date.now() / 1000);
      }

      presenceData.startTimestamp = lastDetailsTimeStart;
    } else {
      if (sduration == 0) {
        if (lastTitle != strack) {
          lastTitle = strack;
          lastTimeStart = Math.floor(Date.now() / 1000);
        }

        presenceData.startTimestamp = lastTimeStart;
      } else {
        let timestamps = getTimestamps(
          Math.floor(selapsed),
          Math.floor(sduration)
        );

        presenceData.startTimestamp = timestamps[0];
        presenceData.endTimestamp = timestamps[1];
      }

      if (slive) {
        presenceData.details = strack + " - " + sartist;
        presenceData.state = "Listening to " + sDJ;
      } else {
        presenceData.details = strack;
        presenceData.state = "by: " + sartist;
      }
      presenceData.smallImageText = "Listeners: " + slisteners;
      presenceData.smallImageKey = "play";
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
  let startTime = Date.now();
  let endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
