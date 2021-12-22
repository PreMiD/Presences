let presence: Presence;

function setPresence(): void {
  if (location.pathname.includes("/r/netflix"))
    presence = new Presence({ clientId: "869992823854870588" });
  else presence = new Presence({ clientId: "609183409440555018" });
}

setPresence();

let subReddit: string,
  postTitle: string,
  username: string,
  nickname: string,
  rpanTitle: string,
  strings = getStrings(),
  oldLang: string = null;

async function getStrings() {
  return presence.getStrings(
    {
      browsing: "general.browsing",
      live: "general.live",
      profile: "general.viewProfile",
      searchSomething: "general.searchSomething",
      searching: "general.search",
      reading: "general.readingPost",
      watching: "general.watching",
      readButton: "general.buttonReadArticle",
      viewProfileButton: "general.buttonViewProfile",
      streamButton: "general.buttonWatchStream"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

const startTimestamp = Math.floor(Date.now() / 1000),
  oldReddit = document.querySelector("._1tvdSTbdxaK-BnUbzUIqIY") === null;

presence.on("UpdateData", async () => {
  setPresence();
  const newLang = await presence.getSetting("lang").catch(() => "en"),
    buttons = await presence.getSetting("buttons");
  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  const presenceData: PresenceData = {
      largeImageKey: "reddit_lg",
      startTimestamp
    },
    { pathname } = window.location;
  if (oldReddit) {
    subReddit = document.querySelector(".redditname")
      ? `r/${document.querySelector(".redditname").textContent}`
      : "Home";
    if (pathname.includes("/comments/")) {
      postTitle = document.querySelector("p.title > a").textContent;
      presenceData.details = `${(await strings).reading} '${postTitle}'`;
      presenceData.state = subReddit;
      presenceData.buttons = [
        {
          url: `https://www.reddit.com${pathname}`,
          label: (await strings).readButton
        }
      ];
    } else if (pathname.startsWith("/user/")) {
      username = document.querySelector(".titlebox > h1").textContent;
      presenceData.details = (await strings).profile;
      presenceData.state = username;
      presenceData.buttons = [
        {
          url: `https://www.reddit.com${pathname}`,
          label: (await strings).viewProfileButton
        }
      ];
    } else if (pathname.startsWith("/search")) {
      presenceData.details = (await strings).searchSomething;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).searching;
    } else {
      presenceData.details = (await strings).browsing;
      presenceData.state = subReddit;
    }
  } else {
    if (pathname.includes("/comments/")) {
      postTitle =
        document.querySelector(
          "div._2SdHzo12ISmrC8H86TgSCp._29WrubtjAcKqzJSPdQqQ4h"
        )?.textContent || "";
      subReddit = document.querySelector(
        "span._1GieMuLljOrqnVpRAwz7VP"
      ).textContent;
      subReddit =
        subReddit === "Home" &&
        document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1] !== null
          ? document.querySelectorAll("._19bCWnxeTjqzBElWZfIlJb")[1].textContent
          : subReddit;
      presenceData.details = `${(await strings).reading} '${postTitle}'`;
      presenceData.state = subReddit;
      presenceData.buttons = [
        {
          url: `https://www.reddit.com${pathname}`,
          label: (await strings).readButton
        }
      ];
    } else if (pathname.startsWith("/user/")) {
      username = document.querySelector(
        "span._1GieMuLljOrqnVpRAwz7VP"
      ).textContent;
      nickname = document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ")
        ? document.querySelector("h4._3W1eUu5jHdcamkzFiJDITJ").textContent
        : "";
      presenceData.details = (await strings).profile;
      presenceData.state = nickname !== "" ? nickname : username;
      presenceData.buttons = [
        {
          url: `https://www.reddit.com${pathname}`,
          label: (await strings).viewProfileButton
        }
      ];
    } else if (pathname.startsWith("/search")) {
      presenceData.details = (await strings).searchSomething;
      presenceData.smallImageKey = "search";
      presenceData.smallImageText = (await strings).searching;
    } else if (pathname.startsWith("/rpan")) {
      rpanTitle = document.querySelector("h1")
        ? document.querySelector("h1").textContent
        : "Loading title...";
      presenceData.details = `${(await strings).watching} (RPAN)`;
      presenceData.state = rpanTitle;
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = (await strings).live;
      presenceData.buttons = [
        {
          url: `https://www.reddit.com${pathname}`,
          label: (await strings).streamButton
        }
      ];
    } else {
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
  if (pathname.includes("/r/netflix")) {
    if (!presenceData.buttons?.length) {
      presenceData.buttons = [
        {
          url: "https://www.reddit.com/r/netflix",
          label: "View r/Netflix Subreddit"
        },
        {
          url: "https://discord.gg/bDumw325vX",
          label: "Join r/Netflix Discord"
        }
      ];
    }
    if (presenceData.buttons.length === 1) {
      presenceData.buttons.push({
        url: "https://discord.gg/bDumw325vX",
        label: "Join r/Netflix Discord"
      });
    }
  }
  if (!buttons) delete presenceData.buttons;
  presence.setActivity(presenceData, true);
});
