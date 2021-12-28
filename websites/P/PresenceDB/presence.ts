const presence = new Presence({
    clientId: "840759396103749633"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

async function getTranslation(name: string) {
  const language =
    (await presence.getSetting<0 | 1>("lang")) === 0 ? "en" : "de";

  switch (name) {
    case "home":
      switch (language) {
        case "de":
          return "Durchsucht die Startseite";
        default:
          return "Browsing home page";
      }
    case "search":
      switch (language) {
        case "de":
          return "Sucht nach etwas";
        default:
          return "Searching for something";
      }
    case "faq":
      switch (language) {
        case "de":
          return "Durchsucht das FAQ";
        default:
          return "Browsing FAQ page";
      }
    case "activity":
      switch (language) {
        case "de":
          return "Schaut sich Aktivität an";
        default:
          return "Viewing activity";
      }
    case "user":
      switch (language) {
        case "de":
          return "Schaut sich Benutzer an";
        default:
          return "Viewing user";
      }
    case "settings":
      switch (language) {
        case "de":
          return "Durchsucht die Einstellungen";
        default:
          return "Browsing settings page";
      }
    case "viewUser":
      switch (language) {
        case "de":
          return "Benutzer anzeigen";
        default:
          return "View user";
      }
    case "viewActivity":
      switch (language) {
        case "de":
          return "Aktivität anzeigen";
        default:
          return "View activity";
      }
  }
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp
  };

  if (window.location.pathname === "/")
    presenceData.details = await getTranslation("home");
  else if (window.location.pathname === "/search")
    presenceData.details = await getTranslation("search");
  else if (window.location.pathname === "/faq")
    presenceData.details = await getTranslation("faq");
  else if (window.location.pathname.includes("/activity/")) {
    if (!document.getElementById("activityName")) return;
    presenceData.details = await getTranslation("activity");
    presenceData.state = document.getElementById("activityName").textContent;
    presenceData.buttons = [
      { label: await getTranslation("viewActivity"), url: window.location.href }
    ];
  } else if (window.location.pathname.includes("/user/")) {
    if (!document.getElementById("userName")) return;
    presenceData.details = await getTranslation("user");
    presenceData.state = document.getElementById("userName").textContent;
    presenceData.buttons = [
      { label: await getTranslation("viewUser"), url: window.location.href }
    ];
  } else if (window.location.pathname === "/settings")
    presenceData.details = await getTranslation("settings");

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
