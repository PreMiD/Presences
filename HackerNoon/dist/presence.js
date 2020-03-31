const presence = new Presence({
  clientId: "651671730905153539",
});

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    tagged = document.querySelector(
      "#root > div.more > div.divider-title > h1"
    ),
    user = document.querySelector(
      "#root > div.profile-author > div.name > strong"
    ),
    posttitle = document.querySelector(
      "#root > div.story.story-container > h1"
    ),
    search = document.querySelector("#searchbox > div > form > input");

  let data = {
    largeImageKey: "hn-logo",
    startTimestamp: Math.floor(Date.now() / 1000),
  };

  if (page.includes("/tagged") && tagged && tagged.textContent != "") {
    data.details = "Viewing Tag:";
    data.state = `${tagged.textContent}`;
  } else if (posttitle && posttitle.textContent != "") {
    data.details = "Reads a Post:";
    data.state = posttitle.textContent;
  } else if (page.includes("/search")) {
    data.details = "Searching:";
    data.state = search.value;
    data.smallImageKey = "hn-logo";
  } else if (user && user.textContent != "") {
    data.details = "Viewing User Profile:";
    data.state = user.textContent;
  } else {
    data.details = "Viewing Page:";
    data.state = "Homepage";
  }

  if (data.details && data.state && data.details != "" && data.state != "")
    presence.setActivity(data);
});
