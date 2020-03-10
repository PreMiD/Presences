let timeElapsed = Math.floor(Date.now() / 1000),
  threadName,
  authorName,
  newsAuthor,
  profileName,
  reviewTitle,
  blogAuthor,
  blogTitle,
  gName,
  pName,
  cName;

let presenceData: presenceData = {
  details: "Browsing...",
  largeImageKey: "tempy",
  startTimestamp: timeElapsed
};

let presence = new Presence({
  clientId: "632110854543769601",
  mediaKeys: false
});

presence.on("UpdateData", () => {
  if (document.location.pathname.startsWith("/threads")) {
    threadName = document.querySelector("a#threadTitle");
    authorName = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
    newsAuthor = document.querySelector("div.news-author > a.username > b");

    presenceData.details = `Reading a ${authorName ? "thread" : "news post"} by ` + authorName ? authorName.innerText : newsAuthor.innerText;
    presenceData.state = threadName.innerText;

  } else if (document.location.pathname.startsWith("/game")) {
    gName = document.querySelector("h1.dynamicTitle");
    if (gName.innerText !== "GBAtemp Game Center Home") {
      presenceData.details: "Reading about a game";
      presenceData.state: gName.innerText;
    }
  } else if (document.location.pathname.startsWith("/platform")) {
    pName = document.querySelector("h1.dynamicTitle");
    if (pName.innerText !== "Game Database" && pName.innerText !== "Game Center Platform List") {
      presenceData.details = "Reading about a platform";
      presenceData.state = pName.innerText;
    }
  } else if (document.location.pathname.startsWith("/company")) {
    cName = document.querySelector("h1.dynamicTitle");
    if (cName.innerText !== "List of video game companies") {
      presenceData.details = "Reading about a company";
      presenceData.state = cName.innerText;
    }
  } else if (document.location.pathname.startsWith("/questions")) {
    threadName = document.querySelector("h1.blueHeader");

    presenceData.details = "Reading a question";
    presenceData.state = threadName.innerText;
  } else if (document.location.pathname.startsWith("/members")) {
    profileName = document.querySelector("div.mainText.secondaryContent > h1.username");

    if (profileName) {
      presenceData.details = `Looking at ${profileName.innerText}'s profile`;
      presenceData.state = threadName.innerText;
    }
  } else if (document.location.pathname.startsWith("/chat")) {
    presenceData.details = "Chatting in IRC";
  } else if (document.location.pathname.startsWith("/shoutbox")) {
    presenceData.details = "Chatting in the Shoutbox";
  } else if (document.location.pathname.startsWith("/search")) {
    presenceData.details = "Searching...";
  } else if (document.location.pathname.startsWith("/review")) {
    let reviewAuthor = document.querySelector("span.review_author > a.username");
    reviewTitle = document.querySelector("h1#review_title > a");
    
    presenceData.details = "Reading a review by " + reviewAuthor.innerText;
    presenceData.state = reviewTitle.innerText;
  } else if (document.location.pathname.startsWith("/entry")) {
    blogAuthor = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
    blogTitle = document.querySelector("a.newsTitle");

    presenceData.details = "Reading a blog post by " + blogAuthor.innerText;
    presenceData.state = blogTitle.innerText;
  }

  presence.setActivity(presenceData);
});
