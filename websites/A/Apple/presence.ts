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
      products = [
        "ipad",
        "ipad-air",
        "ipad-pro",
        "ipad-10.2",
        "ipad-mini",
        "apple-pencil",
        "ipad-keyboards",
        "airpods",
        "iphone",
        "iphone-12-pro",
        "iphone-12",
        "iphone-se",
        "airtag",
        "mac",
        "macbook-air",
        "macbook-pro-13",
        "macbook-pro-16",
        "imac-24",
        "imac-27",
        "mac-pro",
        "mac-mini",
        "pro-display-xdr",
        "watch",
        "apple-watch-series-6",
        "apple-watch-se",
        "apple-watch-series-3",
        "apple-watch-nike",
        "apple-watch-hermes",
        "airpods",
        "airpods-pro",
        "airpods-max",
        "airpods-2nd-generation",
        "homepod",
        "homepod-mini",
        "ipod-touch"
      ],
      services = [
        "apple-fitness-plus",
        "tv",
        "apple-tv-plus",
        "airplay",
        "apple-tv-app",
        "apple-tv-4k",
        "apple-arcade",
        "icloud",
        "apple-news",
        "apple-one",
        "apple-card",
        "apple-books",
        "app-store",
        "music",
        "apple-music"
      ],
      includesProduct = products.find(e => urlpath.includes(e)),
      includesService = services.find(e => urlpath.includes(e)),
      presenceData: PresenceData = {
        largeImageKey: logoArr[setting.logo] || "logo"
      };

  function getPSName() {
    return document.querySelector("div.ac-ln-title>a")?.textContent || document.title.replace(" - Apple - Apple", "").replace(" - Apple", "").replace(/ *\([^)]*\) */g, "");
  }

  if(urlpath[1] !== 'shop' && urlpath[2] !== 'shop' && window.location.hostname === "www.apple.com") {

    if(!urlpath.length === (2 || 3))
      presenceData.details = 'Home';
    else if(includesProduct) {
    if(urlpath.includes("compare") && includesProduct) {
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
            url: window.location.href
          }
        ];
      }
    } else if(includesService) {
      const service = getPSName();
      presenceData.details = 'Viewing Service:';
      presenceData.state = service;

      if(setting.buttons) {
        presenceData.buttons = [
          {
            label: `View Service`,
            url: window.location.href
          }
        ];
      }
    } else if(urlpath.includes('newsroom')) {
      presenceData.details = 'Newsroom';

      if(urlpath.includes('topics'))
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
    } else if(urlpath.includes('today')) {
      presenceData.details = 'Today at Apple';

      if(urlpath.includes('feature')) {
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
    } else if(urlpath.includes('retail')) {
      if(urlpath.includes('instore-shopping-session'))
        presenceData.details = 'Purchasing advice';
      else
        presenceData.details = 'Store finder';
    } else if(urlpath.includes('store-opening-letter'))
      presenceData.details = 'COVID‑19 store information';
    else if(urlpath.includes('trade-in'))
      presenceData.details = 'Apple Trade In';
    else if(urlpath.includes('choose-country-region'))
      presenceData.details = 'Choosing language...';
    else
      presenceData.details = 'Other';

  } else if((urlpath[1] === 'shop' || urlpath[2] === 'shop') && window.location.hostname === "www.apple.com") {
    const num = (urlpath[1] === 'shop') ? 2 : 3;

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

    if(urlpath.length === (2 || 3)) {
      presenceData.details = "Apple Support";
      presenceData.state = "Home";
    } else if(sProducts.find(e => urlpath.includes(e))) {
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

    if(urlpath.includes('app')) {
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
            url: window.location.href
          }
        ];
      }
    } else if(urlpath.includes('developer')) {
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
            url: window.location.href
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
