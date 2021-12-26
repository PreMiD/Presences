const presence = new Presence({
    clientId: "681116862930747520"
  }),
  strings = presence.getStrings({
    reading: "presence.activity.reading",
    page: "general.page"
  });

let timestamp = 0,
  previous: Location,
  current: Location;

presence.on("UpdateData", async () => {
  current = window.location;
  const path = current.pathname.split("/").slice(1);

  if (current.hostname.split(".")[0] === "bombmanual") {
    // Bomb manual page
    switch (isLanguageCode(path[0]) ? path[1] : path[0]) {
      // Web manual
      // PDF manual
      case "web":
      case "print":
        await handleManual(isNewLocation(previous, current));
        break;
      // How to play
      // Language select
      case "how-to-play-pc.html":
      case "how-to-play-mobile.html":
      case "how-to-play-switch.html":
      case "how-to-play-xbox.html":
      case "how-to-play-playstation.html":
      case "how-to-play-vr.html":
      case "how-to-play-psvr.html":
      case "how-to-play-gear-vr.html":
      case "how-to-play-oculus-go.html":
      case "how-to-play-oculus-quest.html":
      case "how-to-play-daydream.html":
      case "language":
        await handleGeneric(true);
        break;
      // Startpage
      // Unknown
      default:
        presence.setActivity();
        break;
    }
  } else {
    // Main page
    switch (path[0]) {
      // Contact Us
      // Privacy Policy
      case "contact-us":
      case "privacy-policy":
        await handleGeneric();
        break;
      // Presskit
      case "presskit":
        await handleCustom("Presskit");
        break;
      // How To Play Remotely
      case "how-to-play-remotely":
        await handleCustom("How To Play Remotely");
        break;
      // Mobile app
      case "mobile":
        await handleCustom("Mobile App");
        break;
      // Translation FAQ
      case "translation-faq":
        await handleCustom("Translation FAQ");
        break;
      case "faq":
        await handleFAQ();
        break;
      // Commercial Licensing
      case "commercial-license":
        await handleCustom("Commercial Licensing");
        break;
      // Non-Commercial Use
      case "non-commercial-use":
        await handleCustom("Non-Commercial Use");
        break;
      // Startpage
      // Unknown
      default:
        presence.setActivity();
        break;
    }
  }

  previous = current;
});

/**
 * Handle bomb manual
 * @param resetTimestamp Reset the reading timestamp
 */
async function handleManual(resetTimestamp = false): Promise<void> {
  if (timestamp === 0 || resetTimestamp) timestamp = Date.now();

  const pages = [...document.querySelectorAll<HTMLDivElement>(".page")],
    page = Math.round(
      (window.scrollY / getDocumentHeight()) * (pages.length - 1)
    ),
    presenceData: PresenceData = {
      details: document
        .querySelector<HTMLTitleElement>(".title")
        .textContent.replace(/\n|\t/g, ""),
      largeImageKey: "logo_big",
      smallImageText: (await strings).reading,
      smallImageKey: "reading",
      startTimestamp: timestamp
    };

  if (page === 0) {
    presenceData.state =
      document.querySelector<HTMLHeadingElement>(
        ".versioning"
      ).firstChild.textContent;
  } else {
    presenceData.state = `${(await strings).page} ${page + 1} / ${
      pages.length
    }: ${pages[page].children[0].children[1].textContent}`;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle faq page
 */
async function handleFAQ(): Promise<void> {
  const presenceData: PresenceData = {
    details: "FAQ",
    largeImageKey: "logo_big"
  };

  if (window.location.hash?.length > 0) {
    presenceData.state = document.querySelector(
      window.location.hash
    ).children[0].children[0].children[0].children[0].children[0].textContent;
  }

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
 * Handle custom pages
 * @param details Presence details text
 * @param state Presence state text
 */
async function handleCustom(details: string, state?: string): Promise<void> {
  presence.setActivity({
    details,
    state,
    largeImageKey: "logo_big"
  });
}

/**
 * Get document height
 * @returns Document height
 */
function getDocumentHeight(): number {
  const { body } = document,
    { documentElement: html } = document;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}

/**
 * Check if a text value is a valid language code
 * @param text Text value
 * @returns Valid language code
 */
function isLanguageCode(text: string): boolean {
  return /^(?<lang>[a-z]{2})(-(?<region>[A-Z]{2}))?$/.test(text);
}

/**
 * Check if the window location has changed
 * @param previous Previous window location
 * @param current Current window location
 * @returns Location has changed
 */
function isNewLocation(previous: Location, current: Location): boolean {
  return (
    !previous ||
    !current ||
    previous.hostname !== current.hostname ||
    previous.pathname !== current.pathname ||
    previous.protocol !== current.protocol ||
    previous.port !== current.port
  );
}
