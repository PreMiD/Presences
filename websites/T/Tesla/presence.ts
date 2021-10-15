const presence = new Presence({
    clientId: "829056927227969596"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setTimeElapsed = await presence.getSetting("timeElapsed"),
    setShowButtons = await presence.getSetting("showButtons"),
    setLogo = await presence.getSetting("logo"),
    setShowCheckout = await presence.getSetting("showCheckout"),
    logoArr = ["logo_red", "logo_red_text", "logo_white", "logo_white_text"],
    urlpath = window.location.pathname.split("/"),
    langs = [
      "en_ca",
      "es_mx",
      "en_pr",
      "nl_be",
      "cs_cz",
      "da_dk",
      "de_de",
      "el_gr",
      "es_es",
      "fr_fr",
      "hr_hr",
      "en_ie",
      "is_is",
      "it_it",
      "fr_lu",
      "nl_nl",
      "no_no",
      "de_at",
      "pl_pl",
      "pt_pt",
      "sl_si",
      "fr_ch",
      "sv_se",
      "fi_fi",
      "en_gb",
      "en_eu",
      "he_il",
      "en_ae",
      "en_jo",
      "zh_cn",
      "zh_hk",
      "en_mo",
      "zh_tw",
      "ja_jp",
      "en_sg",
      "ko_kr",
      "en_au",
      "en_nz"
    ],
    urlpNum = new RegExp(langs.join("|")).test(urlpath[1]) ? 2 : 1,
    presenceData: PresenceData = {
      largeImageKey: logoArr[setLogo] || "logo_red"
    };

  if (setTimeElapsed) presenceData.startTimestamp = browsingStamp;

  if (window.location.hostname === "www.tesla.com") {
    if (!urlpath[urlpNum]) presenceData.details = "Home";
    else if (urlpath[urlpNum].startsWith("model")) {
      const num = urlpNum + 1;
      let model = null;
      if (urlpath[num] === "design") {
        model = document.querySelector(
          ".text-loader--content.tds-text--center.text-loader--subtitle>span"
        ).textContent;
        presenceData.details = `Designing ${model}`;

        if (setShowButtons) {
          presenceData.buttons = [
            {
              label: `View ${model}`,
              url: window.location.href
                .replace(urlpath[num], "")
                .replace("#overview", "")
            },
            {
              label: `Design ${model}`,
              url: window.location.href
            }
          ];
        }
      } else {
        model = document.querySelector(
          ".header-lower.tds-animate_small--to_reveal"
        ).textContent;
        presenceData.details = `Viewing ${model}`;

        if (setShowButtons) {
          presenceData.buttons = [
            {
              label: `View ${model}`,
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[urlpNum].startsWith("cybertruck")) {
      const num = urlpNum + 1;

      presenceData.details = "Cybertruck";

      if (urlpath[num] === "design") {
        presenceData.state = "Designing";

        if (setShowButtons) {
          presenceData.buttons = [
            {
              label: "View Cybertruck",
              url: window.location.href.replace(urlpath[num], "")
            },
            {
              label: "Design Cybertruck",
              url: window.location.href
            }
          ];
        }
      } else {
        presenceData.details = "Viewing Cybertruck";

        if (setShowButtons) {
          presenceData.buttons = [
            {
              label: "View Cybertruck",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[urlpNum] === "teslaaccount") {
      const num = urlpNum + 1;
      presenceData.details = "Account";

      if (urlpath[num] === "payment-history")
        presenceData.state = "Payment History";
      else if (urlpath[num] === "settings") presenceData.state = "Settings";
      else if (urlpath[num] === "ownership") presenceData.state = "Ownership";
    } else if (urlpath[urlpNum] === "solarroof") {
      const num = urlpNum + 1;
      presenceData.details = "Solar Roof";

      if (urlpath[num] === "design") presenceData.state = "Designing";

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Solar Roof",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "solarpanels") {
      presenceData.details = "Solar Panels";

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Solar Panels",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "energy") {
      const num = urlpNum + 1;
      presenceData.details = "Energy";

      if (urlpath[num] === "design") presenceData.state = "Designing";

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Page",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "powerwall") {
      presenceData.details = "Powerwall";

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Powerwall",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "inventory") {
      presenceData.details = "Inventory";

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Inventory",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "drive")
      presenceData.details = "Test drive";
    else if (urlpath[urlpNum] === "charging") presenceData.details = "Charging";
    else if (urlpath[urlpNum] === "home-charging")
      presenceData.details = "Wall Connector";
    else {
      if (document.querySelector(".error-container>.error-code")) {
        const error = document.querySelector(
          ".error-container>.error-code"
        ).textContent;
        if (error === "404") {
          (presenceData.details = "Error 404"),
            (presenceData.state = "Page not found");
        }
      } else presenceData.details = "Other";
    }
  } else if (window.location.hostname === "shop.tesla.com") {
    const num = urlpNum + 1;

    presenceData.details = "Shop";
    if (urlpath[urlpNum] === "category" && urlpath[num]) {
      presenceData.state = document.title.replace("Tesla | ", "");

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Category",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[urlpNum] === "product" && urlpath[num]) {
      presenceData.state = document.querySelector(
        "h2.product-title.tds-text--h1-alt"
      ).textContent;

      if (setShowButtons) {
        presenceData.buttons = [
          {
            label: "View Product",
            url: window.location.href
          }
        ];
      }
    } else if (
      urlpath[urlpNum] === "checkout" &&
      urlpath[num] === "billing-shipping-info"
    ) {
      const costs = setShowCheckout
        ? ` (${
            document.querySelector(
              "span.ordersummary__container__order__details__line__total>span.inline-value"
            ).textContent
          })`
        : "";

      presenceData.state = `Checkout${costs}`;
    } else if (urlpath[urlpNum] === "orders")
      presenceData.state = "Order History";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
