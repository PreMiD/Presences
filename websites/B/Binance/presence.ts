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
    } else if (window.location.pathname.includes("/my/wallet/account/main")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Main Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/margin")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Margin Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/futures")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Futures Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/c2c")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "P2P Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/saving")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Earn Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/mining")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Pool Wallet";
    } else if (window.location.pathname.includes("/my/wallet")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Wallet";
    } else if (window.location.pathname.includes("/earn")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Binance Earn";
    } else if (window.location.pathname.includes("/support")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Binance Support";
    } else if (window.location.pathname.includes("/multipleChart")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Charts";
    } else if (window.location.pathname.includes("/futuresng-activity/battle")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Futures Battle";
    } else if (window.location.pathname.includes("/futuresng-activity/leaderboard")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Futures Leaderboard";
    } else if (window.location.pathname.includes("/trade")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Trading";
      if (getLastPath(window.location.pathname).includes("_")) {
        presenceData.state = "Exchange: " + getLastPath(window.location.pathname).replace("_", "/");
      }
    } else if (window.location.pathname.includes("/futures")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Futures Trading";
      if (getLastPath(window.location.pathname).includes("_")) {
        presenceData.state = "Exchange: " + getLastPath(window.location.pathname).replace("_", "/");
      }
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing...";
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
