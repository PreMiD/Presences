interface LangStrings {
  play: string;
  pause: string;
  episode: string;
  browse: string;
  searchFor: string;
  watchVideo: string;
  watchEpisode: string;
  watchMovie: string;
}

const presence = new Presence({
    clientId: "809748404963770398"
  }),
  getStrings = async (): Promise<LangStrings> =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        episode: "general.episode",
        searchFor: "general.searchFor",
        watchVideo: "general.buttonWatchVideo",
        watchMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode"
      },
      await presence.getSetting("lang")
    );

let browsingStamp = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href,
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "iqiyi_logo",
      details: (await strings).browse,
      smallImageKey: "search",
      smallImageText: (await strings).browse,
      startTimestamp: browsingStamp
    },
    newLang = await presence.getSetting("lang"),
    showButtons: boolean = await presence.getSetting("buttons"),
    searchQuery: boolean = await presence.getSetting("searchQuery");

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    browsingStamp = Math.floor(Date.now() / 1000);
  }

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.pathname.includes("/play")) {
    const data = {
        title: document.querySelector("h1 a").textContent,
        ep: document
          .querySelector("h1")
          .textContent.replace(document.querySelector("h1 a").textContent, "")
      },
      URLItem: string = JSON["parse"](
        document.querySelectorAll('script[type="application/ld+json"]')[1]
          .innerHTML
      )[0].itemListElement[0].item,
      video: HTMLVideoElement = document.querySelector("video"),
      timestamps: number[] = presence.getTimestampsfromMedia(video),
      isMovie = URLItem.includes("movie"),
      isVShow = URLItem.includes("variety-show"),
      isTrial =
        document.querySelector(
          ".iqp-player-g.iqp-player .iqp-tip-stream .iqp-txt-vip"
        )?.textContent !== undefined,
      lastestEp: string[] = document
        .querySelector("div.broken-line")
        .nextSibling.nextSibling.nextSibling?.textContent.match(
          /[1-9]?[0-9]?[0-9]/g
        ),
      contentEp: string[] = data.ep.match(/[1-9]?[0-9]?[0-9]/g),
      isPreview =
        lastestEp && contentEp
          ? parseInt(contentEp[0]) > parseInt(lastestEp[0])
          : false;

    if (!data.ep && !isVShow && isMovie) data.ep = "Movie";
    if (isVShow) data.ep = "Variety show";
    if (!isVShow && !isMovie)
      data.ep = `${(await strings).episode} ${contentEp[0]}`;

    if (isTrial && !isPreview) data.ep = `${data.ep} (Trial)`;

    if (video && !isNaN(video.duration)) {
      if (isPreview && !isMovie && !isVShow) data.ep = `${data.ep} preview`;
      else if (video.duration < 270 && !isMovie && !isPreview && !isTrial)
        data.ep = "Highlight";

      presenceData.details = data.title;
      presenceData.state = data.ep;

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      if (showButtons) {
        presenceData.buttons = [
          {
            label: isVShow
              ? (await strings).watchVideo
              : isMovie
              ? (await strings).watchMovie
              : (await strings).watchEpisode,
            url: `https://www.iq.com/play/${
              document.URL.split("?")[0].split("/")[4]
            }`
          }
        ];
      } else delete presenceData.buttons;

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    }

    if (isNaN(video.duration)) {
      presenceData.details = "Looking at:";
      presenceData.state = data.title;
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.includes("/search")) {
    const searchQuery_ = decodeURI(
        document.location.search.replace("?query=", "")
      ),
      result = document
        .querySelector("div.has-result")
        ?.textContent.match(/[0-9]?[0-9]?[0-9]?[0-9]/)[0];

    presenceData.details = `${(await strings).searchFor} ${
      searchQuery ? searchQuery_ : "( Hidden )"
    }`;
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "search";

    if (result) {
      presenceData.state = `${result} matching ${
        parseInt(result) > 1 ? "results" : "result"
      }`;
    } else {
      presenceData.state = `No matching result`;
    }
  } else if (document.location.pathname.includes("/intl-common")) {
    const video = document.querySelector("video"),
      title = document
        .querySelector("title")
        .textContent.match(/.+?(?=[1-9]|-)/)[0];

    if (video) {
      const timestamps = presence.getTimestampsfromMedia(video);

      presenceData.details = `${title} ${document.title.match(/[1-9]/)}`;
      presenceData.state = "Variety show";

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? (await strings).pause
        : (await strings).play;

      if (showButtons) {
        presenceData.buttons = [
          {
            label: (await strings).watchVideo,
            url: document.URL
          }
        ];
      } else delete presenceData.buttons;

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = "Looking at:";
      presenceData.state = title;
    }
  }

  presence.setActivity(presenceData);
});
