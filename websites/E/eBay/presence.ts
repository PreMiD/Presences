const presence = new Presence({
    clientId: "619219701146583080"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let item: string | HTMLElement,
  item2: string | HTMLElement,
  itemfinish: string | HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ebaylogo",
    startTimestamp: browsingStamp
  };

  if (
    document.location.hostname === "in.ebay.com" ||
    document.location.hostname === "ar.ebay.com" ||
    document.location.hostname === "by.ebay.com" ||
    document.location.hostname === "bo.ebay.com" ||
    document.location.hostname === "br.ebay.com" ||
    document.location.hostname === "cl.ebay.com" ||
    document.location.hostname === "co.ebay.com" ||
    document.location.hostname === "cr.ebay.com" ||
    document.location.hostname === "do.ebay.com" ||
    document.location.hostname === "ec.ebay.com" ||
    document.location.hostname === "sv.ebay.com" ||
    document.location.hostname === "gt.ebay.com" ||
    document.location.hostname === "hn.ebay.com" ||
    document.location.hostname === "il.ebay.com" ||
    document.location.hostname === "kz.ebay.com" ||
    document.location.hostname === "mx.ebay.com" ||
    document.location.hostname === "ni.ebay.com" ||
    document.location.hostname === "pa.ebay.com" ||
    document.location.hostname === "py.ebay.com" ||
    document.location.hostname === "pe.ebay.com" ||
    document.location.hostname === "pt.ebay.com" ||
    document.location.hostname === "pr.ebay.com" ||
    document.location.hostname === "ru.ebay.com" ||
    document.location.hostname === "uy.ebay.com" ||
    document.location.hostname === "ve.ebay.com"
  ) {
    presenceData.details = "Viewing the";
    presenceData.state = "main page";

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "www.ebay.at" ||
    document.location.hostname === "www.ebay.be" ||
    document.location.hostname === "www.ebay.ca" ||
    document.location.hostname === "www.ebay.cn" ||
    document.location.hostname === "www.ebay.fr" ||
    document.location.hostname === "www.ebay.de" ||
    document.location.hostname === "www.ebay.ie" ||
    document.location.hostname === "www.ebay.it" ||
    document.location.hostname === "www.ebay.nl" ||
    document.location.hostname === "www.ebay.ph" ||
    document.location.hostname === "www.ebay.pl" ||
    document.location.hostname === "www.ebay.es" ||
    document.location.hostname === "www.ebay.ch" ||
    document.location.hostname === "www.ebay.vn" ||
    document.location.hostname === "www.ebay.com" ||
    document.location.hostname === "www.ebay.co.th" ||
    document.location.hostname === "www.ebay.co.uk" ||
    document.location.hostname === "www.ebay.co.jp" ||
    document.location.hostname === "www.ebay.com.au" ||
    document.location.hostname === "www.ebay.com.hk" ||
    document.location.hostname === "www.ebay.com.my" ||
    document.location.hostname === "www.ebay.com.sg" ||
    document.location.hostname === "www.ebay.com.tw" ||
    document.location.hostname === "www.benl.ebay.be" ||
    document.location.hostname === "www.befr.ebay.be"
  ) {
    if (document.location.pathname.includes("/itm/")) {
      item = document.querySelector<HTMLElement>("#itemTitle");
      item2 = document.querySelector<HTMLElement>("#itemTitle > span");
      itemfinish = item.innerText.replace(item2.innerText, "");
      presenceData.details = "Viewing product:";
      if (itemfinish.length > 128)
        presenceData.state = `${itemfinish.substring(0, 125)}...`;
      else presenceData.state = itemfinish;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/usr/")) {
      item = document.querySelector<HTMLElement>(
        "#user_info > div.mbg > span:nth-child(1) > a.mbg-id"
      );
      item2 = document.querySelector<HTMLElement>(
        "#user_info > div.mbg > span:nth-child(1) > a.mbg-id > span"
      );
      itemfinish = item.innerText.replace(item2.innerText, "");
      presenceData.details = "Viewing user:";
      presenceData.state = itemfinish;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/m.html")) {
      item = document.querySelector<HTMLElement>(
        "#soiBanner > div > span:nth-child(1) > a"
      );

      presenceData.details = "Viewing listed products of:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/i.html")) {
      const [, , split] = document.location.pathname.split("/");
      item = document.querySelector<HTMLElement>(
        "#cbelm > div.clt > h1 > span.kwcat > b"
      );
      if (split === "i.html") {
        presenceData.details = "Searching for:";
        presenceData.state = item.innerText;
      } else {
        presenceData.details = "Searching for:";
        presenceData.state = split;
      }

      presenceData.smallImageKey = "search";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/myb/")) {
      item = document.querySelector<HTMLElement>(
        "#top-nav > div.topTitle > h1 > span.page-name"
      );

      presenceData.details = "Viewing their:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.location.pathname.includes("/sns") ||
      document.location.pathname.includes("/b/Stores-Hub/")
    ) {
      presenceData.details = "Viewing stores";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/sl/")) {
      presenceData.details = "eBay Sell";
      presenceData.state = "Listing an item";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/b/")) {
      item = document.querySelector<HTMLElement>(
        "body > div.pagecontainer.srp-main--isLarge > div.pagecontainer__top > nav > ol > li:nth-child(2) > span"
      );
      presenceData.details = "Viewing category:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/help/")) {
      presenceData.details = "eBay Help";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/deals")) {
      presenceData.details = "Viewing the latest";
      presenceData.state = "eBay deals";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/allcategories")) {
      presenceData.details = "Viewing all categories";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/str/")) {
      item = document.querySelector<HTMLElement>(
        "#w2 > div.str-billboard__store > div.str-billboard__store-info > div.str-billboard__title-container > h1"
      );
      presenceData.details = "eBay Stores";
      presenceData.state = `Tag: ${item.innerText}`;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (
    document.location.hostname === "mesg.ebay.at" ||
    document.location.hostname === "mesg.ebay.be" ||
    document.location.hostname === "mesg.ebay.ca" ||
    document.location.hostname === "mesg.ebay.cn" ||
    document.location.hostname === "mesg.ebay.fr" ||
    document.location.hostname === "mesg.ebay.de" ||
    document.location.hostname === "mesg.ebay.ie" ||
    document.location.hostname === "mesg.ebay.it" ||
    document.location.hostname === "mesg.ebay.nl" ||
    document.location.hostname === "mesg.ebay.ph" ||
    document.location.hostname === "mesg.ebay.pl" ||
    document.location.hostname === "mesg.ebay.es" ||
    document.location.hostname === "mesg.ebay.ch" ||
    document.location.hostname === "mesg.ebay.vn" ||
    document.location.hostname === "mesg.ebay.com" ||
    document.location.hostname === "mesg.ebay.co.th" ||
    document.location.hostname === "mesg.ebay.co.uk" ||
    document.location.hostname === "mesg.ebay.co.jp" ||
    document.location.hostname === "mesg.ebay.com.au" ||
    document.location.hostname === "mesg.ebay.com.hk" ||
    document.location.hostname === "mesg.ebay.com.my" ||
    document.location.hostname === "mesg.ebay.com.sg" ||
    document.location.hostname === "mesg.ebay.com.tw" ||
    document.location.hostname === "mesg.benl.ebay.be" ||
    document.location.hostname === "mesg.befr.ebay.be"
  ) {
    if (document.location.pathname.includes("/ViewMessageDetail/")) {
      presenceData.details = "eBay Messages";
      presenceData.state = "Viewing a message";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/ViewMessages/")) {
      presenceData.details = "Browsing through";
      presenceData.state = "eBay Messages";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "eBay Messages";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (
    document.location.hostname === "ocsnext.ebay.at" ||
    document.location.hostname === "ocsnext.ebay.be" ||
    document.location.hostname === "ocsnext.ebay.ca" ||
    document.location.hostname === "ocsnext.ebay.cn" ||
    document.location.hostname === "ocsnext.ebay.fr" ||
    document.location.hostname === "ocsnext.ebay.de" ||
    document.location.hostname === "ocsnext.ebay.ie" ||
    document.location.hostname === "ocsnext.ebay.it" ||
    document.location.hostname === "ocsnext.ebay.nl" ||
    document.location.hostname === "ocsnext.ebay.ph" ||
    document.location.hostname === "ocsnext.ebay.pl" ||
    document.location.hostname === "ocsnext.ebay.es" ||
    document.location.hostname === "ocsnext.ebay.ch" ||
    document.location.hostname === "ocsnext.ebay.vn" ||
    document.location.hostname === "ocsnext.ebay.com" ||
    document.location.hostname === "ocsnext.ebay.co.th" ||
    document.location.hostname === "ocsnext.ebay.co.uk" ||
    document.location.hostname === "ocsnext.ebay.co.jp" ||
    document.location.hostname === "ocsnext.ebay.com.au" ||
    document.location.hostname === "ocsnext.ebay.com.hk" ||
    document.location.hostname === "ocsnext.ebay.com.my" ||
    document.location.hostname === "ocsnext.ebay.com.sg" ||
    document.location.hostname === "ocsnext.ebay.com.tw" ||
    document.location.hostname === "ocsnext.benl.ebay.be" ||
    document.location.hostname === "ocsnext.befr.ebay.be"
  ) {
    presenceData.details = "eBay Customer Support";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "developer.ebay.com" ||
    document.location.hostname === "forums.developer.ebay.com" ||
    document.location.hostname === "go.developer.ebay.com"
  ) {
    presenceData.details = "eBay Developer Program";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "resolutioncenter.ebay.at" ||
    document.location.hostname === "resolutioncenter.ebay.be" ||
    document.location.hostname === "resolutioncenter.ebay.ca" ||
    document.location.hostname === "resolutioncenter.ebay.cn" ||
    document.location.hostname === "resolutioncenter.ebay.fr" ||
    document.location.hostname === "resolutioncenter.ebay.de" ||
    document.location.hostname === "resolutioncenter.ebay.ie" ||
    document.location.hostname === "resolutioncenter.ebay.it" ||
    document.location.hostname === "resolutioncenter.ebay.nl" ||
    document.location.hostname === "resolutioncenter.ebay.ph" ||
    document.location.hostname === "resolutioncenter.ebay.pl" ||
    document.location.hostname === "resolutioncenter.ebay.es" ||
    document.location.hostname === "resolutioncenter.ebay.ch" ||
    document.location.hostname === "resolutioncenter.ebay.vn" ||
    document.location.hostname === "resolutioncenter.ebay.com" ||
    document.location.hostname === "resolutioncenter.ebay.co.th" ||
    document.location.hostname === "resolutioncenter.ebay.co.uk" ||
    document.location.hostname === "resolutioncenter.ebay.co.jp" ||
    document.location.hostname === "resolutioncenter.ebay.com.au" ||
    document.location.hostname === "resolutioncenter.ebay.com.hk" ||
    document.location.hostname === "resolutioncenter.ebay.com.my" ||
    document.location.hostname === "resolutioncenter.ebay.com.sg" ||
    document.location.hostname === "resolutioncenter.ebay.com.tw" ||
    document.location.hostname === "resolutioncenter.benl.ebay.be" ||
    document.location.hostname === "resolutioncenter.befr.ebay.be"
  ) {
    presenceData.details = "eBay Resolution Center";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "my.ebay.at" ||
    document.location.hostname === "my.ebay.be" ||
    document.location.hostname === "my.ebay.ca" ||
    document.location.hostname === "my.ebay.cn" ||
    document.location.hostname === "my.ebay.fr" ||
    document.location.hostname === "my.ebay.de" ||
    document.location.hostname === "my.ebay.ie" ||
    document.location.hostname === "my.ebay.it" ||
    document.location.hostname === "my.ebay.nl" ||
    document.location.hostname === "my.ebay.ph" ||
    document.location.hostname === "my.ebay.pl" ||
    document.location.hostname === "my.ebay.es" ||
    document.location.hostname === "my.ebay.ch" ||
    document.location.hostname === "my.ebay.vn" ||
    document.location.hostname === "my.ebay.com" ||
    document.location.hostname === "my.ebay.co.th" ||
    document.location.hostname === "my.ebay.co.uk" ||
    document.location.hostname === "my.ebay.co.jp" ||
    document.location.hostname === "my.ebay.com.au" ||
    document.location.hostname === "my.ebay.com.hk" ||
    document.location.hostname === "my.ebay.com.my" ||
    document.location.hostname === "my.ebay.com.sg" ||
    document.location.hostname === "my.ebay.com.tw" ||
    document.location.hostname === "my.benl.ebay.be" ||
    document.location.hostname === "my.befr.ebay.be"
  ) {
    presenceData.details = "Viewing their eBay";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "login.ebay.at" ||
    document.location.hostname === "login.ebay.be" ||
    document.location.hostname === "login.ebay.ca" ||
    document.location.hostname === "login.ebay.cn" ||
    document.location.hostname === "login.ebay.fr" ||
    document.location.hostname === "login.ebay.de" ||
    document.location.hostname === "login.ebay.ie" ||
    document.location.hostname === "login.ebay.it" ||
    document.location.hostname === "login.ebay.nl" ||
    document.location.hostname === "login.ebay.ph" ||
    document.location.hostname === "login.ebay.pl" ||
    document.location.hostname === "login.ebay.es" ||
    document.location.hostname === "login.ebay.ch" ||
    document.location.hostname === "login.ebay.vn" ||
    document.location.hostname === "login.ebay.com" ||
    document.location.hostname === "login.ebay.co.th" ||
    document.location.hostname === "login.ebay.co.uk" ||
    document.location.hostname === "login.ebay.co.jp" ||
    document.location.hostname === "login.ebay.com.au" ||
    document.location.hostname === "login.ebay.com.hk" ||
    document.location.hostname === "login.ebay.com.my" ||
    document.location.hostname === "login.ebay.com.sg" ||
    document.location.hostname === "login.ebay.com.tw" ||
    document.location.hostname === "login.benl.ebay.be" ||
    document.location.hostname === "login.befr.ebay.be"
  ) {
    presenceData.details = "eBay Login";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "signin.ebay.at" ||
    document.location.hostname === "signin.ebay.be" ||
    document.location.hostname === "signin.ebay.ca" ||
    document.location.hostname === "signin.ebay.cn" ||
    document.location.hostname === "signin.ebay.fr" ||
    document.location.hostname === "signin.ebay.de" ||
    document.location.hostname === "signin.ebay.ie" ||
    document.location.hostname === "signin.ebay.it" ||
    document.location.hostname === "signin.ebay.nl" ||
    document.location.hostname === "signin.ebay.ph" ||
    document.location.hostname === "signin.ebay.pl" ||
    document.location.hostname === "signin.ebay.es" ||
    document.location.hostname === "signin.ebay.ch" ||
    document.location.hostname === "signin.ebay.vn" ||
    document.location.hostname === "signin.ebay.com" ||
    document.location.hostname === "signin.ebay.co.th" ||
    document.location.hostname === "signin.ebay.co.uk" ||
    document.location.hostname === "signin.ebay.co.jp" ||
    document.location.hostname === "signin.ebay.com.au" ||
    document.location.hostname === "signin.ebay.com.hk" ||
    document.location.hostname === "signin.ebay.com.my" ||
    document.location.hostname === "signin.ebay.com.sg" ||
    document.location.hostname === "signin.ebay.com.tw" ||
    document.location.hostname === "signin.benl.ebay.be" ||
    document.location.hostname === "signin.befr.ebay.be"
  ) {
    presenceData.details = "eBay Login";
    delete presenceData.state;

    delete presenceData.smallImageKey;

    presence.setActivity(presenceData);
  } else if (
    document.location.hostname === "pages.ebay.at" ||
    document.location.hostname === "pages.ebay.be" ||
    document.location.hostname === "pages.ebay.ca" ||
    document.location.hostname === "pages.ebay.cn" ||
    document.location.hostname === "pages.ebay.fr" ||
    document.location.hostname === "pages.ebay.de" ||
    document.location.hostname === "pages.ebay.ie" ||
    document.location.hostname === "pages.ebay.it" ||
    document.location.hostname === "pages.ebay.nl" ||
    document.location.hostname === "pages.ebay.ph" ||
    document.location.hostname === "pages.ebay.pl" ||
    document.location.hostname === "pages.ebay.es" ||
    document.location.hostname === "pages.ebay.ch" ||
    document.location.hostname === "pages.ebay.vn" ||
    document.location.hostname === "pages.ebay.com" ||
    document.location.hostname === "pages.ebay.co.th" ||
    document.location.hostname === "pages.ebay.co.uk" ||
    document.location.hostname === "pages.ebay.co.jp" ||
    document.location.hostname === "pages.ebay.com.au" ||
    document.location.hostname === "pages.ebay.com.hk" ||
    document.location.hostname === "pages.ebay.com.my" ||
    document.location.hostname === "pages.ebay.com.sg" ||
    document.location.hostname === "pages.ebay.com.tw" ||
    document.location.hostname === "pages.benl.ebay.be" ||
    document.location.hostname === "pages.befr.ebay.be"
  ) {
    if (document.location.hash !== "") {
      presenceData.details = "Viewing the sitemap";
      presenceData.state = document.location.hash;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("sitemap.html")) {
      presenceData.details = "Viewing the sitemap";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("seller-center")) {
      presenceData.details = "Viewing the seller center";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (
    document.location.hostname === "community.ebay.at" ||
    document.location.hostname === "community.ebay.be" ||
    document.location.hostname === "community.ebay.ca" ||
    document.location.hostname === "community.ebay.cn" ||
    document.location.hostname === "community.ebay.fr" ||
    document.location.hostname === "community.ebay.de" ||
    document.location.hostname === "community.ebay.ie" ||
    document.location.hostname === "community.ebay.it" ||
    document.location.hostname === "community.ebay.nl" ||
    document.location.hostname === "community.ebay.ph" ||
    document.location.hostname === "community.ebay.pl" ||
    document.location.hostname === "community.ebay.es" ||
    document.location.hostname === "community.ebay.ch" ||
    document.location.hostname === "community.ebay.vn" ||
    document.location.hostname === "community.ebay.com" ||
    document.location.hostname === "community.ebay.co.th" ||
    document.location.hostname === "community.ebay.co.uk" ||
    document.location.hostname === "community.ebay.co.jp" ||
    document.location.hostname === "community.ebay.com.au" ||
    document.location.hostname === "community.ebay.com.hk" ||
    document.location.hostname === "community.ebay.com.my" ||
    document.location.hostname === "community.ebay.com.sg" ||
    document.location.hostname === "community.ebay.com.tw" ||
    document.location.hostname === "community.benl.ebay.be" ||
    document.location.hostname === "community.befr.ebay.be"
  ) {
    if (document.querySelector("#messageview") !== null) {
      item = document.querySelector("#messageview").className;
      let split = item.split("message-uid-");
      split = split[1].split(" ");
      item2 = `#qanda-message-${split[0]} > div:nth-child(1) > div.lia-panel-message-root.lia-message-qanda.lia-panel-message.lia-js-data-messageUid-${split[0]} > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div > h5`;
      itemfinish = document.querySelector<HTMLElement>(item2);
    }

    if (
      document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      ) !== null
    ) {
      item = document.querySelector<HTMLElement>(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      );
      presenceData.details = "eBay Forum, Viewing:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (itemfinish !== null) {
      presenceData.details = "eBay Forum, Viewing:";
      if ((itemfinish as HTMLElement).innerText.length > 128) {
        presenceData.state = `${(itemfinish as HTMLElement).innerText.substring(
          0,
          125
        )}...`;
      } else presenceData.state = (itemfinish as HTMLElement).innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/user/")) {
      item = document.querySelector<HTMLElement>(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-header > div > div > div.viewprofilepagebanner.lia-component-view-profile-banner > div > div > div.lia-user-name > div > div > span"
      );
      presenceData.details = "Viewing profile of user:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (
      document.querySelector(
        "#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div"
      ) !== null
    ) {
      item = document.querySelector<HTMLElement>(
        "#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div"
      );
      presenceData.details = "eBay Forum, Reading:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (
      document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      ) !== null
    ) {
      item = document.querySelector<HTMLElement>(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      );
      presenceData.details = "eBay Forum, Reading:";
      if (item.innerText.length > 128)
        presenceData.state = `${item.innerText.substring(0, 125)}...`;
      else presenceData.state = item.innerText;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
