const presence = new Presence({
    clientId: "928611702638010398"
  }),
  appCategories: Record<string, string> = {
    LIBRARIES_AND_DEMO: "Browsing for libraries and demos",
    BUSINESS: "Browsing for business apps",
    VIDEO_PLAYERS: "Browsing for video players",
    WEATHER: "Browsing for weather apps",
    HOUSE_AND_HOME: "Browsing for house apps",
    PARENTING: "Browsing for apps for parents",
    DATING: "Browsing for dating apps",
    HEALTH_AND_FITNESS: "Browsing for health apps",
    ART_AND_DESIGN: "Browsing for design apps",
    TOOLS: "Browsing for tools",
    MAPS_AND_NAVIGATION: "Browsing for navigation apps",
    BOOKS_AND_REFERENCE: "Browsing for book apps",
    COMICS: "Browsing for comics",
    COMMUNICATION: "Browsing for communication apps",
    BEAUTY: "Browsing for beauty apps",
    MEDICAL: "Browsing for medical apps",
    MUSIC_AND_AUDIO: "Browsing for audio apps",
    LIFESTYLE: "Browsing for lifestyle apps",
    NEWS_AND_MAGAZINES: "Browsing for news apps",
    EDUCATION: "Browsing for education apps",
    SHOPPING: "Browsing for shopping apps",
    PERSONALIZATION: "Browsing for personalization apps",
    AUTO_AND_VEHICLES: "Browsing for vehicles apps",
    ANDROID_WEAR: "Browsing for android watch apps",
    PRODUCTIVITY: "Browsing for productivity apps",
    TRAVEL_AND_LOCAL: "Browsing for traveling apps",
    ENTERTAINMENT: "Browsing for entertaiment apps",
    SOCIAL: "Browsing for social apps",
    SPORTS: "Browsing for sport apps",
    EVENTS: "Browsing for eventing apps",
    FINANCE: "Browsing for financing apps",
    PHOTOGRAPHY: "Browsing for photography apps",
    FOOD_AND_DRINK: "Browsing for food apps",
    WATCH_FACE: "Browisng for android watch faces"
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    query = new URLSearchParams(document.location.search),
    paths: string[] = document.location.pathname.split("/");
  if (!paths[0]) paths.shift();

  if (paths[0] === "settings") presenceData.details = "Viewing settings";
  if (paths[0] === "apps" && !paths[1])
    presenceData.details = "Viewing my apps";
  else if (paths[0] === "wishlist") presenceData.details = "Viewing wishlist";
  else if (paths[0] === "store") {
    if (paths[1] === "family" && paths[2] === "create")
      presenceData.details = "Creating family";
    if (paths[1] === "paymentmethods")
      presenceData.details = "Viewing payment methods";
    else if (paths[1] === "myplayactivity")
      presenceData.details = "Viewing my activity";
    else if (paths[1] === "search") {
      const q = query.get("q");
      presenceData.details = `Searching${q ? ` for ${q}` : ""}`;
    } else if (paths[1] === "account") {
      if (!paths[2] || paths[2] === "rewards")
        presenceData.details = "Viewing rewards";
      else if (paths[2] === "orderhistory")
        presenceData.details = "Viewing order hystory";
      else if (paths[2] === "family") presenceData.details = "Viewing family";
      else if (paths[2] === "subscriptions")
        presenceData.details = "Viewing subscriptions";
    } else if (paths[1] === "apps") {
      if (!paths[2]) presenceData.details = "Browsing for apps";
      else if (paths[2] === "top")
        presenceData.details = "Browsing for the TOP apps";
      else if (paths[2] === "new")
        presenceData.details = "Browsing for the new apps";
      else if (paths[2] === "details") {
        if (query.get("id")) {
          const body = document.querySelector<HTMLDivElement>(
              "body > div#fcxH9b > div.WpDbMd > c-wiz > div.T4LgNb > div.ZfcPIb > div.UTg3hd > div.JNury > main.LXrl4c > c-wiz > c-wiz > div.oQ6oV"
            ),
            logo = body?.querySelector<HTMLImageElement>(
              "div.hkhL9e > div.xSyT2c > img.T75of"
            )?.src,
            name = body?.querySelector<HTMLSpanElement>(
              "div.D0ZKYe > div.rlnrKc > div.sIskre > c-wiz > h1.AHFaub > span"
            ).textContent;

          if (logo) presenceData.largeImageKey = await getShortURL(logo);

          presenceData.details = `Viewing ${name ? name : "app"}`;
          presenceData.buttons = [
            {
              label: "View app",
              url: await getShortURL(document.location.href)
            }
          ];
        }
      } else if (paths[2] === "category") {
        let msg = "Browsing for apps";
        if (paths[3].startsWith("GAME_")) {
          msg = `Browsing for ${paths[3]
            .replace("GAME_", "")
            .replace("_", " ")
            .toLowerCase()} games`;
        }
        if (appCategories[paths[3]]) msg = appCategories[paths[3]];
        if (paths[3] === "GAME") msg = "Browsing for games";

        presenceData.details = msg ?? "Browsing for apps";
      }
    }
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
  if (!url || url.length < 256) return url;
  if (shortenedURLs[url]) return shortenedURLs[url];
  try {
    const pdURL = await (
      await fetch(`https://pd.premid.app/create/${url}`)
    ).text();
    shortenedURLs[url] = pdURL;
    return pdURL;
  } catch (err) {
    presence.error(err);
    return url;
  }
}
