const presence = new Presence({
    clientId: "918832169823125555"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    },
    shortTitle = document.title.substring(
      0,
      document.title.lastIndexOf("-") - 1
    ),
    path = document.location.pathname;

  if (path.startsWith("/skin")) {
    presenceData.details = `Viewing: ${shortTitle}`;
    presenceData.state = `
    ${
      document.querySelector("#prices > div:nth-child(2) > a > span.pull-left")
        .textContent
    }:
    ${
      document.querySelector("#prices > div:nth-child(2) > a > span.pull-right")
        .textContent
    }`;
    presenceData.smallImageKey = "skins";
    presenceData.smallImageText = "Viewing skins";
    presenceData.buttons = [{ label: "View Skin", url: document.URL }];
  } else if (path.startsWith("/weapon")) {
    presenceData.details = "Browsing weapon skins";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "skins";
    presenceData.smallImageText = "Viewing skins";
  } else if (path.startsWith("/skin-rarity")) {
    presenceData.details = "Viewing a skin rarity catalog";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "skins";
    presenceData.smallImageText = "Viewing skins";
  } else if (path.startsWith("/case")) {
    presenceData.details = `Viewing case: ${shortTitle}`;
    presenceData.state = document.querySelector(
      "body > div.container.main-content > div:nth-child(3) > div > div:nth-child(1) > div > a.btn.btn-default.market-button-item"
    ).textContent;
    presenceData.smallImageKey = "case";
    presenceData.smallImageText = "Viewing cases";
    presenceData.buttons = [{ label: "View Case", url: document.URL }];
  } else if (path.startsWith("/containers")) {
    presenceData.details = "Browsing containers";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "case";
    presenceData.smallImageText = "Viewing containers";
  } else if (path.startsWith("/collection")) {
    presenceData.details = "Viewing a skin collection";
    presenceData.state = shortTitle;
  } else if (path.startsWith("/stickers/regular")) {
    presenceData.details = "Browsing stickers";
    presenceData.smallImageKey = "sticker";
    presenceData.smallImageText = "Viewing stickers";
  } else if (path.startsWith("stickers/tournament")) {
    presenceData.details = "Browsing tournament stickers";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "sticker";
    presenceData.smallImageText = "Viewing stickers";
  } else if (path.startsWith("/stickers/community")) {
    presenceData.details = "Browsing community stickers";
    presenceData.state = shortTitle;
    presenceData.smallImageKey = "sticker";
    presenceData.smallImageText = "Viewing stickers";
  } else if (path.startsWith("/stickers/capsule")) {
    presenceData.details = `Viewing the ${shortTitle}`;
    presenceData.state = document.querySelector(
      "body > div.container.main-content > div:nth-child(3) > div > div:nth-child(1) > div > a.btn.btn-default.market-button-item"
    ).textContent;
    presenceData.smallImageKey = "capsule";
    presenceData.smallImageText = "Viewing capsules";
    presenceData.buttons = [{ label: "View Capsule", url: document.URL }];
  } else if (path.startsWith("/sticker")) {
    presenceData.details = `Viewing sticker: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div.row.text-center > div.col-md-8.col-widen > div > div:nth-child(2) > div.col-md-6.col-md-6-collapse-top-margin > div:nth-child(2) > a > span.pull-right"
      ).textContent
    }`;
    presenceData.smallImageKey = "sticker";
    presenceData.smallImageText = "Viewing stickers";
    presenceData.buttons = [{ label: "View Sticker", url: document.URL }];
  } else if (path === "/gloves") {
    presenceData.details = "Browsing gloves";
    presenceData.smallImageKey = "glove";
    presenceData.smallImageText = "Viewing gloves";
  } else if (path.startsWith("/glove")) {
    presenceData.details = `Viewing glove: ${shortTitle}`;
    presenceData.state = `
    ${
      document.querySelector("#prices > div:nth-child(2) > a > span.pull-left")
        .textContent
    }:
    ${
      document.querySelector("#prices > div:nth-child(2) > a > span.pull-right")
        .textContent
    }`;
    presenceData.smallImageKey = "glove";
    presenceData.smallImageText = "Viewing gloves";
    presenceData.buttons = [{ label: "View Glove", url: document.URL }];
  } else if (path === "/agents") presenceData.details = "Browsing agents";
  else if (path.startsWith("/agents")) {
    presenceData.details = "Browsing agents";
    presenceData.state = shortTitle;
  } else if (path.startsWith("/agent")) {
    presenceData.details = `Viewing agent: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div.row.text-center > div.col-md-8.col-widen > div > div:nth-child(2) > div.col-md-6.col-md-6-collapse-top-margin > div:nth-child(2) > a > span.pull-right"
      ).textContent
    }`;
    presenceData.buttons = [{ label: "View Agent", url: document.URL }];
  } else if (path.startsWith("/patches")) {
    presenceData.details = "Browsing patches";
    presenceData.state = shortTitle;
  } else if (path.startsWith("/patch")) {
    presenceData.details = `Viewing patch: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div.row.text-center > div.col-md-8.col-widen > div > div:nth-child(2) > div.col-md-6.col-md-6-collapse-top-margin > div:nth-child(2) > a > span.pull-right"
      ).textContent
    }`;
    presenceData.buttons = [{ label: "View Patch", url: document.URL }];
  } else if (path === "/graffiti") presenceData.details = "Browsing graffitis";
  else if (path.startsWith("/graffiti/collection")) {
    presenceData.details = "Browsing graffiti collection";
    presenceData.state = shortTitle;
  } else if (path.startsWith("/graffiti/tournament")) {
    presenceData.details = "Browsing tournament graffitis";
    presenceData.state = shortTitle;
  } else if (path.startsWith("/graffiti/box")) {
    presenceData.details = `Viewing graffiti box: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div:nth-child(3) > div > div:nth-child(1) > div > a.btn.btn-default.market-button-item"
      ).textContent
    }`;
    presenceData.buttons = [{ label: "View Graffiti Box", url: document.URL }];
  } else if (path.startsWith("/graffiti")) {
    presenceData.details = `Viewing graffiti: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div.row.text-center > div.col-md-8.col-widen > div > div:nth-child(2) > div.col-md-6.col-md-6-collapse-top-margin > div:nth-child(2) > a > span.pull-right"
      ).textContent
    }`;
    presenceData.buttons = [{ label: "View Graffiti", url: document.URL }];
  } else if (path === "/items") {
    presenceData.details = "Browsing items";
    presenceData.smallImageKey = "items";
    presenceData.smallImageText = "Viewing items";
  } else if (path.startsWith("/item")) {
    presenceData.details = `Viewing item: ${shortTitle}`;
    presenceData.state = `Current lowest Steam price:
    ${
      document.querySelector(
        "body > div.container.main-content > div.row.text-center > div.col-md-8.col-widen > div > div:nth-child(2) > div.col-md-6.col-md-6-collapse-top-margin > div:nth-child(2) > a > span.pull-right"
      ).textContent
    }`;
    presenceData.smallImageKey = "items";
    presenceData.smallImageText = "Viewing items";
    presenceData.buttons = [{ label: "View Item", url: document.URL }];
  } else if (path.indexOf("google-search") > -1) {
    presenceData.details = "Searching for:";
    presenceData.state = document.querySelector(
      "#___gcse_0 > div > div > div > div.gsc-wrapper > div.gsc-resultsbox-visible > div > div > div.gcsc-more-maybe-branding-root > a > div > span.gcsc-find-more-on-google-query"
    ).textContent;
  } else if (document.location.href === "https://csgostash.com")
    presenceData.details = "Home page";
  else presenceData.details = "Browsing...";
  presence.setActivity(presenceData);
});
