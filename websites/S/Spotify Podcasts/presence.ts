const presence = new Presence({
    clientId: "619561001234464789",
    injectOnComplete: true
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: string,
  uploader: string,
  search: HTMLInputElement,
  playback: boolean,
  recentlyCleared = 0;

interface LangStrings {
  play: string;
  pause: string;
  featured: string;
  bestPodcasts: string;
  charts: string;
  genres: string;
  latest: string;
  discover: string;
  browse: string;
  podcastLike: string;
  artistLike: string;
  albumLike: string;
  songLike: string;
  forMeh: string;
  playlist: string;
  viewPlaylist: string;
  download: string;
  viewing: string;
  account: string;
  search: string;
  searchFor: string;
  searchSomething: string;
  browsing: string;
  listening: string;
  show: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      featured: "spotify.featured",
      bestPodcasts: "spotify.bestPodcasts",
      charts: "spotify.charts",
      genres: "spotify.genres",
      latest: "spotify.latest",
      discover: "spotify.discover",
      browse: "spotify.browse",
      podcastLike: "spotify.podcastsLike",
      artistLike: "spotify.artistsLike",
      albumLike: "spotify.albumLike",
      songLike: "spotify.songsLike",
      forMeh: "spotify.madeForYou",
      playlist: "spotify.playlists",
      viewPlaylist: "general.viewPlaylist",
      download: "spotify.download",
      viewing: "general.viewing",
      account: "general.viewAccount",
      search: "general.search",
      searchFor: "general.searchFor",
      searchSomething: "general.searchSomething",
      browsing: "general.browsing",
      listening: "general.listeningMusic",
      show: "general.viewShow"
    },
    await presence.getSetting("lang")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  //* Update strings if user selected another language.
  const newLang = await presence.getSetting("lang"),
    privacy = await presence.getSetting("privacy"),
    time = await presence.getSetting("time");
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
      largeImageKey: "spotify"
    },
    video: HTMLLinkElement = document.querySelector(
      "div.now-playing > div > div > a"
    );

  if (video !== null) {
    if (video.href.includes("/show/")) {
      playback = true;
    } else {
      playback = false;
    }
  } else {
    playback = false;
  }

  let searching = false;

  if (!playback) {
    if (time) presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    if (document.location.hostname === "open.spotify.com") {
      if (document.location.pathname.includes("browse/featured")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).featured;
      } else if (document.location.pathname.includes("browse/podcasts")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).bestPodcasts;
      } else if (document.location.pathname.includes("browse/charts")) {
        presenceData.details = (await strings).charts;
      } else if (document.location.pathname.includes("browse/genres")) {
        presenceData.details = (await strings).genres;
      } else if (document.location.pathname.includes("browse/newreleases")) {
        presenceData.details = (await strings).latest;
      } else if (document.location.pathname.includes("browse/discover")) {
        presenceData.details = (await strings).discover;
      } else if (document.location.pathname.includes("/search/")) {
        search = document.querySelector("input");
        searching = true;
        presenceData.details = (await strings).searchFor;
        presenceData.state = search.value;
        if (search.value.length <= 3) {
          presenceData.state = "something...";
        }
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("/search")) {
        searching = true;
        presenceData.details = (await strings).search;
        presenceData.smallImageKey = "search";
      } else if (document.location.pathname.includes("collection/playlists")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).playlist;
      } else if (
        document.location.pathname.includes("collection/made-for-you")
      ) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).forMeh;
      } else if (document.location.pathname.includes("collection/tracks")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).songLike;
      } else if (document.location.pathname.includes("collection/albums")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).albumLike;
      } else if (document.location.pathname.includes("collection/artists")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).artistLike;
      } else if (document.location.pathname.includes("collection/podcasts")) {
        presenceData.details = (await strings).browse;
        presenceData.state = (await strings).podcastLike;
      } else if (document.location.pathname.includes("/playlist/")) {
        title = document.querySelector(
          "div.main-view-container__scroll-node-child > section > div > div > span > button > h1"
        ).textContent;
        presenceData.details = (await strings).viewPlaylist;
        presenceData.state = title;
        delete presenceData.smallImageKey;
      } else if (document.location.pathname.includes("/show/")) {
        title = document.querySelector(
          "div.main-view-container__scroll-node-child > section > div > div > h1"
        ).textContent;
        presenceData.details = (await strings).show;
        presenceData.state = title;
        delete presenceData.smallImageKey;
      } else if (document.location.pathname.includes("/settings")) {
        presenceData.details = (await strings).account;
        delete presenceData.smallImageKey;
      }
    } else if (document.location.hostname == "support.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Support Center";
    } else if (document.location.hostname == "investors.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Support Center";
    } else if (document.location.hostname == "developer.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Spotify for Developers";
    } else if (document.location.hostname == "artists.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Spotify for Artists";
    } else if (document.location.hostname == "newsroom.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Spotify for Newsroom";
    } else if (document.location.hostname == "podcasters.spotify.com") {
      presenceData.details = (await strings).browse;
      presenceData.state = "Spotify for Podcasters";
    } else if (document.location.hostname == "www.spotify.com") {
      if (document.location.pathname.includes("/premium")) {
        presenceData.details = (await strings).viewing;
        presenceData.state = "Spotify Premium";
        delete presenceData.smallImageKey;
      } else if (document.location.pathname.includes("/download")) {
        presenceData.details = (await strings).download;
        presenceData.smallImageKey = "downloading";
      } else if (document.location.pathname.includes("/account")) {
        presenceData.details = (await strings).account;
        delete presenceData.smallImageKey;
      }
    }
    const control = document.querySelector(
      "div.player-controls__buttons > button:nth-child(3)"
    ) as HTMLButtonElement;
    if (
      document.querySelector(".now-playing-bar-hidden") !== null ||
      control === null ||
      control.dataset.testid === "control-button-play"
    ) {
      if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
      } else {
        if (privacy) {
          if (searching) {
            presenceData.details = (await strings).searchSomething;
            delete presenceData.state;
          } else {
            presenceData.details = (await strings).browsing;
            delete presenceData.state;
            delete presenceData.smallImageKey;
          }
          presence.setActivity(presenceData);
        } else {
          presence.setActivity(presenceData);
        }
      }
    } else {
      if (recentlyCleared < Date.now() - 1000) {
        presence.clearActivity();
      }
      recentlyCleared = Date.now();
    }
  } else {
    const currentTime = presence.timestampFromFormat(
        document.querySelector(".playback-bar__progress-time:nth-child(1)")
          .textContent
      ),
      duration = presence.timestampFromFormat(
        document.querySelector(".playback-bar__progress-time:nth-child(3)")
          .textContent
      ),
      timestamps = presence.getTimestamps(currentTime, duration);

    let pause: boolean;

    if (
      (document.querySelector(
        "div.player-controls__buttons > button:nth-child(3)"
      ) as HTMLButtonElement).dataset.testid === "control-button-play"
    ) {
      pause = true;
    } else {
      pause = false;
    }

    presenceData.smallImageKey = pause ? "pause" : "play";
    presenceData.smallImageText = pause
      ? (await strings).pause
      : (await strings).play;
    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (pause || !time) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
    title = document.querySelector(
      "div.now-playing > div:nth-child(2) > div:nth-child(1)"
    ).textContent;
    uploader = document.querySelector(
      "div.now-playing > div:nth-child(2) > div:nth-child(2)"
    ).textContent;
    presenceData.details = title;
    presenceData.state = uploader;

    if (privacy) {
      presenceData.details = (await strings).listening;
      delete presenceData.state;
    }

    if (title !== null && uploader !== null) {
      presence.setActivity(presenceData);
    } else {
      presence.error("Error while getting podcast name and title");
    }
  }
});
