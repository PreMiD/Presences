var presence = new Presence({
    clientId: "760611329588985886"
  }),
  presenceData: PresenceData = {
    largeImageKey: "icon"
  },
  customData = false;

presence.on("UpdateData", async () => {

  if (document.location.pathname == "/my-home") {
    presenceData.details = "Browsing the homepage";
  } else if (document.location.pathname.startsWith("/store/download")) {
    presenceData.details = "Installing the Origin launcher";
    };
    if (document.location.pathname.startsWith("/store")) {
    presenceData.details = "Browsing for a game";
  } else if (document.location.pathname.startsWith("/search")) {
    presenceData.details = "Searching the store";
  } else if (document.location.pathname.startsWith("/profile/")) {
    presenceData.details = "Viewing a friend's profile";
  } else if (document.location.pathname.startsWith("/profile")) {
    presenceData.details = "Looking through their friends list.";
  } else if (document.location.pathname.startsWith("profile/friends")) {
    };
    presence.setActivity(profileData);
  } else {
    presenceData.details = "404 Page Not Found...";
  };

