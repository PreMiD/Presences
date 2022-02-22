interface Video {
  paused: boolean;
  duration: number;
  currentTime: number;
}

const presence = new Presence({ clientId: "944881674481713192" }),
  strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing",
    viewAnime: "general.viewAnime",
    watching: "general.watching",
    episode: "general.episode",
    watchEpisode: "general.buttonViewEpisode",
    anime: "general.anime"
  });

let video: Video;

presence.on("iFrameData", (msg: Video) => {
  video = msg;
});

presence.on("UpdateData", async () => {
  const title =
    document.querySelector('h1[class="title"]')?.textContent || null;
  const episode =
    document.querySelector('div[class="season-content active"] > span')
      ?.textContent || null;

  const presenceData: PresenceData = {
      largeImageKey: "logo", //(await strings).watching}
      details: `${(await strings).watching}	 ${title}`
    },
    page = location.href || document.URL;

  if (title && episode) {
    presenceData.state = `${(await strings).episode} ${episode}`;
    presenceData.buttons = [
      {
        label: (await strings).watchEpisode,
        url: document.URL.split("&")[0]
      },
      {
        label: (await strings).anime,
        url: page
      }
    ];
  } else {
    //Aranıyor
    presenceData.details = (await strings).browsing;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }

  if (video) {
    presenceData.smallImageKey = video.paused ? "paused" : "play";
    presenceData.smallImageText = video.paused
      ? (await strings).paused
      : (await strings).playing;

    if (!video.paused && video.duration) {
      [, presenceData.endTimestamp] = presence.getTimestamps(
        Math.floor(video.currentTime),
        Math.floor(video.duration)
      );
    }
  }

  presence.setActivity(presenceData);
});
