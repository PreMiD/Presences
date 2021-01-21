const presence = new Presence({
    clientId: "801742167608787015"
  });
  
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;
  if (window.location.pathname.endsWith("commandes")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Commands";
  } else if (window.location.pathname.endsWith("informations")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Informations";
  } else if (window.location.pathname.endsWith("roles")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Werewolf roles";
  } else if (window.location.pathname.endsWith("credits_kani")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Credits";
  } else if (window.location.pathname.endsWith("maintenance")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Maintenance";
  } else if (window.location.pathname.endsWith("choix_serv")) {
    presenceData.details = "Using the dashboard:";
    presenceData.state = "Choosing a server";
  } else if (window.location.pathname.startsWith("/dashboard")) {
    presenceData.details = "Using the dashboard of :";
    presenceData.state = document.getElementById('563749920683720709').textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});