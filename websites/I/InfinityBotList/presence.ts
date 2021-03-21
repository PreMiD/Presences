const presence = new Presence({
  clientId: "818780749263273984"
});

presence.on("UpdateData", async () => {
    const browsingStamp = Math.floor(Date.now() / 1000);

    const presenceData: PresenceData = {
      largeImageKey: "ibl"
    };

    // Home Section
    if (window.location.pathname.includes("/")) {
      presenceData.details = "Browsing: Home";
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/bots")) {
      presenceData.details = "Browsing: Bots";
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/servers")) {
      presenceData.details = "Browsing: Servers";
      presenceData.startTimestamp = browsingStamp;
    }

    // Bots Section
    if (window.location.pathname.startsWith("/bots/")) {
      if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord bot:";
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
      } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting For:";
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
      }
    }

    // Servers Sections
    if (window.location.pathname.startsWith("/servers/")) {
      if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Server:";
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
      } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting For:";
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
      }
    }

    // General Stuff
    if (window.location.pathname.includes("/bots/")) {
      presenceData.details = "Viewing a Bot";
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/servers/")) {
      presenceData.details = "Viewing a Server";
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/packs/")) {
      presenceData.details = "Viewing: Bot Packs";
      presenceData.startTimestamp = browsingStamp;
    }

  if (presenceData.details == null) {
     presence.setTrayTitle();
     presence.setActivity();
  } else {
     presence.setActivity(presenceData);
  }
});