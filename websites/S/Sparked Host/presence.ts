const presence = new Presence({
    clientId: "807949437922050069"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.hostname == "sparkedhost.com") {
    if (document.location.pathname.includes("/budget-minecraft")) {
      presenceData.details = "Minecraft Hosting";
      presenceData.state = "Budget Packages";
    } else if (document.location.pathname.includes("/premium-minecraft")) {
      presenceData.details = "Minecraft Hosting";
      presenceData.state = "Enterprise Packages";
    } else if (document.location.pathname.includes("/extreme-minecraft")) {
      presenceData.details = "Minecraft Hosting";
      presenceData.state = "Extreme Packages";
    } else if (document.location.pathname.includes("/game-hosting")) {
      presenceData.details = "Game Hosting";
      presenceData.state = "Exploring Packages";
    } else if (document.location.pathname.includes("/budget-vps")) {
      presenceData.details = "VPS Hosting";
      presenceData.state = "Budget Packages";
    } else if (document.location.pathname.includes("/premium-vps")) {
      presenceData.details = "VPS Hosting";
      presenceData.state = "Premium Packages";
    } else if (document.location.pathname.includes("/discord-hosting")) {
      presenceData.details = "Discord Bot Hosting";
      presenceData.state = "Exploring Packages";
    } else if (document.location.pathname.includes("/web-hosting")) {
      presenceData.details = "Web Hosting";
      presenceData.state = "Exploring Packages";
    } else if (document.location.pathname.includes("/giftcards")) {
      presenceData.details = "Giftcards";
      presenceData.state = "Treat a friend";
    } else if (document.location.pathname.includes("/about-us")) {
      presenceData.details = "About Us";
      presenceData.state = "People behind Sparked";
    } else if (document.location.pathname.includes("/hardware-and-locations")) {
      presenceData.details = "Hardware & Locations";
      presenceData.state = "Behind the scenes";
    } else if (document.location.pathname.includes("/contact")) {
      presenceData.details = "Contact Us";
      presenceData.state = "Support & Help";
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Partners";
      presenceData.state = "The cool kids";
    } else if (document.location.pathname.includes("/help-center")) {
      presenceData.details = "Help Center";
      presenceData.state = "Guides & Tutorials";
    }
  } else if (document.location.hostname == "billing.sparkedhost.com") {
    if (document.location.pathname.includes("knowledgebase")) {
      const article = document.title.split(" - ");
      if (article[0] == "Knowledgebase") {
        presenceData.state = "Browsing Articles";
      } else {
        presenceData.state = article[0];
      }
      presenceData.details = "Knowledgebase";
    } else if (document.location.pathname.includes("clientarea")) {
      presenceData.details = "Client Area";
      presenceData.state = "Account Management";
    } else if (document.location.pathname.includes("cart")) {
      presenceData.details = "Shopping";
      presenceData.state = "Server Hosting";
    } else if (document.location.pathname.includes("announcements")) {
      presenceData.details = "Announcements";
      presenceData.state = "Reading The News";
    } else if (document.location.pathname.includes("affiliates")) {
      presenceData.details = "Affiliates";
      presenceData.state = "Signups = $$$";
    } else if (document.location.pathname.includes("submitticket")) {
      presenceData.details = "Support Ticket";
      presenceData.state = "Opening a Ticket";
    }
  } else if (document.location.hostname == "control.sparkedhost.us") {
    presenceData.smallImageKey = "pterodactyl";
    presenceData.smallImageText = "Pterodactyl";
    if (document.location.pathname == "/") {
      presenceData.details = "Viewing Servers";
      presenceData.state = "Lookin' at the glory.";
    } else if (document.location.pathname.includes("admin")) {
      const pageAdmin = document.title.split(" - ");
      presenceData.details = "Admin Area";
      presenceData.state = pageAdmin[1];
    } else if (document.location.pathname.includes("files")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "File Manager";
    } else if (document.location.pathname.includes("databases")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Databases";
    } else if (document.location.pathname.includes("schedules")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Schedules";
    } else if (document.location.pathname.includes("users")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Subusers";
    } else if (document.location.pathname.includes("backups")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Backups";
    } else if (document.location.pathname.includes("subdomains")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Subdomains";
    } else if (document.location.pathname.includes("network")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Network";
    } else if (document.location.pathname.includes("startup")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Startup";
    } else if (document.location.pathname.includes("settings")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Settings";
    } else if (document.location.pathname.includes("server")) {
      const serverName = document.title.split(" | ");
      presenceData.details = "Managing " + serverName[0];
      presenceData.state = "Watching Console";
    } else if (document.location.pathname.includes("account")) {
      presenceData.details = "Account Settings";
      presenceData.state = "Changing information";
    }
  } else if (document.location.hostname == "jars.sparkedhost.us") {
    presenceData.smallImageKey = "bukkit";
    presenceData.smallImageText = "Minecraft Server";
    presenceData.details = "Server Jars";
    presenceData.state = "Downloading Files";
  } else if (document.location.hostname == "status.sparkedhost.com") {
    presenceData.smallImageKey = "hetrix";
    presenceData.smallImageText = "HetrixTools";
    presenceData.details = "Server Status";
    presenceData.state = "Who broke it?";
  } else if (
    document.location.hostname == "altaruk2.sparkedhost.us" ||
    document.location.hostname == "altaruk1.sparkedhost.us" ||
    document.location.hostname == "altar52.sparkedhost.us" ||
    document.location.hostname == "altar57.sparkedhost.us" ||
    document.location.hostname == "web-01.sparkedhost.us"
  ) {
    presenceData.details = "Web Hosting";
    presenceData.state = "Managing cPanel";
  }

  if (presenceData.details == null) {
    presenceData.details = "Server Hosting";
    presenceData.state = "Starting at $1";
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  } else {
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
  }
});
