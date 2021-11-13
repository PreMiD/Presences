const presence = new Presence({
  clientId: "907692817604833281"
}),
time = Math.floor(Date.now() / 1000)

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "coinmarketcap",
      startTimestamp: time
    },
    path = document.location.pathname;
  if (path === "/") presenceData.details = "Browsing...";
  else if (path.includes("/portfolio-tracker/"))
    presenceData.details = "Looking at Portfolio";
  else if (path.includes("/settings/"))
    presenceData.details = "Checking account settings";
  else if (path.includes("/currencies/")) {
    presenceData.details = "Checking prices for:"

    presenceData.state = document.querySelector(
      "#__next > div.bywovg-1.kkDbhJ > div > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.eMxKgr.container > div.n78udj-0.jskEGI > div > div.sc-16r8icm-0.kDzKwW.nameSection > div.sc-16r8icm-0.gpRPnR.nameHeader > h2"
    ).textContent
  } else if (path.includes("/rankings/exchanges/"))
    presenceData.details = "Looking at exchanges";
  else if (path.includes("/nft/")) {
    presenceData.details = "Looking at NFTs:";
  } else if (path.includes("/watchlist/")) {
    presenceData.details = "Browsing watchlist...";
  } else if (path.includes("/airdrop/")) {
    presenceData.details = "Looking at Airdrop";
  } else if (path.includes("/account/my-diamonds/")) {
    presenceData.details = "Checking diamonds:";

    presenceData.state = document.querySelector(
      "#__next > div > div > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div > div > div:nth-child(2) > div > div.sc-1snuar3-1.hyjDAL > div.sc-1snuar3-2.gqljHA > h1 > span"
    ).textContent
  } else if (path.includes("/referral/")) {
    presenceData.details = "Checking out the referral program"
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});