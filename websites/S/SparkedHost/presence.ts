const presence = new Presence({
    clientId: "807722282633003049"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.location.hostname == "sparkedhost.com") {

    if (document.location.pathname.includes("/budget-minecraft")) {
        presenceData.details = "Minecraft Hosting";
        presenceData.state = "Budget Packages";
    }
    else if (document.location.pathname.includes("/premium-minecraft")) {
        presenceData.details = "Minecraft Hosting";
        presenceData.state = "Enterprise Packages";
    }
    else if (document.location.pathname.includes("/extreme-minecraft")) {
        presenceData.details = "Minecraft Hosting";
        presenceData.state = "Extreme Packages";
    }

    else if (document.location.pathname.includes("/game-hosting")) {
        presenceData.details = "Game Hosting";
        presenceData.state = "Exploring Packages";
    }


    else if (document.location.pathname.includes("/budget-vps")) {
        presenceData.details = "VPS Hosting";
        presenceData.state = "Budget Packages";
    }
    else if (document.location.pathname.includes("/premium-vps")) {
        presenceData.details = "VPS Hosting";
        presenceData.state = "Premium Packages";
    }


    else if (document.location.pathname.includes("/discord-hosting")) {
        presenceData.details = "Discord Bot Hosting";
        presenceData.state = "Exploring Packages";
    }


    else if (document.location.pathname.includes("/web-hosting")) {
        presenceData.details = "Web Hosting";
        presenceData.state = "Exploring Packages";
    }


    else if (document.location.pathname.includes("/giftcards")) {
        presenceData.details = "Giftcards";
        presenceData.state = "Treat a friend";
    }


    else if (document.location.pathname.includes("/about-us")) {
        presenceData.details = "About Us";
        presenceData.state = "People behind Sparked";
    }

    else if (document.location.pathname.includes("/hardware-and-locations")) {
        presenceData.details = "Hardware & Locations";
        presenceData.state = "Behind the scenes";
    }

    else if (document.location.pathname.includes("/contact")) {
        presenceData.details = "Contact Us";
        presenceData.state = "Support & Help";
    }

    else if (document.location.pathname.includes("/partners")) {
        presenceData.details = "Partners";
        presenceData.state = "johnny bad";
    }

    else if (document.location.pathname.includes("/help-center")) {
        presenceData.details = "Help Center";
        presenceData.state = "Guides & Tutorials";
    }
  }

  else if (document.location.hostname == "billing.sparkedhost.com") {

    if (document.location.pathname.includes("knowledgebase")) {
        presenceData.details = "Knowledgebase";
        presenceData.state = "Guides & Tutorials";
    }

    else if (document.location.pathname.includes("clientarea")) {
        presenceData.details = "Client Area";
        presenceData.state = "Account Management";
    }

    else if (document.location.pathname.includes("cart")) {
        presenceData.details = "Shopping";
        presenceData.state = "Server Hosting";
    }

    else if (document.location.pathname.includes("announcements")) {
        presenceData.details = "Announcements";
        presenceData.state = "Reading The News";
    }

    else if (document.location.pathname.includes("affiliates")) {
        presenceData.details = "Affiliates";
        presenceData.state = "Signups = $$$";
    }

    else if (document.location.pathname.includes("submitticket")) {
        presenceData.details = "Support Ticket";
        presenceData.state = "Opening a Ticket";
    }

  }

  else if (document.location.hostname == "control.sparkedhost.us") {

    if (document.location.pathname == "/") {
        presenceData.details = "Viewing Servers";
        presenceData.state = "Lookin' at the glory.";
    }

    else if (document.location.pathname.includes("files")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "File Manager";
    }

    else if (document.location.pathname.includes("databases")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Databases";
    }

    else if (document.location.pathname.includes("schedules")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Schedules";
    }

    else if (document.location.pathname.includes("users")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Subusers";
    }

    else if (document.location.pathname.includes("backups")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Backups";
    }

    else if (document.location.pathname.includes("subdomains")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Subdomains";
    }

    else if (document.location.pathname.includes("network")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Network";
    }

    else if (document.location.pathname.includes("startup")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Startup";
    }

    else if (document.location.pathname.includes("settings")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Settings";
    }

    else if (document.location.pathname.includes("server")) {
        presenceData.details = "Managing Servers";
        presenceData.state = "Watching Console";
    }

    else if (document.location.pathname.includes("account")) {
        presenceData.details = "Account Settings";
        presenceData.state = "Changing information";
    }

    else if (document.location.pathname.includes("admin")) {
        presenceData.details = "Admin Area";
        presenceData.state = "*secret stuff*";
    }

  }

  else if (document.location.hostname == "jars.sparkedhost.us") {
    presenceData.details = "Server Jars";
    presenceData.state = "Downloading Files";
  }

  else if (document.location.hostname == "status.sparkedhost.com") {
    presenceData.details = "Server Status";
    presenceData.state = "Who broke it?";
  }

  if (presenceData.details == null) {
    presenceData.details = "Server Hosting";
    presenceData.state = "Starting at $1";
    presence.setActivity(presenceData);
  } else {
    presence.setActivity(presenceData);
  }
});