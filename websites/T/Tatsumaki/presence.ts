const presence = new Presence({
  clientId: "652773935829614592"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const browsingStamp = Math.floor(Date.now() / 1000);
  const page = window.location.pathname;
  presenceData.startTimestamp = browsingStamp;

  if (page.startsWith("/settings.html")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Settings";
  } else if (page.startsWith("/commands.html")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Commands";
  } else if (page.startsWith("/faq.html")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "FAQ & Guides";
  } else if (page.startsWith("/about")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "About Tatsumaki";
  } else if (page.startsWith("/globalRankings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Global Rankings";
  } else if (page.startsWith("/dashboard")) {
    presenceData.details = "Viewing dashboard";
  } else if (page.startsWith("/profile")) {
    presenceData.details = "Viewing/editing their profile";
  } else if (page.startsWith("/serverRankings/")) {
    const yArraabeni = document.querySelector(
      "#top > div.jumbotron > div > div > div.col-md-10 > p"
    ).textContent;
    const sgoc = "Besto Rankings @";
    const ahmetabibanimiactioley = yArraabeni.replace(sgoc, "");
    presenceData.details =
      "Viewing " + ahmetabibanimiactioley + "'s leaderboard";
  } else if (page.startsWith("/guild/")) {
    presenceData.details = "Managing a server";
    presenceData.state = document.querySelector(
      "#top > div.jumbotron > div > div > div.col-md-10 > h1"
    ).textContent;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
