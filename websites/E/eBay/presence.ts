const presence = new Presence({
    clientId: "619219701146583080"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "ebaylogo",
      startTimestamp: browsingStamp
    },
    [, page] = location.pathname.split("/");

  if (location.hostname.startsWith("www.")) {
    if (!page) {
      presenceData.details = "Viewing the";
      presenceData.state = "Homepage";
    } else if (page === "itm") {
      const detail = document.querySelector("#itemTitle > span").textContent,
        itemName = document.querySelector("#itemTitle").textContent,
        seller = (document.querySelector(".mbg > a") as HTMLAnchorElement)
          ?.href;

      presenceData.details = itemName.replace(detail, "");
      presenceData.buttons = [
        { label: "View Item", url: location.href },
        {
          label: "View Seller",
          url: seller
        }
      ];

      if (document.querySelector("#vi-cdown_timeLeft")) {
        const itemfinish = document.querySelector("#vi-cdown_timeLeft");

        delete presenceData.startTimestamp;
        presenceData.state = itemfinish.textContent;
      }
    } else if (page === "sch") {
      if (location.pathname.includes("/i.html")) {
        const searchTerm = document.querySelector(
            ".srp-controls__count-heading .BOLD:nth-child(2)"
          )?.textContent,
          searchCount = document.querySelector(
            ".srp-controls__count-heading .BOLD"
          )?.textContent;

        presenceData.details = `Searching: ${searchTerm}`;
        presenceData.state = `${searchCount} Results`;
        presenceData.smallImageKey = "search";
      } else if (location.pathname.includes("/m.html")) {
        const seller = document.querySelector(".mbid") as HTMLAnchorElement;

        presenceData.details = "Viewing listed products of:";
        presenceData.state = seller.textContent;
        presenceData.buttons = [
          { label: "View List", url: location.href },
          {
            label: "View Seller",
            url: seller.href
          }
        ];
      }
    } else if (page === "usr") {
      const detail = document.querySelector(".mbg-id > span").textContent,
        userName = document.querySelector(".mbg-id").textContent;

      presenceData.details = "User:";
      presenceData.state = userName.replace(detail, "");
      presenceData.buttons = [{ label: "View User", url: location.href }];
    } else if (location.pathname.includes("/myb/")) {
      const pageName = document.querySelector(
        "#top-nav > div.topTitle > h1 > span.page-name"
      ).textContent;

      presenceData.details = "Viewing their:";
      presenceData.state = pageName;
    } else if (
      location.pathname.includes("/sns") ||
      location.pathname.includes("/b/Stores-Hub/")
    )
      presenceData.details = "Viewing stores";
    else if (location.pathname.includes("/sl/")) {
      presenceData.details = "eBay Sell";
      presenceData.state = "Listing an item";
    } else if (location.pathname.includes("/b/")) {
      const category = document.querySelector(
        ".b-pageheader__text"
      ).textContent;

      presenceData.details = "Viewing category:";
      presenceData.state = category;
    } else if (location.pathname.includes("/help/"))
      presenceData.details = "eBay Help";
    else if (location.pathname.includes("/deals")) {
      presenceData.details = "Viewing the latest";
      presenceData.state = "eBay deals";
    } else if (location.pathname.includes("/allcategories"))
      presenceData.details = "Viewing all categories";
  } else if (page === "str") {
    const store = document.querySelector(".str-billboard__title").textContent;

    presenceData.details = "eBay Store";
    presenceData.state = store;
    presenceData.buttons = [{ label: "View Store", url: location.href }];
  } else if (location.hostname.startsWith("mesg.")) {
    if (location.pathname.includes("/ViewMessageDetail/")) {
      presenceData.details = "eBay Messages";
      presenceData.state = "Viewing a message";
    } else if (location.pathname.includes("/ViewMessages/")) {
      presenceData.details = "Browsing through";
      presenceData.state = "eBay Messages";
    } else presenceData.details = "eBay Messages";
  } else if (location.hostname.startsWith("ocsnext."))
    presenceData.details = "eBay Customer Support";
  else if (location.hostname.includes("developer."))
    presenceData.details = "eBay Developer Program";
  else if (location.hostname.startsWith("resolutioncenter."))
    presenceData.details = "eBay Resolution Center";
  else if (location.hostname.startsWith("my."))
    presenceData.details = "Viewing their eBay";
  else if (location.hostname.startsWith("login."))
    presenceData.details = "eBay Login";
  else if (location.hostname.startsWith("signin."))
    presenceData.details = "eBay Login";
  else if (location.hostname.startsWith("pages.")) {
    if (location.hash !== "") {
      presenceData.details = "Viewing the sitemap";
      presenceData.state = location.hash;
    } else if (location.pathname.includes("sitemap.html"))
      presenceData.details = "Viewing the sitemap";
    else if (location.pathname.includes("seller-center"))
      presenceData.details = "Viewing the seller center";
  } else if (location.hostname.startsWith("community.")) {
    if (document.querySelector(".lia-message-subject")) {
      const title = document.querySelector(".lia-message-subject")?.textContent,
        author = (
          document.querySelector(
            ".lia-component-message-view-widget-author-username > a"
          ) as HTMLAnchorElement
        )?.href;

      presenceData.details = "eBay Forum, Viewing:";
      presenceData.state = title;

      presenceData.buttons = [
        { label: "View Post", url: location.href },
        { label: "View Author", url: author }
      ];
    } else if (location.pathname.includes("/user/")) {
      const author = document.querySelector(".lia-user-name-link")?.textContent;

      presenceData.details = "eBay Forum Author:";
      presenceData.state = author;
      presenceData.buttons = [{ label: "View Author", url: location.href }];
    } else if (location.pathname.includes("/searchpage/")) {
      const search = (
        document.querySelector(".lia-search-input-message") as HTMLInputElement
      )?.value;

      presenceData.details = "eBay Forum Search:";
      presenceData.state = search;
    } else presenceData.details = "eBay Forum";
  }

  const showButtons = await presence.getSetting("buttons");

  if (!showButtons) delete presenceData.buttons;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
