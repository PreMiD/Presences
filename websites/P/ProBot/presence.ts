const presence = new Presence({
  clientId: "655050505726197781"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: presenceData = {
    largeImageKey: "probot"
  };

  if (document.location.hostname == "probot.io") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/server/")) {
      presenceData.details = "Managing the settings of";
      const title = document.querySelector(
        "#root > div > div > div.sidebar_root > div.sidebar_main > div > div.dramex2 > div > ul > li:nth-child(1) > div > div > a"
      );
      presenceData.state = "server: " + title.innerHTML;
    } else if (document.location.pathname.includes("/commands")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Commands";
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing Premium";
    } else if (document.location.pathname.includes("/bg")) {
      presenceData.details = "Managing the";
      presenceData.state = "profile backgrounds";
    } else if (document.location.pathname.includes("/id")) {
      presenceData.details = "Managing the";
      presenceData.state = "ID backgrounds";
    } else if (document.location.pathname.includes("/badges")) {
      presenceData.details = "Managing the";
      presenceData.state = "profile badges";
    } else if (document.location.pathname.includes("/xp")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Top 100 by XP";
    } else if (document.location.pathname.includes("/credits")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Richest 100 Billionaires";
    } else if (document.location.pathname.includes("/transactions")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Credits Transactions";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
