const presence = new Presence({
    clientId: "675322225490001924"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  },
  browsingStamp = Math.floor(Date.now() / 1000);
let customData = false,
  user: HTMLElement,
  title: HTMLElement,
  subtitle: HTMLElement,
  countryrank: HTMLElement,
  rank: HTMLElement,
  pp: HTMLElement,
  url: URL,
  mode: number;

presence.on("UpdateData", async () => {
  customData = false;

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Home Page";
  } else if (document.location.pathname.includes("/leaderboard")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Leaderboard";

    url = new URL(document.location.href);
    mode = parseInt(url.searchParams.get("mode"));
    switch (mode) {
      case 1:
        presenceData.state = "Taiko";
        break;
      case 2:
        presenceData.state = "Catch the Beat";
        break;
      case 3:
        presenceData.state = "osu!mania";
        break;
      default:
        presenceData.state = "osu! standard";
        break;
    }
  } else if (document.location.pathname.includes("/clans")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing Clans";

    url = new URL(document.location.href);
    mode = parseInt(url.searchParams.get("mode"));
    switch (mode) {
      case 1:
        presenceData.state = "osu!taiko";
        break;
      case 2:
        presenceData.state = "osu!catch";
        break;
      case 3:
        presenceData.state = "osu!mania";
        break;
      default:
        presenceData.state = "osu!standard";
        break;
    }
  } else if (document.location.pathname.includes("/register")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Registering account";
  } else if (document.location.pathname.includes("/u")) {
    user = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1"
    );
    pp = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned"
    );
    rank = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned"
    );
    subtitle = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(1) > b:nth-child(2)"
    );
    countryrank = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = `${user.innerText}'s profile`;
    presenceData.state = `${rank.innerText} | ${pp.innerText}pp | ${subtitle.innerText}(${countryrank.innerText})`;
  } else if (document.location.pathname.includes("/c")) {
    title = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > h1"
    );
    pp = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned"
    );
    rank = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(3) > div.ui.two.column.divided.stackable.grid > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned"
    );
    subtitle = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div > div"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Clans";
    presenceData.state = `${title.innerText + subtitle.innerText} | ${
      pp.innerText
    }pp(${rank.innerText})`;
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing About";
  } else if (document.location.pathname.includes("/doc")) {
    title = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div > div:nth-child(1) > h1"
    );
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing Documentation";
    presenceData.state = title.innerText;
  } else if (document.location.pathname === "/beatmaps") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing beatmaps";
  } else if (document.location.pathname.includes("/beatmaps/rank_request")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing beatmaps";
    presenceData.state = "Request beatmap ranking";
  } else if (document.location.pathname.includes("/friends")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing friends";
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their settings";
  }

  if (!customData) presence.setActivity(presenceData);
});
