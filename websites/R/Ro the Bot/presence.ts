const presence = new Presence({
  clientId: "547090981279891486"
});

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "bot-magic"
  };

  if (window.location.href.includes("status.ro-the-bot.ga")) {
    presenceData.details = "Viewing https://status.ro-the-bot.ga/";
  } else if (window.location.href.includes("ro-the-bot.ga")) {
    if (window.location.pathname.toLowerCase() === "/") {
      presenceData.details = "Viewing the a page:";
      presenceData.state = "Home";
    }
    if (window.location.pathname.toLowerCase().includes("/#status")) {
      presenceData.details = "Reading a section:";
      presenceData.state = "Status";
    }
    if (window.location.pathname.toLowerCase().includes("/#cmds")) {
      presenceData.details = "Reading a section:";
      presenceData.state = "Commands";
    }
    if (window.location.pathname.toLowerCase().includes("/#invite")) {
      presenceData.details = "Reading a section:";
      presenceData.state = "Invite";
    }
    if (window.location.pathname.toLowerCase().includes("/#about")) {
      presenceData.details = "Reading a section:";
      presenceData.state = "About";
    }
    if (window.location.pathname.toLowerCase().includes("/updates.html")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Updates";
    }
    if (window.location.pathname.toLowerCase().includes("/connect.html")) {
      presenceData.details = "Viewing a page...";
      presenceData.state = "This one shouldn't be known...";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
