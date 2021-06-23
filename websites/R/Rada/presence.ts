const presence = new Presence({
    clientId: "729013058860744814"
});
const browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "rada",
    startTimestamp: browsingStamp
  }
  presenceData.buttons = [
    {
      label: 'Dashboard',
      url: 'https://radabot.net'
    },
    {
      label: 'Invite Rada',
      url: 'https://radabot.net/invite'
    }
  ];

  if (window.location.pathname.endsWith("faq")) {
      presenceData.details = "Browsing page";
      presenceData.state = "FAQ";
  } else if (window.location.pathname.endsWith("guilds/")) {
      presenceData.details = "Browsing page";
      presenceData.state = "Guilds";
  } else if (window.location.pathname.startsWith("/guilds/")) {
      presenceData.details = "Editing guild settings";
      presenceData.state = "Guild ➜ " + document.querySelector("green").textContent;
  } else if (window.location.pathname.endsWith("dashboard/")) {
      presenceData.details = "Editing personal settings";
      presenceData.state = "Dashboard ➜ " + document.querySelector("blurple").textContent;
  } else if (window.location.pathname === "/") {
      presenceData.details = "Home";
      presenceData.state = document.querySelector("div.main-card").textContent;
  }

  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else {
      presence.setActivity(presenceData);
  }

});