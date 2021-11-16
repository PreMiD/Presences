const presence = new Presence({
    clientId: "632110854543769601"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);
let threadName,
  authorName,
  newsAuthor,
  profileName,
  reviewAuthor,
  reviewTitle,
  blogAuthor,
  blogTitle,
  gName,
  pName,
  cName;

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/threads")) {
    threadName = document.querySelector("a#threadTitle");
    authorName = document.querySelector(
      "span.postedBy > span.posted.iconKey > a.username"
    );
    newsAuthor = document.querySelector("div.news-author > a.username > b");
    if (authorName === null) {
      const presenceData: PresenceData = {
        details: `Reading a news post by ${
          (newsAuthor as HTMLElement).innerText
        }`,
        state: (threadName as HTMLElement).innerText,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: `Reading a thread by ${(authorName as HTMLElement).innerText}`,
        state: (threadName as HTMLElement).innerText,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/game")) {
    gName = document.querySelector("h1.dynamicTitle");
    if ((gName as HTMLElement).innerText === "GBAtemp Game Center Home") {
      const presenceData: PresenceData = {
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: "Reading about a game",
        state: (gName as HTMLElement).innerText,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/platform")) {
    pName = document.querySelector("h1.dynamicTitle");
    if ((pName as HTMLElement).innerText === "Game Center Platform List") {
      const presenceData: PresenceData = {
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else if ((pName as HTMLElement).innerText === "Game Database") {
      const presenceData: PresenceData = {
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: "Reading about a platform",
        state: (pName as HTMLElement).innerText,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/company")) {
    cName = document.querySelector("h1.dynamicTitle");
    if ((cName as HTMLElement).innerText === "List of video game companies") {
      const presenceData: PresenceData = {
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: "Reading about a company",
        state: (cName as HTMLElement).innerText,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/questions")) {
    threadName = document.querySelector("h1.blueHeader");
    const presenceData: PresenceData = {
      details: "Reading a question",
      state: (threadName as HTMLElement).innerText,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/members")) {
    profileName = document.querySelector(
      "div.mainText.secondaryContent > h1.username"
    );
    if (profileName === null) {
      const presenceData: PresenceData = {
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    } else {
      const presenceData: PresenceData = {
        details: `Looking at ${
          (profileName as HTMLElement).innerText
        }'s profile`,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      };
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.startsWith("/chat")) {
    const presenceData: PresenceData = {
      details: "Chatting in IRC",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/shoutbox")) {
    const presenceData: PresenceData = {
      details: "Chatting in the Shoutbox",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/search")) {
    const presenceData: PresenceData = {
      details: "Searching...",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/review")) {
    reviewAuthor = document.querySelector("span.review_author > a.username");
    reviewTitle = document.querySelector("h1#review_title > a");
    const presenceData: PresenceData = {
      details: `Reading a review by ${(reviewAuthor as HTMLElement).innerText}`,
      state: (reviewTitle as HTMLElement).innerText,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/entry")) {
    blogAuthor = document.querySelector(
      "span.postedBy > span.posted.iconKey > a.username"
    );
    blogTitle = document.querySelector("a.newsTitle");
    const presenceData: PresenceData = {
      details: `Reading a blog post by ${
        (blogAuthor as HTMLElement).innerText
      }`,
      state: (blogTitle as HTMLElement).innerText,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      details: "Browsing...",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  }
});
