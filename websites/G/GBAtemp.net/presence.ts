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
      presence.setActivity({
        details: `Reading a news post by ${
          (newsAuthor as HTMLElement).textContent
        }`,
        state: (threadName as HTMLElement).textContent,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else {
      presence.setActivity({
        details: `Reading a thread by ${
          (authorName as HTMLElement).textContent
        }`,
        state: (threadName as HTMLElement).textContent,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname.startsWith("/game")) {
    gName = document.querySelector("h1.dynamicTitle");
    if ((gName as HTMLElement).textContent === "GBAtemp Game Center Home") {
      presence.setActivity({
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else {
      presence.setActivity({
        details: "Reading about a game",
        state: (gName as HTMLElement).textContent,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname.startsWith("/platform")) {
    pName = document.querySelector("h1.dynamicTitle");
    if ((pName as HTMLElement).textContent === "Game Center Platform List") {
      presence.setActivity({
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else if ((pName as HTMLElement).textContent === "Game Database") {
      presence.setActivity({
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else {
      presence.setActivity({
        details: "Reading about a platform",
        state: (pName as HTMLElement).textContent,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname.startsWith("/company")) {
    cName = document.querySelector("h1.dynamicTitle");
    if ((cName as HTMLElement).textContent === "List of video game companies") {
      presence.setActivity({
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else {
      presence.setActivity({
        details: "Reading about a company",
        state: (cName as HTMLElement).textContent,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname.startsWith("/questions")) {
    threadName = document.querySelector("h1.blueHeader");

    presence.setActivity({
      details: "Reading a question",
      state: (threadName as HTMLElement).textContent,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else if (document.location.pathname.startsWith("/members")) {
    profileName = document.querySelector(
      "div.mainText.secondaryContent > h1.username"
    );
    if (profileName === null) {
      presence.setActivity({
        details: "Browsing...",
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    } else {
      presence.setActivity({
        details: `Looking at ${
          (profileName as HTMLElement).textContent
        }'s profile`,
        largeImageKey: "tempy",
        startTimestamp: timeElapsed
      });
    }
  } else if (document.location.pathname.startsWith("/chat")) {
    presence.setActivity({
      details: "Chatting in IRC",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else if (document.location.pathname.startsWith("/shoutbox")) {
    presence.setActivity({
      details: "Chatting in the Shoutbox",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else if (document.location.pathname.startsWith("/search")) {
    presence.setActivity({
      details: "Searching...",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else if (document.location.pathname.startsWith("/review")) {
    reviewAuthor = document.querySelector("span.review_author > a.username");
    reviewTitle = document.querySelector("h1#review_title > a");

    presence.setActivity({
      details: `Reading a review by ${
        (reviewAuthor as HTMLElement).textContent
      }`,
      state: (reviewTitle as HTMLElement).textContent,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else if (document.location.pathname.startsWith("/entry")) {
    blogAuthor = document.querySelector(
      "span.postedBy > span.posted.iconKey > a.username"
    );
    blogTitle = document.querySelector("a.newsTitle");

    presence.setActivity({
      details: `Reading a blog post by ${
        (blogAuthor as HTMLElement).textContent
      }`,
      state: (blogTitle as HTMLElement).textContent,
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  } else {
    presence.setActivity({
      details: "Browsing...",
      largeImageKey: "tempy",
      startTimestamp: timeElapsed
    });
  }
});
