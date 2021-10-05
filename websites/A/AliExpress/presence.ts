const presence = new Presence({
    clientId: "618569989842010122"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let item, typing: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "aliexpress"
  };

  presenceData.startTimestamp = browsingStamp;

  if (
    document.location.hostname === "ru.aliexpress.com" ||
    document.location.hostname === "pt.aliexpress.com" ||
    document.location.hostname === "es.aliexpress.com" ||
    document.location.hostname === "fr.aliexpress.com" ||
    document.location.hostname === "de.aliexpress.com" ||
    document.location.hostname === "it.aliexpress.com" ||
    document.location.hostname === "nl.aliexpress.com" ||
    document.location.hostname === "tr.aliexpress.com" ||
    document.location.hostname === "ja.aliexpress.com" ||
    document.location.hostname === "ko.aliexpress.com" ||
    document.location.hostname === "th.aliexpress.com" ||
    document.location.hostname === "vi.aliexpress.com" ||
    document.location.hostname === "ar.aliexpress.com" ||
    document.location.hostname === "he.aliexpress.com" ||
    document.location.hostname === "pl.aliexpress.com" ||
    document.location.hostname === "www.aliexpress.com"
  ) {
    if (document.location.pathname.includes("/item/")) {
      item = document.querySelector(
        "#root > div > div.product-main > div > div.product-info > div.product-title"
      ) as HTMLElement;

      presenceData.details = "Viewing product:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/store/")) {
      item = document.querySelector(
        "#hd > div > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(1) > span"
      ) as HTMLElement;
      presenceData.details = "Viewing store:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/category/")) {
      item = document.querySelector(
        "#root > div > div > div.main-content > div.right-menu > div > div.top-container > div.nav-breadcrumb > div > div > span > span > span"
      ) as HTMLElement;

      presenceData.details = "Viewing category:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/wholesale") &&
      document.location.search.includes("SearchText")
    ) {
      item = document.querySelector("#search-key") as HTMLInputElement;

      presenceData.details = "Searching for:";
      presenceData.state = item.value;

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (
    document.location.hostname === "message.aliexpress.com" ||
    document.location.hostname === "msg.aliexpress.com"
  ) {
    if (
      document.querySelector(
        "#root > div > div > div > span > div.message-view > div.message-view-title > div.message-view-title__content"
      )
    ) {
      item = document.querySelector(
        "#root > div > div > div > span > div.message-view > div.message-view-title > div.message-view-title__content"
      ) as HTMLElement;
      typing = document.querySelector(
        "#buyer_msg_send_btn"
      ) as HTMLButtonElement;
      if (typing) {
        if (typing.className.includes("icon-plane disable")) {
          presenceData.details = "Reading dms with:";
          presenceData.state = item.innerText;
        } else {
          presenceData.details = "Typing in dms to:";
          presenceData.state = item.innerText;
        }
      } else {
        presenceData.details = "Message Center";
        delete presenceData.state;
      }

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Message Center";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname === "sale.aliexpress.com") {
    presenceData.details = "Browsing through the sale";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "shoppingcart.aliexpress.com") {
    presenceData.details = "Viewing their shoppingcart";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "my.aliexpress.com") {
    if (document.location.pathname.includes("/wishlist")) {
      presenceData.details = "Viewing their wishlist";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/mytrace")) {
      presenceData.details = "Viewing their recently";
      presenceData.state = "viewed products";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (
    document.location.hostname === "home.aliexpress.com" ||
    document.location.hostname === "star.aliexpress.com"
  ) {
    presenceData.details = "Viewing their AliExpress";
    presenceData.state = "page / account /profile";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "feedback.aliexpress.com") {
    presenceData.details = "AliExpress Feedback";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "trade.aliexpress.com") {
    if (
      document.location.pathname.includes("order_list.htm") ||
      document.location.pathname.includes("orderList.htm")
    ) {
      presenceData.details = "Viewing their orders";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/issue/")) {
      presenceData.details = "Viewing their";
      presenceData.state = "Refunds & Disputes";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/ordertrash/")) {
      presenceData.details = "Viewing their";
      presenceData.state = "deleted orders";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "AliExpress Trade Center";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname === "coupon.aliexpress.com") {
    presenceData.details = "Viewing their coupons";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "ilogisticsaddress.aliexpress.com"
  ) {
    presenceData.details = "Viewing their adress";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "helppage.aliexpress.com") {
    presenceData.details = "AliExpress Help Center";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "sell.aliexpress.com" ||
    document.location.hostname === "seller.aliexpress.com"
  ) {
    presenceData.details = "AliExpress Sell Center";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
