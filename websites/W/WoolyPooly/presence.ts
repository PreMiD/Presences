const presence = new Presence({
    clientId: "783702757021581352"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let currencyTitle: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  switch (window.location.hash) {
    case "":
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Charts Overview";
      break;
    case "#/faq":
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "FAQ";
      break;
    case "#/privacy":
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Privacy Policy";
      break;
    case "#/tos":
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Terms of Service";
      break;
    case "#/raveos":
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Rave OS Redirect";
      break;
    default:
      if (window.location.hash.includes("coin")) {
        currencyTitle = document.querySelector(
          "body > div.layout.darkBg.darkFont.darkScrollbar > div.contentWrapper > div.mainContent > div.typeSelection > div.coinTitle.flexEqual > div:nth-child(2)"
        ).textContent;
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = currencyTitle;
        presenceData.smallImageKey = window.location.hash.split("/")[2];
      } else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Charts Overview";
      }
  }

  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Charts Overview";
  } else {
    presence.setActivity(presenceData);
  }
});
