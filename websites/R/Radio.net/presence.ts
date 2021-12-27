const presence = new Presence({
  clientId: "634124614544392193"
});

let strings: Awaited<ReturnType<typeof getStrings>>, timestamp: number;

presence.on("UpdateData", async () => {
  const host = window.location.hostname.split("."),
    path = window.location.pathname.split("/").slice(1);

  strings = await getStrings();

  if (host[0] === "corporate") {
    // Corporate page
    switch (path[0]) {
      // About us, Broadcasters, Advertising, Press, Jobs, Contact
      case "about-us":
      case "ueber-uns":
      case "broadcasters":
      case "sender":
      case "advertising":
      case "werbung":
      case "press":
      case "presse":
      case "jobs":
      case "contact":
      case "kontakt":
        handleCorporate(host.slice(1).join("."));
        break;
      default:
        presence.setActivity();
        break;
    }
  } else {
    // Main page
    switch (path[0]) {
      // Radio station
      case "s":
        handleStation();
        break;
      // Podcast
      case "p":
        handlePodcast();
        break;
      // Search
      case "search":
        handleSearch();
        break;
      // Genre, Topic, Country, City, Local stations, Top stations
      case "genre":
      case "topic":
      case "country":
      case "city":
      case "local-stations":
      case "top-stations":
        handleListing();
        break;
      // Choose your country, Contact, App, Terms and conditions, Privacy policy, Imprint
      case "country-selector":
      case "contact":
      case "app":
      case "terms-and-conditions":
      case "privacy-policy":
      case "imprint":
        handleGeneric(true);
        break;
      // Startpage, Unknown
      default:
        presence.setActivity();
        break;
    }
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
  let presenceData: PresenceData;

  // Check if the animation icon is shown
  if (
    document.querySelector<HTMLSpanElement>(".player__animate-icon").style
      .display !== "none"
  ) {
    // Radio is playing / buffering
    timestamp &&= Date.now();

    presenceData = {
      details: document.querySelector<HTMLHeadingElement>("h1").textContent,
      state:
        document.querySelector<HTMLDivElement>(".player__song").textContent,
      largeImageKey: (
        document.querySelector<HTMLDivElement>("#station").children[3]
          .children[1].firstChild.firstChild.firstChild as HTMLImageElement
      ).src,
      smallImageText: strings.play,
      smallImageKey: "play",
      startTimestamp: timestamp
    };
  } else {
    // Radio is paused
    timestamp = 0;

    presenceData = {
      details: document.querySelector<HTMLHeadingElement>("h1").textContent,
      largeImageKey: (
        document.querySelector<HTMLDivElement>("#station").children[3]
          .children[1].firstChild.firstChild.firstChild as HTMLImageElement
      ).src,
      smallImageText: strings.pause,
      smallImageKey: "pause"
    };
  }

  presence.setActivity(presenceData);
}

/**
 * Handle podcast
 */
function handlePodcast(): void {
  let presenceData: PresenceData;

  // Check if the animation icon is shown
  if (
    document.querySelector<HTMLSpanElement>(".player__animate-icon").style
      .display !== "none"
  ) {
    // Podcast is playing / buffering
    const times = document
        .querySelector<HTMLDivElement>(".player__timing-wrap")
        .textContent.split("|"),
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(times[0]),
        presence.timestampFromFormat(times[1])
      );

    presenceData = {
      details: document.querySelector<HTMLHeadingElement>("h1").textContent,
      state:
        document.querySelector<HTMLDivElement>(".player__song").textContent,
      largeImageKey: (
        document.querySelector<HTMLDivElement>("#podcast").children[1]
          .children[1].firstChild.firstChild.firstChild as HTMLImageElement
      ).src,
      smallImageText: strings.play,
      smallImageKey: "play",
      startTimestamp: timestamps[0],
      endTimestamp: timestamps[1]
    };
  } else {
    // Podcast is paused
    presenceData = {
      details: document.querySelector<HTMLHeadingElement>("h1").textContent,
      state:
        document.querySelector<HTMLDivElement>(".player__song").textContent,
      largeImageKey: (
        document.querySelector<HTMLDivElement>("#podcast").children[1]
          .children[1].firstChild.firstChild.firstChild as HTMLImageElement
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
    details: new URLSearchParams(window.location.search).get("q"),
    state: document.querySelector<HTMLHeadingElement>("h1").textContent,
    largeImageKey: "logo_big",
    smallImageText: strings.search,
    smallImageKey: "search"
  };

  presence.setActivity(presenceData);
}

/**
 * Handle radio station or podcast listing
 */
function handleListing(): void {
  presence.setActivity({
    details: document.querySelector<HTMLHeadingElement>("h1").textContent,
    largeImageKey: "logo_big",
    smallImageText: strings.browsing,
    smallImageKey: "reading"
  });
}

/**
 * Handle corporate page
 * @param hostname Hostname of the corporate page
 */
function handleCorporate(hostname: string): void {
  const item: string =
    document.querySelector<HTMLLIElement>(".current_page_item").textContent;

  presence.setActivity({
    details: `${hostname} corporate`,
    state: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
    largeImageKey: "logo_big"
  });
}

/**
 * Handle generic pages
 * @param preferTitle Prefer document title over h1 text content
 */
function handleGeneric(preferTitle = false): void {
  presence.setActivity({
    details: preferTitle
      ? document.title
      : document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title,
    largeImageKey: "logo_big"
  });
}
