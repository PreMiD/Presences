const presence = new Presence({
  clientId: "776479405009666098"
});

class VideoData {
  time: number;
  duration: number;
  paused: boolean;
}

let videoData: VideoData = null;

presence.on("iFrameData", (data: VideoData) => {
  videoData = data;
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "proxer_icon",
    details: "Idle",
    state: "Browsing Proxer.me"
  };

  if (document.location.pathname.startsWith("/watch")) {
    const name = getByXpath("//*[@class='wName']") || "Unknown Anime",
     ep = getByXpath("//*[@class='wEp']"),
     maxEp = getByXpath("//*[@id='wContainer']/tbody/tr[1]/td/text()[4]"),
     lang = getByXpath("//*[@class='wLanguage']"),
     now = Date.now() / 1000;

    presenceData.details = (videoData) ? (videoData.paused ? "Paused" : "Watching") : "Viewing";
    presenceData.details += ` ${name}`;

    presenceData.state = "";
    if (ep) {
      presenceData.state += ep;
      if (maxEp) {
        presenceData.state += maxEp;
      }
    }
    if (lang) {
      presenceData.state += `(${lang})`;
    }

    if (videoData) {
      presenceData.startTimestamp = Math.floor(now - videoData.time);
      presenceData.endTimestamp = Math.floor(now + videoData.duration - videoData.time);
    } else {
      presenceData.startTimestamp = browsingStamp;
    }
    /*
    // For the future to make watch together requests
    const id = /(?:\/watch\/)([0-9]*)\/([0-9]*)\/([a-z]*)/.exec(document.location.pathname);
    if (id.length == 3) {
      const animeId = id[0],
       epId = id[1],
       langId = id[2];
    }
    */
  } else if (document.location.pathname.startsWith("/chat")) {
    presenceData.details = "Chatting";
  } else if (document.location.pathname.startsWith("/forum")) {
    presenceData.details = "Checking the forum";
  } else if (document.location.pathname.startsWith("/anime/airing")) {
    presenceData.details = "Checking out Anime";
  } else if (document.location.pathname.startsWith("/season")) {
    presenceData.details = "Checking seasonal Anime";
  } else if (document.location.pathname.startsWith("/gallery")) {
    presenceData.details = "Checking the gallery";
  } else if (document.location.pathname.startsWith("/news")) {
    presenceData.details = "Checking the news";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

function getByXpath(xpath: string) {
  try {
    return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE,null).iterateNext().textContent;
  } catch (e) {
    return null;
  }
}
