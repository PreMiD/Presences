const presence = new Presence({
  clientId: "850295838361649153"
});
browsingStamp = Date.now(),
presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
};
const title: any;
presence.on("UpdateData", async () => {
  const showButtons = await presence.getSetting("buttons");
  if (document.location.hostname == "backpack.tf") {
    if (document.location.pathname.includes("/stats/")) {
      title = document.querySelector(
        "#page-content > div > :nth-child(1) > div.stats-body > div > div > div.stats-header-title"
        );
      presenceData.details = "Viewing Item:";
      presenceData.state = title.innerText;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "View Item",
            url: document.location.toString()
          }
        ];
      }
    } else if (document.location.pathname.includes("/u/")) {
     presenceData.details = "Viewing profile:";
      title = document.querySelector(
        "#page-content > div > div.panel-body > div > div > div.title > span > a"
        );
      presenceData.state = title.innerText;
      if (showButtons) {
        presenceData.buttons = [
          {
            label: "View profile",
            url: document.location.toString()
          }
        ];
      }
    } else if (document.location.pathname.includes("/profiles/")) {
      presenceData.details = "Viewing profile:";
       title = document.querySelector(
         "#page-content > div > div.panel-body > div > div > div.title > span > a"
         );
       presenceData.state = title.innerText;
       if (showButtons) {
        presenceData.buttons = [
          {
            label: "View profile",
            url: document.location.toString()
          }
        ];
      }
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
    } else if (document.location.pathname.includes("/donate")) {
      presenceData.details = "Viewing Donation page";
    } else if (document.location.pathname.includes("/premium/subscribe")) {
      presenceData.details = "Viewing Premium subscription";
    } else if (document.location.pathname.includes("/pricelist")) {
      presenceData.details = "Viewing Community Pricelist";
      presenceData.state = "Pricegrid view";
    } else if (document.location.pathname.includes("/spreadsheet")) {
      presenceData.details = "Viewing Community Pricelist";
      presenceData.state = "Spreadsheet view";
    } else if (document.location.pathname.includes("/vote")) {
      presenceData.details = "Browsing Suggestions";
    } else if (document.location.pathname.includes("/latest")) {
      presenceData.details = "Viewing the Latest Price Updates";
    } else if (document.location.pathname.includes("/unusuals")) {
      presenceData.details = "Viewing Unusual Pricelist";
      presenceData.state = "Browsing by Item";
    } else if (document.location.pathname.includes("/effects")) {
      presenceData.details = "Viewing Unusual Pricelist";
      presenceData.state = "Browse by Effect";
    } else if (document.location.pathname.includes("/market")) {
      presenceData.details = "Searching through:";
      presenceData.state = "Steam Community Market Pricelist";
    } else if (document.location.pathname.includes("/classifieds?steamid")) {
      presenceData.details = "Viewing Cassifieds of:";
       title = document.querySelector(
         "#search-crumbs > a"
         );
       presenceData.state = title.innerText;
       if (showButtons) {
        presenceData.buttons = [
          {
            label: "View Listings",
            url: document.location.toString()
          }
        ];
      }
     } else if (document.location.pathname.includes("/calculator")) presenceData.details = "Useing Calculator";
     else if (document.location.pathname.includes("/top/backpacks")) presenceData.details = "Viewing Top Backpacks";
     else if (document.location.pathname.includes("/top/donators")) presenceData.details = "Viewing Top Donators";
     else if (document.location.pathname.includes("/top/generous")) presenceData.details = "Viewing Top Gifters";
     else if (document.location.pathname.includes("/top/contributors")) presenceData.details = "Viewing Top Contributors";
     else if (document.location.pathname.includes("/top/accurate")) presenceData.details = "Viewing The Most Accurate Users";
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
