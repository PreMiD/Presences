const presence = new Presence({
    clientId: "805721235819462687"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "app"
  };

  if (document.location.pathname.startsWith("/account/login")) {
    presenceData.details = "Meldt zich aan";
  } else if (document.location.pathname.startsWith("/magister/#/vandaag")) {
    presenceData.details = "Bekijkt het dashboard";
  } else if (document.location.pathname.startsWith("/magister/#/agenda")) {
    presenceData.details = "Bekijkt agenda";
  } else if (document.location.pathname.startsWith("/magister/#/afwezigheid")) {
    presenceData.details = "Bekijkt afwezigheid";
  } else if (document.location.pathname.startsWith("/magister/#/cijfers/cijferoverzicht")) {
    presenceData.details = "Bekijkt cijferoverzicht";
  } else if (document.location.pathname.startsWith("/magister/#/cijfers")) {
    presenceData.details = "Bekijkt laatste cijfers";
  } else if (document.location.pathname.startsWith("/magister/#/lvs")) {
    presenceData.details = "Bekijkt logboeken";
  } else if (document.location.pathname.startsWith("/magister/#/elo/bronnen")) {
    presenceData.details = "Bekijkt bronnen";
  } else if (document.location.pathname.startsWith("/magister/#/elo/studiewijzer/")) {
    presenceData.details = "Bekijkt een studiewijzer";
  } else if (document.location.pathname.startsWith("/magister/#/elo/studiewijzer")) {
    presenceData.details = "Bekijkt studiewijzers";
  } else if (document.location.pathname.startsWith("/magister/#/elo/opdrachten/")) {
    presenceData.details = "Bekijkt een opdracht";
  } else if (document.location.pathname.startsWith("/magister/#/elo/opdrachten")) {
    presenceData.details = "Bekijkt opdrachten";
  } else if (document.location.pathname.startsWith("/magister/#/elo/activiteiten")) {
    presenceData.details = "Bekijkt activiteiten";
  } else if (document.location.pathname.startsWith("/magister/#/elo")) {
    presenceData.details = "Bekijkt elektronische leeromgeving";
  } else if (document.location.pathname.startsWith("/magister/#/leermiddelen")) {
    presenceData.details = "Bekijkt leermiddelen";
  } else if (document.location.pathname.startsWith("/magister/#/berichten")) {
    presenceData.details = "Bekijkt berichten";
  } else if (document.location.pathname.startsWith("/magister/#/mijn-instellingen")) {
    presenceData.details = "Bekijkt instellingen";
  } else if (document.location.pathname.startsWith("/magister")) {
    presenceData.details = "Bladert";
    presenceData.state = `Op pagina '${document.location.pathname.replace("/magister", "").replace("/#/", "").replace("/#", "").replace("-", "")}'`
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
