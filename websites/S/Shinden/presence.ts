const presence = new Presence({
    clientId: "694885187116597309"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let iFrameVideo: boolean,
  currentTime: number,
  duration: number,
  paused: boolean,
  lastPlaybackState = false,
  playback: boolean,
  browsingStamp = Math.floor(Date.now() / 1000);

interface IFrameData {
  iframeVideo: {
    dur: number;
    iFrameVideo: boolean;
    paused: boolean;
    currTime: number;
  };
}

presence.on("iFrameData", (data: IFrameData) => {
  playback = data.iframeVideo.dur !== null ? true : false;
  if (playback) {
    ({ iFrameVideo, paused } = data.iframeVideo);
    currentTime = data.iframeVideo.currTime;
    duration = data.iframeVideo.dur;
  }
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "shinden"
  };

  presenceData.startTimestamp = browsingStamp;

  if (lastPlaybackState !== playback) {
    lastPlaybackState = playback;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (document.location.host === "shinden.pl") {
    if (
      document.location.pathname === "/" ||
      document.location.pathname === "/main"
    )
      presenceData.details = "Browsing...";
    else if (document.location.pathname.includes("/news/")) {
      if (document.querySelector(".box-title") !== null) {
        presenceData.details = "Reading article:";
        presenceData.state = document
          .querySelector(".box-title")
          .textContent.replace(
            document.querySelector(".box-title > span").textContent,
            ""
          )
          .replace(
            document.querySelector(".box-title > span:nth-child(2)")
              .textContent,
            ""
          );
        presenceData.smallImageKey = "reading";
      } else presenceData.details = "Viewing recent articles";
    } else if (document.location.pathname.includes("/series")) {
      if (document.querySelector(".page-title") !== null) {
        if (document.location.pathname.includes("/episodes"))
          presenceData.details = "Viewing episodes of serie:";
        else if (document.location.pathname.includes("/characters"))
          presenceData.details = "Viewing characters of serie:";
        else if (document.location.pathname.includes("/recommendations"))
          presenceData.details = "Viewing recommendations of serie:";
        else if (document.location.pathname.includes("/reviews"))
          presenceData.details = "Viewing reviews of serie:";
        else if (document.location.pathname.includes("/stats"))
          presenceData.details = "Viewing statistics of serie:";
        else presenceData.details = "Viewing serie:";

        presenceData.state = document
          .querySelector(".page-title")
          .textContent.replace("Anime: ", "");
      } else if (document.location.pathname.includes("/current"))
        presenceData.details = "Viewing the current series";
      else presenceData.details = "Browsing series...";
    } else if (document.location.pathname.includes("/episode")) {
      const serie = document.querySelector(".page-title").textContent;
      let episode = document
        .querySelector(".episode-head")
        .textContent.replace(
          document.querySelector(".episode-head> small").textContent,
          ""
        )
        .trim();
      episode = `${
        document.querySelector(".episode-head> small").textContent
      } ${episode}`;

      if (iFrameVideo === true && !isNaN(duration)) {
        presenceData.details = serie;
        presenceData.state = episode;

        const [startTimestamp, endTimestamp] = presence.getTimestamps(
          Math.floor(currentTime),
          Math.floor(duration)
        );

        presenceData.smallImageKey = paused ? "pause" : "play";
        presenceData.smallImageText = paused
          ? (await strings).pause
          : (await strings).play;
        presenceData.startTimestamp = startTimestamp;
        presenceData.endTimestamp = endTimestamp;

        if (paused) {
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      } else {
        presenceData.details = `Viewing episode: ${episode}`;
        presenceData.state = `of serie: ${serie}`;
      }
    } else if (document.location.pathname.includes("/manga")) {
      if (document.querySelector(".page-title") !== null) {
        if (document.location.pathname.includes("/chapters"))
          presenceData.details = "Viewing chapters of manga:";
        else if (document.location.pathname.includes("/characters"))
          presenceData.details = "Viewing characters of manga:";
        else if (document.location.pathname.includes("/recommendations"))
          presenceData.details = "Viewing recommendations of manga:";
        else if (document.location.pathname.includes("/reviews"))
          presenceData.details = "Viewing reviews of manga:";
        else if (document.location.pathname.includes("/stats"))
          presenceData.details = "Viewing statistics of manga:";
        else presenceData.details = "Viewing manga:";

        presenceData.state = document
          .querySelector(".page-title")
          .textContent.replace("Manga: ", "");
      } else presenceData.details = "Browsing mangas...";
    } else if (document.location.pathname.includes("/character")) {
      if (document.querySelector(".page-title") !== null) {
        presenceData.details = "Viewing character:";
        presenceData.state = document.querySelector(".page-title").textContent;
      } else presenceData.details = "Viewing characters";
    } else if (document.location.pathname.includes("/staff")) {
      if (document.querySelector(".page-title") !== null) {
        presenceData.details = "Viewing staff member:";
        presenceData.state = document.querySelector(".page-title").textContent;
      } else presenceData.details = "Viewing staff members";
    } else if (document.location.pathname.includes("/user")) {
      presenceData.details = "Viewing profile of:";
      presenceData.state = document.querySelector(
        ".user-navigation > li:nth-child(1) > strong"
      ).textContent;
    } else if (document.location.pathname.includes("/animelist"))
      presenceData.details = "Viewing their anime list";
    else if (document.location.pathname.includes("/mangalist"))
      presenceData.details = "Viewing their manga list";
  } else if (document.location.host === "forum.shinden.pl") {
    if (document.URL.includes("thread/")) {
      presenceData.details = "Reading thread:";
      presenceData.state = document.querySelector(
        "#content > div > div.pageContent > div.titleBar > h1"
      ).textContent;
    } else if (document.URL.includes("members/")) {
      presenceData.details = "Viewing user:";
      presenceData.state = document.querySelector(".username").textContent;
    } else if (document.URL === "https://forum.shinden.pl/index.php")
      presenceData.details = "Browsing forums...";
    else if (document.URL.includes("forums/")) {
      presenceData.details = "Viewing category:";
      presenceData.state = document.querySelector(
        "#content > div > div.pageContent > div.titleBar > h1"
      ).textContent;
    } else if (document.URL.includes("groups/")) {
      if (
        document.querySelector(
          "#content > div > div.pageContent > div.mainContainer > div > div.titleBar > h1"
        ) !== null
      ) {
        presenceData.details = "Viewing group:";
        presenceData.state = document
          .querySelector(
            "#content > div > div.pageContent > div.mainContainer > div > div.titleBar > h1"
          )
          .textContent.replace("Informacje - ", "");
      } else presenceData.details = "Viewing groups";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
