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
  if (sprivacy || window.location.host === "kaniwork.com:8080") {
    presenceData.details = "Browsing";
  } else {
    const path = window.location.pathname.replace(".php", "");
    if (path.endsWith("commandes")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Commands";
    } else if (path.endsWith("informations")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Informations";
    } else if (path.endsWith("roles")) {
      presenceData.smallImageKey = "roles";
      presenceData.details = "Viewing a page:";
      presenceData.state = "Werewolf roles";
    } else if (path.endsWith("credits_kani")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Credits";
    } else if (path.endsWith("maintenance")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Maintenance";
    } else if (path.endsWith("contact_kani")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Contact";
    } else if (path.endsWith("choix_serv")) {
      presenceData.smallImageKey = "dashboard";
      presenceData.details = "Using the KaniShiel's dashboard:";
      presenceData.state = "Choosing a server";
    } else if (path.startsWith("/dashboard")) {
      presenceData.smallImageKey = "dashboard";
      if (privacy) {
        presenceData.details = "Editing a server";
        presenceData.state = "with the KaniShiel's dashboard";
      } else {
        presenceData.details = "Using the KaniShiel's dashboard of :";
        presenceData.state =
          document.getElementById("563749920683720709").textContent;
      }
    } else {
      presenceData.details = "Viewing a page:";
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
