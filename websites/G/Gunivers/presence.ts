const presence = new Presence({
    clientId: "723474173208297532"
  });
  
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;
  if (window.location.pathname.startsWith("/articles")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Activities";
  } else if (window.location.pathname.startsWith("/category/")) {
    presenceData.details = "Searching an article:";
    presenceData.state = "in category " +window.location.pathname.split('/').slice(2).join('/').replace('fr_','').replace('en_','');
  } else if (window.location.pathname.endsWith("category/chronique/")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Chronicles";
  } else if (window.location.pathname.startsWith("/chronique-mensuelle-")) {
    presenceData.details = "Reading a";
    presenceData.state = "chronicle"
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
    presenceData.state = 'test'
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});