const presence: Presence = new Presence({
    clientId: "609183409440555018"
  }),
  startTimestamp = Math.floor(Date.now() / 1000),
  strings = presence.getStrings({
    browsing: "presence.activity.browsing",
    live: "presence.activity.live"
  }),
  oldReddit = document.querySelector("._1tvdSTbdxaK-BnUbzUIqIY") == null;
let subReddit: string,
  postTitle: string,
  username: string,
  nickname: string,
  rpanTitle: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "reddit_lg",
    startTimestamp
  };
  const { pathname } = window.location;
  if (oldReddit) {
    subReddit = document.querySelector(".redditname")
      ? `r/${document.querySelector(".redditname").textContent}`
      : `Home`;
    if (pathname.includes(`/comments/`)) {
      postTitle = document.querySelector("p.title > a").textContent;
      presenceData.details = `Reading '${postTitle}'`;
      presenceData.state = subReddit;
    } else if (pathname.startsWith(`/user/`)) {
      username = document.querySelector(".titlebox > h1").textContent;
      presenceData.details = `Looking at ${username}'s profile`;
    } else if (pathname.startsWith(`/search`)) {
      presenceData.details = "Searching...";
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } else {
      presenceData.details = (await strings).browsing;
      presenceData.state = subReddit;
    }
  } else {
    if (pathname.includes("/comments/")) {
      postTitle =
        document.querySelector(
          "div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h"
        ) != undefined
          ? document.querySelector(
              "div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h"
            ).textContent
          : "";
      subReddit = document.querySelector(
        "span._1GieMuLljOrqnVpRAwz7VP"
      ).textContent;
      subReddit =
        subReddit == "Home" &&
        document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1] != undefined
          ? document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1].textContent
          : subReddit;
      presenceData.details = `Reading '${postTitle}'`;
      presenceData.state = subReddit;
    } else if (pathname.startsWith("/user/")) {
      username = document.querySelector(
        "span._1GieMuLljOrqnVpRAwz7VP"
      ).textContent;
      nickname = document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ")
        ? document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ").textContent
        : "";
      presenceData.details =
        nickname == ""
          ? "Looking at a profile"
          : `Looking at ${nickname}'s profile`;
      presenceData.state = username;
    } else if (pathname.startsWith("/search")) {
      presenceData.details = "Searching...";
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = "Searching";
    } else if (pathname.startsWith("/rpan")) {
      rpanTitle = document.querySelector("._17PXlsAvhmFm8yKmnpboBI")
        ? document.querySelector("._17PXlsAvhmFm8yKmnpboBI").textContent
        : "Loading title...";
      presenceData.details = "Watching RPAN";
      presenceData.state = rpanTitle;
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = (await strings).live;
    } else {
      delete presenceData.smallImageKey;
      const sub = document.querySelector("span._1GieMuLljOrqnVpRAwz7VP");
      if (sub === null) {
        const sub2 = document.querySelector(
          "#SHORTCUT_FOCUSABLE_DIV > div:nth-child(4) > div > div > div > div._3ozFtOe6WpJEMUtxDOIvtU > div.q4a8asWOWdfdniAbgNhMh > div > div.QscnL9OySMkHhGudEvEya > div > div._3TG57N4WQtubLLo8SbAXVF > h2"
        );
        presenceData.details = (await strings).browsing;
        presenceData.state = !sub2 ? "Home" : sub2.textContent;
      } else {
        presenceData.details = (await strings).browsing;
        presenceData.state = sub.textContent;
      }
    }
  }
  presence.setActivity(presenceData, true);
});
