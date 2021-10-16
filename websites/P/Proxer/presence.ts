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
    },
    path = document.location.pathname;

  if (path.startsWith("/watch")) {
    const name =
        getByXpath(
          "//*[@id='wContainer']//*[@class='wName']",
          (e) => e.textContent
        ) || "Unknown Anime",
      ep = getByXpath(
        "//*[@id='wContainer']//*[@class='wEp']",
        (e) => e.textContent
      ),
      maxEp = getByXpath("//*[@id='wContainer']//*[@class='wEp']", (e) =>
        e.nextSibling.textContent.substr(1).trim()
      ),
      lang = getByXpath(
        "//*[@id='wContainer']//*[@class='wLanguage']",
        (e) => e.textContent
      ),
      missing = getByXpath(
        "//*[@id='wContainer']//*[@class='wStream']/div/@style",
        (e) => e.textContent.includes("/images/misc/streamfehlt.png")
      ),
      now = Date.now() / 1000;

    if (videoData) {
      if (!videoData.paused) {
        presenceData.details = "Watching";
        presenceData.startTimestamp = Math.floor(now - videoData.time);
        presenceData.endTimestamp = Math.floor(
          now + videoData.duration - videoData.time
        );
      } else presenceData.details = "Paused";
    } else {
      if (missing) presenceData.details = "Awaiting";
      else {
        presenceData.details = "Watching";
        presenceData.startTimestamp = browsingStamp;
      }
    }
    presenceData.details += ` ${name}`;

    presenceData.state = "";
    if (ep) {
      presenceData.state += ep;
      if (maxEp) presenceData.state += `/${maxEp}`;

      if (lang) presenceData.state += ` (${lang})`;
    }
    /*
    // For the future to make watch together requests
    const id = /(?:\/watch\/)([0-9]*)\/([0-9]*)\/([a-z]*)/.exec(path);
    if (id.length == 3) {
      const animeId = id[0],
       epId = id[1],
       langId = id[2];
    }
    */
  } else if (path.startsWith("/info")) {
    const info = document.title.replace(/ - Proxer\.Me$/, "");
    presenceData.details = `Checking out ${info}`;
  } else if (path.startsWith("/anime") || path.startsWith("/season"))
    presenceData.details = "Checking out Anime";
  else if (path.startsWith("/chat")) presenceData.details = "Chatting";
  else if (path.startsWith("/forum"))
    presenceData.details = "Checking the forum";
  else if (path.startsWith("/gallery"))
    presenceData.details = "Checking the gallery";
  else if (path.startsWith("/news")) presenceData.details = "Checking the news";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});

function getByXpath<T>(xpath: string, extractor?: (e: Node) => T): T | Node {
  const transformer =
    extractor ||
    function (e: Node) {
      return e;
    };
  try {
    return transformer(
      document
        .evaluate(xpath, document, null, XPathResult.ANY_TYPE, null)
        .iterateNext()
    );
  } catch (e) {
    return null;
  }
}
