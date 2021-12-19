const presence = new Presence({
    clientId: "543380687466528772"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  urlpath = document.location.pathname.split("/"),
  getElement = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent;
  },
  getEpisode = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent.split("-E")[1];
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "icon",
      details: "Idle"
    },
    path = document.location.pathname.toLowerCase();

  // Main Site

  if (path === "/en") {
    presenceData.smallImageKey = "idle";
    presenceData.details = "Currently browsing";
    presenceData.state = "Homepage";
  } else if (path.startsWith("/en/play")) {
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "Watching a show";
    presenceData.details = getElement("h1.video-info__title");
    presenceData.state = `Episode ${getEpisode("title")}`;
    presenceData.startTimestamp = browsingStamp;
    presenceData.buttons = [
      {
        label: "Watch this show",
        url: `https://www.bilibili.tv/en/play/${urlpath[3]}`
      }
    ];
  } else if (path.startsWith("/en/video")) {
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "Watching a video";
    presenceData.details = getElement("h1.video-info__title");
    presenceData.state = `by ${getElement(".video-info__creator--nickname")}`;
    presenceData.startTimestamp = browsingStamp;
    presenceData.buttons = [
      {
        label: "Watch this video",
        url: `https://www.bilibili.tv/en/video/${urlpath[3]}`
      }
    ];
  } else if (path.startsWith("/en/space")) {
    presenceData.smallImageText = "Viewing Space";
    presenceData.details = `Viewing ${getElement("h1.user-title")}`;
    presenceData.state = getElement("p.user-data__number");
    presenceData.buttons = [
      {
        label: "View this creator",
        url: `https://www.bilibili.tv/en/space/${urlpath[3]}`
      }
    ];
  } else if (path.startsWith("/en/index")) {
    presenceData.details = "Finding a show";
    presenceData.state = "Index";
  } else if (path.startsWith("/en/popular")) {
    presenceData.details = "Finding popular videos";
    presenceData.state = "Videos";
  } else if (path.startsWith("/en/history")) {
    presenceData.details = "Looking at their history";
    presenceData.state = "History";
  } else if (path.startsWith("/en/download")) {
    presenceData.details = "App Download";
    presenceData.state = "Download";
  }

  // Studio
  if (document.location.hostname === "studio.bilibili.tv") {
    if (path.startsWith("/archive/new")) {
      presenceData.details = "Uploading a video";
      presenceData.state = "Bilibili Studio";
    } else if (path.startsWith("/archive-list")) {
      presenceData.details = "Viewing uploaded videos";
      presenceData.state = "Bilibili Studio";
    } else if (path.startsWith("/data-analysis")) {
      presenceData.details = "Checking analytics";
      presenceData.state = "Bilibili Studio";
    } else if (path.startsWith("/reply")) {
      presenceData.details = "Replying to comments";
      presenceData.state = "Bilibili Studio";
    } else {
      presenceData.details = "Viewing dashboard";
      presenceData.state = "Bilibili Studio";
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
