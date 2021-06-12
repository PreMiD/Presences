interface Video {
  paused: boolean;
  duration: number;
  currentTime: number;
}

const presence = new Presence({ clientId: "666074265233260555" }), 
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    viewAnime: "general.viewAnime",
    watching: "general.watching",
    episode: "general.episode",
    watchEpisode: "general.buttonViewEpisode",
    anime: "general.anime",
  }), 
  startTimestamp = Math.floor(Date.now() / 1000);

let video: Video;

presence.on("iFrameData", (msg: Video) => {
  video = msg;
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "turkanime"
  },
  title = document.querySelector(
    "#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(1) > a"
  )?.textContent.trim() || null,
  ep = document.querySelector(
    "#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(2) > a"
  )?.textContent.trim(),
  animeTitle = document.querySelector('#detayPaylas > div > div.panel-ust > div')?.textContent.trim(),
  animePage = document.querySelector('#arkaplan > div:nth-child(3) > div.col-xs-8 > div > div:nth-child(3) > div > div.panel-ust > ol > li:nth-child(1) > a')?.getAttribute('href') || document.URL;

  // Series & Movies
  if (title && ep) {
    const epNum = ep.match(/[0-9]+\. Bölüm/g);

    presenceData.details = `${(await strings).watching} ${title}`;
    if (epNum) presenceData.state = `${(await strings).episode} ${epNum[0].split('.')[0]}`;

    presenceData.buttons = [
      {
        label: (await strings).watchEpisode,
        url: document.URL.split("&")[0]
      },
      {
        label: (await strings).anime,
        url: `https://www.turkanime.net/${animePage}`
      }
    ];
  }
  // About Anime Page
  else if (window.location.pathname.startsWith("/anime/") && animeTitle) {
    presenceData.details = (await strings).viewAnime;
    presenceData.state = animeTitle;
    presenceData.buttons = [
      {
        label: (await strings).anime,
        url: animePage
      }
    ];
  }
  // Browsing
  else {
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = startTimestamp;
  }

  if (video) {
    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      const timestamps = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    }
  }

  presence.setActivity(presenceData);
});
