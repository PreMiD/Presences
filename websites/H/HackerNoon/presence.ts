const presence = new Presence({
  clientId: "651671730905153539"
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
    search: HTMLInputElement = document.querySelector(
      "#searchbox > div > form > input"
    ),
    presenceData: PresenceData = {
      largeImageKey: "hn-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if (page.includes("/tagged") && tagged && tagged.textContent !== "") {
    presenceData.details = "Viewing Tag:";
    presenceData.state = `${tagged.textContent}`;
  } else if (posttitle && posttitle.textContent !== "") {
    presenceData.details = "Reads a Post:";
    presenceData.state = posttitle.textContent;
  } else if (page.includes("/search")) {
    presenceData.details = "Searching:";
    presenceData.state = search.value;
    presenceData.smallImageKey = "hn-logo";
  } else if (user && user.textContent !== "") {
    presenceData.details = "Viewing User Profile:";
    presenceData.state = user.textContent;
  } else {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Homepage";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
