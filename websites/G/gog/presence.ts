const presence = new Presence({
  clientId: "788755903838027776"
});

const browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  const showmoney = await presence.getSetting("money");
  const showprofile = await presence.getSetting("profiles");

  if (document.location.hostname == "www.gog.com") {
    if(document.querySelector("body > div.wrapper.cf._prices-in-gbp._price-currency-symbol-before > div > div:nth-child(3) > div")) {
      presenceData.details = "Looking At:"
      presenceData.state = "Main Page"
    } else if (document.location.pathname.startsWith("/game/")) {
    presenceData.details = "Looking At Game:";
    if(!document.querySelector("body > div.layout.ng-scope > div:nth-child(8) > div.product-actions.hide-when-content-is-expanded.ng-scope > div.product-actions-price.product-actions-price--discounted > span.product-actions-price__discount.ng-binding")) {
    presenceData.state = document.querySelector("body > div.layout.ng-scope > div:nth-child(8) > div.productcard-basics.hide-when-content-is-expanded > h1").innerHTML
    } else {
    presenceData.state = document.querySelector("body > div.layout.ng-scope > div:nth-child(8) > div.productcard-basics.hide-when-content-is-expanded > h1").innerHTML +" ("+ document.querySelector("body > div.layout.ng-scope > div:nth-child(8) > div.product-actions.hide-when-content-is-expanded.ng-scope > div.product-actions-price.product-actions-price--discounted > span.product-actions-price__discount.ng-binding").innerHTML +")"  
    }
  } else if (document.location.pathname.startsWith("/news/")) {
    presenceData.details = "Reading:";
    presenceData.state = document.querySelector("body > div.universe > div.wrapper.cf > div > article > h1 > b").textContent
  } else if (document.location.pathname.startsWith("/games")) {
    presenceData.details = "Looking At Games";
  } else if (document.location.pathname.startsWith("/about_gog")) {
    presenceData.details = "Reading About Gog";
  } else if (document.location.pathname.startsWith("/galaxy")) {
    presenceData.details = "Reading About Gog Galaxy";
  } else if (document.location.pathname.startsWith("/work")) {
    presenceData.details = "Reading Gog Work Application";
  } else if (document.location.pathname.startsWith("/forum")) {
    presenceData.details = "Looking Arround Forum";
  } else if (document.location.pathname.startsWith("/wishlist")) {
    presenceData.details = "Looking At Community Whitelist";
  } else if (document.location.pathname.startsWith("/checkout/")) {
    presenceData.details = "Looking At Checkout";
    if(showmoney) {
      presenceData.state = "Total: " + document.querySelector("body > div.universe > div.wrapper.cf > div > article > div > form > div.l-section.l-section--primary > section > div > div.form__row.form__row--summary.form__row--key-value > div._spinner._spinner--right-aligned.form__row-value > p.form__sheet-row.form__price.form_price--total > strong:nth-child(2) > span > span").innerHTML
    }
  } else if (document.location.pathname.startsWith("/wishlist")) {
    presenceData.details = "Looking At Community Whitelist";
  } else if (showprofile) {
    if(document.location.pathname.startsWith("/feed")) {
      presenceData.details = "Looking At:"
      presenceData.state = document.querySelector("body > div.layout > section.layout__header > main > div > div > a").innerHTML+"'s Profile"
    } else if(document.location.pathname.startsWith("/u/")) {
      presenceData.details = "Looking At:"
      presenceData.state = document.querySelector("body > div.layout > section.layout__header > main > div > div > a").innerHTML+"'s Profile"
    } else if(document.location.pathname.startsWith("/profile/edit")) {
      presenceData.details = "Editing Own Profile"
    }
  } else if(!showprofile) {
    presenceData.details = "Looking At:"
    presenceData.state = "Main Page"
  }
}

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
