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
      presenceData.state = "in category " +window.location.pathname.split('/').slice(2).join('/').replace(/fr_/g, "").replace(/en_/g, "");
      if (window.location.pathname.endsWith("category/chronique/")) {
        presenceData.details = "Viewing a page:";
        presenceData.state = "Chronicles";
      }
    } else if (window.location.pathname.startsWith("/chronique-mensuelle-")) {
      presenceData.details = "Reading a chronicle";
      presenceData.state = window.location.pathname.replace("/chronique-mensuelle-",'').replace('/','').replace('-','/')
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
    } else if (window.location.pathname.startsWith("/")) {
      presenceData.details = "Reading an article:";
      let str = window.location.pathname.replace('-2/','').split('/').slice(1).join(' ').replace(/-/g,' ');
      str = str.charAt(0).toUpperCase() + str.slice(1)
      presenceData.state = str
    }
  } else if (document.location.hostname == "status.gunivers.net") {
    presenceData.details = "Checking Status of:";
    presenceData.state = "Gunivers Network";
  } else if (document.location.hostname == "project.gunivers.net") {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Gunivers Workspace";
    if (window.location.pathname.endsWith("/projects")) {
      presenceData.details = "Searching a project:";
      presenceData.state = "on Gunivers Workspace";
    } else if (window.location.pathname.startsWith("/projects/")) {
      presenceData.details = "Reading a project:";
      let str = window.location.pathname.split('/')[2].replace(/-/g,' ');
      str = str.charAt(0).toUpperCase() + str.slice(1)
      presenceData.state = str
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