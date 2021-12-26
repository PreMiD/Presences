const presence = new Presence({
    clientId: "660519861742731264"
  }),
  strings = getStrings();

let timestamp: number;

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);

  switch (path[0]) {
    // Search
    case "search":
      await handleSearch();
      break;
    // Privacy policy, Imprint
    case "c":
      await handleGeneric(true);
      break;
    // Startpage, Radio station, Region, Unknown
    default:
      await handleUnknown(path);
      break;
  }
});

/**
 * Get Language Strings
 * @returns Language Strings
 */
async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      search: "general.searching",
      browsing: "general.browsing"
    },
    (await presence.getSetting("lang").catch(() => "en")) as string
  );
}

/**
 * Handle radio station
 */
async function handleStation(): Promise<void> {
  const station =
    document.querySelector<HTMLElement>(".song-name")?.textContent;

  let presenceData: PresenceData;

  // Check if the playing icon is shown
  if (document.querySelector<HTMLElement>(".playbutton-global-playing")) {
    // Radio is playing / buffering
    if (timestamp === 0) timestamp = Date.now();

    presenceData = {
      details: station,
      largeImageKey: (
        document.querySelector<HTMLElement>("#player-station-logo-link")
          .children[0] as HTMLImageElement
      ).src,
      smallImageText: (await strings).play,
      smallImageKey: "play",
      startTimestamp: timestamp
    };
  } else {
    // Radio is paused
    timestamp = 0;

    presenceData = {
      details: station,
      largeImageKey: (
        document.querySelector<HTMLElement>("#player-station-logo-link")
          .children[0] as HTMLImageElement
      ).src,
      smallImageText: (await strings).pause,
      smallImageKey: "pause"
    };
  }

  presence.setActivity(presenceData);
}

/**
 * Handle search
 */
async function handleSearch(): Promise<void> {
  const presenceData: PresenceData = {
    details: new URLSearchParams(window.location.search).get("term"),
    state: document.querySelector<HTMLElement>("h1").textContent,
    largeImageKey: "logo_big",
    smallImageText: (await strings).search,
    smallImageKey: "search"
  };

  presence.setActivity(presenceData);
}

/**
 * Handle generic pages
 * @param preferTitle Prefer document title over h1 text content
 */
async function handleGeneric(preferTitle = false): Promise<void> {
  presence.setActivity({
    details: preferTitle
      ? document.title
      : document.querySelector<HTMLHeadingElement>("h1")?.textContent ||
        document.title,
    largeImageKey: "logo_big"
  });
}

/**
 * Handle unknown page
 * @param path Page path
 */
async function handleUnknown(path: string[]): Promise<void> {
  const region = [
    ...document.querySelectorAll<HTMLAnchorElement>(".region-btn")
  ]
    .filter(e => e.classList.contains("active"))[0]
    .pathname?.slice(1);

  if (path[0] && region !== "" && path[0] === region) {
    await handleGeneric();
    return;
  } else if (document.querySelector<HTMLElement>(".song-name")) {
    await handleStation();
    return;
  }

  presence.setActivity();
}
