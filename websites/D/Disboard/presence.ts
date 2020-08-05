const presence = new Presence({
  clientId: "740627955276972093"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.endsWith("servers")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Public Discord Servers";
  } else if (window.location.pathname.endsWith("/dashboard/settings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "User Settings";
  } else if (window.location.pathname.endsWith("/dashboard/settings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Their server reviews";
  } else if (window.location.pathname.startsWith("/search")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Search Discord Servers";
  } else if (window.location.pathname.startsWith("/reviews")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Discord Server Reviews";
  } else if (window.location.pathname.startsWith("/dashboard/servers")) {
    presenceData.details = "Viewing their server(s)";
  } else if (window.location.pathname.startsWith("/server/")) {
    presenceData.details = "Viewing a server:";
    const ad = document.querySelector(
      "div.container > div.server-detail > div.columns > div:nth-child(2) > h1"
    ).textContent;
    presenceData.state = ad;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
