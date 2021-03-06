const presence = new Presence({
  clientId: "723474173208297532"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000),
    privacy = await presence.getSetting("privacy"),
    button = await presence.getSetting("button");

  presenceData.startTimestamp = browsingStamp;
  if (privacy) {
    presenceData.details = "Browsing";
  } else if (document.location.hostname == "gunivers.net") {
    if (window.location.pathname.startsWith("/articles")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Activities";
    } else if (window.location.pathname.startsWith("/category/")) {
      presenceData.details = "Searching an article:";
      presenceData.state =
        "in category " + document.title.replace(" | Gunivers", "");
      if (window.location.pathname.endsWith("category/chronique/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Chronicles";
      }
    } else if (window.location.pathname.startsWith("/chronique-mensuelle-")) {
      presenceData.details = "Reading a chronicle";
      presenceData.state = document.title
        .replace(" | Gunivers", "")
        .replace("Chronique Mensuelle - ", "");
      if (button)
        presenceData.buttons = [
          {
            label: "View chronicle",
            url: document.URL
          }
        ];
    } else if (
      window.location.pathname.endsWith("/a-propos/") ||
      window.location.pathname.endsWith("/about-us/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "About us";
    } else if (
      window.location.pathname.endsWith("/contact-us/") ||
      window.location.pathname.endsWith("/contactez-nous/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Contact us";
    } else if (
      window.location.pathname.endsWith("/histoire/") ||
      window.location.pathname.endsWith("/history/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Contact us";
    } else if (
      window.location.pathname.endsWith("/affiliation-program/") ||
      window.location.pathname.endsWith("/programme-daffiliation/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Affiliation program";
    } else if (
      window.location.pathname.endsWith("/equipes/") ||
      window.location.pathname.endsWith("/teams/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Affiliated teams";
    } else if (
      window.location.pathname.endsWith("/partners/") ||
      window.location.pathname.endsWith("/partenaires/")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Our partners";
    } else if (
      window.location.pathname.startsWith("/") &&
      window.location.pathname.length != 1 &&
      !window.location.pathname.startsWith("/home")
    ) {
      presenceData.details = "Reading an article:";
      presenceData.state = document.title.replace(" | Gunivers", "");
      if (button)
        presenceData.buttons = [
          {
            label: "View article",
            url: document.URL
          }
        ];
      if (window.location.pathname.includes("/author/")) {
        presenceData.details = "Looking for an user:";
        presenceData.state = document.title.replace(" | Gunivers", "");
        if (button)
          presenceData.buttons = [
            {
              label: "View user",
              url: document.URL
            }
          ];
      }
    } else if (
      window.location.pathname.length === 1 ||
      window.location.pathname.startsWith("/home")
    ) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Home";
    }
  } else if (document.location.hostname == "project.gunivers.net") {
    presenceData.smallImageKey = "workspace";
    presenceData.details = "Viewing a page:";
    presenceData.state = "Gunivers Workspace";
    if (window.location.pathname.endsWith("/projects")) {
      presenceData.details = "Searching a project:";
      presenceData.state = "on Gunivers Workspace";
    } else if (window.location.pathname.startsWith("/projects/")) {
      presenceData.details = "Reading a project:";
      presenceData.state = document.title.split(" - ")[1];
      if (button)
        presenceData.buttons = [
          {
            label: "View project",
            url: document.URL
          }
        ];
    } else if (window.location.pathname.startsWith("/users/")) {
      presenceData.details = "Looking for an user:";
      presenceData.state = document.querySelector("#content > h2").textContent;
      if (button)
        presenceData.buttons = [
          {
            label: "View user",
            url: document.URL
          }
        ];
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
