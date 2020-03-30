var presence = new Presence({
    clientId: "633005889619755038",
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
  });
var browsingStamp = Math.floor(Date.now() / 1000);
var title, views, air, air2, title2;
var iFrameVideo, currentTime, duration, paused;
var video, videoDuration, videoCurrentTime;
var lastPlaybackState = null;
var playback;
var browsingStamp = Math.floor(Date.now() / 1000);
if (lastPlaybackState != playback) {
  lastPlaybackState = playback;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("iFrameData", (data) => {
  playback = data.iframe_video.duration !== null ? true : false;
  if (playback) {
    iFrameVideo = data.iframe_video.iFrameVideo;
    currentTime = data.iframe_video.currTime;
    duration = data.iframe_video.dur;
    paused = data.iframe_video.paused;
  }
});

presence.on("UpdateData", async () => {
  var a = (presenceData = ""),
    presenceData = {
      largeImageKey: "logo",
    };

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing in mainpage...";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/wishlist") {
    nameuser = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC"
    ).innerText;
    presenceData.details = "Browsing thought Wishlist";
    presenceData.state = nameuser + "'s Wishlist";
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/wishlist/")) {
    wishlist = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.eKttIh > div > div.Feed__FeedHeader-sc-10q7yh-1.gOYbXb > h1"
    ).innerText;
    presenceData.details = "Browsing thought Wishlist";
    presenceData.state = wishlist;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/product/")) {
    product = document.querySelector(
      "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
    ).innerText;
    presenceData.details = "Viewing product";
    presenceData.state = product;
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/cart") {
    presenceData.details = "Viewing cart...";
    presenceData.state = "Someone have Promocodes?";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/notifications") {
    presenceData.details = "Looking for Notifications";
    presenceData.state = "Many deals today owo";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/refer") {
    presenceData.details = "Looking for new Customers";
    code = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.ReferralPage__MainWrapper-zs6pzr-0.bDMHGd > div.ReferralPage__ContentWrapper-zs6pzr-2.cHgkEg > div.ReferralPage__CodeSectionWrapper-zs6pzr-8.ebqrAL > div.ReferralPage__CodeBoxWrapper-zs6pzr-10.eoklod > div.ReferralPage__CodeBox-zs6pzr-14.bupEiO"
    ).innerText;
    presenceData.state = "50% discount > Code: " + code;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/transaction/")) {
    presenceData.details = "Viewing transactions...";
    presenceData.state = "Waiting for a product";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/profile") {
    name2 = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.FlexScrollContainer__FlexGrandparent-o9gi86-0.jXFTEW > div > div > div.NavPanel__Wrapper-sc-1uxerbb-0.kFfmiE > div.NavPanel__Name-sc-1uxerbb-1.kHdhxC"
    ).innerText;
    presenceData.details = "Viewing profile";
    presenceData.state = name2;
    presence.setActivity(presenceData);
  } else if (document.location.pathname.includes("/merchant/")) {
    shop = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.fjpSHM > div.TabBarWrapper__MainRowContainer-sc-1p5ocnd-1.eKttIh > div.MerchantPage__Wrapper-sc-1nxlnue-0.bpUbAm > div.MerchantPage__HeaderWrapper-sc-1nxlnue-1.gYkbZT > div > div > h1"
    ).innerText;
    presenceData.details = "Viewing shop";
    presenceData.state = shop;
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/feed/tabbed_feed_latest") {
    presenceData.details = "Viewing popular Feed...";
    presence.setActivity(presenceData);
    if (
      document.location.pathname == "/tabbed_feed_latest/" &&
      document.location.pathname.includes("/product/")
    ) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname == "/feed/pickup__tab") {
    presenceData.details = "Viewing local Feed...";
    presence.setActivity(presenceData);
    if (
      document.location.pathname == "/pickup__tab/" &&
      document.location.pathname.includes("/product/")
    ) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname == "/feed/blitz_buy__tab") {
    presenceData.details = "Wheel of Fortune";
    presenceData.state = "Try your Luck!";
    presence.setActivity(presenceData);
    if (
      document.location.pathname == "/blitz_buy__tab/" &&
      document.location.pathname.includes("/product/")
    ) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname == "/feed/express__tab") {
    presenceData.details = "Viewing express Feed...";
    presence.setActivity(presenceData);
    if (
      document.location.pathname == "/express__tab/" &&
      document.location.pathname.includes("/product/")
    ) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname == "/feed/recently_viewed__tab") {
    presenceData.details = "Look at";
    presenceData.state = "recently seen products";
    presence.setActivity(presenceData);
    if (
      document.location.pathname == "/recently_viewed__tab/" &&
      document.location.pathname.includes("/product/")
    ) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  } else if (document.location.pathname.includes("/feed/tag")) {
    tag = document.querySelector(
      "#react-app > div > div.TabBarWrapper__Wrapper-sc-1p5ocnd-0.wZbPl > div.TabBar__Wrapper-sc-1vadptt-0.bTjdiW > div.TabBar__MainWrapper-sc-1vadptt-1.prcJ > div > div > h1"
    ).innerText;
    presenceData.details = "Viewing for";
    presenceData.state = tag;
    presence.setActivity(presenceData);
    if (document.location.pathname.includes("/product/")) {
      product = document.querySelector(
        "#react-app > div > div.modal-root.BaseModal__ModalContainer-sc-188teto-4.bFHXBY > div > div > div > div > div.ProductContainer__ProductMainSection-sc-1vbd28u-1.fYThRf > div.ProductContainer__RightColumn-sc-1vbd28u-3.ewTgOn > div > div.PurchaseContainer__UpperWrapper-sc-1qlezk8-1.jEnuPa > h1"
      ).innerText;
      presenceData.details = "Viewing product";
      presenceData.state = product;
      presence.setActivity(presenceData);
    }
  }

  presence.setActivity(presenceData);
});

function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
function refresh(presence) {
  refresh.refresh;
}
