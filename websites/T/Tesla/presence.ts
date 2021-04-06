const presence = new Presence({
    clientId: "829056927227969596"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const set_timeElapsed = await presence.getSetting("timeElapsed"),
        set_showButtons = await presence.getSetting("showButtons"),
        set_logo = await presence.getSetting("logo"),
        logoArr = ["logo_red", "logo_red_text", "logo_white", "logo_white_text"],
        urlpath = window.location.pathname.split("/"),
        langs = ["en_ca", "es_mx", "en_pr", "nl_be", "cs_cz", "da_dk", "de_de", "el_gr", "es_es", "fr_fr", "hr_hr", "en_ie", "is_is", "it_it", "fr_lu", "nl_nl", "no_no", "de_at", "pl_pl", "pt_pt", "sl_si", "fr_ch","sv_se", "fi_fi", "en_gb", "en_eu", "he_il", "en_ae", "en_jo", "zh_cn", "zh_hk", "en_mo", "zh_tw", "ja_jp", "en_sg", "ko_kr", "en_au", "en_nz"],
        urlpNum = (new RegExp(langs.join("|")).test(urlpath[1])) ? "2" : "1";
        presenceData = {
              largeImageKey: logoArr[set_logo] || "logo_red"
            };

  if(set_timeElapsed) presenceData.startTimestamp = browsingStamp;

  if(!urlpath[urlpNum])
    presenceData.details = "Home";
  else if(urlpath[urlpNum].startsWith("model")) {
    const num = parseInt(urlpNum) + 1;
    let model = null;
    if(urlpath[num] === "design") {
      model = document.querySelector(".text-loader--content.tds-text--center.text-loader--subtitle>span").textContent;
      presenceData.details = `Designing ${model}`;

      if(set_showButtons) {
        presenceData.buttons = [
          {
            label: `View ${model}`,
            url: window.location.href.replace(urlpath[num], "").replace("#overview", "")
          },
          {
            label: `Design ${model}`,
            url: window.location.href
          }
        ];
      }
    } else {
      model = document.querySelector(".header-lower.tds-animate_small--to_reveal").textContent;
      presenceData.details = `Viewing ${model}`;

      if(set_showButtons) {
        presenceData.buttons = [
          {
            label: `View ${model}`,
            url: window.location.href
          }
        ];
      }
    }

  } else if(urlpath[urlpNum] === "teslaaccount") {
    const num = parseInt(urlpNum) + 1;
    presenceData.details = "Account";

    if(urlpath[num] === "payment-history")
      presenceData.state = "Payment History";
    else if(urlpath[num] === "settings")
      presenceData.state = "Settings";
    else if(urlpath[num] === "ownership")
      presenceData.state = "Ownership";

  } else if(urlpath[urlpNum] === "solarroof") {
    const num = parseInt(urlpNum) + 1;
    presenceData.details = "Solar Roof";

    if(urlpath[num] === "design") presenceData.state = "Designing";

    if(set_showButtons) {
      presenceData.buttons = [
        {
          label: `View Solar Roof`,
          url: window.location.href
        }
      ];
    }
  } else if(urlpath[urlpNum] === "solarpanels") {
    const num = parseInt(urlpNum) + 1;
    presenceData.details = "Solar Panels";

    if(set_showButtons) {
      presenceData.buttons = [
        {
          label: `View Solar Panels`,
          url: window.location.href
        }
      ];
    }
  } else if(urlpath[urlpNum] === "energy") {
    const num = parseInt(urlpNum) + 1;
    presenceData.details = "Energy";

    if(urlpath[num] === "design") presenceData.state = "Designing";

    if(set_showButtons) {
      presenceData.buttons = [
        {
          label: `View Page`,
          url: window.location.href
        }
      ];
    }
  } else if(urlpath[urlpNum] === "powerwall") {
    const num = parseInt(urlpNum) + 1;
    presenceData.details = "Powerwall";

    if(set_showButtons) {
      presenceData.buttons = [
        {
          label: `View Powerwall`,
          url: window.location.href
        }
      ];
    }
  } else if(urlpath[urlpNum] === "inventory") {
    presenceData.details = "Inventory";

    if(set_showButtons) {
      presenceData.buttons = [
        {
          label: `View Inventory`,
          url: window.location.href
        }
      ];
    }
  } else if(urlpath[urlpNum] === "drive")
    presenceData.details = "Test drive";
  else if(urlpath[urlpNum] === "charging")
    presenceData.details = "Charging";
  else if(urlpath[urlpNum] === "home-charging")
    presenceData.details = "Wall Connector";
  else {
    if(document.querySelector(".error-container>.error-code")) {
      const error = document.querySelector(".error-container>.error-code").textContent;
      if(error === "404") presenceData.details = "Error 404", presenceData.state = "Page not found";
    } else
      presenceData.details = "Other";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
