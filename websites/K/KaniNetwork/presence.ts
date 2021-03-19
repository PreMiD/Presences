const presence = new Presence({
  clientId: "801742167608787015"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000),
    privacy = await presence.getSetting("privacy"),
    sprivacy = await presence.getSetting("super-privacy");
  presenceData.startTimestamp = browsingStamp;
  if (sprivacy) {
    presenceData.details = "Browsing";
  } else {
    const PATH = window.location.pathname.replace('.php','');
    if (PATH.endsWith("commandes")) {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Commands";
    } else if (PATH.endsWith("informations")) {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Informations";
    } else if (PATH.endsWith("roles")) {
      presenceData.smallImageKey = "roles";
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Werewolf roles";
    } else if (PATH.endsWith("credits_kani")) {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Credits";
    } else if (PATH.endsWith("maintenance")) {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Maintenance";
    } else if (PATH.endsWith("contact_kani")) {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Contact";
    } else if (PATH.endsWith("choix_serv")) {
      presenceData.smallImageKey = "dashboard";
      presenceData.details = "Using the KaniShiel's dashboard:";
      presenceData.state = "Choosing a server";
    } else if (PATH.startsWith("/dashboard")) {
      presenceData.smallImageKey = "dashboard";
      if (privacy) {
        presenceData.details = "Editing a server";
        presenceData.state = "with the KaniShiel's dashboard";
      } else {
        presenceData.details = "Using the KaniShiel's dashboard of :";
        presenceData.state = document.getElementById(
          "563749920683720709"
        ).textContent;
      }
    } else {
      presenceData.details = "Viewing a page: (KaniShiel)";
      presenceData.state = "Home";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
