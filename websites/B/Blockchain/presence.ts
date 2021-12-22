const presence = new Presence({
    clientId: "776522940517974016"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  currencyList = [
    "usd",
    "eur",
    "gbp",
    "btc",
    "eth",
    "bch",
    "xlm",
    "wdgld",
    "algo",
    "usd-d",
    "usdt"
  ];

let currencyTitle: string, pageStatus: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (window.location.host === "www.blockchain.com") {
    if (window.location.pathname.includes("/careers")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Careers";
    } else if (window.location.pathname.includes("/learning-portal")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Learning Portal";
    } else if (window.location.pathname.includes("/explorer")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Explorer";
    } else if (window.location.pathname.includes("/ventures")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Ventures";
    } else if (window.location.pathname.includes("/press")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Press";
    } else if (window.location.pathname.includes("/team")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Team";
    } else if (window.location.pathname.includes("/research")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Research";
    } else if (window.location.pathname.includes("/legal")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Legal";
    } else if (window.location.pathname.includes("/charts")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Charts";
    } else if (window.location.pathname.includes("/prices")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Prices";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Home";
    }
  } else if (window.location.host.startsWith("exchange")) {
    if (window.location.pathname.includes("/features")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Features";
    } else if (window.location.pathname.includes("/fees")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Fees";
    } else if (window.location.pathname.includes("/markets")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Markets";
    } else if (window.location.pathname.includes("/api")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: API";
    } else if (window.location.pathname.includes("/pro")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Pro";
    } else if (window.location.pathname.includes("/trade")) {
      currencyTitle = document.querySelector(
        "#app > div > div.sc-hBMVcZ.sc-jtiWoB.bhYWmy.iLgwSY > div > div.sc-dmdFIE.dFnCCE > div > div.sc-hBMVcZ.sc-krBkXf.bhYWmy.dAuExH > div.sc-eGJXgd.NEmKz > div:nth-child(1) > span.sc-1ryi78w-0.bkDxTg.sc-dlMBXb.jyCgbx"
      ).textContent;
      presenceData.state = currencyTitle;
      presenceData.details = "Exchange: Trade";
    } else if (window.location.pathname.includes("/affiliate")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Affiliate";
    } else if (window.location.pathname.includes("/about")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: About";
    } else if (window.location.pathname.includes("/legal")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange: Legal";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange";
    }
  } else if (window.location.host.startsWith("login")) {
    if (window.location.hash.includes("/home")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Profile";
    } else if (window.location.hash.includes("/exchange")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Exchange";
    } else if (window.location.hash.includes("/airdrops")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Airdrops";
    } else if (currencyList.includes(window.location.hash.split("/")[1])) {
      currencyTitle = document.querySelector(
        "#app > div > div.sc-eTpRJs.chWNvr > div.sc-iomxrj.kkzpGP > div > div > div > div > div.sc-jZRpAH.cBnkKE > div.sc-cNfOsU.hJFgdt > div.sc-eWciec.hrSHFN > div"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = currencyTitle;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Profile";
    }
  } else if (window.location.host.startsWith("support")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Support";
  } else if (window.location.host === "www.blockchain-status.com") {
    pageStatus = document.querySelector(
      "body > div.layout-content.status.status-index.premium > div.container > div.page-status.status-none > span.status.font-large"
    ).textContent;
    presenceData.details = "Status Page";
    presenceData.state = pageStatus;
  }

  if (!presenceData.details) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Home";
  } else presence.setActivity(presenceData);
});
