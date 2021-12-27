const presence = new Presence({
  clientId: "681116862930747520"
});

let strings: Awaited<ReturnType<typeof getStrings>>,
  timestamp = 0,
  previous: Location,
  current: Location;

presence.on("UpdateData", async () => {
  const path = current.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      largeImageKey: "logo_big"
    };

  strings = await getStrings();
  current = window.location;

  if (current.hostname.split(".")[0] === "bombmanual") {
    // Bomb manual page
    switch (isLanguageCode(path[0]) ? path[1] : path[0]) {
      // Web manual, PDF manual
      case "web":
      case "print":
        handleManual(isNewLocation(previous, current));
        return;
      // How to play, Language select
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
        handleGeneric(true);
        return;
      // Startpage, Unknown
      default:
        presence.setActivity();
        return;
    }
  } else {
    // Main page
    switch (path[0]) {
      // Contact Us, Privacy Policy
      case "contact-us":
      case "privacy-policy":
        handleGeneric();
        return;
      // Presskit
      case "presskit":
        presenceData.details = "Presskit";
        break;
      // How To Play Remotely
      case "how-to-play-remotely":
        presenceData.details = "How To Play Remotely";
        break;
      // Mobile app
      case "mobile":
        presenceData.details = "Mobile App";
        break;
      // Translation FAQ
      case "translation-faq":
        presenceData.details = "Translation FAQ";
        break;
      case "faq":
        handleFAQ();
        return;
      // Commercial Licensing
      case "commercial-license":
        presenceData.details = "Commercial Licensing";
        break;
      // Non-Commercial Use
      case "non-commercial-use":
        presenceData.details = "Non-Commercial Use";
        break;
      // Startpage, Unknown
      default:
        presence.setActivity();
        return;
    }
  }

  presence.setActivity(presenceData);
  previous = current;
});

async function getStrings() {
  return presence.getStrings(
    {
      reading: "general.reading",
      page: "general.page"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

/**
 * Handle bomb manual
 * @param resetTimestamp Reset the reading timestamp
 */
function handleManual(resetTimestamp = false): void {
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
      smallImageText: strings.reading,
      smallImageKey: "reading",
      startTimestamp: timestamp
    };

  if (page === 0) {
    presenceData.state =
      document.querySelector<HTMLHeadingElement>(
        ".versioning"
      ).firstChild.textContent;
  } else {
    presenceData.state = `${strings.page} ${page + 1} / ${pages.length}: ${
      pages[page].children[0].children[1].textContent
    }`;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle faq page
 */
function handleFAQ(): void {
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
