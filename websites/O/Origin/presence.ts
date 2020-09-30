var presence = new Presence({
    clientId: "760611329588985886"
  }),
  presenceData: PresenceData = {
    largeImageKey: "icon"
  },
  customData = false;

presence.on("UpdateData", async () => {
  customData = false;

  if (document.location.pathname == "en-us/my-home") {
    presenceData.details = "Browsing the homepage";
  } else if (document.location.pathname.startsWith("/en-us/store/download")) {
    presenceData.details = "Installing the Origin launcher";
    };
    if (document.location.pathname.startsWith("en-us/store")) {
    presenceData.details = "Browsing for a game";
  } else if (document.location.pathname.startsWith("/en-us/search")) {
    presenceData.details = "Searching the store";
  } else if (document.location.pathname.startsWith("/en-us/profile/")) {
    presenceData.details = "Viewing a user's profile";
  } else if (document.location.pathname.startsWith("/en-us/profile")) {
    presenceData.details = "Looking through their friends list.";
  } else if (document.location.pathname.startsWith("en-us/friends")) {
    };
    presence.setActivity(profileData);
  } else {
    presenceData.details = "404 Page Not Found...";
  }
  if (!customData) {
    presence.setActivity(presenceData);
  }
});

presence.on("iFrameData", function (data) {
  console.log(data);
});
