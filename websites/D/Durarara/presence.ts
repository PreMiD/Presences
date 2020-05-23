const presence = new Presence({
  clientId: "712269360206708766"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  const browsingStamp = Math.floor(Date.now() / 1000);
  const page = window.location.pathname;

  presenceData.startTimestamp = browsingStamp;

  if (page.includes("search")) {
    presenceData.details = "Searching something";
  } else if (page.endsWith("/lounge")) {
    presenceData.details = "Adding a new s";
  } else if (page.startsWith("/room")) {
    presenceData.details = "Viewing a bot:";
    presenceData.state = document.querySelector(
      "#__layout > div > main > div > section.bot__header > div > div > div > div.bot__name"
    ).textContent;
  } else if (page.includes("profile")) {
    presenceData.details = "Viewing a profile:";
    presenceData.state = document.querySelector(
      "#__layout > div > main > div > section.profile__header > div > div > div"
    ).textContent;
  } else if (page.includes("terms")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Terms of Service";
  } else if (page.startsWith("/about")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "About";
  } else if (page.includes("docs")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "API Documentation";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
