const presence = new Presence({
    clientId: "807591728759570453"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

function getLastPath(path: string) {
  const vals = path.split("/");
  return vals[vals.length - 1];
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (window.location.host === "www.binance.com") {
    if (window.location.pathname.includes("/markets")) {
      presenceData.details = "Markets";
    } else if (window.location.pathname.includes("/my/wallet/account/main")) {
      presenceData.details = "Main Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/margin")) {
      presenceData.details = "Margin Wallet";
    } else if (
      window.location.pathname.includes("/my/wallet/account/futures")
    ) {
      presenceData.details = "Futures Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/c2c")) {
      presenceData.details = "P2P Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/saving")) {
      presenceData.details = "Earn Wallet";
    } else if (window.location.pathname.includes("/my/wallet/account/mining")) {
      presenceData.details = "Pool Wallet";
    } else if (window.location.pathname.includes("/my/wallet")) {
      presenceData.details = "Wallet";
    } else if (window.location.pathname.includes("/earn")) {
      presenceData.details = "Binance Earn";
    } else if (window.location.pathname.includes("/support")) {
      presenceData.details = "Binance Support";
    } else if (window.location.pathname.includes("/multipleChart")) {
      presenceData.details = "Charts";
    } else if (
      window.location.pathname.includes("/futuresng-activity/battle")
    ) {
      presenceData.details = "Futures Battle";
    } else if (
      window.location.pathname.includes("/futuresng-activity/leaderboard")
    ) {
      presenceData.details = "Futures Leaderboard";
    } else if (window.location.pathname.includes("/trade")) {
      presenceData.details = "Trading";
      if (getLastPath(window.location.pathname).includes("_")) {
        presenceData.state =
          "Exchange: " +
          getLastPath(window.location.pathname).replace("_", "/").toUpperCase();
      }
    } else if (window.location.pathname.includes("/futures")) {
      presenceData.details = "Futures Trading";
      if (getLastPath(window.location.pathname).includes("_")) {
        presenceData.state =
          "Exchange: " +
          getLastPath(window.location.pathname).replace("_", "/").toUpperCase();
      }
    } else {
      presenceData.details = "Browsing...";
    }
  } else if (window.location.host.startsWith("pool")) {
    presenceData.details = "Binance Pool";
  } else if (window.location.host.startsWith("academy")) {
    presenceData.details = "Binance Academy";
  } else if (window.location.host.startsWith("launchpad")) {
    presenceData.details = "Binance Launchpad";
  } else if (window.location.host.startsWith("research")) {
    presenceData.details = "Binance Research";
  } else {
    presenceData.details = "Browsing...";
  }

  presence.setActivity(presenceData);
});
