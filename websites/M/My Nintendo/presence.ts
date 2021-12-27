const presence = new Presence({
  clientId: "680498892651233310"
});

let strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1);

  strings = await getStrings();

  switch (path[0]) {
    // Reward Categories
    case "reward_categories":
      handleRewardCategories(path);
      break;
    // Rewards
    case "rewards":
      handleRewards(path);
      break;
    // Missions
    case "missions":
      handleGeneric(false, "reading");
      break;
    // Points
    case "point":
      handlePoints(path);
      break;
    // News
    case "news":
      handleNews(path);
      break;
    // Redeem Point Codes
    case "serial_number":
      handleGeneric();
      break;
    // Getting Started, About Points, About Gold Points
    case "getting_started":
    case "about_point":
    case "about_gold_point":
      handleGeneric(false, "reading");
      break;
    // Startpage, Unknown
    default:
      presence.setActivity();
      break;
  }
});

async function getStrings() {
  return presence.getStrings(
    {
      browsing: "general.browsing",
      reading: "general.reading"
    },
    await presence.getSetting<string>("lang").catch(() => "en")
  );
}

/**
 * Handle reward category pages
 * @param path URL path
 */
function handleRewardCategories(path: string[]): void {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
      document.title,
    largeImageKey: "logo_big",
    smallImageText: strings.browsing,
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
function handleRewards(path: string[]): void {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
      document.title,
    largeImageKey: "logo_big",
    smallImageText: strings.browsing,
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
function handlePoints(path: string[]): void {
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
function handleNews(path: string[]): void {
  const presenceData: PresenceData = {
    details:
      document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
      document.title,
    largeImageKey: "logo_big",
    smallImageText: strings.reading,
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
function handleGeneric(
  preferTitle = false,
  action: "none" | "reading" | "browsing" = "none"
): void {
  const presenceData: PresenceData = {
    details: preferTitle
      ? document.title
      : document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title,
    largeImageKey: "logo_big"
  };

  if (action === "reading" || action === "browsing") {
    presenceData.smallImageKey = strings[action];
    presenceData.smallImageText = action;
  }

  presence.setActivity(presenceData);
}
