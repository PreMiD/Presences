const presence = new Presence({
  clientId: "906195926299861003",
}),
browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement, search: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "serverpro"
  };

  presenceData.startTimestamp = browsingStamp;
  if(document.location.hostname === "server.pro") {
    if(document.querySelector("body > div#app > div#wrap > main > section#section-main > section#section-content > div.container >div > div > h3")) {
      presenceData.details = "Home, Viewing the list of";
      presenceData.state = "My Servers"
    }
    if(document.querySelector("body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-md-6 > h3")) {
      presenceData.details = "Server Panel, Viewing";
      presenceData.state = "Server Details";
    }
    if(document.querySelector("body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-12 > h3")) {
      presenceData.details = "Server Panel, Viewing";
      presenceData.state = "VPS Details";
    }
    if(document.querySelector("body > div#app > div#wrap > main > section#section-main > section#section-content > div.container > div.row > div.col-12 > h2")) {
      presenceData.details = "Server Panel, Viewing";
      presenceData.state = "VPS Configuration";
    }
    if(document.querySelector("body > div#app > div#wrap > main > section#section-main > section#section-content > div > div.landing > div > div.landing-centerer > div.container > div.row > div.col-xl-8 > h1")) {
      presenceData.details = "Home";
      presenceData.state = "Browsing";
    }
  }
  if(document.location.pathname.includes("/advanced-settings")) {
    presenceData.details = "Server Panel, Editing";
    presenceData.state = "Advanced Settings";
  } else if(document.location.pathname.includes("/files")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Server Files";
  } else if(document.location.pathname.includes("/console")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Server Console";
  } else if(document.location.pathname.includes("/shell")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Shell";
  } else if(document.location.pathname.includes("/players")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Server Players";
  } else if(document.location.pathname.includes("/plugins")) {
    presenceData.details = "Server Panel, Installing";
    presenceData.state = "Plugins";
  } else if(document.location.pathname.includes("/scheduler")) {
    presenceData.details = "Server Panel, Editing";
    presenceData.state = "Scheduled Tasks"
  } else if(document.location.pathname.includes("/worlds")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Worlds"
  } else if(document.location.pathname.includes("/server-page")) {
    presenceData.details = "Server Panel, Editing";
    presenceData.state = "Server Page"
  } else if(document.location.pathname.includes("/ftp")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "FTP Details";
  } else if(document.location.pathname.includes("/mysql")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "MySQL Details"
  } else if(document.location.pathname.includes("/backups")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Server Backups";
  } else if(document.location.pathname.includes("/error-log")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Error Log";
  } else if(document.location.pathname.includes("/reinstall")) {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Reinstalling Page";
  } else if(document.location.pathname.includes("/create-service")) {
    presenceData.details = "Server Panel";
    presenceData.state = "Creating a Service";
  } else if(document.location.pathname.includes("/firewall")) {
    presenceData.details = "Server Panel, Editing";
    presenceData.state = "Firewall";
  } else if(document.location.pathname.includes("/reset"))  {
    presenceData.details = "Server Panel, Viewing";
    presenceData.state = "Reset Page";
  } else if(document.location.pathname.includes("/account")) {
    presenceData.details = "Home, Editing";
    presenceData.state = "Account"
  } else if(document.location.pathname.includes("/support")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "Support Page"
  } else if(document.location.pathname.includes("/contact")) {
    presenceData.details = "Home, Contacting";
    presenceData.state = "Support"
  } else if(document.location.pathname.includes("/about")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "About Us"
  } else if(document.location.pathname.includes("/pricing")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "Pricing Plans"
  } else if(document.location.pathname.includes("/create")) {
    presenceData.details = "Home, Creating";
    presenceData.state = "Server";
  } else if(document.location.pathname.includes("/jobs")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "Jobs Page";
  } else if(document.location.pathname.includes("/terms")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "Terms of Service";
  } else if(document.location.pathname.includes("/hytale")) {
    presenceData.details = "Home, Viewing";
    presenceData.state = "Hytale Server Hosting"
  }
  if (!presenceData.details) {
    presenceData.details = "Powerful Hosting";
    presenceData.state = "Try our free plan";
    presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});