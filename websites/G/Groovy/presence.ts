const presence = new Presence({
  clientId: "654031945910452224"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;
  if (window.location.pathname.endsWith("commands")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Commands";
  } else if (window.location.pathname.endsWith("premium")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Premium";
  } else if (window.location.pathname.endsWith("guilds")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Guilds";
  } else if (window.location.pathname.startsWith("/guilds/")) {
    presenceData.details = "Viewing a guild:";
    presenceData.state = document.querySelector(
      "#__content > div.intro > div > h2"
    ).textContent;
  } else if (window.location.pathname.startsWith("/users/")) {
    presenceData.details = "Viewing a user:";
    presenceData.state = document.querySelector(
      "#__content > div.intro > div > p"
    ).textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
