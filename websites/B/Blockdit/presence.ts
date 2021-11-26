const presence = new Presence({
    clientId: "714733112499896343"
  }),
  // Const thing
  browsingStamp = Math.floor(Date.now() / 1000),
  path = document.location;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  // Presence
  if (path.hostname === "blockdit.com" || path.hostname.includes("www.")) {
    //Home
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (path.pathname.includes("/home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (path.pathname.includes("articles")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.href.includes("bookmark")) {
        presenceData.details = "Viewing on bookmark";
        presenceData.state = "Favorite articles";
      } else if (path.href.includes("draft")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Draft: articles";
      } else if (path.href.includes("schedule")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Schedulet: articles";
      } else if (path.href.includes("popural")) {
        presenceData.details = "Viewing on popular";
        presenceData.state = "Trending articles";
      } else if (path.href.includes("pages")) {
        const page =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = `${page} | Articles`;
      } else {
        const titlen =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Reading on articles";
        presenceData.state = `${titlen} | Articles`;
        presenceData.smallImageKey = "reading";
      } // Videos
    } else if (path.pathname.includes("videos")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.href.includes("bookmark")) {
        presenceData.details = "Viewing on bookmark";
        presenceData.state = "Favorite videos";
      } else if (path.href.includes("draft")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Draft: videos";
      } else if (path.href.includes("schedule")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Schedulet: videos";
      } else if (path.href.includes("popular")) {
        presenceData.details = "Viewing on popular";
        presenceData.state = "Trending videos";
      } else if (path.href.includes("pages")) {
        const page =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = `${page} | Videos`;
      } else {
        const titlen =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = `${titlen} | Videos`;
        presenceData.smallImageKey = "playing";
      } // Podcast
    } else if (path.pathname.includes("podcasts")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.href.includes("bookmark")) {
        presenceData.details = "Viewing on bookmark";
        presenceData.state = "Favorite podcasts";
      } else if (path.href.includes("draft")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Draft: podcasts";
      } else if (path.href.includes("schedule")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Schedulet: podcast";
      } else if (path.href.includes("popular")) {
        presenceData.details = "Viewing on popular";
        presenceData.state = "Trending podcasts";
      } else if (path.href.includes("pages")) {
        const page =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = page;
      } else {
        const titlen =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = titlen;
        presenceData.smallImageKey = "playing";
      } //Series
    } else if (path.pathname.includes("series")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.href.includes("bookmark")) {
        presenceData.details = "Viewing on bookmark";
        presenceData.state = "Favorite series";
      } else if (path.href.includes("draft")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Draft: series";
      } else if (path.href.includes("schedule")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Schedulet: series";
      } else if (path.href.includes("popular")) {
        presenceData.details = "Viewing on popular";
        presenceData.state = "Trending series";
      } else if (path.href.includes("pages")) {
        const page =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = `${page} | Series`;
      } else {
        const titlen =
          document.querySelector("head > title").textContent ?? "Unknow page";
        presenceData.details = "Viewing on page";
        presenceData.state = `${titlen} | Series`;
      } //Explore
    } else if (
      path.pathname.includes("explore") ||
      path.pathname.includes("all")
    ) {
      presenceData.startTimestamp = browsingStamp;
      const extitle = path.pathname.replace("/explore/", "| ");
      presenceData.details = "Viewing on exploring";
      presenceData.state = `About ${extitle}`;
      presenceData.smallImageKey = "search";
    } else if (path.pathname.includes("notification")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing on notification";
    } else if (path.pathname.includes("activity-log")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing on activity log";
    } else if (path.pathname.includes("boost-manager")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("boosts")) {
        presenceData.details = "Viewing on boosts manage";
        presenceData.state = "All boosts";
      } else if (path.pathname.includes("histories")) {
        presenceData.details = "Viewing on boosts manage";
        presenceData.state = "Boosts histories";
      } else {
        presenceData.details = "Viewing on boosts manage";
        presenceData.state = "Unknow boosts manage";
      } //settings
    } else if (path.pathname.includes("sttings")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("pages")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Settings";
      } else if (path.pathname.includes("user-settings"))
        presenceData.details = "Viewing on user settings";
      else {
        presenceData.details = "Viewing on settings";
        presenceData.state = "Unknow settings";
      }
    } else if (path.pathname.includes("draft")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("pages")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "All draft";
      } else {
        presenceData.details = "Viewing on draft";
        presenceData.state = "Draft: Post";
      }
    } else if (path.pathname.includes("schedule")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("pages")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "All schedule";
      } else {
        presenceData.details = "Viewing on schedule";
        presenceData.state = "Schedule: Post";
      }
    } else if (path.pathname.includes("monetize")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("page")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Page monetize";
      } else {
        presenceData.details = "Viewing on profile";
        presenceData.state = "Start monetize";
      }
    } else if (path.pathname.includes("insights")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("page")) {
        presenceData.details = "Viewing on page creator";
        presenceData.state = "Insights: all";
        if (path.pathname.includes("followers")) {
          presenceData.details = "Viewing on page creator";
          presenceData.state = "Insights: followers";
        } else if (path.pathname.includes("demographics")) {
          presenceData.details = "Viewing on page creator";
          presenceData.state = "Insights: demographics";
        }
      } else {
        presenceData.details = "Viewing on Insights";
        presenceData.state = "Insights: all";
        if (path.pathname.includes("followers")) {
          presenceData.details = "Viewing on Insights";
          presenceData.state = "Insights: followers";
        } else if (path.pathname.includes("demographics")) {
          presenceData.details = "Viewing on Insights";
          presenceData.state = "Insights: demographics";
        }
      }
    } else if (path.pathname.includes("user")) {
      const user =
        document.querySelector("head > title").textContent ?? "Unknow username";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing on profile";
      presenceData.state = user;
    } else if (path.pathname.includes("terms")) {
      presenceData.startTimestamp = browsingStamp;
      if (path.pathname.includes("ads")) {
        presenceData.details = "Terms of ads and boosts";
        presenceData.smallImageKey = "reading";
      } else {
        presenceData.details = "Privacy Policy";
        presenceData.smallImageKey = "reading";
      }
    } else if (path.pathname.includes("faqs")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "FAQS";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("brand")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Guild to use brand";
      presenceData.smallImageKey = "reading";
    } else if (path.pathname.includes("search")) {
      const searchres =
        document
          .querySelector(
            "#__next > div > div.container.flex-grow-1.d-flex.flex-column > div > div.jsx-3959159148.col-12.col-md-8.col-lg-6.col-xl-5.px-0 > div > div:nth-child(2) > div > form > div.jsx-1849148460.d-flex.align-items-center > label > input"
          )
          .getAttribute("value") ?? "Unknow search";
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching for:";
      presenceData.state = searchres;
      presenceData.smallImageKey = "search";
    } else if (path.pathname.includes("bookmark")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing on bookmark";
    } else if (path.pathname.includes("popular")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing on popular page";
      presenceData.state = "Trending";
    } else {
      const titlen =
        document.querySelector("head > title").textContent ?? "Unknow page";
      presenceData.details = "Viewing on page";
      presenceData.state = titlen;
      presenceData.startTimestamp = browsingStamp;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
  //console.log(presenceData);
});
