const presence = new Presence({
    clientId: "850295838361649153"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.pathname === "/")
    presenceData.details = "Viewing Main page";
  else if (document.location.pathname.includes("/overview/")) {
    const title = document.querySelector(
      "#page-content > div:nth-child(1) > div.stats-body > div > h1"
    );
    presenceData.details = "Viewing item stats:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/stats/")) {
    if (
      document.location.pathname.includes(
        "Unique/Mann%20Co.%20Supply%20Crate%20Key"
      )
    ) {
      const title = document.querySelector(
          "#page-content > div.row > div.col-md-8.stats-panel.stats-header-panel > div.stats-body > div.stats-subheader > div.price-boxes > a:nth-child(1) > div.text > div.value"
        ),
        sec = document.querySelector(
          "#page-content > div.row > div.col-md-8.stats-panel.stats-header-panel > div.stats-body > div.stats-subheader > div.price-boxes > a:nth-child(2) > div.text > div.value"
        );
      presenceData.details = "Viewing Key price:";
      presenceData.state = `${title.textContent} | ${sec.textContent}`;
    } else if (document.location.pathname.includes("Unique/Earbuds")) {
      const title = document.querySelector(
          "#page-content > div.row > div.col-md-8.stats-panel.stats-header-panel > div.stats-body > div.stats-subheader > div.price-boxes > a:nth-child(1) > div.text > div.value"
        ),
        sec = document.querySelector(
          "#page-content > div.row > div.col-md-8.stats-panel.stats-header-panel > div.stats-body > div.stats-subheader > div.price-boxes > a:nth-child(2) > div.text > div.value"
        );
      presenceData.details = "Viewing Earbuds price:";
      presenceData.state = `${title.textContent} | ${sec.textContent}`;
    } else {
      const title = document.querySelector(
        "#page-content > div.row > div.col-md-8.stats-panel.stats-header-panel > div.stats-body > div.stats-header > div.stats-header-item > div.stats-header-title"
      );
      presenceData.details = "Viewing item:";
      presenceData.state = title.textContent;
    }
  } else if (document.location.pathname.includes("/u/")) {
    const title = document.querySelector(
      "#page-content > div.panel.panel-main.user-panel- > div.panel-body > div > div.information > div.title > span > a"
    );
    presenceData.details = "Viewing profile:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/profiles/")) {
    const title = document.querySelector(
      "#page-content > div.panel.panel-main.user-panel- > div.panel-body > div > div.information > div.title > span > a"
    );
    presenceData.details = "Viewing profile:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/unusual/")) {
    const title = document.querySelector("head > title");
    presenceData.details = "Viewing Unusual Pricelist:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/effect/")) {
    const title = document.querySelector("head > title");
    presenceData.details = "Viewing Unusual Effects Pricelist:";
    presenceData.state = title.textContent;
  } else if (document.location.pathname.includes("/item/")) {
    const title = document.querySelector(
        "#page-content > div > div > div > div.panel-heading > span:nth-child(1)"
      ),
      sec = document.querySelector(
        "#page-content > div > div > div > div.panel-body > div > div.item-wrapper > div.item-text > h2"
      );
    presenceData.details = `Viewing ${title.textContent}:`;
    presenceData.state = sec.textContent;
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Settings";
  } else if (document.location.pathname.includes("/alerts")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Alerts";
  } else if (document.location.pathname.includes("/notifications")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Notifications";
  } else if (document.location.pathname.includes("/connections")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Connections";
  } else if (document.location.pathname.includes("/payments")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Payment History";
  } else if (document.location.pathname.includes("/award-tickets")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Tickets";
  } else if (document.location.pathname.includes("/donate"))
    presenceData.details = "Viewing Donation page";
  else if (document.location.pathname.includes("/premium/subscribe"))
    presenceData.details = "Viewing Premium subscription";
  else if (document.location.pathname.includes("/pricelist")) {
    presenceData.details = "Viewing Community Pricelist";
    presenceData.state = "Pricegrid view";
  } else if (document.location.pathname.includes("/spreadsheet")) {
    presenceData.details = "Viewing Community Pricelist";
    presenceData.state = "Spreadsheet view";
  } else if (document.location.pathname.includes("/vote"))
    presenceData.details = "Browsing Suggestions";
  else if (document.location.pathname.includes("/latest"))
    presenceData.details = "Viewing the Latest Price Updates";
  else if (document.location.pathname.includes("/unusuals")) {
    presenceData.details = "Viewing Unusual Pricelist";
    presenceData.state = "Browsing by Item";
  } else if (document.location.pathname.includes("/effects")) {
    presenceData.details = "Viewing Unusual Pricelist";
    presenceData.state = "Browse by Effect";
  } else if (document.location.pathname.includes("/market")) {
    presenceData.details = "Searching through:";
    presenceData.state = "Steam Community Market Pricelist";
  } else if (document.location.pathname.includes("/classifieds")) {
    presenceData.details = "Searching through:";
    presenceData.state = "Classified Listings";
  } else if (document.location.pathname.includes("/suggestion/")) {
    presenceData.details = "Searching through:";
    presenceData.state = "Price Suggestions";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.details = "Viewing page:";
    presenceData.state = "About backpack.tf";
  } else if (document.location.pathname.includes("/issues")) {
    presenceData.details = "Viewing page:";
    presenceData.state = "Issue tracker";
  } else if (document.location.pathname.includes("/calculator"))
    presenceData.details = "Useing Calculator";
  else if (document.location.pathname.includes("/top/backpacks"))
    presenceData.details = "Viewing Top Backpacks";
  else if (document.location.pathname.includes("/top/donators"))
    presenceData.details = "Viewing Top Donators";
  else if (document.location.pathname.includes("/top/generous"))
    presenceData.details = "Viewing Top Gifters";
  else if (document.location.pathname.includes("/top/contributors"))
    presenceData.details = "Viewing Top Contributors";
  else if (document.location.pathname.includes("/developer"))
    presenceData.details = "Viewing Develoapers page";
  else if (document.location.pathname.includes("/help"))
    presenceData.details = "Viewing help center";
  else if (document.location.pathname.includes("/rules"))
    presenceData.details = "Reading rules";
  else if (document.location.pathname.includes("/servers"))
    presenceData.details = "Viewing servers with backpack.tf plugin";
  else if (document.location.pathname.includes("/top/accurate"))
    presenceData.details = "Viewing The Most Accurate Users";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
