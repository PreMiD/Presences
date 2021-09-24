var presence = new Presence({
  clientId: "890182436695187528"
});

var browsingStamp = Math.floor(Date.now() / 1000);

var title: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "wick"
  };

  if (document.location.hostname == "wickbot.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/team")) {
      presenceData.details = "Reading about the Team";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/dashboard/")) {
      presenceData.details = "Managing the settings of";
      title = document.querySelector(
        "#dashboard-mount > div > div.column.nav-sidebar > aside > div.guild-header > h3 > div > div"
      );
      presenceData.state = "server: " + title.innerText;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Browsing through the Servers";
      presenceData.state = "server listings";
    } else if (document.location.pathname.includes("/myreview")) {
      presenceData.details = "Viewing all the their reviews";
    } else if (document.location.pathname.includes("/tos")) {
      presenceData.details = "Reading the TOS";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/status")) {
      presenceData.details = "Viewing the status";
    } else if (document.location.pathname.includes("/premium")) {
      presenceData.details = "Viewing Wick Premium Plans";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
  