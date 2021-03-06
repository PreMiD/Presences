const presence = new Presence({
    clientId: "735878480318955660"
  }),
  strings = presence.getStrings({
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent.trim();
  };

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/tos/": {
    details: "Viewing Page...",
    state: "Terms of Service"
  }
};

presence.on("UpdateData", async () => {
  const path = location.pathname.replace(/\/?$/, "/"),
    showDomain = await presence.getSetting("domain"),
    showSearch = await presence.getSetting("search"),
    showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "googledomains",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  for (const [k, v] of Object.entries(statics)) {
    if (path.match(k)) {
      data = { ...data, ...v };
    }
  }

  if (path.includes("/m/registrar/")) {
    const domainName = getElement(".domain-header-title > span");
    data.details = domainName ? "Browsing Domain..." : "Browsing...";

    const tab =
      getElement(".dreg-ogb-menu-item-selected") ||
      getElement(".partner-header") ||
      getElement(".gb_bd");
    data.state =
      domainName && showDomain ? `${domainName} (${tab})` : tab && `${tab} tab`;
  }

  if (path.includes("/m/registrar/cart/")) {
    data.details = "Viewing Cart...";
    data.state = getElement(".item-count")?.slice(1, -1);
  }

  if (path.includes("/m/registrar/checkout/")) {
    data.details = "Viewing Checkout...";
  }

  if (path.includes("/m/registrar/search/")) {
    data.details = "Searching...";
    data.state = showSearch && document.querySelector("input")?.value;
  }

  if (path.includes("/m/registrar/search/favorites/")) {
    data.details = "Viewing Favorites...";
    data.state = getElement(".mat-tab-label-active");
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (data.details.match("(Searching)")) {
      data.smallImageKey = "search";
      data.smallImageText = (await strings).search;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    !data.state && delete data.state;

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
