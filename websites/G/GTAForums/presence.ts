const presence = new Presence({
  clientId: "713726722671116330"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname == "/") {
    presenceData.details = "Browsing the home page...";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    presenceData.smallImageKey = "home";
  } else if (document.location.pathname.startsWith("/settings")) {
    delete presenceData.details;
    presenceData.details = "In settings...";
    presenceData.smallImageKey = "settings";
    presenceData.state = "Overview";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    switch (document.location.pathname) {
      case "/settings/email/":
        presenceData.state = "Email Address";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/settings/password/":
        presenceData.state = "Password";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/settings/account-security/":
        presenceData.state = "Account Security";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/settings/devices/":
        presenceData.state = "Recently Used Devices";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/settings/username/":
        presenceData.state = "Username";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
    }
  } else if (document.location.pathname.startsWith("/profile/")) {
    delete presenceData.details;
    presenceData.details = "Browsing a profile...";
    presenceData.state = document.getElementsByClassName(
      "ipsType_reset ipsPageHead_barText"
    )[0].textContent;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.startsWith("/forum/")) {
    delete presenceData.details;
    presenceData.details = "Browsing a category...";
    presenceData.state =
      document.getElementsByClassName("ipsType_pageTitle")[0].textContent;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    if (document.location.href.match("/?do=add")) {
      delete presenceData.details;
      delete presenceData.state;
      presenceData.details = "Starting a new topic...";
    }
  } else if (document.location.pathname.startsWith("/topic/")) {
    delete presenceData.details;
    presenceData.details = "Browsing a topic...";
    presenceData.state = document.getElementsByClassName(
      "ipsType_break ipsContained"
    )[0].textContent;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.pathname.startsWith("/search/")) {
    delete presenceData.details;
    presenceData.details = "Searching...";
    presenceData.smallImageKey = "search";
    presenceData.state =
      "Looking" +
      document
        .getElementsByClassName("ipsType_reset ipsType_large")[0]
        .textContent.split("results")[1];
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else {
    delete presenceData.details;
    switch (document.location.pathname) {
      case "/followed/":
        presenceData.details = "Managing Followed Content.";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/notifications/":
        presenceData.details = "Viewing your notifications...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/messenger/":
        presenceData.details = "Viewing your inbox...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/ignore/":
        presenceData.details = "Managing your ignored users.";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/privacy/":
        presenceData.details = "Reading privace policy...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/register/":
        presenceData.details = "Just registering...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/login/":
        presenceData.details = "Just logging...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/discover/unread/":
        presenceData.details = "Viewing Unread Content...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
      case "/discover/":
        presenceData.details = "Viewing All Activity...";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        break;
    }
  }

  presence.setActivity(presenceData);
});
