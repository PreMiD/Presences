const presence = new Presence({
    clientId: "909659570715127848"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData = {
    largeImageKey: "icon",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "shardhosting.co.uk") {
    if (document.location.pathname.includes("/web-hosting")) {
      presenceData.details = "Web Hosting";
      presenceData.state = "Exploring Packages";
    } else if (document.location.pathname.includes("/bot-hosting")) {
      presenceData.details = "Bot Hosting";
      presenceData.state = "Exploring Packages";
    } else if (document.location.pathname.includes("/about-us")) {
      presenceData.details = "About Us";
      presenceData.state = "People behind Shard!";
    } else if (document.location.pathname.includes("/hardware-and-locations")) {
      presenceData.details = "Hardware & Locations";
      presenceData.state = "Browsing all over the world!";
    } else if (document.location.pathname.includes("/contact")) {
      presenceData.details = "Contact Us";
      presenceData.state = "Support & Help";
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Partners";
      presenceData.state = "Amazing People!";
    } else if (document.location.pathname.includes("/help-center")) {
      presenceData.details = "Help Center";
      presenceData.state = "Guides, Tutorials and Articles.";
    } else if (document.location.pathname.includes("/terms-of-service")) {
      presenceData.details = "Terms of Service";
      presenceData.state = "Legal Stuff, who cares?";
    }
  } else if (document.location.hostname === "billing.shardhosting.co.uk") {
    if (document.location.pathname.includes("knowledgebase")) {
      const [article] = document.title.split(" - ");
      if (article === "Knowledgebase") presenceData.state = "Browsing Articles";
      else presenceData.state = article;
      presenceData.details = "Knowledgebase";
    } else if (document.location.pathname.includes("clientarea")) {
      presenceData.details = "Client Area";
      presenceData.state = "Account Management";
    } else if (document.location.pathname.includes("cart")) {
      presenceData.details = "Shopping";
      presenceData.state = "Server Hosting";
    } else if (document.location.pathname.includes("announcements")) {
      presenceData.details = "Announcements";
      presenceData.state = "Reading Important Updates!";
    } else if (document.location.pathname.includes("affiliates")) {
      presenceData.details = "Affiliates";
      presenceData.state = "Money???";
    } else if (document.location.pathname.includes("submitticket")) {
      presenceData.details = "Support Ticket";
      presenceData.state = "Opening a Ticket";
    }
  } else if (document.location.hostname === "control.shardhosting.co.uk") {
    presenceData.smallImageKey = "pterodactyl";
    presenceData.smallImageText = "Pterodactyl";
    if (document.location.pathname === "/") {
      presenceData.details = "Viewing Servers";
      presenceData.state = "Browsing Services!";
    } else if (document.location.pathname.includes("files")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "File Manager";
    } else if (document.location.pathname.includes("databases")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Databases";
    } else if (document.location.pathname.includes("schedules")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Schedules";
    } else if (document.location.pathname.includes("users")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Subusers";
    } else if (document.location.pathname.includes("backups")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Backups";
    } else if (document.location.pathname.includes("subdomains")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Subdomains";
    } else if (document.location.pathname.includes("network")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Network";
    } else if (document.location.pathname.includes("startup")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Startup";
    } else if (document.location.pathname.includes("settings")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Settings";
    } else if (document.location.pathname.includes("server")) {
      const serverName = document.title.split(" | ");
      presenceData.details = `Managing ${serverName[0]}`;
      presenceData.state = "Watching Console and hunting bugs!";
    } else if (document.location.pathname.includes("account")) {
      presenceData.details = "Account Settings";
      presenceData.state = "Changing Information";
    }
  } else if (document.location.hostname === "status.shardhosting.co.uk") {
    presenceData.smallImageKey = "hetrix";
    presenceData.smallImageText = "HetrixTools";
    presenceData.details = "Server Status";
    presenceData.state = "Guess what! Someone broke it! Blame Ashley!";
  } else if (document.location.hostname === "web-ore-01.shardhosting.co.uk") {
    presenceData.smallImageKey = "cpanel";
    presenceData.smallImageText = "cPanel";
    presenceData.details = "Web Hosting";
    presenceData.state = "Managing cPanel";
  }

  if (!presenceData.details) presence.setActivity();
  else presence.setActivity(presenceData);
});
