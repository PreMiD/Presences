const presence = new Presence({
    clientId: "683031551193514047"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Forum list";
  } else if (document.location.pathname.includes("/help")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Help";
  } else if (document.location.pathname.includes("/help/smilies/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Help";
    presenceData.state = "Smilies";
  } else if (document.location.pathname.includes("/help/bb-codes/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Help";
    presenceData.state = "BB codes";
  } else if (document.location.pathname.includes("/help/cookies/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Help";
    presenceData.state = "Cookie usage";
  } else if (document.location.pathname.includes("/help/privacy-policy/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Help";
    presenceData.state = "Privacy Policy";
  } else if (document.location.pathname.includes("/help/terms/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Help";
    presenceData.state = "Terms and rules";
  } else if (document.location.pathname.includes("/misc/contact/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Contact us";
  } else if (document.location.pathname.includes("/misc/style")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Style chooser";
  } else if (document.location.pathname.includes("/threads/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Thread";
    presenceData.state = document.querySelector("h1.p-title-value").textContent;
  } else if (document.location.pathname.includes("/forums/gaming-forum.7/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Gaming Forum";
  } else if (
    document.location.pathname.includes("/forums/gaming-hangouts.8/")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Gaming Hangouts";
  } else if (document.location.pathname.includes("/forums/etcetera-forum.9/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "EtcetEra Forum";
  } else if (
    document.location.pathname.includes("/forums/etcetera-hangouts.10/")
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "EtcetEra Hangouts";
  } else if (document.location.pathname.includes("/forums/-/latest-threads/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Latest threads";
  } else if (document.location.pathname.includes("/trending/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trending threads";
  } else if (document.location.pathname.includes("/watched/threads")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Watched threads";
  } else if (document.location.pathname.includes("/members/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing a member";
    presenceData.state = document.querySelector("span.username").textContent;
  } else if (document.location.pathname.includes("/account/account-details")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Account details";
  } else if (document.location.pathname.includes("/account/alerts")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Alerts";
  } else if (document.location.pathname.includes("/account/security")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Password and security";
  } else if (document.location.pathname.includes("/account/privacy")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Privacy";
  } else if (document.location.pathname.includes("/account/preferences")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Preferences";
  } else if (document.location.pathname.includes("/account/upgrades")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Account Upgrades";
  } else if (document.location.pathname.includes("/account/following")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Following";
  } else if (document.location.pathname.includes("/account/ignored")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Ignoring";
  } else if (document.location.pathname.includes("/account/devices")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Settings";
    presenceData.state = "Image and media options";
  } else if (document.location.pathname.includes("/conversations/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Conversations";
  } else if (document.location.pathname.includes("/pages/membership/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Era Clear";
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
