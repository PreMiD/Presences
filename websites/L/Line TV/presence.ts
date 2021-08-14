const presence = new Presence({
    clientId: "813392002526871592"
  }),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        paused: "general.paused",
        browse: "general.browsing",
        episode: "general.episode",
        searchFor: "general.searchFor",
        viewEpisode: "general.buttonViewEpisode",
        reading: "general.reading",
        viewMove: "general.buttonViewMovie",
        viewPage: "general.viewPage",
        watchStream: "general.buttonWatchStream",
        viewVideo: "general.buttonWatchVideo",
        viewSong: "general.buttonViewSong",
        searching: "general.search"
      },
      await presence.getSetting("lang")
    ),
  browsingStamp = Math.floor(Date.now() / 1000);

let oldLang: string = null,
  strings = getStrings(),
  videoData: {
    sClipTitle: string;
    sCategoryCode: string;
    nClipNo: number;
    sLiveStatus: string;
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "linetv_logo",
      startTimestamp: browsingStamp,
      details: (await strings).browse
    },
    pathname = document.location.pathname,
    newLang = await presence.getSetting("lang"),
    showButton = await presence.getSetting("Buttons"),
    showSearch = await presence.getSetting("searchQuery"),
    pDetail = await presence.getSetting("detail");

  if (!videoData) videoData = await presence.getPageletiable("ghtEnv");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (pathname.includes("/v/") || pathname.includes("/special/")) {
    const video = document.querySelector("video"),
      videoD: VideoDType = {
        title: (videoData.sClipTitle.match(/.+?(?=\[|【|「)/) || [
          videoData.sClipTitle
        ])[0],
        playList: (document.querySelector("tooltip") as HTMLElement)?.title,
        aTitle: videoData.sClipTitle,
        isTeaser: videoData.sClipTitle.toLowerCase().includes("teaser"),
        isTrailer: videoData.sClipTitle.toLowerCase().includes("trailer"),
        isHighligh:
          (document.querySelector("tooltip") as HTMLElement)?.title
            .toLowerCase()
            .includes("highlight") ||
          videoData.sClipTitle.toLowerCase().includes("highlight"),
        isLowerThan1_5mins: video ? video.duration < 90 : false,
        episodes: null,
        buttonLabel: (await strings).viewEpisode,
        smallImagePlay: "play",
        epText: null,
        id: videoData.nClipNo,
        genre: videoData.sCategoryCode
      },
      timestamps = video
        ? presence.getTimestampsfromMedia(video)
        : [browsingStamp, null];

    if (videoD.title.includes("["))
      videoD.title = videoD.title.replace(/(\[.+\])/g, "");
    if (videoD.title.includes("EP."))
      videoD.title = videoD.title.replace(
        /(ตอนต่อไป EP.[1-9]?[0-9]?[0-9]|EP.[1-9]?[0-9]?[0-9])/,
        ""
      );
    if (videoD.title.match(/ \| | \|(?!.)/))
      videoD.title = videoD.title.replace(/ \| | \|(?!.)/, " ");
    if (videoD.title.match(/(highlight)/i))
      videoD.title = videoD.title.replace(/(highlight)/i, "");
    if (
      videoD.aTitle.match(
        /(EP.[1-9]?[0-9]?[0-9]|\[[1-9]\/[1-9]\]|ตอน?\.? [1-9]?[0-9]?[0-9])/g
      )
    )
      videoD.episodes = videoD.aTitle.match(
        /(EP.[1-9]?[0-9]?[0-9]|\[[1-9]\/[1-9]\]|ตอน?\.? [1-9]?[0-9]?[0-9]|\([1-9]\/[1-9]\))/g
      );
    if (videoD.episodes)
      videoD.epText =
        videoD.episodes[0].includes("[") || videoD.episodes[0].includes("(")
          ? ` ${videoD.episodes[0]}`
          : ` ${videoD.episodes[0].match(/[1-9]?[0-9]?[0-9]/)[0]}${
              videoD.episodes.length > 1 ? ` | ${videoD.episodes[1]}` : ""
            }`;

    if (video) {
      if (videoD.isTrailer) videoD.genre = "TRAILER";
      else if (videoD.isTeaser) videoD.genre = "TEASER";
      else if (videoD.isHighligh && !videoD.episodes)
        videoD.genre = "HIGHLIGHT";
      else if (videoD.isHighligh && videoD.episodes)
        videoD.genre = "HIGHLIGHT_";
      else if (videoData.sLiveStatus) videoD.genre = "LIVE";
      else if (
        videoD.isLowerThan1_5mins &&
        !videoD.isHighligh &&
        !videoD.isTrailer &&
        video.currentTime &&
        videoD.episodes
      )
        videoD.genre = "PREVIEW";

      videoD.title = pDetail
        .replace("%title%", videoD.title)
        .replace("%fullTitle%", videoD.aTitle)
        .replace("%playlist%", videoD.playList);

      switch (videoD.genre) {
        case "DRAMA":
          presenceData.details = videoD.title;
          presenceData.state =
            videoD.epText?.startsWith(" [") && videoD.episodes
              ? `Drama | ${videoD.epText}`
              : videoD.episodes
              ? `${(await strings).episode} ${videoD.epText}`
              : "Highlight";
          break;

        case "ARTIST":
          presenceData.details = videoD.title;
          presenceData.state = `Music ${
            videoD.episodes
              ? ` | ${(await strings).episode}${videoD.epText}`
              : ""
          }`;
          videoD.buttonLabel = videoD.epText
            ? (await strings).viewEpisode
            : (await strings).viewSong;
          break;

        case "ENTERTAINMENT":
          presenceData.details = videoD.title;
          presenceData.state = videoD.epText
            ? `${(await strings).episode} ${videoD.epText}`
            : "Entertainment";
          videoD.buttonLabel = videoD.epText
            ? videoD.buttonLabel
            : (await strings).viewVideo;
          break;

        case "LIFE":
          presenceData.details = videoD.title;
          presenceData.state = `${
            videoD.episodes
              ? `${(await strings).episode} ${videoD.epText}`
              : "Life style"
          }`;
          videoD.buttonLabel = videoD.episodes
            ? (await strings).viewEpisode
            : (await strings).viewVideo;
          break;

        case "HIGHLIGHT":
          presenceData.details = videoD.title;
          presenceData.state = "Highlight";
          videoD.buttonLabel = (await strings).viewVideo;
          break;

        case "HIGHLIGHT_":
          presenceData.details = videoD.title;
          presenceData.state = `${(await strings).episode}${
            videoD.epText
          } | Highlight`;
          videoD.buttonLabel = (await strings).viewVideo;
          break;

        case "TRAILER":
          presenceData.details = videoD.title;
          presenceData.state = "Trailer";
          videoD.buttonLabel = (await strings).viewVideo;
          break;

        case "TEASER":
          presenceData.details = videoD.title;
          presenceData.state = "Teaser";
          videoD.buttonLabel = (await strings).viewVideo;
          break;

        case "MOVIE":
          presenceData.details = videoD.title;
          presenceData.state = `${
            videoD.episodes
              ? `Movie Clip ${
                  videoD.epText.startsWith(" [") ||
                  videoD.epText.startsWith(" (")
                    ? `|${videoD.epText}`
                    : `| ${(await strings).episode}${videoD.epText}`
                }`
              : ""
          }`;
          videoD.buttonLabel = (await strings).viewVideo;
          break;

        case "LIVE":
          presenceData.details = videoD.title;
          presenceData.state = `Live ${
            videoD.episodes
              ? ` | ${(await strings).episode}${videoD.epText}`
              : ""
          }`;
          videoD.smallImagePlay = "live";
          videoD.buttonLabel = (await strings).watchStream;
          break;

        case "PREVIEW":
          presenceData.details = videoD.title;
          presenceData.state = `${(await strings).episode} ${
            videoD.epText
          } | Preview`;
          break;

        default:
          presenceData.details = videoD.title;
          presenceData.state = `${(await strings).episode} ${videoD.epText}`;
          break;
      }

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.smallImageKey = video.paused
        ? "pause"
        : videoD.smallImagePlay;
      presenceData.smallImageText = video.paused
        ? (await strings).paused
        : (await strings).play;

      if (video.paused || videoD.genre === "LIVE") {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }

      if (showButton) {
        presenceData.buttons = [
          {
            label: videoD.buttonLabel,
            url:
              document.baseURI.length > 512
                ? `https://tv.line.me/v/${videoD.id}`
                : document.baseURI
          }
        ];
      } else delete presenceData.buttons;
    } else {
      presenceData.details = (await strings).viewPage;
      presenceData.state = videoD.title;
      presenceData.smallImageText = (await strings).reading;
    }
  } else if (pathname.includes("/search")) {
    const query = decodeURI(document.location.search.replace("?query=", "")),
      resutls = parseInt(document.querySelector("em.ea")?.textContent, 10);

    presenceData.details = `${(await strings).searchFor} ${
      showSearch ? query : "(Hidden)"
    }`;
    presenceData.smallImageKey = "search";
    presenceData.smallImageText = (await strings).searching;

    if (resutls) {
      presenceData.state = `${resutls} matching ${
        resutls > 1 ? "results" : "result"
      }`;
    } else {
      presenceData.state = "No matching result";
    }
  }

  presence.setActivity(presenceData);
});

interface VideoDType {
  title: string;
  aTitle: string;
  isTrailer: boolean;
  isHighligh: boolean;
  isTeaser: boolean;
  isLowerThan1_5mins: boolean;
  episodes: string[];
  playList: string;
  buttonLabel: string;
  smallImagePlay: string;
  epText: string;
  genre: string;
  id: number;
}
