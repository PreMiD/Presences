const presence = new Presence({
    clientId: "839150832036872213"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const urlpath = window.location.pathname.toLowerCase().split("/"),
      setting = {
        timeElapsed: await presence.getSetting("timeElapsed"),
        buttons: await presence.getSetting("showButtons"),
        logo: await presence.getSetting("logo"),
        shopCheckout: await presence.getSetting("shopCheckout")
      },
      logoArr = ["logo", "logo-rainbow"],
      langs = [
        "bh",
        "bh-ar",
        "bw",
        "cm",
        "cf",
        "ci",
        "ch",
        "ch-de",
        "ch-fr",
        "eg",
        "eg-ar",
        "gw",
        "gn",
        "gq",
        "in",
        "il",
        "jo",
        "jo-ar",
        "ke",
        "kw",
        "kw-ar",
        "mg",
        "ml",
        "ma",
        "mu",
        "mz",
        "ne",
        "ng",
        "om",
        "om-ar",
        "qa",
        "qa-ar",
        "sa",
        "sa-ar",
        "sn",
        "za",
        "tn",
        "ug",
        "ae",
        "ae-ar",
        "au",
        "hk",
        "id",
        "jp",
        "kr",
        "mo",
        "my",
        "nz",
        "ph",
        "sg",
        "tw",
        "th",
        "vn",
        "am",
        "az",
        "by",
        "benl",
        "befr",
        "bg",
        "cz",
        "dk",
        "de",
        "ee",
        "es",
        "fr",
        "ge",
        "gr",
        "hr",
        "ie",
        "it",
        "kz",
        "kg",
        "lv",
        "li",
        "lt",
        "lu",
        "hu",
        "mt",
        "md",
        "me",
        "nl",
        "mk",
        "no",
        "at",
        "pl",
        "pt",
        "ro",
        "ru",
        "sk",
        "si",
        "chde",
        "chfr",
        "fi",
        "se",
        "tj",
        "tr",
        "tm",
        "uk",
        "ua",
        "uz",
        "us",
        "lae",
        "lae",
        "la",
        "lae",
        "lae",
        "lae",
        "la",
        "br",
        "lae",
        "lae",
        "cl",
        "co",
        "la",
        "lae",
        "la",
        "la",
        "la",
        "lae",
        "la",
        "lae",
        "la",
        "lae",
        "mx",
        "lae",
        "la",
        "la",
        "la",
        "la",
        "lae",
        "lae",
        "lae",
        "lae",
        "lae",
        "lae",
        "lae",
        "la",
        "la",
        "la",
        "lae",
        "ca",
        "lae",
        "la"
      ],
      urlpNum = langs.indexOf(urlpath[1]) > -1 ? 2 : 1,
      presenceData: PresenceData = {
        largeImageKey: logoArr[setting.logo] || "logo"
      };

  function getPSName() {
    return document.querySelector("div.ac-ln-title>a")?.textContent || document.title.replace(" - Apple - Apple", "").replace(" - Apple", "").replace(/ *\([^)]*\) */g, "");
  }

  if(urlpath[urlpNum] !== 'shop' && window.location.hostname === "www.apple.com") {

    if(!urlpath[urlpNum])
      presenceData.details = 'Home';
    else if(urlpath[urlpNum] === 'ipad' || urlpath[urlpNum] === 'ipad-air' || urlpath[urlpNum] === 'ipad-pro' || urlpath[urlpNum] === 'ipad-10.2' || urlpath[urlpNum] === 'ipad-mini' || urlpath[urlpNum] === 'apple-pencil' || urlpath[urlpNum] === 'ipad-keyboards' || urlpath[urlpNum] === 'airpods' || urlpath[urlpNum] === 'iphone' || urlpath[urlpNum] === 'iphone-12-pro' || urlpath[urlpNum] === 'iphone-12' || urlpath[urlpNum] === 'iphone-se' || urlpath[urlpNum] === 'airtag' || urlpath[urlpNum] === 'mac' || urlpath[urlpNum] === 'macbook-air' || urlpath[urlpNum] === 'macbook-pro-13' || urlpath[urlpNum] === 'macbook-pro-16' || urlpath[urlpNum] === 'imac-24' || urlpath[urlpNum] === 'imac-27' || urlpath[urlpNum] === 'mac-pro' || urlpath[urlpNum] === 'mac-mini' || urlpath[urlpNum] === 'pro-display-xdr' || urlpath[urlpNum] === 'watch' || urlpath[urlpNum] === 'apple-watch-series-6' || urlpath[urlpNum] === 'apple-watch-se' || urlpath[urlpNum] === 'apple-watch-series-3' || urlpath[urlpNum] === 'apple-watch-nike' || urlpath[urlpNum] === 'apple-watch-hermes' || urlpath[urlpNum] === 'airpods' || urlpath[urlpNum] === 'airpods-pro' || urlpath[urlpNum] === 'airpods-max' || urlpath[urlpNum] === 'airpods-2nd-generation' || urlpath[urlpNum] === 'homepod' || urlpath[urlpNum] === 'homepod-mini' || urlpath[urlpNum] === 'ipod-touch') {
      if(urlpath[urlpNum + 1] === 'compare') {
        presenceData.details = 'Comparing:';
        presenceData.state = document.title.split('-')[0].replace(/ *\([^)]*\) */g, "");
      } else {
        const product = getPSName();

        presenceData.details = 'Viewing Product:';
        presenceData.state = product;
      }

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Product`,
            url: `https://www.apple.com/${urlpath[urlpNum]}`
          }
        ];
      }
    } else if(urlpath[urlpNum] === 'apple-fitness-plus' || urlpath[urlpNum] === 'tv' || urlpath[urlpNum] === 'apple-tv-plus' || urlpath[urlpNum] === 'airplay' || urlpath[urlpNum] === 'apple-tv-app' || urlpath[urlpNum] === 'apple-tv-4k' || urlpath[urlpNum] === 'apple-arcade' || urlpath[urlpNum] === 'icloud' || urlpath[urlpNum] === 'apple-news' || urlpath[urlpNum] === 'apple-one' || urlpath[urlpNum] === 'apple-card' || urlpath[urlpNum] === 'apple-books' || urlpath[urlpNum] === 'app-store' || urlpath[urlpNum] === 'music' || urlpath[urlpNum] === 'apple-music' || urlpath[urlpNum] === 'swift') {
      const service = getPSName();
      presenceData.details = 'Viewing Service:';
      presenceData.state = service;

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Service`,
            url: `https://www.apple.com/${urlpath[urlpNum]}`
          }
        ];
      }
    } else if(urlpath[urlpNum] === 'newsroom') {
      presenceData.details = 'Newsroom';

      if(urlpath[urlpNum + 1] === 'topics')
        presenceData.state = document.querySelector("h1.section-head")?.getAttribute("aria-label");
      else {
        presenceData.state = document.querySelector(".hero-headline")?.textContent;

        if(setting.buttons) {
          presenceData.buttons = [
            {
              label: `View Article`,
              url: window.location.href
            }
          ];
        }
      }
    } else if(urlpath[urlpNum] === 'today') {
      presenceData.details = 'Today at Apple';

      if(urlpath[urlpNum + 1] === 'feature') {
        presenceData.state = document.querySelector("h1.editorial-page__header-headline")?.textContent;

        if(setting.buttons) {
          presenceData.buttons = [
            {
              label: `View Article`,
              url: window.location.href
            }
          ];
        }
      }
    } else if(urlpath[urlpNum] === 'retail') {
      if(urlpath[urlpNum + 1] === 'instore-shopping-session')
        presenceData.details = 'Purchasing advice';
      else
        presenceData.details = 'Store finder';
    } else if(urlpath[urlpNum] === 'store-opening-letter')
      presenceData.details = 'COVID‑19 store information';
    else if(urlpath[urlpNum] === 'trade-in')
      presenceData.details = 'Apple Trade In';
    else if(urlpath[urlpNum] === 'choose-country-region')
      presenceData.details = 'Choosing language...';
    else
      presenceData.details = 'Other';

  } else if(urlpath[urlpNum] === 'shop' && window.location.hostname === "www.apple.com") {
    const num = urlpNum + 1;

    presenceData.largeImageKey = "apple-store";

    if(!urlpath[num]) {
      presenceData.details = 'Shop';
      presenceData.state = 'Home';
    } else if(urlpath[num].startsWith("buy-")) {
      const product = document.querySelector("span.as-chiclets-text")?.textContent || document.querySelector("a.localnav-title.localnav-title-image")?.textContent || document.querySelector("a.localnav-title")?.textContent;

      presenceData.details = 'Shop - Product';
      presenceData.state = product;

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Product`,
            url: `https://www.apple.com/shop/${urlpath[num]}/${urlpath[num + 1]}`
          }
        ];
      }
    } else if(urlpath[num] === 'product') {
      const product = document.querySelector("h1.rf-pdp-title")?.textContent;

      presenceData.details = 'Shop - Product';
      presenceData.state = product;

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Product`,
            url: window.location.href
          }
        ];
      }
    } else if(urlpath[num] === 'watch') {
      presenceData.details = 'Shop';

      if(urlpath[num + 1] === 'bands')
        presenceData.state = 'Apple Watch bands';
      else if(urlpath[num + 1] === 'accessories')
        presenceData.state = 'Apple Accessoriess';
    } else if(urlpath[num + 1] === 'accessories') {
      presenceData.details = 'Shop';
      presenceData.state = document.querySelector("a.localnav-title")?.textContent;
    } else if(urlpath[num] === 'studio') {
      const product = document.querySelector("div.as-designstudio-title>a>img")?.getAttribute("alt");

      presenceData.details = 'Shop - Studio';
      presenceData.state = product;

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View ${product} Studio`,
            url: `https://www.apple.com/shop/studio/${urlpath[num + 1]}`
          }
        ];
      }
    } else if(urlpath[num] === 'favorites') {
      presenceData.details = 'Shop';
      presenceData.state = 'Favorites';
    } else if(urlpath[num] === 'account') {
      presenceData.details = 'Shop';
      presenceData.state = 'Account';
    } else if(urlpath[num] === 'accessories') {
      presenceData.details = 'Shop';
      presenceData.state = 'Accessories';
    } else if(urlpath[num] === 'gift-cards') {
      presenceData.details = 'Shop';
      presenceData.state = 'Gift cards';
    } else if(urlpath[num] === 'browse' && urlpath[num + 2] === 'plan_your_visit') {
      presenceData.details = 'Shop';
      presenceData.state = 'Planing visit';
    } else if(urlpath[num] === 'refurbished') {
      presenceData.details = 'Shop';
      presenceData.state = 'Certified Refurbished';
    } else if(urlpath[num] === 'bag') {
      const summary = document.querySelector("div.rs-summary-value")?.textContent;

      if(setting.shopCheckout && summary !== undefined) {
        presenceData.details = 'Shop - Bag';
        presenceData.state = 'Summary: ' + summary;
      } else {
        presenceData.details = 'Shop';
        presenceData.state = 'Bag';
      }
    } else {
      presenceData.details = 'Shop';
      presenceData.state = 'Other';
    }
  } else if(window.location.hostname === "support.apple.com" || window.location.hostname === "getsupport.apple.com") {
    const sProducts = [
      'iphone',
      'mac',
      'ipad',
      'watch',
      'airpods',
      'music',
      'tv'
    ];

    presenceData.largeImageKey = "apple-support";

    if(!urlpath[urlpNum]) {
      presenceData.details = "Apple Support";
      presenceData.state = "Home";
    } else if(sProducts.indexOf(urlpath[urlpNum]) > -1) {
      presenceData.details = "Apple Support";
      presenceData.state = document.querySelector("h1.pageTitle-heading")?.textContent || document.querySelector("h1#main-title")?.textContent;
    } else if(document.querySelector("div.mod-date")) {
      presenceData.details = "Apple Support - Article:";
      presenceData.state = document.querySelector("h1#howto-title")?.textContent;
    } else if(window.location.hostname === "getsupport.apple.com") {
      presenceData.details = "Apple Support";
    }
  } else if(window.location.hostname === "apps.apple.com") {
    presenceData.largeImageKey = "app-store";

    if(urlpath[urlpNum] === 'app') {
      if(document.querySelector("p.we-connecting__instructions")) {
        presenceData.details = 'App Store';
        presenceData.state = "Connecting...";
      } else {
        presenceData.details = 'App Store - App:';
        presenceData.state = document.querySelector("h1.product-header__title.app-header__title")?.childNodes[1].textContent.trim();
      }

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View App`,
            url: `https://apps.apple.com/app/${urlpath[urlpNum + 1]}/${urlpath[urlpNum + 2]}`
          }
        ];
      }
    } else if(urlpath[urlpNum] === 'developer') {
      if(document.querySelector("p.we-connecting__instructions")) {
        presenceData.details = 'App Store';
        presenceData.state = "Connecting...";
      } else {
        presenceData.details = 'App Store - Developer:';
        presenceData.state = document.querySelector("h1.page-header__title")?.textContent;
      }

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Developer`,
            url: `https://apps.apple.com/developer/${urlpath[urlpNum + 1]}/${urlpath[urlpNum + 2]}`
          }
        ];
      }
    }
  } else if(window.location.hostname === "www.icloud.com") {
    presenceData.largeImageKey = "icloud";
    presenceData.details = "iCloud";

    if(!urlpath[1])
      presenceData.state = "Launchpad";
    else if(urlpath[1] === 'mail')
      presenceData.state = "Mail";
    else if(urlpath[1] === 'contacts')
      presenceData.state = "Contacts";
    else if(urlpath[1] === 'calendar')
      presenceData.state = "Calendar";
    else if(urlpath[1] === 'photos')
      presenceData.state = "Photos";
    else if(urlpath[1] === 'iclouddrive')
      presenceData.state = "Drive";
    else if(urlpath[1] === 'notes')
      presenceData.state = "Notes";
    else if(urlpath[1] === 'reminders')
      presenceData.state = "Reminders";
    else if(urlpath[1] === 'pages')
      presenceData.state = "Pages";
    else if(urlpath[1] === 'numbers')
      presenceData.state = "Numbers";
    else if(urlpath[1] === 'keynote')
      presenceData.state = "Keynote";
    else if(urlpath[1] === 'fmf')
      presenceData.state = "Find My Friends";
    else if(urlpath[1] === 'find')
      presenceData.state = "Find My";
  }

  if(setting.timeElapsed)
    presenceData.startTimestamp = time;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
