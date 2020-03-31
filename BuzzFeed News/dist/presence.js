const presence = new Presence({
  clientId: "651445584955310100",
});

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    article = document.querySelector(
      "#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > h1"
    ),
    sections = document.querySelector(
      "#news-content > div.content-column.xs-mt2.lg-mt0.md-mb4 > h1 > span"
    );

  let data = {
    largeImageKey: "bfnews-logo",
    startTimestamp: Math.floor(Date.now() / 1000),
  };

  if (page.includes("/section")) {
    data.details = "Viewing To Section:";
    data.state = sections.textContent;
  } else if (page.includes("/article")) {
    data.details = "Reads a Article:";
    data.state = article.textContent;
  } else if (page.includes("/author")) {
    data.details = "Viewing User Profile:";
    data.state = user.textContent;
  } else {
    data.details = "Viewing Page:";
    data.state = "Homepage";
  }

  if (data.details && data.state && data.details != "" && data.state != "")
    presence.setActivity(data);
});
