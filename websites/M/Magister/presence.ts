const presence = new Presence({
    clientId: "805721235819462687"
  }),
  strings = presence.getStrings({
    account: "general.viewAccount",
    dashboard: "youtube.studio.dashboard",
    browsing: "general.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "app"
  };

  if (document.location.pathname.startsWith("/account/login")) {
    presenceData.details = "Logging in";
  } else if (document.location.pathname.startsWith("/magister/#/vandaag")) {
    presenceData.details = (await strings).dashboard;
  } else if (document.location.pathname.startsWith("/magister/#/agenda")) {
    presenceData.details = "Viewing their agenda";
  } else if (document.location.pathname.startsWith("/magister/#/afwezigheid")) {
    presenceData.details = "Viewing their absences";
  } else if (document.location.pathname.startsWith("/magister/#/cijfers/cijferoverzicht")) {
    presenceData.details = "Viewing their grades";
  } else if (document.location.pathname.startsWith("/magister/#/cijfers")) {
    presenceData.details = "Viewing their recent grades";
  } else if (document.location.pathname.startsWith("/magister/#/lvs")) {
    presenceData.details = "Viewing their logs";
  } else if (document.location.pathname.startsWith("/magister/#/elo/bronnen")) {
    presenceData.details = "Viewing sources";
  } else if (document.location.pathname.startsWith("/magister/#/elo/studiewijzer/")) {
    presenceData.details = "Viewing a study guide";
  } else if (document.location.pathname.startsWith("/magister/#/elo/studiewijzer")) {
    presenceData.details = "Viewing study guides";
  } else if (document.location.pathname.startsWith("/magister/#/elo/opdrachten/")) {
    presenceData.details = "Viewing an assignment";
  } else if (document.location.pathname.startsWith("/magister/#/elo/opdrachten")) {
    presenceData.details = "Viewing assignments";
  } else if (document.location.pathname.startsWith("/magister/#/elo/activiteiten")) {
    presenceData.details = "Viewing activities";
  } else if (document.location.pathname.startsWith("/magister/#/elo")) {
    presenceData.details = "Viewing their digital studying environment";
  } else if (document.location.pathname.startsWith("/magister/#/leermiddelen")) {
    presenceData.details = "Viewing their books";
  } else if (document.location.pathname.startsWith("/magister/#/berichten")) {
    presenceData.details = "Viewing their messages";
  } else if (document.location.pathname.startsWith("/magister/#/mijn-instellingen")) {
    presenceData.details = (await strings).account;
  } else if (document.location.pathname.startsWith("/magister")) {
    presenceData.details = (await strings).browsing;
    presenceData.state = `On page '${document.location.pathname.replace("/magister", "").replace("/#/", "").replace("/#", "").replace("-", "")}'`
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
