const presence = new Presence({
    clientId: "865625724911616050"
  }), 
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

var browsingStamp = Math.floor(Date.now() / 1000);
var isTitleChecked = false;
var title: string, isPlayerPlaying: boolean, currentTime: number, duration: number

function unescapeHtml(str: string) {
  if (str == null) {
   return "";
  }
  return str
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'");
}

presence.on("iFrameData", (data: { isPlayerPlaying: boolean; currentTime: number; duration: number; }) => {
  isPlayerPlaying = data.isPlayerPlaying,
  currentTime = data.currentTime,
  duration = data.duration
});

presence.on("UpdateData", async () => {

  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/megastudy.asp" || document.location.pathname == "/") {
    presenceData.details = "홈 화면"
    presenceData.startTimestamp = browsingStamp

  } else if (document.location.pathname.includes("Player")) {

    presenceData.details = unescapeHtml(document.querySelector(".txt").innerHTML)

    if (!isTitleChecked) {
      try {
        title = unescapeHtml(document.querySelector("tr.on td").innerHTML)
        isTitleChecked = true
      } catch(e) {
        title = "[수강정보]를 클릭하여 주세요"
      }
    }

    presenceData.state = title

    if (isPlayerPlaying) {
      const [, endTimestamp] = presence.getTimestamps(currentTime, duration);
      presenceData.endTimestamp = endTimestamp
      presenceData.smallImageKey = "play"
      presenceData.smallImageText = (await strings).play
    } else {
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause"
      presenceData.smallImageText = (await strings).pause
    }

  } else if (document.location.pathname.includes("my_std_room/main.asp")) {
    presenceData.details = "내 강의실"
    presenceData.startTimestamp = browsingStamp
    
  } else if (document.location.pathname.includes("my_std_room/detail.asp")) {
    presenceData.details = unescapeHtml(document.querySelector(".name").innerHTML)
    presenceData.state = unescapeHtml(document.querySelector("h4").innerHTML)
    presenceData.startTimestamp = browsingStamp

  } else {
    presenceData.details = "합격 불변의 법칙"
    presenceData.startTimestamp = browsingStamp
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});