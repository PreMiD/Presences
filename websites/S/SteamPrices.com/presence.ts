const presence = new Presence({
    clientId: "712891558491324452"
  }),
  startBrowse = Date.now(),
  presenceData: PresenceData = {
    startTimestamp: startBrowse,
    largeImageKey: "logo"
  };

presence.on("UpdateData", async () => {
  const queryparams = new URLSearchParams(document.location.search);
  const vowelmatch = "^[aieouAIEOU].*";

  if (
    document.location.pathname.split("/").slice(-1)[0] == "" &&
    document.location.search == ""
  ) {
    presenceData.details = "Viewing the homepage";
  } else if (document.location.href.indexOf("/search") > -1) {
    if (queryparams.get("preset") == "discount") {
      presenceData.details = "Searching for a discounted game";
    } else if (queryparams.get("preset") == "unfair") {
      presenceData.details = "Searching for an unfair priced game";
    } else if (queryparams.has("preset")) {
      if (queryparams.get("preset").match(vowelmatch)) {
        presenceData.details =
          "Searching for an " + queryparams.get("preset") + " game";
      } else {
        presenceData.details =
          "Searching for a " + queryparams.get("preset") + " game";
      }
    } else {
      presenceData.details = "Searching for a game";
      if (queryparams.has("q")) {
        presenceData.state = queryparams.get("q").replace(/\+/g, " ");
      }
    }
  } else if (document.location.href.indexOf("/search/") > -1) {
    presenceData.details = "Searching for a game";
  } else if (document.location.href.indexOf("/s/") > -1) {
    presenceData.details = "Searching for a game";
    presenceData.state = document
      .getElementById("entriesfound")
      .innerText.match(/"(.*?)"/)[0]
      .replace(/"/g, "");
  } else if (document.location.href.indexOf("/app/") > -1) {
    presenceData.details = "Looking at a game";
    presenceData.state = (
      document.querySelector("h1.title") as HTMLElement
    ).innerText.match(/[^\s*].*[^\s*]/)[0];
  } else if (document.location.href.indexOf("/bundle/") > -1) {
    presenceData.details = "Looking at a bundle";
    presenceData.state = (
      document.querySelector("h1.title") as HTMLElement
    ).innerText.match(/[^\s*].*[^\s*]/)[0];
  } else if (document.location.href.indexOf("/tracker") > -1) {
    presenceData.details = "Tracking game prices";
  } else if (document.location.href.indexOf("/publishers") > -1) {
    presenceData.details = "Comparing publisher's regional prices";
  } else if (document.location.href.indexOf("/user/") > -1) {
    if (document.location.href.indexOf("wishlist") > -1) {
      presenceData.details = "Looking at the wishlist";
    } else if (document.location.href.indexOf("ownedgames") > -1) {
      presenceData.details = "Looking at owned games";
    } else if (document.location.href.indexOf("blacklist") > -1) {
      presenceData.details = "Looking at the blacklist";
    } else if (document.location.href.indexOf("settings") > -1) {
      presenceData.details = "Changing user settings";
    }
  } else if (document.location.href.indexOf("/blog") > -1) {
    presenceData.details = "Looking at the blog";
    if (
      (document.querySelector("h3.block_title.no_margintop") as HTMLElement)
        .innerText == "BLOG POST"
    ) {
      presenceData.state = (
        document.querySelector("h4.title") as HTMLElement
      ).innerText;
    }
  } else if (document.location.href.indexOf("/faq") > -1) {
    presenceData.details = "Reading the FAQ";
  } else if (document.location.href.indexOf("/contact") > -1) {
    presenceData.details = "Looking the SteamPrices.com contact info";
  } else {
    presenceData.details = "Currently somewhere unknown";
  }

  presence.setActivity(presenceData);
});
