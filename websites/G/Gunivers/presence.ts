const presence = new Presence({
    clientId: "723474173208297532"
  });
  
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "gunivers.net") {
    if (window.location.pathname.startsWith("/articles")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Activities";
    } else if (window.location.pathname.startsWith("/category/")) {
      presenceData.details = "Searching an article:";
      presenceData.state = "in category " +document.title.replace(' | Gunivers','');
      if (window.location.pathname.endsWith("category/chronique/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Chronicles";
      }
    } else if (window.location.pathname.startsWith("/chronique-mensuelle-")) {
      presenceData.details = "Reading a chronicle";
      presenceData.state = document.title.replace(' | Gunivers','').replace('Chronique Mensuelle - ','');
    } else if (window.location.pathname.endsWith("/a-propos/") || window.location.pathname.endsWith("/about-us/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "About us";
    } else if (window.location.pathname.endsWith("/contact-us/") || window.location.pathname.endsWith("/contactez-nous/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Contact us";
    } else if (window.location.pathname.endsWith("/histoire/") || window.location.pathname.endsWith("/history/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Contact us";
    } else if (window.location.pathname.endsWith("/affiliation-program/") || window.location.pathname.endsWith("/programme-daffiliation/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Affiliation program";
    } else if (window.location.pathname.endsWith("/equipes/") || window.location.pathname.endsWith("/teams/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Affiliated teams";
    } else if (window.location.pathname.endsWith("/partners/") || window.location.pathname.endsWith("/partenaires/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Our partners";
    } else if (window.location.pathname.startsWith("/") && window.location.pathname.length != 1 && !window.location.pathname.startsWith("/home")) {
      presenceData.details = "Reading an article:";
      presenceData.state = document.title.replace(' | Gunivers','');
    } else if (window.location.pathname.length === 1 || window.location.pathname.startsWith("/home")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Home";
    }
  } else if (document.location.hostname == "project.gunivers.net") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Gunivers Workspace";
    if (window.location.pathname.endsWith("/projects")) {
      presenceData.details = "Searching a project:";
      presenceData.state = "on Gunivers Workspace";
    } else if (window.location.pathname.startsWith("/projects/")) {
      presenceData.details = "Reading a project:";
      presenceData.state = document.title.split(' - ')[1];
    } else if (window.location.pathname.startsWith("/users/")) {
      presenceData.details = "Looking for an user:";
      presenceData.state = document.querySelector(
        "#content > h2"
      ).textContent;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
