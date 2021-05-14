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
        watchMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode",
        searching: "general.search"
      },
      await presence.getSetting("lang")
    ),
  browsingStamp = Math.floor(Date.now() / 1000);

let strings = getStrings(),
  oldLang: string = null,
  videoData: VideoData = null;

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

  if (!videoData) videoData = await presence.getPageletiable("GA_DIMENSIONS");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/vod/")) {
    const video = document.querySelector("video");

    if (video) {
      const timestamps = presence.getTimestampsfromMedia(video),
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
          : false,
        isMovie = (
          document.getElementsByName("keywords")[0] as HTMLMetaElement
        ).content
          .split(", ")
          .some((keyword) => keyword.toLowerCase().includes("movie"));

      presenceData.details = videoData.dimension1.replace(
        /(trailer?:? |highlight?:? )/i,
        ""
      );

      if (isMovie) {
        presenceData.state = "Movie";
      } else if (isHighlight) {
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

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

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
      presenceData.details = (await strings).viewPage;
      presenceData.state = videoData.dimension1;
    }
  } else if (document.location.search) {
    const searchQuery = (
      document.querySelector("input#search") as HTMLInputElement
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
