const presence = new Presence({
  clientId: "839494386777325580"
}), browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "mkc"
  };

  // Home Section
  if (window.location.pathname == "/") {
    presenceData.details = "Browsing: Home";
  } else if (window.location.pathname.includes("/shared-hosting")) {
    presenceData.details = "Browsing: Shared Hosting";
  } else if (window.location.pathname.includes("/business-hosting")) {
    presenceData.details = "Browsing: Business Hosting";
  }

   if (window.location.pathname == "/login") {
    presenceData.details = "Client Logon";
  } else if (window.location.pathname.includes("/signup")) {
    presenceData.details = "Client Signup";
  } else if (window.location.pathname.includes("/account")) {
    presenceData.details = "Browsing: Your Account";
  }

  // Legal Pages
  if (window.location.pathname.includes("/legal/")) {
    presenceData.details = "Viewing: Legal Links";
  } else if (window.location.pathname.includes("/privacy/")) {
    presenceData.details = "Viewing: Privacy Policy";
  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
