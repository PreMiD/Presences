const presence = new Presence({
    clientId: "786739998011293717"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  userName = document.querySelector(
    "#wardrobe > div > div.UserInfo > div.--header > div.--info > div.--user-container > div.--user-info > div.--username-container > span"
  );

let item: HTMLElement, item2: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "grailedlogo"
  };

  presenceData.startTimestamp = browsingStamp;

  if (document.location.hostname == "www.grailed.com") {
    if (document.location.href.includes("www.grailed.com/listings/")) {
      item = document.querySelector(
        "body > div.container > div > div.show-listing > div.listing-details-wrapper > div.-listing-details-and-likes-wrapper > div.-listing-designer-title-size > h1"
      );
      presenceData.details = "Viewing a listing:";
      if (item.innerHTML.length > 128) {
        presenceData.state =
          item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerHTML.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/mygrails/")) {
      presenceData.details = "Browsing:";
      presenceData.state = "My Grails";
      presence.setActivity(presenceData);
    } else if (document.location.href.endsWith("www.grailed.com/foryou")) {
      presenceData.details = "Viewing:";
      presenceData.state = "For You";
      presence.setActivity(presenceData);
    } else if (
      document.location.href.includes("www.grailed.com/collaborations/")
    ) {
      item = document.querySelector(
        "#designer-collaboration > div.designer-profile-container > div.designer-profile-info-container > div > h1"
      );
      presenceData.details = "Viewing a collaboration:";
      if (item.innerHTML.length > 128) {
        presenceData.state =
          item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerHTML.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (
      document.location.href.includes("www.grailed.com/collections/")
    ) {
      presenceData.details = "Browsing a Collection:";
      item = document.querySelector(
        "#CapsulePage > div.CapsuleHeader > div.-container._has-hero > div > div.-name-container > h1"
      );
      if (item.innerHTML.length > 128) {
        presenceData.state =
          item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerHTML.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/collections")) {
      presenceData.details = "Browsing:";
      presenceData.state = "Collections";
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/designers")) {
      if (document.location.href.includes("www.grailed.com/designers/")) {
        if (document.location.pathname.lastIndexOf("/") < 11) {
          presenceData.details = "Browsing a Designer:";
          item = document.querySelector(
            "#__next > div > main > div:nth-child(2) > div.ProfileWrapper > div > div.DetailPageProfile-Info > div > h1"
          );
          if (item.innerHTML.length > 128) {
            presenceData.state =
              item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
          } else {
            presenceData.state = item.innerHTML.replace(/amp;/g, "");
          }
        } else {
          item = document.querySelector(
            "#designer-category > div.FiltersInstantSearch > div.feed-and-filters > div.right > h2"
          );
          presenceData.details = "Browsing:";
          if (item.innerHTML.length > 128) {
            presenceData.state =
              item.innerHTML.replace(/amp;/g, "").substring(29, 125) + "...";
          } else {
            presenceData.state = item.innerHTML
              .replace(/amp;/g, "")
              .substring(29, item.textContent.length);
          }
        }
      } else if (document.location.href.endsWith("www.grailed.com/designers")) {
        presenceData.details = "Browsing:";
        presenceData.state = "Designers";
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/categories/")) {
      presenceData.details = "Browsing:";
      item = document.querySelector(
        "#CategoryPage > div.-pageHeader > div > div.DetailPage--Header > div.-details > h1"
      );
      if (item.innerHTML.length > 128) {
        presenceData.state =
          item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerHTML.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (
      document.location.href.includes(
        "www.grailed.com/drycleanonly/categories/"
      )
    ) {
      presenceData.details = "Reading:";
      item = document.querySelector(
        "#blog > div.container.tagged-articles > div.filtered-articles-wrapper > h1"
      );
      if (item.innerHTML.length > 128) {
        presenceData.state =
          item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerHTML.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/products/")) {
      presenceData.details = "Browsing a Product:";
      item = document.querySelector(
        "#ProductPage > div.ProductPageHeader > div.-info > h1.-product-name"
      );
      item2 = document.querySelector(
        "#ProductPage > div.ProductPageHeader > div.-info > h1.-designers-names"
      );
      if (item.innerHTML.length > 108) {
        presenceData.state =
          item2.textContent.replace(/amp;/g, "") +
          ": " +
          item.textContent.replace(/amp;/g, "").substring(0, 105) +
          "...";
      } else {
        presenceData.state =
          item2.textContent.replace(/amp;/g, "") +
          ": " +
          item.textContent.replace(/amp;/g, "");
      }
      presence.setActivity(presenceData);
    } else if (
      document.location.href.includes("www.grailed.com/drycleanonly")
    ) {
      if (document.location.href.includes("www.grailed.com/drycleanonly/")) {
        item = document.querySelector(
          "#blog > div.article-wrapper > div > div.article-top-section > h1 > p"
        );
        item2 = document.querySelector(
          "div.heatwave-app > div.Heatwave--Page > div.Editorial--CampaignPageHeroModule._Heatwave > div > div.--title"
        );
        presenceData.details = "Reading:";
        if (item != null) {
          if (item.innerHTML.length > 128) {
            presenceData.state =
              item.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
          } else {
            presenceData.state = item.innerHTML.replace(/amp;/g, "");
          }
        } else if (item2 != null) {
          if (item2.innerHTML.length > 128) {
            presenceData.state =
              item2.innerHTML.replace(/amp;/g, "").substring(0, 125) + "...";
          } else {
            presenceData.state = item2.innerHTML.replace(/amp;/g, "");
          }
        }
      } else {
        presenceData.details = "Reading:";
        presenceData.state = "Dry Clean Only";
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.includes("www.grailed.com/shop")) {
      if (document.location.href.includes("grailed.com/shop/staff-picks")) {
        presenceData.details = "Browsing:";
        presenceData.state = "Staff Picks";
      } else {
        item = document.querySelector(
          "#shop > div > div > div.feed-and-filters > div.right > h2"
        );
        if (item.innerHTML.includes("Available listings related to")) {
          presenceData.details = "Searching for:";
          presenceData.state = item.innerHTML
            .replace(/amp;/g, "")
            .substring(29, 125);
        } else if (item.innerHTML.endsWith("Listings")) {
          presenceData.details = "Searching for:";
          presenceData.state = item.innerHTML.replace(/amp;|Listings/g, "");
        } else {
          presenceData.details = "Browsing:";
          presenceData.state = "The Feed";
        }
      }
      presence.setActivity(presenceData);
    } else if (document.location.href.endsWith("grailed.com/")) {
      presenceData.details = "Viewing:";
      presenceData.state = "The Main Page";
      presence.setActivity(presenceData);
    } else if (userName != null) {
      presenceData.details = "Viewing a User:";
      if (userName.innerHTML.length > 128) {
        presenceData.state = userName.innerHTML.substring(0, 125) + "...";
      } else {
        presenceData.state = userName.innerHTML;
      }
      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  }
});
