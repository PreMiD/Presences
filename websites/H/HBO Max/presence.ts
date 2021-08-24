const presence = new Presence({
    clientId: "720731927216259083"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function pathHandler(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "lg"
  },
    video: HTMLVideoElement = document.querySelector("video"),
    path = document.location.pathname;

  let titles, hasEpisode, timestamps;

  switch (true) {
    case path === "/profileSelect":
      Object.assign(data, {
        details: "Selecting a profile"
      });
      break;
    case path === "/search":
      Object.assign(data, {
        details: "Searching",
        smallImageKey: "search",
        smallImageText: (await strings).browsing
      });
      break;
    case !!video:
      titles = Array.from(document.querySelectorAll("[role=heading]:first-child span span"))
        .map(z => z.textContent)
        .filter(z => z.length > 1 && !/\d \/ \d+/.test(z)), // Test for "d / d" ex.: 01:45 / 01:30:00
      hasEpisode = titles.length > 1;

      timestamps = presence.getTimestampsfromMedia(video);

      Object.assign(data, {
        details: titles[0],
        state: hasEpisode ? titles[1] : "Watching movie",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play
      });
      if(!video.paused) {
        Object.assign(data, {
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        });
      }
      break;
    
    default: {
      Object.assign(data, { details: "Browsing" });
      switch (true) {
        case pathHandler(":page:home"):
          Object.assign(data, { state: "Home" });
          break;
      }
      break;
      //tbd: add more specific pages (optional/anyone can do so!)
    }
  }
  presence.setActivity(data);
});
