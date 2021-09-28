const presence = new Presence({
    clientId: "619219701146583080"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let item: any, split: any, item2: any, itemfinish: any;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "ebaylogo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (location.hostname.startsWith("www.")) {
    if (location.pathname == "/") {
      presenceData.details = "Viewing the";
      presenceData.state = "Homepage";
    }

    if (location.pathname.includes("/itm/")) {
      item = document.querySelector("#itemTitle");
      item2 = document.querySelector("#itemTitle > span");
      itemfinish = item.innerText.replace(item2.innerText, "");
      presenceData.details = "Viewing product:";
      if (itemfinish.length > 128) {
        presenceData.state = itemfinish.substring(0, 125) + "...";
      } else {
        presenceData.state = itemfinish;
      }
    } else if (location.pathname.includes("/usr/")) {
      item = document.querySelector(".mbg-id");
      item2 = document.querySelector(".mbg-id > span");
      itemfinish = item.innerText.replace(item2.innerText, "");

      presenceData.details = "Viewing user:";
      presenceData.state = itemfinish;
    } else if (location.pathname.includes("/m.html")) {
      item = document.querySelector("#soiBanner > div > span:nth-child(1) > a");

      presenceData.details = "Viewing listed products of:";
      presenceData.state = item.innerText;
    } else if (location.pathname.includes("/i.html")) {
      split = location.pathname.split("/");
      item = document.querySelector("#cbelm > div.clt > h1 > span.kwcat > b");
      if (split[2] == "i.html") {
        presenceData.details = "Searching for:";
        presenceData.state = item.innerText;
      } else {
        presenceData.details = "Searching for:";
        presenceData.state = split[2];
      }

      presenceData.smallImageKey = "search";
    } else if (location.pathname.includes("/myb/")) {
      item = document.querySelector(
        "#top-nav > div.topTitle > h1 > span.page-name"
      );
      presenceData.details = "Viewing their:";
      presenceData.state = item.innerText;
    } else if (
      location.pathname.includes("/sns") ||
      location.pathname.includes("/b/Stores-Hub/")
    ) {
      presenceData.details = "Viewing stores";
    } else if (location.pathname.includes("/sl/")) {
      presenceData.details = "eBay Sell";
      presenceData.state = "Listing an item";
    } else if (location.pathname.includes("/b/")) {
      item = document.querySelector(
        "body > div.pagecontainer.srp-main--isLarge > div.pagecontainer__top > nav > ol > li:nth-child(2) > span"
      );
      presenceData.details = "Viewing category:";
      presenceData.state = item.innerText;
    } else if (location.pathname.includes("/help/")) {
      presenceData.details = "eBay Help";
    } else if (location.pathname.includes("/deals")) {
      presenceData.details = "Viewing the latest";
      presenceData.state = "eBay deals";
    } else if (location.pathname.includes("/allcategories")) {
      presenceData.details = "Viewing all categories";
    } else if (location.pathname.includes("/str/")) {
      item = document.querySelector(
        "#w2 > div.str-billboard__store > div.str-billboard__store-info > div.str-billboard__title-container > h1"
      );
      presenceData.details = "eBay Stores";
      presenceData.state = "Tag: " + item.innerText;
    }
  } else if (location.hostname.startsWith("mesg.")) {
    if (location.pathname.includes("/ViewMessageDetail/")) {
      presenceData.details = "eBay Messages";
      presenceData.state = "Viewing a message";
    } else if (location.pathname.includes("/ViewMessages/")) {
      presenceData.details = "Browsing through";
      presenceData.state = "eBay Messages";
    } else {
      presenceData.details = "eBay Messages";
    }
  } else if (location.hostname.startsWith("ocsnext.")) {
    presenceData.details = "eBay Customer Support";
  } else if (location.hostname.includes("developer.")) {
    presenceData.details = "eBay Developer Program";
  } else if (location.hostname.startsWith("resolutioncenter.")) {
    presenceData.details = "eBay Resolution Center";
  } else if (location.hostname.startsWith("my.")) {
    presenceData.details = "Viewing their eBay";
  } else if (location.hostname.startsWith("login.")) {
    presenceData.details = "eBay Login";
  } else if (location.hostname.startsWith("signin.")) {
    presenceData.details = "eBay Login";
  } else if (location.hostname.startsWith("pages.")) {
    if (location.hash !== "") {
      presenceData.details = "Viewing the sitemap";
      presenceData.state = location.hash;
    } else if (location.pathname.includes("sitemap.html")) {
      presenceData.details = "Viewing the sitemap";
    } else if (location.pathname.includes("seller-center")) {
      presenceData.details = "Viewing the seller center";
    }
  } else if (location.hostname.startsWith("community.")) {
    if (document.querySelector("#messageview") !== null) {
      item = document.querySelector("#messageview").className;
      split = item.split("message-uid-");
      split = split[1].split(" ");
      item2 =
        "#qanda-message-" +
        split[0] +
        " > div:nth-child(1) > div.lia-panel-message-root.lia-message-qanda.lia-panel-message.lia-js-data-messageUid-" +
        split[0] +
        " > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div > h5";
      itemfinish = document.querySelector(item2);
    }

    if (
      document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      ) !== null
    ) {
      item = document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-row_1 > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      );
      presenceData.details = "eBay Forum, Viewing:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }
    } else if (itemfinish !== null) {
      presenceData.details = "eBay Forum, Viewing:";
      if (itemfinish?.innerText.length > 128) {
        presenceData.state = itemfinish.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = itemfinish?.innerText;
      }
    } else if (location.pathname.includes("/user/")) {
      item = document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div.lia-quilt-row.lia-quilt-row-header > div > div > div.viewprofilepagebanner.lia-component-view-profile-banner > div > div > div.lia-user-name > div > div > span"
      );
      presenceData.details = "Viewing profile of user:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }
    } else if (
      document.querySelector(
        "#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div"
      ) !== null
    ) {
      item = document.querySelector(
        "#messageview > div:nth-child(1) > div > div > div > div > div > div.lia-decoration-border-content > div > div > div > div.lia-quilt-row.lia-quilt-row-forum-message-main > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-right.lia-quilt-column-main-right > div > div.lia-message-heading.lia-component-message-header > div > div.lia-quilt-column.lia-quilt-column-20.lia-quilt-column-left > div > div"
      );
      presenceData.details = "eBay Forum, Reading:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      presenceData.smallImageKey = "reading";
    } else if (
      document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      ) !== null
    ) {
      item = document.querySelector(
        "#lia-body > div.lia-page > center > div.MinimumWidthContainer > div > div > div > div > div > div > div > div > div.lia-quilt-row.lia-quilt-row-title > div > div > h1 > span"
      );
      presenceData.details = "eBay Forum, Reading:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      presenceData.smallImageKey = "reading";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
