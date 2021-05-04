interface LangStrings {
  play: string;
  pause: string;
  watch: string;
  search: string;
  searching: string;
  profile: string;
  article: string;
  reading: string;
  lyrics: string;
  viewLyrics: string;
  home: string;
  viewAlbum: string;
  buttonAlbum: string;
}

const presence = new Presence({
    clientId: "809133308604055622"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        watch: "general.watching",
        search: "general.searchFor",
        searching: "general.search",
        profile: "general.viewProfile",
        article: "general.readingArticle",
        reading: "general.reading",
        lyrics: "genius.lyrics",
        viewLyrics: "genius.viewLyrics",
        home: "genius.viewHome",
        viewAlbum: "genius.viewAlbum",
        buttonAlbum: "general.buttonViewAlbum"
      },
      await presence.getSetting("lang")
    );
  };

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang"),
    buttons = await presence.getSetting("buttons");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
      largeImageKey: "genius",
      startTimestamp: browsingStamp
    },
    path = document.location.pathname;

  if (path === "/") {
    presenceData.details = (await strings).home;
  } else if (path.startsWith("/a/")) {
    let article = document.querySelector("h1.article_title").textContent;
    if (article.length > 128) {
      article = article.substring(0, 125) + "...";
    }
    presenceData.details = (await strings).article;
    presenceData.state = article;
    presenceData.smallImageKey = "reading";
    presenceData.smallImageText = (await strings).reading;
  } else if (path.startsWith("/artists/")) {
    presenceData.details = (await strings).profile;
    presenceData.state = document
      .querySelector("h1.profile_identity-name_iq_and_role_icon")
      .innerHTML.split("<")[0];
  } else if (path.startsWith("/albums/")) {
    presenceData.details = (await strings).viewAlbum;
    presenceData.state = document.querySelector(
      "h1.header_with_cover_art-primary_info-title"
    ).textContent;
    if (buttons)
      presenceData.buttons = [
        {
          label: (await strings).buttonAlbum,
          url: document.URL
        }
      ];
  } else if (
    document.querySelector("div[class*='SongPageGrid']") !== null ||
    document.querySelector(".song_body-lyrics") !== null
  ) {
    const song =
        document
          .querySelector("h1[class*='SongHeader__Title-sc']")
          ?.textContent.trim() ||
        document
          .querySelector("h1.header_with_cover_art-primary_info-title")
          ?.textContent.trim(),
      artist =
        document
          .querySelector("a[class*='SongHeader__Artist']")
          ?.textContent.trim() ||
        document
          .querySelector("a.header_with_cover_art-primary_info-primary_artist")
          ?.textContent.trim();
    presenceData.details = (await strings).lyrics;
    presenceData.state = artist + " - " + song;
    if (buttons)
      presenceData.buttons = [
        {
          label: (await strings).viewLyrics,
          url: document.URL
        }
      ];
  } else if (
    document.querySelector(".profile_identity-name_iq_and_role_icon") !== null
  ) {
    presenceData.details = (await strings).profile;
    presenceData.state = document
      .querySelector("h1.profile_identity-name_iq_and_role_icon")
      .innerHTML.split("<")[0];
  } else if (path.startsWith("/videos/")) {
    const video: HTMLVideoElement = document.querySelector("video.vjs-tech");
    let title = document.querySelector("h1.article_title").textContent;
    if (title.length > 128) {
      title = title.substring(0, 125) + "...";
    }
    presenceData.details = (await strings).watch;
    presenceData.state = title;
    if (video && !isNaN(video.duration)) {
      const timestamps = presence.getTimestampsfromMedia(video);

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }
  } else if (path.startsWith("/search")) {
    presenceData.details = (await strings).search;
    presenceData.state = document.querySelector(
      "h2.search_results_page-header"
    ).textContent;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).searching;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
