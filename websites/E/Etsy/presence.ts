const presence = new Presence({
    clientId: "620721262112538625" // CLIENT ID FOR YOUR PRESENCE
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let item: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "etsy"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname === "investors.etsy.com") {
    presenceData.details = "Viewing page:";
    presenceData.state = "Etsy Investors";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "help.etsy.com") {
    presenceData.details = "Viewing page:";
    presenceData.state = "Etsy Help Center";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (document.location.hostname === "www.etsy.com") {
    if (document.location.pathname.includes("/listing/")) {
      item = document.querySelector(
        "#listing-page-cart > div > div.listing-page-title-component > h1"
      ) as HTMLElement;
      presenceData.details = "Viewing product:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/c/")) {
      item = document.querySelector(
        "#content > div > div > div > div > div > h1"
      );
      presenceData.details = "Viewing category:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/shop/")) {
      item = document.querySelector(
        "#content > div.shop-home > div:nth-child(1) > div > div > div > div > div > div > h1"
      );

      presenceData.details = "Viewing shop:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/people/")) {
      item = document.querySelector(
        "#content > div > div:nth-child(1) > div > div > div > div > h1"
      );

      presenceData.details = "Viewing profile:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/redeem")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Redeem codes";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/cart")) {
      presenceData.details = "Viewing cart";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/purchases")) {
      presenceData.details = "Viewing purchases";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/account")) {
      presenceData.details = "Viewing their account";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "About Etsy";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Etsy Team";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/careers")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Etsy Careers";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/press")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Etsy Press";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/impact")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Etsy Impact";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/search")) {
      item = document.querySelector("#global-enhancements-search-query");

      presenceData.details = "Searching for:";
      presenceData.state = (item as HTMLInputElement).value;

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/sell")) {
      presenceData.details = "Viewing page:";
      presenceData.state = "Etsy Sell";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/conversations")) {
      if (
        document.querySelector(
          "#root > div > div > div > div > div > div > div > div > h3 > span:nth-child(2)"
        ) !== null
      ) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Reading DMs with:";
        presenceData.state = item.innerText;

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/sent")) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing sent messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/unread")) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing unreaded messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/spam")) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing spam messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/trash")) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing trash can";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/all")) {
        item = document.querySelector(
          "#root > div > div > div > div > div > div > div > div > div > div > div > div > a"
        );

        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing all messages";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "Etsy Direct Messages";
        presenceData.state = "Viewing the inbox";

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
