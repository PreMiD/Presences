const presence = new Presence({
    clientId: "815947069117169684"
  }),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        episode: "general.episode",
        searchFor: "general.searchFor",
        watchVideo: "general.buttonWatchVideo",
        viewPage: "general.viewPage",
        viewingShow: "general.viewShow",
        viewingMovie: "general.viewMovie",
        watchMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode",
        searching: "general.search"
      },
      await presence.getSetting("lang")
    ),
  browsingStamp = Math.floor(Date.now() / 1000),
  oldPath = document.location.pathname;

let strings = getStrings(),
  oldLang: string = null,
  videoData: VideoData = null,
  episodeData: EpisodeData = null,
  title: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      details: (await strings).browse,
      smallImageKey: "reading",
      startTimestamp: browsingStamp
    },
    newLang = await presence.getSetting("lang"),
    buttonsOn = await presence.getSetting("buttons"),
    searchQueryOn = await presence.getSetting("searchQ"),
    PresenceLogo: number = await presence.getSetting("logo"),
    logos = ["viu_logo", "viu_logo_text"];

  presenceData.largeImageKey = logos[PresenceLogo];

  if (oldPath !== document.location.pathname) {
    episodeData = null;
    title = null;
  }

  videoData ??= await presence.getPageletiable("GA_DIMENSIONS");

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/vod/")) {
    const video = document.querySelector("video"),
      isMovie = (
        document.getElementsByName("keywords")[0] as HTMLMetaElement
      ).content
        .split(", ")
        .some((keyword) => keyword.toLowerCase().includes("movie"));

    if (video) {
      const timestamp = presence.getTimestampsfromMedia(video).pop(),
        episode = videoData.dimension2,
        episodeName = document.querySelector(
          "h3.video-update-epi-name"
        ).textContent,
        episodeNameRegex = new RegExp(videoData.dimension1),
        hasEpName = episodeName.match(/([1-9]?[0-9]?[0-9])/)
          ? episode !== episodeName.match(/([1-9]?[0-9]?[0-9])/)[0] &&
            !episodeNameRegex.test(episodeName)
          : true,
        part = episodeName.match(/([1-9]\/[1-9])/g),
        isTrailer = videoData.dimension1.match(/(trailer?:? )/i) ? true : false,
        isHighlight = videoData.dimension1.match(/(highlight?:? )/i)
          ? true
          : false;

      presenceData.details = videoData.dimension1.replace(
        /(trailer?:? |highlight?:? )/i,
        ""
      );

      if (isMovie) presenceData.state = "Movie";
      else if (isHighlight) {
        presenceData.state = `Highlight • EP.${episode}${
          part ? ` • ${part[0]} ` : ""
        }${hasEpName ? ` • ${episodeName}` : ""}`;
      } else if (isTrailer) {
        presenceData.state = `Trailer • EP.${episode}${
          part ? ` • ${part[0]} ` : ""
        }${hasEpName ? ` • ${episodeName}` : ""}`;
      } else {
        presenceData.state = `EP.${episode}${part ? ` • ${part[0]} ` : ""}${
          hasEpName ? ` • ${episodeName}` : ""
        }`;
      }

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.endTimestamp = timestamp;

      if (buttonsOn) {
        presenceData.buttons = [
          {
            label: isMovie
              ? (await strings).watchMovie
              : (await strings).watchEpisode,
            url: document.baseURI
          }
        ];
      }

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = isMovie
        ? (await strings).viewingMovie
        : (await strings).viewingShow;

      presenceData.state = videoData.dimension1;
    }
  } else if (document.location.pathname.match(/[/]video-.*/)) {
    const video = document.querySelector("video"),
      isMovie = !document.querySelector('[data-testid="Tab1"]');
    let unknownType = false;

    if (video) {
      const timestamp = presence.getTimestampsfromMedia(video).pop();

      if (!episodeData && !isMovie) {
        const episodeCard = Array.from(
          document.querySelectorAll(".CN-episodeCard")
        ).find(
          (x) =>
            x.querySelector("img")?.alt ===
            document.querySelector(".ep_title").textContent
        );

        if (!episodeCard) return;
        episodeData = {};

        episodeData.number =
          episodeCard.querySelector(".tag--count.for--SMdesktop")
            ?.textContent ?? "";
        episodeData.title = document
          .querySelector(".ep_title")
          .textContent.split(" - ")
          .pop();
        [title] = document.querySelector(".ep_title").textContent.split(" - ");
      }

      if (isMovie) title = document.querySelector(".ep_title").textContent;
      if (episodeData && !episodeData.number) unknownType = true;

      presenceData.details = title;

      if (isMovie) presenceData.state = "Movie";
      else if (unknownType) presenceData.state = episodeData.title;
      else
        presenceData.state = `EP.${episodeData.number} • ${episodeData.title}`;

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.endTimestamp = timestamp;

      if (buttonsOn) {
        presenceData.buttons = [
          {
            label: isMovie
              ? (await strings).watchMovie
              : (await strings).watchEpisode,
            url: document.baseURI
          }
        ];
      }

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = isMovie
        ? (await strings).viewingMovie
        : (await strings).viewingShow;
      presenceData.state = document.querySelector(".ep_title").textContent;
    }
  } else if (
    (document.querySelector("input#search") && document.location.search) ||
    document.querySelector('[name="searchInput"]')
  ) {
    const searchQuery = (
      (document.querySelector("input#search") ||
        document.querySelector('[name="searchInput"]')) as HTMLInputElement
    ).value;

    presenceData.details = (await strings).searchFor;
    presenceData.state = searchQueryOn
      ? searchQuery
        ? searchQuery
        : "(Unknow)"
      : "(Hidden)";

    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).searching;
  }

  presence.setActivity(presenceData);
});

interface VideoData {
  dimension1?: string;
  dimension2?: string;
}

interface EpisodeData {
  title?: string;
  number?: string;
}
