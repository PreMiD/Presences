const presence = new Presence({
  clientId: "668933003434655781"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname.includes("/bot/")) {
    presenceData.details = "Viewing A Discord Bot:";
    presenceData.state = document.querySelector(
      "#main-container > div.hero-static > div > div > div > center > h1 > span"
    ).textContent;
  } else if (document.location.pathname.includes("/user/")) {
    presenceData.details = "Viewing a profile:";
    presenceData.state = document.querySelector(
      "#main-container > div.hero-static > div > div > div > h1 > span.white-white"
    ).textContent;
  } else if (document.location.pathname.includes("/api")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Devine Discord Bots Api";
  } else if (document.location.pathname.includes("/add/bot"))
    presenceData.details = "Adding Discord Bot";
  else {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Discord Bot List";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
