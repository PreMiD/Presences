const presence = new Presence({
    clientId: "879535934977245244"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  slugs: { [key: string]: string } = {
    home: "Home",
    series: "Series",
    movies: "Movies",
    originals: "Originals",
    "just-added": "Just Added",
    "last-chance": "Last Chance",
    "coming-soon": "Coming Soon",
    trending: "Trending Now",
    action: "Action",
    animation: "Animation",
    comedy: "Comedy",
    crime: "Crime",
    documentaries: "Documentaries",
    drama: "Drama",
    "fantasy-sci-fi": "Fantasy & Sci-Fi",
    horror: "Horror",
    international: "International",
    kids: "Kids & Family",
    latino: "Latino",
    music: "Music",
    "news-talk": "News/Talk",
    reality: "Reality",
    romance: "Romance",
    shorts: "Shorts",
    sports: "Sports",
    suspense: "Suspense",
    "audio-description": "Audio Description",
    hbo: "HBO",
    "max-originals": "Max Originals",
    dc: "DC",
    "classics-curated-by-tcm": "Classics Curated by TCM",
    "adult-swim": "Adult Swim",
    "studio-ghibli": "Studio Ghibli",
    "cartoon-network": "Cartoon Network",
    "sesame-workshop": "Sesame Workshop",
    "looney-tunes": "Looney Tunes",
    crunchyroll: "Crunchyroll Collection"
  };

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "lg"
    },
    video: HTMLVideoElement = document.querySelector("video"),
    path = document.location.pathname;

  let titles, hasEpisode, timestamps, pageSlug;

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
      (titles = Array.from(
        document.querySelectorAll("[role=heading]:first-child span span")
      )
        .map((z) => z.textContent)
        .filter((z) => z.length > 1 && !/\d \/ \d+/.test(z))), // Test for "d / d" ex.: 01:45 / 01:30:00
        (hasEpisode = titles.length > 1);

      timestamps = presence.getTimestampsfromMedia(video);

      Object.assign(data, {
        details: titles[0],
        state: hasEpisode ? titles[1] : "Watching movie",
        smallImageKey: video.paused ? "pause" : "play",
        smallImageText: video.paused
          ? (await strings).pause
          : (await strings).play
      });
      if (!video.paused) {
        Object.assign(data, {
          startTimestamp: timestamps[0],
          endTimestamp: timestamps[1]
        });
      }
      break;

    default: {
      Object.assign(data, { details: "Browsing" });
      pageSlug = Object.keys(slugs).find((z) =>
        window.location.href.includes(`:page:${z}`)
      );

      if (pageSlug) Object.assign(data, { state: slugs[pageSlug] });

      break;
    }
  }
  presence.setActivity(data);
});
