const presence = new Presence({
  clientId: "807591728759570453"
})

const browsingStamp = Math.floor(Date.now() / 1000)

function getLastPath(path: string) {
  const vals = path.split("/")
  return vals[vals.length - 1]
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (window.location.host === "www.binance.com") {
    if (window.location.pathname.includes("/markets")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Markets";
    } else if (window.location.pathname.includes("/earn")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Binance Earn";
    } else if (window.location.pathname.includes("/earn")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Binance Support";
    } else if (window.location.pathname.includes("/trade")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Trading " + getLastPath(window.location.pathname).replace("_", "/");
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Home";
    }
  } else if (window.location.host.startsWith("pool")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Binance Pool";
  } else if (window.location.host.startsWith("academy")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Binance Academy";
  } else if (window.location.host.startsWith("launchpad")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Binance Launchpad";
  } else if (window.location.host.startsWith("research")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Binance Research";
  }

  if (presenceData.details == null) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing...";
  } else {
    presence.setActivity(presenceData);
  }
});
