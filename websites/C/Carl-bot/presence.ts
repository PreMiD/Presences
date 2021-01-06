const presence = new Presence({
  clientId: "653372675166568481"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "carllogo",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname == "carl.gg") {
    console.log("aaaa");
    
    if (document.location.pathname.startsWith("/dashboard/")) {
      const title = document.querySelector(
        "body > div.app > header > ul.navbar-nav.ml-auto.d-none.d-sm-inline-block > div > div"
      ).textContent.split("Jump to")[0].trim();
      presenceData.details = "Managing the settings of:";
      presenceData.state = title;
    } else if (document.location.pathname.startsWith("/servers")) {
      presenceData.details = "Browsing through";
      presenceData.state = "servers";
    } else if (document.location.pathname.startsWith("/status")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Carl-bot Status";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
