const presence = new Presence({
  clientId: "850295838361649153"
});
const browsingStamp = Math.floor(Date.now() / 1000);
var title: any;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  console.log("Working...");
  if (document.location.hostname == "backpack.tf") {
    presenceData.startTimestamp = browsingStamp;
    console.log("Website Detected...");
    if (document.location.pathname.includes("/stats/")) {
      title = document.querySelector(
        "#page-content > div > :nth-child(1) > div.stats-body > div > div > div.stats-header-title"
        );
      presenceData.details = "Viewing Item:";
      presenceData.state = title.innerText;
    }
   else if (document.location.pathname.includes("/u/")) {
     presenceData.details = "Viewing profile:";
      title = document.querySelector(
        "#page-content > div > div.panel-body > div > div > div.title > span > a"
        );
      presenceData.state = title.innerText;
    }
    else if (document.location.pathname.includes("/profiles/")) {
      presenceData.details = "Viewing profile:";
       title = document.querySelector(
         "#page-content > div > div.panel-body > div > div > div.title > span > a"
         );
       presenceData.state = title.innerText;
     }
      else if (document.location.pathname.includes("/settings")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Settings";
    } else if (document.location.pathname.includes("/alerts")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Alerts";
    } else if (document.location.pathname.includes("/notifications")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Notifications";
    } else if (document.location.pathname.includes("/connections")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Connections";
    } else if (document.location.pathname.includes("/payments")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Payment History";
    } else if (document.location.pathname.includes("/award-tickets")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Tickets";
    } else if (document.location.pathname.includes("/donate")) {
      presenceData.details = "Viewing Donation page";
    } else if (document.location.pathname.includes("/premium/subscribe")) {
      presenceData.details = "Viewing Premium subscription";
    }
    else if (document.location.pathname.includes("/classifieds")) {
      presenceData.details = "Searching through:";
      presenceData.state = "Classifieds";
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
