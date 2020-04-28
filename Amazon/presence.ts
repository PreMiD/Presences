var presence = new Presence({
  clientId: "618138980273094695" // CLIENT ID FOR YOUR PRESENCE
});

var item: any,
  dropdown: any,
  dropdownfinal: any,
  dropdownplus1: any,
  dropdowninnertext: any,
  split: any;

var browsingStamp = Math.floor(Date.now() / 1000);

var regex = RegExp(
  "https:\\/\\/www\\.amazon\\.(.*?)\\/\\b(?:Prime-Video|Prime-Instant-Video|gp\\/video)\\b"
);

presence.on("UpdateData", async () => {
  const presenceData: presenceData = {
    largeImageKey: "amazon"
  };

  presenceData.startTimestamp = browsingStamp;

  if (regex.test(document.location.href)) {
    presence.clearActivity();
  } else if (
    document.location.hostname == "www.amazon.com" ||
    document.location.hostname == "www.amazon.com.au" ||
    document.location.hostname == "www.amazon.de" ||
    document.location.hostname == "www.amazon.ca" ||
    document.location.hostname == "www.amazon.cn" ||
    document.location.hostname == "www.amazon.es" ||
    document.location.hostname == "www.amazon.fr" ||
    document.location.hostname == "www.amazon.nl" ||
    document.location.hostname == "www.amazon.in" ||
    document.location.hostname == "www.amazon.co.jp" ||
    document.location.hostname == "www.amazon.ae" ||
    document.location.hostname == "www.amazon.co.uk" ||
    document.location.hostname == "www.amazon.com.tr" ||
    document.location.hostname == "www.amazon.com.br" ||
    document.location.hostname == "smile.amazon.com" ||
    document.location.hostname == "smile.amazon.com.au" ||
    document.location.hostname == "smile.amazon.de" ||
    document.location.hostname == "smile.amazon.ca" ||
    document.location.hostname == "smile.amazon.cn" ||
    document.location.hostname == "smile.amazon.es" ||
    document.location.hostname == "smile.amazon.fr" ||
    document.location.hostname == "smile.amazon.nl" ||
    document.location.hostname == "smile.amazon.in" ||
    document.location.hostname == "smile.amazon.co.jp" ||
    document.location.hostname == "smile.amazon.ae" ||
    document.location.hostname == "smile.amazon.co.uk" ||
    document.location.hostname == "smile.amazon.com.tr" ||
    document.location.hostname == "smile.amazon.com.br"
  ) {
    item = document.querySelector(
      "#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold"
    );

    if (document.querySelector("#productTitle") !== null) {
      item = document.querySelector("#productTitle");

      presenceData.details = "Viewing product:"; //general.viewProduct
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/s") && item !== null) {
      item = document.querySelector(
        "#search > span > h1 > div > div.sg-col-14-of-20.sg-col-26-of-32.sg-col-18-of-24.sg-col.sg-col-22-of-28.s-breadcrumb.sg-col-10-of-16.sg-col-30-of-36.sg-col-6-of-12 > div > div > span.a-color-state.a-text-bold"
      );

      presenceData.details = "Searching for:"; //general.searchFor
      presenceData.state = item.innerText;

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else if (document.querySelector("#gc-asin-title") !== null) {
      item = document.querySelector("#gc-asin-title");

      presenceData.details = "Viewing product:"; //general.viewProduct
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/profile")) {
      item = document.querySelector(
        "#customer-profile-name-header > div.a-row.a-spacing-none.name-container > span"
      );
      presenceData.details = "Viewing profile:"; //general.viewProfile
      presenceData.state = item.innerText;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/store")) {
      item = document.title.split(":");
      presenceData.details = "Viewing store:"; //amazon.store
      presenceData.state = item[1];

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/history")) {
      presenceData.details = "Viewing their history"; //amazon.history

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/gift-cards")) {
      presenceData.details = "Viewing Giftcards"; //amazon.viewTheir
      //amazon.giftcards

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/yourstore")) {
      presenceData.details = "Viewing recommended"; //amazon.recommended

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/wishlist")) {
      presenceData.details = "Viewing their wishlist"; //amazon.viewTheir
      //amazon.wishlist

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/cart")) {
      presenceData.details = "Viewing their cart"; //amazon.viewTheir
      //amazon.cart

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/order-history")) {
      presenceData.details = "Viewing their"; //amazon.viewTheir
      presenceData.state = "order history"; //amazon.orderHistory

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/order-details")) {
      presenceData.details = "Viewing their"; //amazon.viewTheir
      presenceData.state = "order details"; //amazon.orderDetails

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/amazonprime")) {
      presenceData.details = "Viewing Amazon Prime"; //amazon.prime

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/site-directory")) {
      presenceData.details = "Viewing all categories"; //amazon.catergoriesAll

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/yourpets")) {
      presenceData.details = "Viewing pets"; //amazon.pets

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/addresses")) {
      presenceData.details = "Viewing addresses"; //amazon.address

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/managepaymentmethods")) {
      presenceData.details = "Viewing payment methods"; //amazon.payment

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/balance")) {
      presenceData.details = "Viewing their balance"; //amazon.balance

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/adprefs")) {
      presenceData.details = "Viewing their adprefs"; //amazon.adprefs

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/yourmembershipsandsubscriptions")
    ) {
      presenceData.details = "Viewing subscriptions"; //amazon.subscriptions

      presence.setActivity(presenceData);
    } else if (
      document.location.search.includes("nav_youraccount_ya") ||
      document.location.pathname.includes("/your-account")
    ) {
      presenceData.details = "Viewing their account"; //general.viewAccount

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/ref=nav_logo")) {
      presence.setActivity();
      presence.setTrayTitle();
    } else if (document.location.pathname.includes("/help/")) {
      presenceData.details = "Viewing Help Center"; //general.viewing + Help Center

      presence.setActivity(presenceData);
    } else {
      if (document.querySelector("#searchDropdownBox") !== null) {
        dropdown = document
          .querySelector("#searchDropdownBox")
          .getAttribute("data-nav-selected");
        dropdownplus1 = +dropdown + 1;
        dropdownfinal =
          "#searchDropdownBox > option:nth-child(" + dropdownplus1 + ")";
        dropdowninnertext = document.querySelector(dropdownfinal).innerText;
        split = document.location.pathname.split("/", 3);
        if (dropdown !== "0" || split[1] !== "") {
          presenceData.details = "Browsing category:"; //general.viewCategory
          presenceData.state = dropdowninnertext;

          presence.setActivity(presenceData);
        } else {
          presence.setActivity();
          presence.setTrayTitle();
        }
      } else {
        presence.setActivity();
        presence.setTrayTitle();
      }
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
