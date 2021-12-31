const presence = new Presence({
  clientId: "607651992567021580"
});

let oldLang: string = null;

presence.on("UpdateData", async () => {
  let presenceData: PresenceData = {
      largeImageKey: "deezer"
    },
    strings = await getStrings(),
    paused = false;

  const [buttons, newLang] = await Promise.all([
    presence.getSetting<boolean>("buttons"),
    presence.getSetting<string>("lang").catch(() => "en")
  ]);

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = await getStrings();
  }

  const pages: Record<string, PresenceData> = {
    shows: {
      details: "Browsing shows"
    },
    channels: {
      details: "Browsing channels"
    },
    loved: {
      details: "Browsing user's loved"
    },
    playlists: {
      details: "Browsing user's playlists"
    },
    albums: {
      details: "Browsing user's albums"
    },
    artists: {
      details: "Browsing user's artists"
    },
    podcasts: {
      details: "Browsing user's podcasts"
    },
    playlist: {
      details: "Looking at a playlist"
    },
    album: {
      details: "Looking at an album"
    },
    artist: {
      details: "Looking at an artist"
    }
  };

  for (const [path, data] of Object.entries(pages)) {
    if (location.pathname.includes(path))
      presenceData = { ...presenceData, ...data };
  }

  if (document.querySelector(".page-player")) {
    const [albumLink, artistLink] = document.querySelector<HTMLAnchorElement>(
        "div.marquee-content"
      ).children,
      currentTime = document.querySelector(
        "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-current"
      ).textContent,
      duration = document.querySelector(
        "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-max"
      ).textContent,
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(duration)
      );

    if (
      document
        .querySelector(
          "#page_player > div > div.player-controls > ul > li:nth-child(3) > button > svg > g > path"
        )
        .outerHTML.match('<path d="m5 2 18 10L5 22V2z"></path>')
    )
      paused = true;

    if (document.querySelector(".track-link:nth-child(2)")) {
      presenceData.details = document.querySelector(
        ".track-link:nth-child(1)"
      ).textContent;
      presenceData.state = document.querySelector(
        ".track-link:nth-child(2)"
      ).textContent;
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? strings.pause : strings.play;
      [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (buttons) {
        presenceData.buttons = [
          {
            label: strings.viewArtist,
            url: (artistLink as HTMLAnchorElement).href
          },
          {
            label: strings.viewAlbum,
            url: (albumLink as HTMLAnchorElement).href
          }
        ];
      }
    } else {
      const [podcastLink] = document.querySelector<HTMLAnchorElement>(
        "div.marquee-content"
      ).children;
      [presenceData.state, presenceData.details] = document
        .querySelector("div.marquee-content")
        .textContent.split(" · ");
      presenceData.largeImageKey = "deezer";
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused ? strings.pause : strings.play;
      [presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (podcastLink && buttons) {
        presenceData.buttons = [
          {
            label: (await strings).viewPodcast,
            url: (podcastLink as HTMLAnchorElement).href
          }
        ];
      }
    }
  }

  presence.setActivity(presenceData);
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      viewAlbum: "general.buttonViewAlbum",
      viewArtist: "general.buttonViewArtist",
      viewPodcast: "general.buttonViewPodcast"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}
