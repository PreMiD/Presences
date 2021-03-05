const presence = new Presence({
    clientId: "811198714726449183"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (window.location.host === "destinyitemmanager.com") {
    presenceData.details = "Browsing...";
  } else if (window.location.host.startsWith("app")) {
    if (window.location.pathname.includes("inventory")) {
      const guardian = document
        .querySelector(
          "#content > div.inventory-container.destiny2 > div > div.store-row.store-header > div:nth-child(1) > div:nth-child(1) > div > div._2mo8C > div._1zQrq > div.ohqoA > div.FZBlR"
        )
        .textContent.trim();

      presenceData.details = "Inventory";
      presenceData.state = guardian;
      presenceData.smallImageText =
        guardian +
        " - " +
        document
          .querySelector(
            "#content > div.inventory-container.destiny2 > div > div.store-row.store-header > div:nth-child(1) > div:nth-child(1) > div > div._2mo8C > div._1zQrq > div.ohqoA > div._1FuuK"
          )
          .textContent.trim();

      if (guardian === "Titan") {
        presenceData.smallImageKey = "guardian-titan";
      } else if (guardian === "Warlock") {
        presenceData.smallImageKey = "guardian-warlock";
      } else if (guardian === "Hunter") {
        presenceData.smallImageKey = "guardian-hunter";
      }
    } else if (window.location.pathname.includes("progress")) {
      presenceData.details = "Progress";
    } else if (window.location.pathname.includes("vendors")) {
      presenceData.details = "Vendors";
    } else if (window.location.pathname.includes("records")) {
      presenceData.details = "Records";
    } else if (window.location.pathname.includes("optimizer")) {
      presenceData.details = "Loadout Optimizer";
    } else if (window.location.pathname.includes("organizer")) {
      presenceData.details = "Organizer";
    } else if (window.location.pathname.includes("settings")) {
      presenceData.details = "Settings";
    } else if (window.location.pathname.includes("about")) {
      presenceData.details = "About";
    } else if (window.location.pathname.includes("whats-new")) {
      presenceData.details = "DIM Changes";
    }
  } else {
    presenceData.details = "Browsing...";
  }

  presence.setActivity(presenceData);
});
