const presence = new Presence({
  clientId: "660519861742731264"
});

let strings: Awaited<ReturnType<typeof getStrings>>, timestamp: number;

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);

  strings = await getStrings();

  switch (path[0]) {
    // Search
    case "search":
      handleSearch();
      break;
    // Privacy policy, Imprint
    case "c":
      handleGeneric(true);
      break;
    // Startpage, Radio station, Region, Unknown
    default:
      handleUnknown(path);
      break;
  }
});

async function getStrings() {
  return presence.getStrings(
    {
      play: "general.playing",
      pause: "general.paused",
      search: "general.searching",
      browsing: "general.browsing"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

/**
 * Handle radio station
 */
function handleStation(): void {
  const station =
    document.querySelector<HTMLSpanElement>(".song-name")?.textContent;

  let presenceData: PresenceData;

  // Check if the playing icon is shown
  if (document.querySelector<HTMLDivElement>(".playbutton-global-playing")) {
    // Radio is playing / buffering
    if (timestamp === 0) timestamp = Date.now();

    presenceData = {
      details: station,
      largeImageKey: (
        document.querySelector<HTMLAnchorElement>("#player-station-logo-link")
          .children[0] as HTMLImageElement
      ).src,
      smallImageText: strings.play,
      smallImageKey: "play",
      startTimestamp: timestamp
    };
  } else {
    // Radio is paused
    timestamp = 0;

    presenceData = {
      details: station,
      largeImageKey: (
        document.querySelector<HTMLAnchorElement>("#player-station-logo-link")
          .children[0] as HTMLImageElement
      ).src,
      smallImageText: strings.pause,
      smallImageKey: "pause"
    };
  }

  presence.setActivity(presenceData);
}

/**
 * Handle search
 */
function handleSearch(): void {
  const presenceData: PresenceData = {
    details: new URLSearchParams(window.location.search).get("term"),
    state: document.querySelector<HTMLHeadingElement>("h1").textContent,
    largeImageKey: "logo_big",
    smallImageText: strings.search,
    smallImageKey: "search"
  };

  presence.setActivity(presenceData);
}

/**
 * Handle generic pages
 * @param preferTitle Prefer document title over h1 text content
 */
function handleGeneric(preferTitle = false): void {
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
function handleUnknown(path: string[]): void {
  const region = [
    ...document.querySelectorAll<HTMLAnchorElement>(".region-btn")
  ]
    .filter(e => e.classList.contains("active"))[0]
    .pathname?.slice(1);

  if (region !== "" && path[0] === region) {
    handleGeneric();
    return;
  } else if (document.querySelector<HTMLSpanElement>(".song-name")) {
    handleStation();
    return;
  }

  presence.setActivity();
}
