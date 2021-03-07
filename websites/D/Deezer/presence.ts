interface LangStrings {
  play: string;
  pause: string;
  viewAlbum: string;
  viewArtist: string;
  viewPodcast: string;
}

const presence = new Presence({
    clientId: "607651992567021580"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        viewAlbum: "general.buttonViewAlbum",
        viewArtist: "general.buttonViewArtist",
        viewPodcast: "general.buttonViewPodcast"
      },
      await presence.getSetting("lang")
    );
  };

let currentTime,
  duration,
  title,
  artist,
  episode,
  albumLink,
  artistLink,
  showLink,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const player = document.querySelector(".page-player"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (player) {
    artistLink = document.querySelector("div.marquee-content")
      .children[1] as HTMLAnchorElement;
    albumLink = document.querySelector("div.marquee-content")
      .children[0] as HTMLAnchorElement;

    const paused =
      document.querySelector(
        ".svg-icon-group-item:nth-child(3) .svg-icon-pause"
      ) === null;
    currentTime = document.querySelector(
      "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-current"
    ).textContent;
    duration = document.querySelector(
        "div.player-track > div.track-container > div.track-seekbar > div.slider.slider-autohide > div.slider-counter.slider-counter-max"
      ).textContent;

    const timestamps = presence.getTimestamps(
        presence.timestampFromFormat(currentTime),
        presence.timestampFromFormat(duration)
      ),
      show =
        document.querySelector(".track-link:nth-child(2)") === null
          ? true
          : false;

    if (!show) {
      title = document.querySelector(".track-link:nth-child(1)").textContent;
      artist = document.querySelector(".track-link:nth-child(2)").textContent;
      presenceData.details = title;
      presenceData.state = artist;
      presenceData.largeImageKey = "deezer";
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (buttons) {
        presenceData.buttons = [
          {
            label: (await strings).viewArtist,
            url: artistLink.href
          },
          {
            label: (await strings).viewAlbum,
            url: albumLink.href
          }
        ];
      }

      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      presence.setActivity(presenceData, !paused);
    } else {
      title = document
        .querySelector("div.marquee-content")
        .textContent.split(" · ")[1];
      episode = document
        .querySelector("div.marquee-content")
        .textContent.split(" · ")[0];
      showLink = albumLink = document.querySelector("div.marquee-content")
        .children[0] as HTMLAnchorElement;
      presenceData.details = title;
      presenceData.state = episode;
      presenceData.largeImageKey = "deezer";
      presenceData.smallImageKey = paused ? "pause" : "play";
      presenceData.smallImageText = paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (buttons) {
        presenceData.buttons = [
          {
            label: (await strings).viewPodcast,
            url: showLink.href
          }
        ];
      }
      if (paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      presence.setActivity(presenceData, !paused);
    }
  } else {
    const pathname = document.location.pathname,
      presenceData: PresenceData = {
        largeImageKey: "deezer"
      };
    if (pathname.includes("shows")) {
      presenceData.details = "Browsing...";
      presenceData.state = "Shows";
    } else if (pathname.includes("channels")) {
      presenceData.details = "Browsing...";
      presenceData.state = "Channels";
    } else if (pathname.includes("loved")) {
      presenceData.details = "Browsing...";
      presenceData.state = "User's Loved";
    } else if (pathname.includes("playlists")) {
      presenceData.details = "Browsing...";
      presenceData.state = "User's Playlists";
    } else if (pathname.includes("albums")) {
      presenceData.details = "Browsing...";
      presenceData.state = "User's Albums";
    } else if (pathname.includes("artists")) {
      presenceData.details = "Browsing...";
      presenceData.state = "User's Artists";
    } else if (pathname.includes("podcasts")) {
      presenceData.details = "Browsing...";
      presenceData.state = "User's Podcasts";
    } else if (pathname.includes("playlist")) {
      presenceData.details = "Looking at...";
      presenceData.state = "A Playlist";
    } else if (pathname.includes("album")) {
      presenceData.details = "Looking at...";
      presenceData.state = "An Album";
    } else if (pathname.includes("artist")) {
      presenceData.details = "Looking at...";
      presenceData.state = "An Artist";
    } else {
      presenceData.details = "Browsing...";
    }
    presence.setActivity(presenceData);
  }
});