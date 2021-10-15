const presence = new Presence({
    clientId: "660588527079391243"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "labydesigns"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname.includes("/downloads")) {
    presenceData.smallImageKey = "downloading";
    presenceData.details = "Viewing the free downloads";
  } else if (document.location.pathname.includes("/advent"))
    presenceData.details = "Viewing the adventcalander";
  else if (document.location.pathname.includes("/profil")) {
    if (document.location.pathname.includes("/login")) {
      presenceData.details = "Logging in...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/register")) {
      presenceData.details = "Registering...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/panel")) {
      presenceData.details = "Viewing their panel";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/order")) {
      presenceData.details = "Ordering...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/jobs")) {
      presenceData.details = "Applying for staff...";
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/profile")) {
      presenceData.details = "Viewing their profile";
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.pathname.includes("/impressum")) {
    presenceData.details = "Reading impressum";
    presenceData.smallImageKey = "reading";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
