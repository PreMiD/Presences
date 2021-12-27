const presence = new Presence({
  clientId: "680498892651233310"
});

let strings: Awaited<ReturnType<typeof getStrings>>;

presence.on("UpdateData", async () => {
  const path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {};

  strings = await getStrings();

  switch (path[0]) {
    // Reward Categories
    case "reward_categories":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";
      presenceData.smallImageText = strings.browsing;
      presenceData.smallImageKey = "reading";

      if (path.length > 1) {
        presenceData.state = document.querySelector<HTMLHeadingElement>(
          ".PageSubHeader_title"
        )?.textContent;
      }
      break;
    // Rewards
    case "rewards":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";
      presenceData.smallImageText = strings.browsing;
      presenceData.smallImageKey = "reading";

      if (path.length > 1) {
        presenceData.state = document.querySelector<HTMLHeadingElement>(
          ".RewardHeader_title"
        ).textContent;
      }
      break;
    // Missions
    case "missions":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";

      presenceData.smallImageKey = strings.reading;
      presenceData.smallImageText = "reading";
      break;
    // Points
    case "point":
      if (path.length < 2) return presence.setActivity();

      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1").textContent;
      presenceData.state =
        document.querySelector<HTMLHeadingElement>("h2")?.textContent;
      presenceData.largeImageKey = "logo_big";
      break;
    // News
    case "news":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";
      presenceData.smallImageText = strings.reading;
      presenceData.smallImageKey = "reading";

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
      break;
    // Redeem Point Codes
    case "serial_number":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";
      break;
    // Getting Started, About Points, About Gold Points
    case "getting_started":
    case "about_point":
    case "about_gold_point":
      presenceData.details =
        document.querySelector<HTMLHeadingElement>("h1")?.textContent ??
        document.title;
      presenceData.largeImageKey = "logo_big";

      presenceData.smallImageKey = strings.reading;
      presenceData.smallImageText = "reading";
      break;
    // Startpage, Unknown
    default:
      return presence.setActivity();
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
