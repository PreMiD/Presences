const presence = new Presence({
    clientId: "802958757909889054"
  }),
  capitalize = (text: string): string => {
    const texts = text.replace(/[[{(_)}\]]/g, " ").split(" ");
    return texts
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");
  };

function stripText(element: HTMLElement, id = "None", log = true): string {
  if (element && element.firstChild) {
    return element.firstChild.textContent;
  } else {
    if (log)
      presence.error(
        "An error occurred while stripping data off the page. Please contact Bas950 on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
          id
      );
    return null;
  }
}

presence.info(
  "When using the Twitter presence for PreMiD, make sure you have the latest UI update. Twitter classic and any legacy versions before it will not work with this presence."
);

let oldUrl: string, elapsed: number;

interface LangStrings {
  readTweet: string;
  viewDms: string;
  viewTweets: string;
  viewTweetsWithReplies: string;
  viewMedia: string;
  viewLiked: string;
  viewList: string;
  bookmarks: string;
  notifs: string;
  explore: string;
  settings: string;
  terms: string;
  privacy: string;
  browsing: string;
  search: string;
  searchSomething: string;
  viewing: string;
  profile: string;
}

async function getStrings(): Promise<LangStrings> {
  return presence.getStrings(
    {
      readTweet: "twitter.readTweet",
      viewDms: "twitter.viewDms",
      viewTweets: "twitter.viewTweets",
      viewTweetsWithReplies: "twitter.viewTweetsWithReplies",
      viewMedia: "twitter.viewMedia",
      viewLiked: "twitter.viewLiked",
      viewList: "twitter.viewList",
      bookmarks: "twitter.bookmarks",
      notifs: "twitter.notifs",
      explore: "twitter.explore",
      settings: "twitter.settings",
      terms: "general.terms",
      privacy: "general.privacy",
      browsing: "general.browsing",
      search: "general.searchFor",
      searchSomething: "general.searchSomething",
      viewing: "general.viewing",
      profile: "general.viewProfile"
    },
    await presence.getSetting("lang")
  );
}

let strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  //* Update strings if user selected another language.
  const newLang = await presence.getSetting("lang"),
    privacy = await presence.getSetting("privacy"),
    time = await presence.getSetting("time");
  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  let title: string,
    info: string,
    image = "twitter";

  const path = window.location.pathname;

  if (oldUrl !== window.location.href) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  title = (await strings).browsing;
  info = capitalize(path.split("/")[1]);

  if (path.match("/i/")) {
    info = capitalize(path.split("/")[2]);
    if (info === "Bookmarks") info = (await strings).bookmarks;
  }

  if (path.match("/notifications")) {
    info = (await strings).notifs;
  }

  if (path.match("/explore")) {
    info = (await strings).explore;
  }

  if (path.match("/tos")) {
    info = (await strings).terms;
  }

  if (path.match("/privacy")) {
    info = (await strings).privacy;
  }

  if (path.match("/settings/")) {
    info = (await strings).settings;
  }

  if (path.match("/search")) {
    if (privacy) {
      title = (await strings).searchSomething;
      info = null;
    } else {
      title = (await strings).search;
      info = document.querySelector("input").value;
    }
  }

  const objHeader: HTMLElement = document.querySelector(
    "span.css-901oao.css-16my406.css-bfa6kz.r-jwli3a.r-1qd0xha.r-1vr29t4.r-ad9z0x.r-bcqeeo.r-3s2u2q.r-qvutc0 > span > span"
  );

  if (objHeader) {
    title = (await strings).viewTweets;
    info = `${stripText(objHeader, "Object Header")} // ${capitalize(
      path.split("/")[1]
    )}`;

    if (path.match("/with_replies")) {
      title = (await strings).viewTweetsWithReplies;
    }

    if (path.match("/media")) {
      title = (await strings).viewMedia;
    }

    if (path.match("/likes")) {
      title = (await strings).viewLiked;
    }
  }

  if (objHeader === null && path.match("/status/")) {
    title = (await strings).readTweet;
    info = stripText(
      document.querySelector(
        "div.css-901oao.css-16my406.r-1qd0xha.r-ad9z0x.r-bcqeeo.r-qvutc0"
      ),
      "Tweet"
    );
  }

  if (path.match("/messages") && objHeader) {
    title = (await strings).viewDms;
    info = stripText(objHeader, "Object Header");
    if (privacy) info = null;
  }

  const etcHeader: HTMLElement = document.querySelector(
    "div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1pi2tsx.r-1777fci > div > h2 > span"
  );

  if (path.match("/moments") && etcHeader) {
    title = "Browsing Moments...";
    info = capitalize(path.split("/")[1]);
  }

  if (path.match("/lists") && etcHeader) {
    title = (await strings).viewList;
    info = capitalize(path.split("/")[1]);
  }

  if (window.location.href.match("tweetdeck.twitter.com/")) {
    const container =
      document.querySelector("#container > div") ||
      document.createElement("HTMLDivElement");

    title = `Tweetdeck (${container.childElementCount} Columns)`;
    info = undefined;
    image = "tweetdeck";

    const header = document.querySelector(".mdl-header-title"),
      profile = document.querySelector(".js-action-url > .fullname");

    if (header) {
      info = (await strings).viewing + " " + capitalize(header.textContent);
    }

    if (profile) {
      info = (await strings).profile + " " + profile.textContent;
    }
  }

  const presenceData: PresenceData = {
    details: title,
    state: info,
    largeImageKey: image
  };

  if (time) presenceData.startTimestamp = elapsed;

  presence.setActivity(presenceData, true);
});
