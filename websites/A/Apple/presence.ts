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
      shopCheckout: await presence.getSetting("shopCheckout"),
      devProfileBtn: await presence.getSetting("devProfileBtn")
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
      "apple-music",
      "maps"
    ],
    includesProduct = products.find((e) => urlpath.includes(e)),
    includesService = services.find((e) => urlpath.includes(e)),
    presenceData: PresenceData = {
      largeImageKey: logoArr[setting.logo] || "logo",
      buttons: []
    };

  function getPSName() {
    return (
      document.querySelector("div.ac-ln-title>a")?.textContent ||
      document.title
        .replace(" - Apple - Apple", "")
        .replace(" - Apple", "")
        .replace(/ *\([^)]*\) */g, "")
    );
  }

  if (
    urlpath[1] !== "shop" &&
    urlpath[2] !== "shop" &&
    window.location.hostname === "www.apple.com"
  ) {
    if (urlpath.length === (2 || 3)) presenceData.details = "Home";
    else if (includesProduct) {
      if (urlpath.includes("compare")) {
        presenceData.details = "Comparing:";
        presenceData.state = document.title
          .split("-")[0]
          .replace(/ *\([^)]*\) */g, "");
      } else {
        const product = getPSName();

        presenceData.details = "Viewing Product:";
        presenceData.state = product;
      }

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View Product",
            url: window.location.href
          }
        ];
      }
    } else if (includesService) {
      const service = getPSName();
      presenceData.details = "Viewing Service:";
      presenceData.state = service;

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View Service",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath.includes("newsroom")) {
      presenceData.details = "Newsroom";

      if (urlpath.includes("topics"))
        presenceData.state = document
          .querySelector("h1.section-head")
          ?.getAttribute("aria-label");
      else {
        presenceData.state =
          document.querySelector(".hero-headline")?.textContent;

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Article",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath.includes("today")) {
      presenceData.details = "Today at Apple";

      if (urlpath.includes("feature")) {
        presenceData.state =
          document.querySelector("h1.editorial-page__header-headline")
            ?.textContent || "Unknown";

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Article",
              url: window.location.href
            }
          ];
        }
      } else if (urlpath.includes("event")) {
        presenceData.state =
          document.querySelector("h1.typography-headline-elevated")
            ?.textContent ||
          document.querySelector("h1.typography-headline-reduced")
            ?.textContent ||
          "Unknown";

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Event",
              url: window.location.href
            }
          ];
        }
      } else if (document.querySelector("h1.typography-headline-elevated")) {
        presenceData.state =
          document.querySelector("h1.typography-headline-elevated")
            ?.textContent ||
          document.querySelector("h1.typography-headline-reduced")
            ?.textContent ||
          "Unknown";

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Article",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath.includes("healthcare")) {
      presenceData.details = "Healthcare";

      if (urlpath.includes("apple-watch")) presenceData.state = "Apple Watch";
      else if (urlpath.includes("products-platform"))
        presenceData.state = "Products and Platform";
      else if (urlpath.includes("health-records"))
        presenceData.state = "Health records";
      else presenceData.state = "Overview";
    } else if (urlpath.includes("retail")) {
      if (urlpath.includes("instore-shopping-session"))
        presenceData.details = "Purchasing advice";
      else presenceData.details = "Store finder";
    } else if (
      urlpath.includes("ios") ||
      urlpath.includes("watchos") ||
      urlpath.includes("ipados") ||
      urlpath.includes("macos")
    ) {
      const OS =
        document.querySelector("div.ac-ln-title>a") ||
        document.querySelector(
          "h1.typography-hero-eyebrow.hero-eyebrow.hero-copy-item"
        );

      presenceData.details = "Viewing:";
      presenceData.state = OS?.textContent || "Unknown";

      if (setting.buttons && OS) {
        presenceData.buttons = [
          {
            label: `View ${OS.textContent.replace("Preview", "")}`.substring(
              0,
              30
            ),
            url: window.location.href
          }
        ];
      }
    } else if (urlpath.includes("apple-events")) {
      const event =
        document.querySelector("h1.hero-headline.typography-headline") ||
        document.querySelector("p.hero-subhead.typography-quote-reduced");

      presenceData.details = event ? "Viewing Event:" : "Apple Events";
      if (event) presenceData.state = event.textContent;

      if (setting.buttons && event) {
        presenceData.buttons = [
          {
            label: "View Event",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath.includes("store-opening-letter"))
      presenceData.details = "COVID‑19 store information";
    else if (urlpath.includes("trade-in"))
      presenceData.details = "Apple Trade In";
    else if (urlpath.includes("supplier-responsibility"))
      presenceData.details = "Supplier Responsibility";
    else if (urlpath.includes("contact")) presenceData.details = "Contact";
    else if (urlpath.includes("choose-country-region"))
      presenceData.details = "Choosing language...";
    else presenceData.details = "Other";
  } else if (
    (urlpath[1] === "shop" || urlpath[2] === "shop") &&
    window.location.hostname === "www.apple.com"
  ) {
    const num = urlpath[1] === "shop" ? 2 : 3;

    presenceData.largeImageKey = "apple-store";

    if (!urlpath[num]) {
      presenceData.details = "Shop";
      presenceData.state = "Home";
    } else if (urlpath[num].startsWith("buy-")) {
      const product =
        document.querySelector("span.as-chiclets-text")?.textContent ||
        document.querySelector("a.localnav-title.localnav-title-image")
          ?.textContent ||
        document.querySelector("a.localnav-title")?.textContent;

      presenceData.details = "Shop - Product";
      presenceData.state = product;

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View Product",
            url: `https://www.apple.com/shop/${urlpath[num]}/${
              urlpath[num + 1]
            }`
          }
        ];
      }
    } else if (urlpath[num] === "product") {
      const product = document.querySelector("h1.rf-pdp-title")?.textContent;

      presenceData.details = "Shop - Product";
      presenceData.state = product;

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View Product",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[num] === "watch") {
      presenceData.details = "Shop";

      if (urlpath[num + 1] === "bands")
        presenceData.state = "Apple Watch bands";
      else if (urlpath[num + 1] === "accessories")
        presenceData.state = "Apple Accessoriess";
    } else if (urlpath[num + 1] === "accessories") {
      presenceData.details = "Shop";
      presenceData.state =
        document.querySelector("a.localnav-title")?.textContent;
    } else if (urlpath[num] === "studio") {
      const product = document
        .querySelector("div.as-designstudio-title>a>img")
        ?.getAttribute("alt");

      presenceData.details = "Shop - Studio";
      presenceData.state = product;

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: `View ${product} Studio`,
            url: `https://www.apple.com/shop/studio/${urlpath[num + 1]}`
          }
        ];
      }
    } else if (urlpath[num] === "favorites") {
      presenceData.details = "Shop";
      presenceData.state = "Favorites";
    } else if (urlpath[num] === "account") {
      presenceData.details = "Shop";
      presenceData.state = "Account";
    } else if (urlpath[num] === "accessories") {
      presenceData.details = "Shop";
      presenceData.state = "Accessories";
    } else if (urlpath[num] === "gift-cards") {
      presenceData.details = "Shop";
      presenceData.state = "Gift cards";
    } else if (
      urlpath[num] === "browse" &&
      urlpath[num + 2] === "plan_your_visit"
    ) {
      presenceData.details = "Shop";
      presenceData.state = "Planing visit";
    } else if (urlpath[num] === "refurbished") {
      presenceData.details = "Shop";
      presenceData.state = "Certified Refurbished";
    } else if (urlpath[num] === "bag") {
      const summary = document.querySelector(
        "div.rs-summary-value"
      )?.textContent;

      if (setting.shopCheckout && summary !== undefined) {
        presenceData.details = "Shop - Bag";
        presenceData.state = "Summary: " + summary;
      } else {
        presenceData.details = "Shop";
        presenceData.state = "Bag";
      }
    } else {
      presenceData.details = "Shop";
      presenceData.state = "Other";
    }
  } else if (
    window.location.hostname === "support.apple.com" ||
    window.location.hostname === "getsupport.apple.com"
  ) {
    const sProducts = [
      "iphone",
      "mac",
      "ipad",
      "watch",
      "airpods",
      "music",
      "tv",
      "displays"
    ];

    presenceData.largeImageKey = "apple-support";

    if (sProducts.find((e) => urlpath.includes(e))) {
      presenceData.details = "Apple Support";
      presenceData.state =
        document.querySelector("h1.pageTitle-heading")?.textContent ||
        document.querySelector("h1#main-title")?.textContent ||
        "Unknown";
    } else if (document.querySelector("div.mod-date")) {
      presenceData.details = "Apple Support - Article:";
      presenceData.state =
        document.querySelector("h1#howto-title")?.textContent || "Unknown";
    } else if (window.location.hostname === "getsupport.apple.com") {
      presenceData.details = "Apple Support";
    } else {
      presenceData.details = "Apple Support";
      presenceData.state = "Home";
    }
  } else if (window.location.hostname === "apps.apple.com") {
    presenceData.largeImageKey = "app-store";

    if (urlpath.includes("app")) {
      if (document.querySelector("p.we-connecting__instructions")) {
        presenceData.details = "App Store";
        presenceData.state = "Connecting...";
      } else {
        presenceData.details = "App Store - App:";
        presenceData.state = document
          .querySelector("h1.product-header__title.app-header__title")
          ?.childNodes[1].textContent.trim();
      }

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View App",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath.includes("developer")) {
      if (document.querySelector("p.we-connecting__instructions")) {
        presenceData.details = "App Store";
        presenceData.state = "Connecting...";
      } else {
        presenceData.details = "App Store - Developer:";
        presenceData.state = document.querySelector(
          "h1.page-header__title"
        )?.textContent;
      }

      if (setting.buttons) {
        presenceData.buttons = [
          {
            label: "View Developer",
            url: window.location.href
          }
        ];
      }
    }
  } else if (window.location.hostname === "www.icloud.com") {
    presenceData.largeImageKey = "icloud";
    presenceData.details = "iCloud";

    if (!urlpath[1]) presenceData.state = "Launchpad";
    else if (urlpath[1] === "mail") presenceData.state = "Mail";
    else if (urlpath[1] === "contacts") presenceData.state = "Contacts";
    else if (urlpath[1] === "calendar") presenceData.state = "Calendar";
    else if (urlpath[1] === "photos") presenceData.state = "Photos";
    else if (urlpath[1] === "iclouddrive") presenceData.state = "Drive";
    else if (urlpath[1] === "notes") presenceData.state = "Notes";
    else if (urlpath[1] === "reminders") presenceData.state = "Reminders";
    else if (urlpath[1] === "pages") {
      presenceData.largeImageKey = "pages";

      if (urlpath[2]) {
        presenceData.details = "iCloud Pages";

        if (urlpath[2] === "create") presenceData.state = "Creating...";
        else
          presenceData.state = document.querySelector(
            "div.sc-view.iw-document-status-name-label.iw-ellipsis.sc-static-layout"
          )?.textContent;
      } else presenceData.state = "Pages";
    } else if (urlpath[1] === "numbers") presenceData.state = "Numbers";
    else if (urlpath[1] === "keynote") {
      presenceData.largeImageKey = "keynote";

      if (urlpath[2]) {
        presenceData.details = "iCloud Keynote";

        if (urlpath[2] === "create") presenceData.state = "Creating...";
        else
          presenceData.state = document.querySelector(
            "div.sc-view.iw-document-status-name-label.iw-ellipsis.sc-static-layout"
          )?.textContent;
      } else presenceData.state = "Keynote";
    } else if (urlpath[1] === "keynote-live" && urlpath[2]) {
      const iframe = document.querySelector("iframe");

      presenceData.details = "iCloud Keynote Live";
      presenceData.largeImageKey = "keynote";

      if (iframe?.style.display === "none")
        presenceData.state = "Waiting room...";
    } else if (urlpath[1] === "fmf") presenceData.state = "Find My Friends";
    else if (urlpath[1] === "find") presenceData.state = "Find My";
  } else if (window.location.hostname === "card.apple.com") {
    presenceData.largeImageKey = "apple-card";
    presenceData.details = "Apple Card";

    if (!urlpath[1]) presenceData.state = "Home";
    else if (urlpath[1] === "apply") presenceData.state = "Apply";
  } else if (window.location.hostname === "developer.apple.com") {
    const dPages = [
        "discover",
        "develop",
        "distribute",
        "support",
        "account",
        "download",
        "bug-reporting",
        "sf-symbols",
        "contact",
        "localization",
        "accessories",
        "licensing-trademarks",
        "system-status",
        "widgets"
      ],
      cpage =
        document.querySelector("body")?.id ||
        document.querySelector("body").classList[0]?.replace("nav-", "");

    presenceData.largeImageKey = "apple-developer";
    presenceData.details = "Apple Developer";
    presenceData.state = "Home";

    if (dPages.find((e) => urlpath[1] === e))
      presenceData.state =
        document.querySelector("a.ac-gn-link.ac-gn-link-" + cpage + ">span")
          ?.textContent ||
        document.querySelector("section.section-hero>h1.section-headline")
          ?.textContent ||
        document.querySelector("h2.localnav-title>a")?.textContent ||
        "Unknown";
    else if (urlpath[1] === "custom-apps")
      presenceData.state =
        document.querySelector("h2.localnav-title>a")?.textContent ||
        document.querySelector("h1.typography-headline")?.textContent ||
        "Unknown";
    else if (urlpath[1].startsWith("wwdc")) {
      const wwdc = document
        .querySelector("a.ac-ln-title-logo>img")
        ?.getAttribute("alt");
      presenceData.state = wwdc || "Unknown";

      if (urlpath[2]) {
        presenceData.details = wwdc;
        presenceData.state =
          document.querySelector("span.localnav-menu-link.current")
            ?.textContent ||
          document.querySelector("h1.typography-headline")?.textContent ||
          "Unknown";
      }

      if (setting.buttons && wwdc) {
        presenceData.buttons = [
          {
            label: `View ${wwdc}`,
            url: `https://developer.apple.com/${wwdc.toLowerCase()}/`
          }
        ];
      }
    } else if (urlpath[1] === "enroll") {
      presenceData.details = "Developer Program";
      if (urlpath[2] === "purchase") presenceData.state = "Enrollment";
    } else if (
      urlpath[1] === "ios" ||
      urlpath[1] === "ipados" ||
      urlpath[1] === "tvos" ||
      urlpath[1] === "watchos" ||
      urlpath[1] === "macos" ||
      urlpath[1] === "mac-catalyst" ||
      urlpath[1] === "xcode" ||
      urlpath[1] === "swift" ||
      urlpath[1] === "swift-playgrounds" ||
      urlpath[1] === "app-clips"
    ) {
      presenceData.details =
        document.querySelector("h2.localnav-title>a")?.textContent ||
        "Apple Developer";

      if (!urlpath[2]) presenceData.state = "Overview";
      else if (urlpath[2] === "whats-new") presenceData.state = "What's new";
      else if (urlpath[2] === "submit") presenceData.state = "Submissions";
      else if (urlpath[1] === "macos" && urlpath[2] === "iphone-and-ipad-apps")
        presenceData.state = "iPhone and iPad apps";
      else if (urlpath[1] === "macos" && urlpath[2] === "distribution")
        presenceData.state = "Distributing software";
      else if (urlpath[1] === "watchos" && urlpath[2] === "features")
        presenceData.state = "Features";
      else
        presenceData.state =
          document.querySelector("h1.typography-headline")?.textContent ||
          "Other";
    } else if (urlpath[1] === "documentation") {
      const page = document.querySelector("span.current.item");

      presenceData.details = "Documentation";
      presenceData.state = page?.textContent || "Home";

      if (setting.buttons && page) {
        presenceData.buttons = [
          {
            label: "View Page",
            url: window.location.href
          }
        ];
      }
    } else if (urlpath[1] === "design") {
      presenceData.details = "Design";

      if (!urlpath[2]) presenceData.state = "Overview";
      else if (urlpath[2] === "whats-new") presenceData.state = "What's new";
      else if (urlpath[2] === "human-interface-guidelines")
        presenceData.state = "Human Interface Guidelines";
      else if (urlpath[2] === "resources") presenceData.state = "Resources";
      else
        presenceData.state =
          document.querySelector("h1.typography-headline")?.textContent ||
          "Other";
    } else if (
      urlpath[1] === "safari" ||
      urlpath[1] === "app-store-connect" ||
      urlpath[1] === "business" ||
      urlpath[1] === "app-store" ||
      urlpath[1] === "education" ||
      urlpath[1] === "classkit" ||
      urlpath[1] === "programs"
    ) {
      presenceData.details =
        document.querySelector("h2.localnav-title>a")?.textContent ||
        "Apple Developer";
      presenceData.state =
        document.querySelector("a.localnav-menu-link.link-" + cpage)
          ?.textContent ||
        document.querySelector("span.localnav-menu-link.current")
          ?.textContent ||
        document.querySelector("a.localnav-menu-link.current")?.textContent ||
        "Other";
    } else if (urlpath[1] === "testflight") presenceData.state = "Testflight";
    else if (urlpath[1] === "games") presenceData.state = "Games";
    else if (urlpath[1] === "forums") {
      presenceData.details = "Forum";

      if (urlpath[2] === "thread") {
        presenceData.details = "Forum - Thread";
        presenceData.state =
          document.querySelector("div.header>h1.title")?.textContent ||
          "Unknown";

        presenceData.buttons.push({
          label: "View Thread",
          url: window.location.href
        });
      } else if (urlpath[2] === "tags") {
        presenceData.details = "Forum - Tags";
        presenceData.state =
          document.querySelector("div.tag-content>h2.tag-title")?.textContent ||
          "Unknown";

        presenceData.buttons.push({
          label: "View Tags",
          url: window.location.href
        });
      } else if (urlpath[2] === "profile" && urlpath[3]) {
        const nickname = document.querySelector(
          "div.user-name>h2.user-nickname"
        )?.textContent;

        presenceData.details = "Forum - Profile";

        if (urlpath[3] === "preferences") presenceData.state = "Preferences";
        else {
          presenceData.state = nickname || "Unknown";

          if (nickname) {
            presenceData.buttons.push({
              label: `View ${nickname}'s Profile`,
              url: window.location.href
            });
          }
        }
      } else if (urlpath[2] === "create") {
        presenceData.state = "Creating thread";
      } else if (urlpath[2] === "register") presenceData.state = "Registration";

      if (setting.buttons) {
        if (
          setting.devProfileBtn &&
          document.querySelector<HTMLAnchorElement>(
            "li.menu-item>a.menu-item-link"
          )?.href !== "https://developer.apple.com/forums/login"
        ) {
          presenceData.buttons.push({
            label: "View Profile",
            url:
              document.querySelector<HTMLAnchorElement>("a.view-profile-link")
                ?.href ||
              `https://developer.apple.com/forums/profile/${
                document.querySelector("span.user-name")?.textContent
              }`
          });
        }
      }
    } else if (urlpath[1] === "videos") {
      presenceData.details = "Videos";

      if (
        urlpath[2] === "featured" ||
        urlpath[2] === "design" ||
        urlpath[2] === "developer-tools" ||
        urlpath[2] === "frameworks" ||
        urlpath[2] === "graphics-and-games" ||
        urlpath[2] === "media" ||
        urlpath[2] === "app-store-and-distribution" ||
        urlpath[2] === "all-videos"
      ) {
        presenceData.details = "Videos - Topic";
        presenceData.state =
          document.querySelector("section.inline-block>h1.collection-title")
            ?.textContent ||
          document.title.replace(" - Videos - Apple Developer", "") ||
          "Other";
      } else if (urlpath[2] === "play") {
        const vid = document.querySelector<HTMLVideoElement>("video#video");

        presenceData.state = document.querySelector(
          "li.supplement.details>h1"
        )?.textContent;

        if (vid) {
          const video_startTime = Date.now(),
            video_endTime =
              Math.floor(video_startTime / 1000) -
              vid.currentTime +
              vid.duration +
              1;

          presenceData.endTimestamp = video_endTime;

          if (!vid.paused) {
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Playing";
          } else {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Paused";
          }
        }

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Video",
              url: window.location.href
            }
          ];
        }
      } else
        presenceData.state =
          document.querySelector("section.inline-block>h1.collection-title")
            ?.textContent ||
          document.querySelector("span.localnav-menu-link.current")
            ?.textContent ||
          "Other";
    } else if (urlpath[1] === "news") {
      const urlParams = new URLSearchParams(window.location.search);

      presenceData.details = "News";

      if (urlpath[2] === "releases") presenceData.state = "Releases";

      if (urlParams.get("id")) {
        presenceData.state =
          document.querySelector("h2.article-title")?.textContent;

        if (setting.buttons) {
          presenceData.buttons = [
            {
              label: "View Article",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "shareplay") presenceData.state = "Shareplay";
  }

  if (
    setting.timeElapsed &&
    !window.location.href.startsWith("https://developer.apple.com/videos/play")
  )
    presenceData.startTimestamp = time;

  if (presenceData.buttons.length === 0) delete presenceData.buttons;

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
