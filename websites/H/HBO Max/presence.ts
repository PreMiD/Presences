const presence = new Presence({
    clientId: "720731927216259083"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  }),
  timer = Date.now(),
  selectors: Record<string, string> = {
    "series:name":
      "#Viewport > div.default > div:nth-child(3) div > span > span > span",
    "series:altname": "#Viewport > div.default div > span > span > span",
    "feature:name":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span > span:nth-child(2)",
    "feature:altname": "#Viewport div:nth-child(1) > span > span:nth-child(2)",
    "feature:desc:name":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > div:nth-child(4) > span > span",
    "feature:desc:altname": "#Viewport div:nth-child(4) > span > span",
    "episode:name":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span > span:nth-child(2)",
    "episode:altname":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > a > div > span > span",
    "episode:number":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span > span:nth-child(1)",
    "episode:altnumber":
      "#Viewport div:nth-child(2) > div:nth-child(2) > span > span:nth-child(1)",
    "episode:series:name":
      "#Viewport > div.default > div:nth-child(3) div:nth-child(1) > div:nth-child(2) > a > div > span > span",
    "episode:series:altname": "#Viewport a > div > span > span"
  };

// checkmate javascript, once again
function pathHandler(string: string): boolean {
  return document.location.pathname.toLowerCase().includes(string);
}

/**
 * Don't even attempt to understand what it does
 * @param {string} sl HTMLElement selector
 * @param {string} ff Font family
 * @param {string} fz Font size
 * @param {string} pt Match pattern
 * @returns The first filtered element or none
 */
function nodeSelector(
  sl: string,
  ff: string,
  fz: string,
  pt: string = null
): HTMLElement {
  const arr: HTMLElement[] = Array.prototype.slice.call(
    document.querySelectorAll(sl)
  );
  return arr.find(
    (node) =>
      node?.tagName.toLowerCase() === "span" &&
      (node?.style.fontFamily.length === 0
        ? node?.parentElement.style.fontFamily
        : node?.style.fontFamily) === ff &&
      (node?.style.fontSize.length === 0
        ? node?.parentElement.style.fontSize
        : node?.style.fontSize) === fz &&
      (node?.style.fontFamily.length === 0 && node?.style.fontSize.length === 0
        ? true
        : node?.hasChildNodes() && node?.childNodes[0].nodeType === 3) &&
      (pt ? node?.textContent?.includes(pt) : true)
  );
}

/**
 * Get Timestamps
 * @param {Number} currentTime Current video time seconds
 * @param {Number} duration Video duration seconds
 */
function getTimestamps(currentTime: number, duration: number): Array<number> {
  if (!currentTime || !duration) return [undefined, undefined];
  const startTime = Date.now();
  const endTime = Math.floor(startTime / 1000) - currentTime + duration;
  return [Math.floor(startTime / 1000), endTime];
}

setInterval(async function () {
  if (document.readyState !== "complete") return;

  const data: PresenceData = {
      largeImageKey: "lg",
      startTimestamp: timer
    },
    video: HTMLVideoElement = document.querySelector("video");

  if (document.location.hostname === "play.hbomax.com") {
    const path = document.location.pathname;

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
      case pathHandler(":series:"):
      case pathHandler("/series/"):
      case pathHandler(":season:"):
      case pathHandler("/season/"):
        Object.assign(data, {
          details:
            nodeSelector(selectors["series:name"], "street2_medium", "44px")
              ?.textContent ||
            nodeSelector(selectors["series:altname"], "street2_medium", "44px")
              ?.textContent ||
            undefined,
          state: "Series"
        });
        break;
      case pathHandler(":episode:"):
      case pathHandler("/episode/"): {
        const epnumber =
          nodeSelector(selectors["episode:number"], "street2_book", "28px")
            ?.textContent ||
          nodeSelector(selectors["episode:altnumber"], "street2_book", "28px")
            ?.textContent ||
          undefined;
        const epname =
          nodeSelector(selectors["episode:name"], "street2_medium", "28px")
            ?.textContent ||
          nodeSelector(selectors["episode:altname"], "street2_medium", "28px")
            ?.textContent ||
          undefined;

        const timestamps = getTimestamps(
          video?.currentTime > 0 ? Math.floor(video.currentTime) : undefined,
          video && !isNaN(video.duration)
            ? Math.floor(video.duration)
            : undefined
        );

        Object.assign(data, {
          details:
            nodeSelector(
              selectors["episode:series:name"],
              "street2_bold",
              "12px"
            )?.textContent ||
            nodeSelector(
              selectors["episode:series:altname"],
              "street2_bold",
              "12px"
            )?.textContent ||
            undefined,
          state:
            epnumber && epname
              ? `${epnumber} • ${epname}`
              : epnumber || epname || "Episode",
          startTimestamp: timestamps[0] || timer,
          endTimestamp: timestamps[1] || undefined
        });

        if (video?.currentTime && video?.currentTime > 0)
          Object.assign(data, {
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
              ? (await strings).pause
              : (await strings).play
          });
        break;
      }
      case pathHandler(":extra:"):
      case pathHandler("/extra/"):
      case pathHandler(":feature:"):
      case pathHandler("/feature/"): {
        const desc =
          nodeSelector(selectors["feature:desc:name"], "street2_book", "14px")
            ?.textContent ||
          nodeSelector(
            selectors["feature:desc:altname"],
            "street2_book",
            "14px"
          )?.textContent;

        const timestamps = getTimestamps(
          video?.currentTime > 0 ? Math.floor(video.currentTime) : undefined,
          video && !isNaN(video.duration)
            ? Math.floor(video.duration)
            : undefined
        );

        Object.assign(data, {
          details:
            nodeSelector(selectors["feature:name"], "street2_medium", "28px")
              ?.textContent ||
            nodeSelector(selectors["feature:altname"], "street2_medium", "28px")
              ?.textContent ||
            undefined,
          state: `${
            pathHandler(":extra:") || pathHandler("/extra/")
              ? "Extra"
              : "Feature"
          }${desc ? " • " + desc : ""}`,
          startTimestamp: timestamps[0] || timer,
          endTimestamp: timestamps[1] || undefined
        });

        if (video?.currentTime && video?.currentTime > 0)
          Object.assign(data, {
            smallImageKey: video.paused ? "pause" : "play",
            smallImageText: video.paused
              ? (await strings).pause
              : (await strings).play
          });
        break;
      }
      default: {
        Object.assign(data, { details: "Browsing" });
        switch (true) {
          case pathHandler(":page:home"):
            Object.assign(data, { state: "Home" });
            break;
        }
        break;
        //tbd: add more specific pages (optional/anyone can do so!)
      }
    }
  }

  if (video && video.paused) {
    data.startTimestamp = timer;
    delete data.endTimestamp;
  }

  const rpc = data.details || data.state ? true : false;
  const bool = data.startTimestamp || data.endTimestamp || !rpc ? true : false;

  presence.setActivity(rpc ? data : { startTimestamp: timer }, bool);
}, 2000);
