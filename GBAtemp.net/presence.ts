let presence = new Presence({
  clientId: "632110854543769601",
  mediaKeys: false
});

presence.on("UpdateData", () => {
  let timeElapsed = Math.floor(Date.now() / 1000);
  let title, author;
  let presenceData: presenceData = {
    details: "Browsing...",
    largeImageKey: "tempy",
    startTimestamp: timeElapsed
  };

  if (document.location.pathname.startsWith("/threads")) {
    title = document.querySelector("a#threadTitle");
    let authorName = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
    let newsAuthor = document.querySelector("div.news-author > a.username > b");

    presenceData.details = `Reading a ${authorName ? "thread" : "news post"} by ` + (authorName ? authorName.innerText : newsAuthor.innerText);
    presenceData.state = title.innerText;

  } else if (document.location.pathname.startsWith("/game")) {
    title = document.querySelector("h1.dynamicTitle");
    if (title.innerText !== "GBAtemp Game Center Home") {
      presenceData.details = "Reading about a game";
      presenceData.state = title.innerText;
    }
  } else if (document.location.pathname.startsWith("/platform")) {
    title = document.querySelector("h1.dynamicTitle");
    if (title.innerText !== "Game Database" && title.innerText !== "Game Center Platform List") {
      presenceData.details = "Reading about a platform";
      presenceData.state = title.innerText;
    }
  } else if (document.location.pathname.startsWith("/company")) {
    title = document.querySelector("h1.dynamicTitle");
    if (title.innerText !== "List of video game companies") {
      presenceData.details = "Reading about a company";
      presenceData.state = title.innerText;
    }
  } else if (document.location.pathname.startsWith("/questions")) {
    title = document.querySelector("h1.blueHeader");

    presenceData.details = "Reading a question";
    presenceData.state = title.innerText;
  } else if (document.location.pathname.startsWith("/members")) {
    title = document.querySelector("div.mainText.secondaryContent > h1.username");

    if (title)
      presenceData.details = `Looking at ${title.innerText}'s profile`;
  } else if (document.location.pathname.startsWith("/chat")) {
    presenceData.details = "Chatting in IRC";
  } else if (document.location.pathname.startsWith("/shoutbox")) {
    presenceData.details = "Chatting in the Shoutbox";
  } else if (document.location.pathname.startsWith("/search")) {
    presenceData.details = "Searching...";
  } else if (document.location.pathname.startsWith("/review")) {
    author = document.querySelector("span.review_author > a.username");
    title = document.querySelector("h1#review_title > a");
    
    presenceData.details = "Reading a review by " + author.innerText;
    presenceData.state = title.innerText;
  } else if (document.location.pathname.startsWith("/entry")) {
    author = document.querySelector("span.postedBy > span.posted.iconKey > a.username");
    title = document.querySelector("a.newsTitle");

    presenceData.details = "Reading a blog post by " + author.innerText;
    presenceData.state = title.innerText;
  }

  presence.setActivity(presenceData);
});
