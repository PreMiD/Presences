/**
 * Language Strings
 */
interface LangStrings {
  browsing: string;
  reading: string;
}

const presence = new Presence({
    clientId: "680498892651233310"
  }),
  strings = getStrings();

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);

  switch (path[0]) {
    // Reward Categories
    case "reward_categories":
      await handleRewardCategories(path);
      break;
    // Rewards
    case "rewards":
      await handleRewards(path);
      break;
    // Missions
    case "missions":
      await handleGeneric(false, "reading");
      break;
    // Points
    case "point":
      await handlePoints(path);
      break;
    // News
    case "news":
      await handleNews(path);
      break;
    // Redeem Point Codes
    case "serial_number":
      await handleGeneric();
      break;
    // Getting Started
    // About Points
    // About Gold Points
    case "getting_started":
    case "about_point":
    case "about_gold_point":
      await handleGeneric(false, "reading");
      break;
    // Startpage
    // Unknown
    default:
      presence.setActivity();
      break;
  }
});

/**
 * Get Language Strings
 * @returns Language Strings
 */
async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      browsing: "general.browsing",
      reading: "general.reading"
    },
    (await presence.getSetting("lang").catch(() => "en")) as string
  );
}

/**
 * Handle reward category pages
 * @param path URL path
 */
async function handleRewardCategories(path: string[]): Promise<void> {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ||
      document.title,
    largeImageKey: "logo_big",
    smallImageText: (await strings).browsing,
    smallImageKey: "reading"
  };

  if (path.length > 1) {
    presenceData.state = document.querySelector<HTMLHeadingElement>(
      ".PageSubHeader_title"
    )?.textContent;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle reward page
 * @param path URL path
 */
async function handleRewards(path: string[]): Promise<void> {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ||
      document.title,
    largeImageKey: "logo_big",
    smallImageText: (await strings).browsing,
    smallImageKey: "reading"
  };

  if (path.length > 1) {
    presenceData.state = document.querySelector<HTMLHeadingElement>(
      ".RewardHeader_title"
    ).textContent;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle points page
 * @param path URL path
 */
async function handlePoints(path: string[]): Promise<void> {
  if (path.length < 2) return presence.setActivity();

  presence.setActivity({
    details: document.querySelector<HTMLHeadingElement>("h1").textContent,
    state: document.querySelector<HTMLHeadingElement>("h2")?.textContent,
    largeImageKey: "logo_big"
  });
}

/**
 * Handle news pages
 * @param path URL path
 */
async function handleNews(path: string[]): Promise<void> {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ||
      document.title,
    largeImageKey: "logo_big",
    smallImageText: (await strings).reading,
    smallImageKey: "reading"
  };

  if (path.length > 1) {
    presenceData.state =
      document.querySelector<HTMLHeadingElement>(
        ".NewsDetail_title"
      )?.textContent;
  } else {
    presenceData.state = document.querySelector<HTMLHeadingElement>(
      ".PageSubHeader_title"
    )?.textContent;
  }

  presence.setActivity(presenceData);
}

/**
 * Handle generic pages
 * @param preferTitle Prefer document title over h1 text content
 */
async function handleGeneric(
  preferTitle = false,
  action: "none" | "reading" | "browsing" = "none"
): Promise<void> {
  const presenceData: PresenceData = {
    details: preferTitle
      ? document.title
      : document.querySelector<HTMLHeadingElement>("h1")?.textContent ||
        document.title,
    largeImageKey: "logo_big"
  };

  if (action === "reading" || action === "browsing") {
    presenceData.smallImageKey = (await strings)[action];
    presenceData.smallImageText = action;
  }

  presence.setActivity(presenceData);
}
