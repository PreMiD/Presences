const presence = new Presence({
    clientId: "809748404963770398"
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
        watchMovie: "general.buttonViewMovie",
        watchEpisode: "general.buttonViewEpisode",
        browsingThrough: "discord.browseThrough",
        viewingSettings: "discord.settings",
        viewingHistory: "amazon.history",
        viewingList: "netflix.viewList",
        viewAccount: "general.viewAccount",
        viewPage: "general.viewPage"
      },
      await presence.getSetting("lang").catch(() => "en")
    ),
  browsingStamp = Math.floor(Date.now() / 1000);

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const newLang = await presence.getSetting("lang").catch(() => "en"),
    showButtons: boolean = await presence.getSetting("buttons"),
    searchQuery: boolean = await presence.getSetting("searchQuery");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
    largeImageKey: ["iqiyi_logo_b", "iqiyi_logo"][
      await presence.getSetting("logo")
    ],
    details: (await strings).browse,
    smallImageKey: "search",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/") {
    const category = Object.values(document.querySelectorAll("div")).filter(
      (entry) => entry?.className === "row-title" && YouCanSeeThis(entry)
    )[0]?.textContent;

    presenceData.details = (await strings).browsingThrough;
    presenceData.state = category || "Home page";
  } else if (
    document.location.pathname.includes("/play") ||
    document.location.pathname.includes("/intl-common/")
  ) {
    const data = {
        title: (
          document.querySelector("h1 a") || document.querySelector("title")
        )?.textContent,
        ep: (
          document.querySelector("h1") ||
          document.querySelector(".topice-source-list-item.item-active")
        )?.textContent.replace(
          document.querySelector("h1 a")?.textContent || "",
          ""
        )
      },
      URLItem: string =
        JSON.parse(
          document.querySelectorAll('script[type="application/ld+json"]')[1]
            ?.innerHTML || "{}"
        )[0]
          ?.itemListElement.map(
            (x: {
              item: {
                name: string;
              };
            }) => x.item.name.toLowerCase()
          )
          .join(" ") ?? "",
      video: HTMLVideoElement = document.querySelector("video"),
      isMovie = URLItem.includes("movie"),
      isVShow = URLItem.includes("variety-show"),
      isVShowToo = document.location.pathname.includes("/intl-common/"),
      isTrial =
        document.querySelector(
          ".iqp-player-g.iqp-player .iqp-tip-stream .iqp-txt-vip"
        )?.textContent !== undefined,
      lastestEp: string[] = document
        .querySelector("div.broken-line")
        ?.nextSibling?.nextSibling?.nextSibling?.textContent?.match(
          /[1-9]?[0-9]?[0-9]/g
        ),
      contentEp: string[] = isVShowToo
        ? data.ep.match(/([1-9]?[0-9]?[0-9]? ?\([1-9]?[0-9]\))/g)
        : data.ep.match(/[1-9]?[0-9]?[0-9]/g),
      isPreview =
        lastestEp && contentEp && !isVShow && !isVShowToo
          ? parseInt(contentEp[0], 10) > parseInt(lastestEp[0], 10)
          : data.ep.toLowerCase().includes("preview");

    if (!data.ep && !isVShow && isMovie) data.ep = "Movie";
    if (isVShowToo) {
      if (contentEp?.length) {
        data.ep = `${(await strings).episode} ${
          contentEp[0].match(/.+?(?=\()/g)[0]
        } ${
          contentEp[0].includes("(")
            ? `- ${contentEp[0].match(/(\([1-9]?[0-9]\))/g)[0]}`
            : "Variety show"
        }`;
      } else {
        data.ep = `Variety show`;
      }

      data.title = (data.title.match(/.+?(?=\s{2})/g) || [null])[0];
    }
    if (isVShow && !isVShowToo) data.ep = "Variety show";
    if (!isVShow && !isVShowToo && !isMovie && contentEp !== null)
      data.ep = `${(await strings).episode} ${contentEp[0]}`;
    else if (!isVShow && !isVShowToo && !isMovie) data.ep = "Highlight";

    if (isTrial && !isPreview) data.ep = `${data.ep} (Trial)`;

    if (video !== null && !Number.isNaN(Number(video.duration))) {
      const timestamps: number[] = presence.getTimestampsfromMedia(video);

      if (isPreview && !isMovie) data.ep = `${data.ep} preview`;
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
    } else if (data.title) {
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
        parseInt(result, 10) > 1 ? "results" : "result"
      }`;
    } else {
      presenceData.state = `No matching result`;
    }
  } else if (document.location.pathname.includes("/personal")) {
    const type = new URLSearchParams(document.location.search).get("type"),
      all = document.querySelector(
        "div.trans-contributions-detail > span:nth-child(1) > i"
      )?.textContent,
      passed = document.querySelector(
        "div.trans-contributions-detail > span:nth-child(2) > i"
      )?.textContent,
      adopted = document.querySelector(
        "div.trans-contributions-detail > span:nth-child(3) > i"
      )?.textContent;

    switch (type) {
      case "settings":
        presenceData.details = (await strings).viewingSettings;
        break;

      case "history":
        presenceData.details = (await strings).viewingHistory;
        break;

      case "favorite":
        presenceData.details = (await strings).viewingList;
        break;

      case "translation":
        presenceData.details = "Viewing their subtitle translation";
        presenceData.state = `All: ${all} • Passed: ${passed} • Adopted: ${adopted}`;
        break;

      default:
        presenceData.details = (await strings).viewAccount;
        break;
    }
  } else if (document.location.pathname.includes("/vip/")) {
    presenceData.details = (await strings).viewPage;
    presenceData.state = "VIP membership";
  }

  presence.setActivity(presenceData);
});

/**
 * Check if your eyes can see this element :)
 * @param element The element you want to check
 * @returns The result you want
 */

function YouCanSeeThis(element: HTMLElement) {
  const clientRect = element.getBoundingClientRect();
  return (
    clientRect.top >= 0 &&
    clientRect.left >= 0 &&
    clientRect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    clientRect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
