const presence = new Presence({
    clientId: "893407426609561631"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const showTimestamp: boolean = await presence.getSetting("timestamp"),
    showButtons: boolean = await presence.getSetting("buttons"),
    presenceData: PresenceData = {
      largeImageKey: "ych-commisshes-logo",
      smallImageKey: "ych-commisshes-white-logo",
      smallImageText: "Navigating on ych.commishes",
      buttons: [
        {
          label: "View Page",
          url: document.location.href
        }
      ]
    };
  
  // Category Pages
  if (document.location.pathname === "/") {
    presenceData.state = "Browsing Featured";
    delete presenceData.buttons;
  } else if (document.location.pathname.includes("/category//furry")) {
    presenceData.state = "Browsing Furry";
    presenceData.smallImageKey = "category-furry-icon";
  } else if (document.location.pathname.includes("/category/brony")) {
    presenceData.state = "Browsing Pony";
    presenceData.smallImageKey = "category-brony-icon";
  } else if (document.location.pathname.includes("/category/human")) {
    presenceData.state = "Browsing Human";
    presenceData.smallImageKey = "category-human-icon";
  } else if (document.location.pathname.includes("/category/adopt")) {
    presenceData.state = "Browsing Adoptables";
    presenceData.smallImageKey = "category-adopt-icon";
  } else if (document.location.pathname.includes("/category/crafts")) {
    presenceData.state = "Browsing Crafts and Costumes";
    presenceData.smallImageKey = "category-crafts-icon";

  // "Home" Pages
  } else if (document.location.pathname.includes("/home/help")) {
    presenceData.state = "Viewing Support";
    presenceData.smallImageKey = "home-help-icon";
  } else if (document.location.pathname.includes("/home/faq")) {
    presenceData.state = "Reading Frequently Asked Questions";
    presenceData.smallImageKey = "home-faq-icon";
  } else if (document.location.pathname.includes("/home/imprint")) {
    presenceData.state = "Reading Impressium";
    presenceData.smallImageKey = "home-imprint-icon";
  } else if (document.location.pathname.includes("/home/privacy")) {
    presenceData.state = "Reading Priavacy Policy";
    presenceData.smallImageKey = "home-privacy-icon";

  // User Action Pages
  } else if (document.location.pathname.includes("/user/login")) {
    presenceData.state = "Logging In";
    presenceData.smallImageKey = "login-icon";
  } else if (document.location.pathname.includes("/auction/create")) {
    presenceData.state = "Creating Auction";
    presenceData.smallImageKey = "auction-create-icon";
  } else if (document.location.pathname.includes("/upload")) {
    presenceData.state = "Uploading Image";
    presenceData.smallImageKey = "upload-icon";
  } else if (document.location.pathname.includes("/edit")) {
    presenceData.state = "Configuring Settings";
    presenceData.smallImageKey = "edit-icon";

  // Viewing Auctions
  var title: any;
  } else if (document.location.pathname.includes("/auction/show")) {
    title = document.querySelector(
      "body > div:nth-child(6) > div > div.material > h1 > span"
    );
    presenceData.details = "Viewing Auction:";
    presenceData.state = title.innerText;
    presenceData.smallImageKey = "auction-show-icon";

  // Viewing Users
  } else if (document.location.pathname.includes("/view")) {
    title = document.querySelector(
      "body > div.banner-container > div.profile-info > div > div > span"
   );
   presenceData.details = "Viewing User:";
   presenceData.state = title.innerText;
   presenceData.smallImageKey = "view-icon";

  //Messaging
  } else if (document.location.pathname.includes("/task/show")) {
    title = document.querySelector(
      "#ctxmenu > div:nth-child(9) > div:nth-child(1) > div.span.l3.m3.s3 > span.username"
   );
   presenceData.details = "Messaging:";
   presenceData.state = title.innerText;
   presenceData.smallImageKey = "task-show-icon";  

  // Downloading Image
  } else if (document.location.pathname.includes("/image/download")) {
    presenceData.state = "Downloading Image";
    presenceData.smallImageKey = "image-download-icon";

  // Misc
  } else if (document.location.pathname.includes("/account")) {
    presenceData.state = "Managing Account";
    presenceData.smallImageKey = "account-icon";
  } else if (document.location.pathname.includes("/subscription")) {
    presenceData.state = "Managing Subscription";
    presenceData.smallImageKey = "subscription-icon";
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.state = "Managing Settings";
    presenceData.smallImageKey = "setings-icon";
  } else if (document.location.pathname.includes("/app/permissions")) {
    presenceData.state = "Managing Permissions";
    presenceData.smallImageKey = "app-permissions-icon";
  } else if (document.location.pathname.includes("/block")) {
    presenceData.state = "Managing Blocklist";
    presenceData.smallImageKey = "block-icon";
  } else if (document.location.pathname.includes("/feed")) {
    presenceData.state = "Browsing Feed";
    presenceData.smallImageKey = "feed-icon";
  } else if (document.location.pathname.includes("/activity")) {
    presenceData.state = "Looking at Notifications";
    presenceData.smallImageKey = "activity-icon";
  } else if (document.location.pathname.includes("/watchlist")) {
    presenceData.state = "Managing Watchlist";
    presenceData.smallImageKey = "watchlist-icon";
  } else if (document.location.pathname.includes("/bids/history")) {
    presenceData.state = "Viewing Bidding History";
    presenceData.smallImageKey = "bids-history-icon";    
  }

  // Start Browsing Timestamp
  if (showTimestamp) presenceData.startTimestamp = browsingStamp;

  // If Buttons option is off, delete buttons
  if (!showButtons) delete presenceData.buttons;

  // Activate Presence
    presence.setActivity(presenceData);
  });