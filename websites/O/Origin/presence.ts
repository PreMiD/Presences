const presence = new Presence({
    clientId: "760611329588985886"
  }),
  presenceData: PresenceData = {
    largeImageKey: "icon"
  };

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/my-home") {
    presenceData.details = "Browsing the homepage";
  } else if (document.location.pathname.startsWith("/store/download")) {
    presenceData.details = "Installing the Origin launcher";
    if (document.location.pathname.startsWith("/store")) {
    presenceData.details = "Browsing for a game";
  } else if (document.location.pathname.startsWith("/profile/achievements")) {
    presenceData.details = "Viewing their achievement progress";
  } else if (document.location.pathname.startsWith("/eaAccounts")) {
    presenceData.details = "Editing their settings";
  } else if (document.location.pathname.startsWith("/game-library")) {
    presenceData.details = "Browsing their game library";
  } else if (document.location.pathname.startsWith("/search")) {
    presenceData.details = "Searching the store";
  } else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Viewing a profile";
  } else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Looking through their friends list.";
  } else if (document.location.pathname.startsWith("profile/wishlist")) {
    presenceData.details = "Viewing their wishlist";
  } else if (document.location.pathname.startsWith("profile/friends")) {
    presenceData.details = "Viewing their friends list";
  };
  var profileData: PresenceData = {
      details: "Viewing " + name + "'s Profile",
      largeImageKey: "logo"
    };
    
  var storeData: PresenceData = {
      details: "Viewing " + game ,
      largeImageKey: "logo"
    };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});


