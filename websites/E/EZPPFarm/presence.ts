const presence = new Presence({ clientId: "842203469741293585" }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement,
  rank: HTMLElement,
  pp: HTMLElement,
  title: HTMLElement,
  tag: HTMLElement,
  url: URL,
  mode: number,
  id: number,
  idURL: string;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "largeimage",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname === "/")
    presenceData.details = "Viewing the home page";
  else if (document.location.pathname.includes("/u/")) {
    user = document.getElementById("username");
    presenceData.details = `Viewing ${user.innerText}'s profile`;
    url = new URL(document.location.href);
    mode = parseInt(url.searchParams.get("mode"));
    idURL = url.pathname.replace("/u/", "");
    id = parseInt(idURL);
    presenceData.largeImageKey = `https://a.ez-pp.farm/${id}`;

    switch (mode) {
      case 1:
        rank = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div.ui.top.attached.segment.overflow.auto > div > div:nth-child(5) > h1:nth-child(3)"
        );
        pp = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div:nth-child(2) > div > div > div > div:nth-child(2) > table > tbody > tr:nth-child(2) > td.right.aligned"
        );
        presenceData.state = `Rank ${rank.innerText} | ${pp.innerText}pp`;
        presenceData.smallImageKey = "taiko";
        presenceData.smallImageText = "osu!taiko";
        break;
      case 2:
        rank = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div.ui.top.attached.segment.overflow.auto > div > div:nth-child(5) > h1:nth-child(4)"
        );
        pp = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div:nth-child(2) > div > div > div > div:nth-child(3) > table > tbody > tr:nth-child(2) > td.right.aligned"
        );
        presenceData.state = `Rank ${rank.innerText} | ${pp.innerText}pp`;
        presenceData.smallImageKey = "ctb";
        presenceData.smallImageText = "osu!catch";
        break;
      case 3:
        rank = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div.ui.top.attached.segment.overflow.auto > div > div:nth-child(5) > h1:nth-child(5)"
        );
        pp = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div:nth-child(2) > div > div > div > div:nth-child(4) > table > tbody > tr:nth-child(2) > td.right.aligned"
        );
        presenceData.state = `Rank ${rank.innerText} | ${pp.innerText}pp`;
        presenceData.smallImageKey = "mania";
        presenceData.smallImageText = "osu!mania";
        break;
      default:
        rank = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div.ui.top.attached.segment.overflow.auto > div > div:nth-child(5) > h1:nth-child(2)"
        );
        pp = document.querySelector(
          "body > div > div.h-container > div:nth-child(2) > div > div.five.wide.column > div:nth-child(2) > div > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned"
        );
        presenceData.state = `Rank ${rank.innerText} | ${pp.innerText}pp`;
        presenceData.smallImageKey = "std";
        presenceData.smallImageText = "osu!standard";
        break;
    }
    presenceData.buttons = [
      {
        label: "View profile",
        url: `https://ez-pp.farm/u/${id}`
      }
    ];
  } else if (document.location.pathname.includes("board")) {
    presenceData.details = "Browsing the leaderboard...";
    let board = "leaderboard";
    if (document.location.pathname.startsWith("/relax"))
      board = "Relax leaderboard";
    if (document.location.pathname.startsWith("/auto"))
      board = "Auto leaderboard";
    if (document.location.pathname.startsWith("/v2"))
      board = "ScoreV2 leaderboard";
    presenceData.details = `Browsing the ${board}...`;
  } else if (document.location.pathname.includes("/c/")) {
    title = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div:nth-child(2) > h1"
    );
    tag = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto.aligned > div > div:nth-child(2) > div"
    );
    presenceData.details = "Viewing clan:";
    presenceData.state = `${tag.innerText} ${title.innerText}`;
  } else if (document.location.pathname.includes("/b/")) {
    title = document.querySelector(
      "body > div.ui.full.height.main.wrapper > div.huge.heading.dropped > div > h1"
    );
    presenceData.details = "Viewing beatmap:";
    presenceData.state = `${title.innerText}`;
  } else if (document.location.pathname.includes("/donate")) {
    presenceData.details = "Donating to the server!";
    presenceData.state = "It helps a lot! <3";
  } else if (document.location.pathname.includes("/login"))
    presenceData.details = "Logging in...";
  else if (document.location.pathname.includes("/register"))
    presenceData.details = "Signing up...";
  else if (document.location.pathname.includes("/download"))
    presenceData.details = "Connecting to the server...";
  else if (document.location.pathname.includes("/verify"))
    presenceData.details = "Verifying their account...";
  else if (document.location.pathname.includes("/doc"))
    presenceData.details = "Browsing the documentation...";
  else if (document.location.pathname.includes("/about"))
    presenceData.details = "Reading all about us!";
  else if (document.location.pathname.includes("/team"))
    presenceData.details = "Viewing the team...";
  else if (document.location.pathname.includes("/settings"))
    presenceData.details = "Changing some settings...";
  else if (document.location.pathname.includes("/friends"))
    presenceData.details = "Viewing their friends...";
  else if (document.location.pathname.includes("/beatmaps"))
    presenceData.details = "Browsing the beatmaps...";
  else if (document.location.pathname.includes("/clans")) {
    presenceData.details = "Browsing the clans...";
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
  } else if (document.location.hostname === "new.ez-pp.farm") {
    presenceData.details = "Browsing the new frontend!";
    presenceData.state = "You should too ;)";
  } else if (document.location.hostname === "status.ez-pp.farm") {
    presenceData.details = "Viewing our status page";
    presenceData.state = "Have we gone down? :(";
  } else if (document.location.hostname === "git.ez-pp.farm") {
    presenceData.details = "Viewing our Git repo";
    presenceData.state = "Everything that makes EZPPFarm!";
  } else if (document.location.hostname === "old.ez-pp.farm") {
    presenceData.details = "Viewing the Admin Panel";
    presenceData.state = "The Ban Hammer has spoken!";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
