const presence = new Presence({
  clientId: "818780749263273984"
});

presence.on("UpdateData", async () => {
  const browsingStamp = Math.floor(Date.now() / 1000);

  const presenceData: PresenceData = {
    largeImageKey: "ibl",
    smallImageText: "Infinity Bot List"
  };

  // Home Section
  if (window.location.pathname == "/") {
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
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting For:";
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.split("/bots/")[1]) {
      presenceData.details = "Viewing a Bot:";
      presenceData.state = document.getElementsByTagName("h1")[0].textContent.split("#")[0];
      presenceData.startTimestamp = browsingStamp;
    }
  }

  // Staff Section
  if (window.location.pathname.startsWith("/panel/")) {
    if (window.location.pathname.endsWith("/queue")) {
      presenceData.details = "Viewing: Bots Queue";
      presenceData.state = `x Bots In Queue`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.endsWith("/cerification")) {
      presenceData.details = "Viewing: Certification Queue";
      presenceData.state = `x Bots In Queue`;
      presenceData.startTimestamp = browsingStamp;
    }
  }

  // Servers Sections
  if (window.location.pathname.startsWith("/servers/")) {
    if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Server:";
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
    } else if (window.location.pathname.endsWith("/vote")) {
      presenceData.details = "Voting For:";
      presenceData.startTimestamp = browsingStamp;
      presenceData.state = document.querySelector("#botlistitle").textContent.substring(8);
    }
  }

  // General Stuff
  if (window.location.pathname.includes("/servers/")) {
    presenceData.details = "Viewing a Server";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.includes("/packs/")) {
    presenceData.details = "Viewing: Bot Packs";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.includes("/profile")) {
    presenceData.details = "Viewing: Profile"
    presenceData.startTimestamp = browsingStamp;
  }

  // Legal Pages
  if (window.location.pathname.includes("/legal/")) {
    presenceData.details = "Viewing Legal";
    presenceData.startTimestamp = browsingStamp;
  } else if (window.location.pathname.includes("/privacy/")) {
    presenceData.details = "Viewing Legal";
    presenceData.startTimestamp = browsingStamp;
  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
