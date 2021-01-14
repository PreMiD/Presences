let currentTime, duration, paused, playback;
const presence = new Presence({
  clientId: "648938148050632745"
});

function getTimestamps(
  videoTime: number,
  videoDuration: number
): Array<number> {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "HelloYouLookingAtThisThisIsntRealHahaLOL"
  };

  const path = document.location.pathname;

  if (document.location.pathname.includes("/iplayer/")) {
    if (duration == null) {
      presenceData.details = document.querySelector(
        ".channel-panel-item__link__title.typo.typo--skylark.typo--bold"
      ).textContent;
      presenceData.state = document.querySelector(
        ".channel-panel-item__link__subtitle.typo.typo--canary"
      ).textContent;
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "Watching Live";
    } else {
      const timestamps = getTimestamps(
        Math.floor(currentTime),
        Math.floor(duration)
      );

      presenceData.details = document.querySelector(
        ".play-cta__title-container > span"
      ).textContent;
      presenceData.state = document.querySelector(
        ".typo.typo--skylark.play-cta__subtitle"
      ).textContent;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Paused";
      }
    }

    switch (path) {
      case "/iplayer/live/bbcthree":
        presenceData.largeImageKey = "bbcthree";
        break;
      case "/iplayer/live/bbcone":
        presenceData.largeImageKey = "bbcone";
        break;
      case "/iplayer/live/bbctwo":
        presenceData.largeImageKey = "bbctwo";
        break;
      case "/iplayer/live/bbcfour":
        presenceData.largeImageKey = "bbcfour";
        break;
      case "/iplayer/live/radio1":
        presenceData.largeImageKey = "radio1";
        break;
      case "/iplayer/live/cbbc":
        presenceData.largeImageKey = "cbbc";
        break;
      case "/iplayer/live/cbeebies":
        presenceData.largeImageKey = "cbeebies";
        break;
      case "/iplayer/live/bbcscotland":
        presenceData.largeImageKey = "bbcscotland";
        break;
      case "/iplayer/live/bbcnews":
        presenceData.largeImageKey = "bbcnews";
        break;
      case "/iplayer/live/bbcparliament":
        presenceData.largeImageKey = "bbcparliament";
        break;
      case "/iplayer/live/bbcalba":
        presenceData.largeImageKey = "bbcalba";
        break;
      case "/iplayer/live/s4c":
        presenceData.largeImageKey = "s4c";
        break;
      default:
        presenceData.largeImageKey = "bbciplayer";
    }

    if (document.location.pathname.includes("/iplayer/episode/")) {
      presenceData.largeImageKey = "bbciplayer";
    }
  } else if (path === "/iplayer") {
    presenceData.details = "Home Page";
    presenceData.largeImageKey = "bbciplayer";
  } else if (path === "/bbcone") {
    presenceData.details = "Browsing BBC One";
    presenceData.largeImageKey = "bbcone";
  } else if (path === "/bbctwo") {
    presenceData.details = "Browsing BBC Two";
    presenceData.largeImageKey = "bbctwo";
  } else if (path === "/tv/bbcthree") {
    presenceData.details = "Browsing BBC Three";
    presenceData.largeImageKey = "bbcthree";
  } else if (path === "/bbcfour") {
    presenceData.details = "Browsing BBC Four";
    presenceData.largeImageKey = "bbcfour";
  } else if (path === "/tv/radio1") {
    presenceData.details = "Browsing Radio 1";
    presenceData.largeImageKey = "radio1";
  } else if (path === "/tv/cbbc") {
    presenceData.details = "Browsing CBBC";
    presenceData.largeImageKey = "cbbc";
  } else if (path === "/tv/cbeebies") {
    presenceData.details = "Browsing Cbeebies";
    presenceData.largeImageKey = "cbeebies";
  } else if (path === "/tv/bbcscotland") {
    presenceData.details = "Browsing BBC Scotland";
    presenceData.largeImageKey = "bbcscotland";
  } else if (path === "/tv/bbcnews") {
    presenceData.details = "Browsing BBC News";
    presenceData.largeImageKey = "bbcnews";
  } else if (path === "/tv/bbcparliament") {
    presenceData.details = "Browsing BBC Parliament";
    presenceData.largeImageKey = "bbcparliament";
  } else if (path === "/tv/bbcalba") {
    presenceData.details = "Browsing BBC Alba";
    presenceData.largeImageKey = "bbcalba";
  } else if (path === "/tv/s4c") {
    presenceData.details = "Browsing S4C";
    presenceData.largeImageKey = "s4c";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
